const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log('Database connected');
  
}).catch((err)=>{
  console.log('Error connecting with database',err);
  
})

module.exports = connection