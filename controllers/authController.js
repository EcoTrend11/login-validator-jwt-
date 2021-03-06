const bcryptjs =require("bcryptjs")
const database = require("../database/db")
const {promisify} = require("util")//para trabajar con promesas
const jwt = require("jsonwebtoken")
require('dotenv').config();
const {
    JWT_SECRETO, JWT_TIEMPO_EXPIRA, JWT_COOKIE_EXPIRES
  } = process.env;

exports.register = async (req, res )=>{
    try{
        const {name, user , pass} = req.body 
        if(!name || !user || !pass){
            res.render('register',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese todos los campos",
                alertIcon:'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            })
        }
        else{
            let passHash = await bcryptjs.hash(pass, 8)
            database.query("INSERT INTO user SET ?", { 
                name : name, 
                user : user,
                pass : passHash
            }, (error, result) =>{
                if(error){console.log(error)}
                res.redirect('/')
            })            
        }
    }
    catch(error){
        console.log(error)
    } 
}

exports.login = async (req, res)=>{
    try {
        const {user , pass} = req.body

        if(!user || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
                            //usamos la columa user de la tabla user
            database.query('SELECT * FROM user WHERE user = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesi??n OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexi??n exitosa",
                        alertMessage: "??LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1000,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async( req, res , next) =>{
    if(req.cookies.jwt){
        try{
            const  decodificada = await promisify(jwt.verify)(req.cookies.jwt, JWT_SECRETO)
            database.query("SELECT * FROM user WHERE id = ?", [decodificada.id],(error, results) =>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        }
        catch(error){
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie("jwt")
    return( res.redirect("/"))
}