const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    hostname: process.env.HOST,
    port: process.env.PORT,
};
