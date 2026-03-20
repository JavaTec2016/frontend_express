const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"dominik",
    password:"santiago",
    database:"BD_Express_2026",
    dateStrings: true,
});

conexion.connect((err)=>{
    if(err) throw err;
    console.log("ola miscle");
})

module.exports = conexion;