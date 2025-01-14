const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://admin:admin@cluster0.0caje.mongodb.net/crypto").then(()=>{
  console.log('Database connected');
  
}).catch((err)=>{
  console.log('Error connecting with database',err);
  
})

module.exports = connection