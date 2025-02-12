// salesService.js
const db = require("../config/database");

// Fetch all sales
const getSales = async (fromDate, toDate, portalId) => {
    let query = `
        SELECT sales.*, users.name AS user_name
        FROM sales
        JOIN users ON sales.user_id = users.id
    `;
    
    const queryParams = [];
    const conditions = [];

    // Add conditions for filtering by created_at if dates are provided
    if (fromDate && toDate) {
        conditions.push(`sales.created_at BETWEEN ? AND ?`);
        queryParams.push(fromDate, toDate);
    } else if (fromDate) {
        conditions.push(`sales.created_at >= ?`);
        queryParams.push(fromDate);
    } else if (toDate) {
        conditions.push(`sales.created_at <= ?`);
        queryParams.push(toDate);
    }

    // Add condition for portalId if provided
    if (portalId) {
        conditions.push(`sales.portalId = ?`);
        queryParams.push(portalId);
    }

    // Add conditions to the query if there are any
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    // Sort results by created_at in descending order
    query += ` ORDER BY sales.created_at DESC`;

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
};

// Fetch a sale by ID
const getSaleById = async (id) => {
    const query = "SELECT * FROM sales WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// Create a new sale
const createSale = async (sale) => {
    const queryInsertSale = `
        INSERT INTO sales (user_id, portalId, services, total_price) 
        VALUES (?, ?, ?, ?)`;
    const queryUpdateBalance = `
        UPDATE portals 
        SET Balance = Balance - ? 
        WHERE PortalID = ?`;
    const queryGetBalance = `
        SELECT Balance FROM portals WHERE PortalID = ?`;

    const { user_id, portalId, services, total_price } = sale;

    try {
        // Step 1: Get current balance from portals table
        const result1 = await new Promise((resolve, reject) => {
            db.query(queryGetBalance, [portalId], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return reject(new Error('Portal not found'));
                resolve(results[0]);
            });
        });

        const { Balance: currentBalance } = result1;

        // Step 2: Check if balance is sufficient
        if (currentBalance < total_price) {
            throw new Error('Insufficient balance in the portal');
        }

        // Step 3: Calculate the new balance
        const newBalance = currentBalance - total_price;

        // Prepare log data
        const logData = {
            portalId: portalId,
            beforeBalance: currentBalance,  // Initial balance before the transaction
            balance: total_price,           // Amount removed from the balance
            type: 'Remove Balance',
            transactionType: 'Services_Transfer',
            afterBalance: newBalance,      // New balance after deduction
            createdAt: new Date()
        };

        // Step 4: Log the transaction
        await addPortalLog(logData);

        // Step 5: Insert sale into the sales table
        const saleResult = await new Promise((resolve, reject) => {
            db.query(queryInsertSale, [user_id, portalId, JSON.stringify(services), total_price], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });

        // Step 6: Update portal balance in the portals table
        await new Promise((resolve, reject) => {
            db.query(queryUpdateBalance, [total_price, portalId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Step 7: Return the result
        return { message: 'Sale created and balance updated successfully', saleId: saleResult };

    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow error after logging it
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


// Update an existing sale
const updateSale = async (id, sale) => {
    const query = `
        UPDATE sales 
        SET user_id = ?, portalId = ?, services = ?, total_price = ? 
        WHERE id = ?`;
    const { user_id, portalId, services, total_price } = sale;
    return new Promise((resolve, reject) => {
        db.query(query, [user_id, portalId, JSON.stringify(services), total_price, id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

// Delete a sale
const deleteSale = async (id) => {
    const query = "DELETE FROM sales WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0);
        });
    });
};

module.exports = {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};
