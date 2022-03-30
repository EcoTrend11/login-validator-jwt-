const express=require("express")
const cookieParser=require("cookie-parser")
const router = require("./routes/router")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//setear motor de plantilla
app.set('view engine', 'ejs')

//seteamos carpeta public
app.use(express.static('public'))

app.use(cookieParser())
app.use('/', router)

//clear cache
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});
 
app.listen(3001, ()=>{
    console.log("escuchando en el puerto 3001")
})