/**
 * PostgreSQL connection pool and query helpers.
 * Single place for all DB access; supports parameterized queries ($1, $2, ...).
 */
const { Pool } = require('pg');
const { poolConfig } = require('./config');

const pool = new Pool(poolConfig());

/**
 * Run a query and return all rows.
 * @param {string} text - SQL with $1, $2 placeholders
 * @param {Array} params - Query parameters
 */
const query = (text, params = []) => pool.query(text, params);

/**
 * Return first row or undefined.
 */
const get = async (text, params = []) => {
    const { rows } = await pool.query(text, params);
    return rows[0];
};

/**
 * Return all rows.
 */
const all = async (text, params = []) => {
    const { rows } = await pool.query(text, params);
    return rows;
};

/**
 * Execute INSERT/UPDATE/DELETE; returns { id, rowCount }.
 * For INSERT with RETURNING id, id is the returned value; rowCount is from rowCount.
 */
const run = async (text, params = []) => {
    const result = await pool.query(text, params);
    const row = result.rows[0];
    const id = row && (row.id !== undefined) ? row.id : undefined;
    return { id, rowCount: result.rowCount };
};

/**
 * Acquire a client for transactions. Call client.release() when done.
 */
const getClient = () => pool.connect();

/**
 * Verify connectivity (for health checks and startup).
 */
const ping = async () => {
    const client = await pool.connect();
    try {
        await client.query('SELECT 1');
        return true;
    } finally {
        client.release();
    }
};

module.exports = {
    pool,
    query,
    get,
    all,
    run,
    getClient,
    ping,
};
