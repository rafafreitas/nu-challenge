const DB = process.env.NODE_ENV_DB_BASE;
const Store = new (require('data-store'))(DB, { cwd: './'});

module.exports = Store;
