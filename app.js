const { AuthRoutes } = require('./src/routes');
const { sequelize } = require('./models');
require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const cors = require('cors');
app.use(cors());


// database connection
sequelize.authenticate().then(() => {
    console.log('Database connected');
    sequelize.sync();
}).catch((err) => {
    console.log('Error: ' + err);
});

app.use('/auth', AuthRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
