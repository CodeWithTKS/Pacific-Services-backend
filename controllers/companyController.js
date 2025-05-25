const companyService = require('../services/companyService');

exports.createCompany = async (req, res) => {
  const { companyName, email, phone, companyType, moduleIds } = req.body;

  if (!companyName || !email || !companyType) {
    return res.status(400).json({ message: 'Required fields are missing.' });
  }

  try {
    const companyId = await companyService.createCompanyWithModules({
      companyName,
      email,
      phone,
      companyType,
      moduleIds
    });

    res.status(201).json({ message: 'Company created successfully', companyId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
