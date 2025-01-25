// const mongoose = require("mongoose")
const mongoose = require("mongoose")

require("dotenv").config();

exports.connecDb = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Data base connected successfully"))
    .catch((error)=>{
        console.log("DB connection failed : ", error);
        process.exit(1);
    })
}