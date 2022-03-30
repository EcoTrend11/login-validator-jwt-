const bcryptjs =require("bcryptjs")
const database = require("../database/db")
const {promisify} = require("util")//para trabajar con promesas
const jwt = require("jsonwebtoken")

exports.register = async (req, res )=>{
    try{
        const {name, user , pass} = req.body 
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
    catch(error){
        console.log(error)
    } 
}

exports.login = async ( req, res) =>{
    try{
        const { user, pass} = req.body
        console.log(user , pass)

    }
    catch(error){
        console.log(error)
    }
}


