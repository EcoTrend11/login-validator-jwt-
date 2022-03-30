const express = require("express")
const router = express.Router()
const conexion = require('../database/db')
const authController =require("../controllers/authController")


//para vistas
router.get('/', (req,res) =>{
    res.render('index')
})
router.get('/login', ( req, res) =>{
    res.render('login')
})
router.get('/register', ( req, res) =>{
    res.render('register')
})


//para controladores
router.post("/register", authController.register)//tiene que estar igual que  en el form de ejs
router.post("/login" , authController.login)//tiene que estar igual que  en el form de ejs
module.exports = router