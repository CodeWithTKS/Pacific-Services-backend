const db = require("../config/database");

// Create a new sale
exports.createSale = async (sale) => {
    const queryInsertSale = `INSERT INTO PanCardsales (name, phone, paymentType, portalId, services, total_price,
     UID, comments, workStatus, HighlightEntry, PendingAmount, ReceivedAmount, TransferType, VendorID)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const queryRemoveBalance = `UPDATE portals SET Balance = Balance - ? WHERE PortalID = ?`;
    const queryAddBalance = `UPDATE portals SET Balance = Balance - ? WHERE PortalID = ?`;
    const queryGetBalance = `SELECT Balance FROM portals WHERE PortalID = ?`;

    const { name, phone, paymentType, portalId, services, total_price,
        UID, comments, workStatus, HighlightEntry, PendingAmount, ReceivedAmount, TransferType, VendorID } = sale;

    try {
        // Step 1: Validate if all portals have sufficient balance
        for (const service of services) {
            const { portalId, purchase_price } = service;
            const result = await new Promise((resolve, reject) => {
                db.query(queryGetBalance, [portalId], (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return reject(new Error(`Portal ${portalId} not found`));
                    resolve(results[0]);
                });
            });

            if (result.Balance < purchase_price) {
                throw new Error(`Insufficient balance in portal ${portalId}`);
            }
        }

        // Step 2: Deduct balance and log transactions for each portal
        for (const service of services) {
            const { portalId, purchase_price } = service;

            // Get current balance
            const result = await new Promise((resolve, reject) => {
                db.query(queryGetBalance, [portalId], (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                });
            });

            const currentBalance = result.Balance;
            const newBalance = currentBalance - purchase_price;

            // Log transaction
            const logData = {
                portalId,
                beforeBalance: currentBalance,
                balance: purchase_price,
                type: 'Remove Balance',
                transactionType: 'Services_Transfer',
                afterBalance: newBalance,
                createdAt: new Date()
            };

            await addPortalLog(logData);

            // Update balance
            await new Promise((resolve, reject) => {
                db.query(queryRemoveBalance, [purchase_price, portalId], (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        }

        // Step 3: Handle Online Payment Type - Add total_price to portal balance and log transaction
        if (paymentType === 'Online') {
            const portalBalanceResult = await new Promise((resolve, reject) => {
                db.query(queryGetBalance, [portalId], (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                });
            });

            const previousBalance = portalBalanceResult.Balance;
            const updatedBalance = previousBalance + total_price;

            // Update portal balance
            await new Promise((resolve, reject) => {
                db.query(queryAddBalance, [total_price, portalId], (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });

            // Log transaction for Online Payment
            const onlinePaymentLog = {
                portalId,
                beforeBalance: previousBalance,
                balance: total_price,
                type: 'Add Balance',
                transactionType: 'Online_Payment',
                afterBalance: updatedBalance,
                createdAt: new Date()
            };

            await addPortalLog(onlinePaymentLog);
        }

        // Step 4: Insert sale into the PanCardsales table
        const saleResult = await new Promise((resolve, reject) => {
            db.query(queryInsertSale, [name, phone, paymentType, portalId, JSON.stringify(services), total_price,
                UID, comments, workStatus, HighlightEntry, PendingAmount, ReceivedAmount, TransferType, VendorID
            ], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });

        // Step 4: Return success response
        return { message: 'Sale created and balances updated successfully', saleId: saleResult };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Portal Logs
const addPortalLog = async (logData) => {
    const query = `
        INSERT INTO portal_logs 
        (portal_id, before_balance, balance, transactionType, type, after_balance, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        logData.portalId,
        logData.beforeBalance,
        logData.balance,
        logData.type,
        logData.transactionType,
        logData.afterBalance,
        logData.createdAt || new Date()
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ LogID: results.insertId });
        });
    });
};


// Fetch all sales
exports.getAllSales = async (fromDate, toDate) => {
    let query = `SELECT * FROM PanCardsales`;

    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by created_at if dates are provided
    if (fromDate && toDate) {
        conditions.push(`PanCardsales.created_at BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`PanCardsales.created_at >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`PanCardsales.created_at <= ?`);
        queryParams.push(toDate);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by created_at in descending order
    query += ` ORDER BY PanCardsales.created_at DESC`;

    return new Promise((resolve, reject) => {
        db.query(query, queryParams, (error, salesResults) => {
            if (error) return reject(error);

            // Process each sale to fetch the service names
            const salesWithServices = salesResults.map(async (sale) => {
                // Parse the services JSON string into an array
                const services = JSON.parse(sale.services);

                // Fetch service names based on serviceId from the services table
                const serviceIds = services.map(service => service.serviceId);
                const serviceQuery = `SELECT id, service_name FROM services WHERE id IN (${serviceIds.join(', ')})`;

                return new Promise((resolveServices, rejectServices) => {
                    db.query(serviceQuery, (error, serviceResults) => {
                        if (error) return rejectServices(error);

                        // Map service names to the respective services in the sale
                        const servicesWithNames = services.map(service => {
                            const serviceName = serviceResults.find(s => s.id === service.serviceId)?.service_name;
                            return { ...service, service_name: serviceName };
                        });

                        // Return the updated sale with services and user name
                        resolveServices({
                            ...sale,
                            user_name: sale.user_name, // Add the user name here
                            services: servicesWithNames
                        });
                    });
                });
            });

            // Resolve all sales and services
            Promise.all(salesWithServices)
                .then(results => resolve(results))
                .catch(err => reject(err));
        });
    });
}


// Fetch a sale by ID
exports.getSaleById = async (id) => {
    const query = "SELECT * FROM PanCardsales WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Update a sale
exports.updateSale = async (id, sale) => {
    const query = `
        UPDATE PanCardsales 
        SET name = ?, phone = ?, paymentType = ?, services = ?, total_price = ?,
        UID = ?, comments = ?, workStatus = ?, HighlightEntry = ?, PendingAmount = ?, ReceivedAmount = ?,
        TransferType = ?
        WHERE id = ?`;
    const { name, phone, paymentType, services, total_price, UID, comments, workStatus, HighlightEntry, PendingAmount, ReceivedAmount, TransferType } = sale;
    return new Promise((resolve, reject) => {
        db.query(query, [name, phone, paymentType, JSON.stringify(services), total_price, UID, comments, workStatus, HighlightEntry, PendingAmount, ReceivedAmount, TransferType, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};
// Delete a sale
exports.deleteSale = async (id) => {
    const query = "DELETE FROM PanCardsales WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, result) => {
            if (error) return reject(error);
            resolve();
        });
    });
};

// Fetch all services
exports.getServices = async () => {
    const query = "SELECT * FROM services";
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};
