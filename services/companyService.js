const db = require('../config/database');

const createCompanyWithModules = async (company) => {
    const { companyName, email, phone, companyType, moduleIds } = company;

    // Step 1: Insert company
    const companyQuery = `
        INSERT INTO companies (company_name, email, phone, company_type)
        VALUES (?, ?, ?, ?)`;

    const companyId = await new Promise((resolve, reject) => {
        db.query(companyQuery, [companyName, email, phone, companyType], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });

    // Step 2: Insert company modules (if any)
    if (Array.isArray(moduleIds) && moduleIds.length > 0) {
        const moduleValues = moduleIds.map(moduleId => [companyId, moduleId]);
        const moduleQuery = `
            INSERT INTO company_modules (company_id, module_id)
            VALUES ?`;

        await new Promise((resolve, reject) => {
            db.query(moduleQuery, [moduleValues], (error) => {
                if (error) return reject(error);
                resolve();
            });
        });
    }

    return companyId;
};

module.exports = {
    createCompanyWithModules,
};
