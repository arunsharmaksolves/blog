
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'blog',
  password: process.env.PG_PASSWORD || 'Arun@1234',
  port: process.env.PG_PORT || 5432,
});

module.exports = pool;
