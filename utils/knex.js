const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const conn = knex({
    client: process.env.DB_TYPE || 'db_type',
    connection: {
        host: process.env.DB_HOST || "db_ip",
        user: process.env.DB_USER || "db_user",
        password: process.env.DB_PASS || "db_pass",
        database: process.env.DB_NAME || "db_name"
    },
    pool: {
        max: 7,
        min: 3,
    },
    acquireConnectionTimeout: 600 * 1000,
    useNullAsDefault: true
});

module.exports = conn;