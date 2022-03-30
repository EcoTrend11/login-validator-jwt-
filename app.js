const express=require("express")
const dotenv= require("dotenv")
const cookieParser=require("cookie-parser")
const router = require("./routes/router")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//setear motor de plantilla
app.set('view engine', 'ejs')

//seteamos carpeta public
app.use(express.static('public'))

//poder enviar datos

dotenv.config({path: "./env/.env"})
app.use('/', router)


// app.use(cookieParser)


 
app.listen(3001, ()=>{
    console.log("escuchando en el puerto 3001")
})