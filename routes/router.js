const express = require("express")
const router = express.Router()
const authController =require("../controllers/authController")
//para vistas
router.get('/',authController.isAuthenticated,  (req,res) =>{
    res.render('index', {user:req.user})
})
router.get('/login', ( req, res) =>{
    res.render('login', {alert:false})
})
router.get('/register', ( req, res) =>{
    res.render('register', {alert:false})
})


//para controladores
router.post("/register",authController.register)//tiene que estar igual que  en el form de ejs
router.post("/login" , authController.login)//tiene que estar igual que  en el form de ejs
router.get("/logout" , authController.logout)
module.exports = router