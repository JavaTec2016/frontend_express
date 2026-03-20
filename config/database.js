
const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    dateStrings: true,
});

conexion.connect((err)=>{
    if(err) throw err;
    console.log("ola miscle");
})

module.exports = conexion;