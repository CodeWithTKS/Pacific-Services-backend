const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const commissionRoutes = require('./routes/commissionRoutes');
const moneyTransferRoutes = require('./routes/moneyTransferRoutes');
const portalRoutes = require('./routes/portalRoutes');
const aepsRoutes = require('./routes/aepsmoneytransferRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const servicesRoutes = require('./routes/services.routes');
const salesRoutes = require('./routes/salesRoutes');
const cashbackRoutes = require("./routes/cashbackRoutes");
const mobileTransferRoutes = require("./routes/mobileTransferRoutes");
const fundTransferRoutes = require("./routes/fundTransferRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/commission', commissionRoutes);
app.use('/api/moneyTransfer', moneyTransferRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/aeps', aepsRoutes);
app.use('/api/user', vendorRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/sales', salesRoutes);
app.use("/api/cashback", cashbackRoutes);
app.use("/api/mobileTransfer", mobileTransferRoutes);
app.use("/api/fundTransfer", fundTransferRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
