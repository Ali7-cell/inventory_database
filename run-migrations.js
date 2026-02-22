#!/usr/bin/env node
/**
 * Run PostgreSQL migrations from database/migrations/*.sql in order.
 * Usage: node database/run-migrations.js
 * Requires: DATABASE_URL or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE
 */
const fs = require('fs');
const path = require('path');
const { pool } = require('./pool');

const migrationsDir = path.join(__dirname, 'migrations');

async function run() {
    const files = fs.readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort();

    for (const file of files) {
        const filepath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filepath, 'utf8');
        process.stdout.write(`Running ${file}... `);
        try {
            await pool.query(sql);
            console.log('OK');
        } catch (err) {
            console.error('FAILED:', err.message);
            process.exit(1);
        }
    }
    await pool.end();
    console.log('Migrations complete.');
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
