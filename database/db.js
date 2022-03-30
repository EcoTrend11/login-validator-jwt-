const mysql = require("mysql2")
require('dotenv').config();
const {
    DB_HOST, DB_USER, DB_PASS,DB_DATABASE
  } = process.env;

const conexion = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASS,
    database : DB_DATABASE,
})

conexion.connect ( (error) =>{
    if(error){
        console.log("El error de conexion es : "+ error)
        return
    }
    console.log("conexion exitosa a la base de datos mysql")
})

module.exports = conexion