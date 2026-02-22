/**
 * Database configuration for PostgreSQL.
 * Supports DATABASE_URL (full URI) or individual vars for cloud/local.
 */
const path = require('path');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../.env')
        : path.resolve(__dirname, '../inventory-backend/.env')
});

const getDatabaseUrl = () => {
    if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
    const host = process.env.PGHOST || 'localhost';
    const port = process.env.PGPORT || 5432;
    const user = process.env.PGUSER || 'postgres';
    const password = String(process.env.PGPASSWORD ?? '');
    const database = process.env.PGDATABASE || 'inventory';
    const enc = encodeURIComponent;
    return `postgresql://${enc(user)}:${enc(password)}@${host}:${port}/${enc(database)}`;
};

module.exports = {
    getDatabaseUrl,
    poolConfig: () => {
        const connectionString = getDatabaseUrl();
        return {
            connectionString,
            max: parseInt(process.env.PGPOOL_MAX, 10) || 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        };
    },
};
