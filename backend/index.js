const express = require("express")
const app = express();
const routes = require("./Routes/routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const database = require("./Config/database")
const port = process.env.PORT;
require("dotenv").config();

database.connecDb()

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(routes)


app.get("/",(req,res)=>{
    res.send(`<h1>Hello from management </h1>`)
})

app.listen(port,()=>{
    console.log("App is running")
})