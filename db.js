const {Pool} = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "vinu",
    post: 5432,
    database: "demodb"
});

//const { Pool } = require("pg");

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "taskdb",
//     password: "yourpassword",
//     port: 5432
// });

module.exports = pool;

pool.connect().then(() => console.log("Connected"));