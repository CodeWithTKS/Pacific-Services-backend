const dbconnection = require('../config/database');

// Add a new money transfer
const addMoneyTransfer = async (transferData) => {
    const query = `
        INSERT INTO moneytransfer 
        (TransactionNo, portalId, ACNo, LastName, TransactionType, Type, FirstName, ContactNo, IFSCNo, HighlightEntry, 
        Cash2000, Cash500, Cash100, Cash50, Cash20, Cash10, Cash5, TotalCash, CollectionAmt, SalasarFixedAmt, 
        BankCharge, SalasarCharge, SalasarExtra, BankDeposit, CustDeposit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        transferData.TransactionNo,
        transferData.portalId,
        transferData.ACNo,
        transferData.LastName || null,
        transferData.TransactionType,
        transferData.Type || null,
        transferData.FirstName,
        transferData.ContactNo,
        transferData.IFSCNo || null,
        transferData.HighlightEntry || 0,
        transferData.Cash2000 || 0,
        transferData.Cash500 || 0,
        transferData.Cash100 || 0,
        transferData.Cash50 || 0,
        transferData.Cash20 || 0,
        transferData.Cash10 || 0,
        transferData.Cash5 || 0,
        transferData.TotalCash || 0.00,
        transferData.CollectionAmt || 0.00,
        transferData.SalasarFixedAmt || 0.00,
        transferData.BankCharge || 0.00,
        transferData.SalasarCharge || 0.00,
        transferData.SalasarExtra || 0.00,
        transferData.BankDeposit || 0.00,
        transferData.CustDeposit || 0.00
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ TransferID: results.insertId });
        });
    });
};

// Update a money transfer by ID
const updateMoneyTransfer = async (transferId, transferData) => {
    const query = `
        UPDATE moneytransfer 
        SET TransactionNo = ?, portalId = ?, ACNo = ?, LastName = ?, TransactionType = ?, Type = ?, FirstName = ?, 
        ContactNo = ?, IFSCNo = ?, HighlightEntry = ?, Cash2000 = ?, Cash500 = ?, Cash100 = ?, Cash50 = ?, Cash20 = ?, 
        Cash10 = ?, Cash5 = ?, TotalCash = ?, CollectionAmt = ?, SalasarFixedAmt = ?, BankCharge = ?, SalasarCharge = ?, 
        SalasarExtra = ?, BankDeposit = ?, CustDeposit = ? 
        WHERE TransferID = ?`;

    const values = [
        transferData.TransactionNo,
        transferData.portalId,
        transferData.ACNo,
        transferData.LastName || null,
        transferData.TransactionType,
        transferData.Type || null,
        transferData.FirstName,
        transferData.ContactNo,
        transferData.IFSCNo || null,
        transferData.HighlightEntry || 0,
        transferData.Cash2000 || 0,
        transferData.Cash500 || 0,
        transferData.Cash100 || 0,
        transferData.Cash50 || 0,
        transferData.Cash20 || 0,
        transferData.Cash10 || 0,
        transferData.Cash5 || 0,
        transferData.TotalCash || 0.00,
        transferData.CollectionAmt || 0.00,
        transferData.SalasarFixedAmt || 0.00,
        transferData.BankCharge || 0.00,
        transferData.SalasarCharge || 0.00,
        transferData.SalasarExtra || 0.00,
        transferData.BankDeposit || 0.00,
        transferData.CustDeposit || 0.00,
        transferId
    ];

    return new Promise((resolve, reject) => {
        dbconnection.query(query, values, (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Delete a money transfer by ID
const deleteMoneyTransfer = async (transferId) => {
    const query = 'DELETE FROM moneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve({ affectedRows: results.affectedRows });
        });
    });
};

// Get a money transfer by ID
const getMoneyTransferById = async (transferId) => {
    const query = 'SELECT * FROM moneytransfer WHERE TransferID = ?';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, [transferId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

// Get all money transfers
const getAllMoneyTransfers = async () => {
    const query = 'SELECT * FROM moneytransfer';

    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    addMoneyTransfer,
    updateMoneyTransfer,
    deleteMoneyTransfer,
    getMoneyTransferById,
    getAllMoneyTransfers
};
