const express = require("express")
const cron = require("node-cron")
const app = express()
const cryptoModel = require("./models/index")
const cryptoRouter = require("./routes/index")
const dbConnection = require("./config/db")

const crypto = async function () {
  
 const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")

 if(!response.ok){ 
  console.log("error fetching data")
 }
 
 const data = await response.json();
 const filteredData = data.filter(item => ((item.id == 'bitcoin') || (item.id == 'matic-network') || (item.id == 'ethereum')))

 const finalData = filteredData.map(item=> ({
  name: item.name.toLowerCase(),
  price: item.current_price,
  market_cap: item.market_cap,
  price_change_24h: item.price_change_24h,
 }))

 cryptoModel.create(finalData).then((res)=>{
  console.log(res); 
 })
}

crypto()
cron.schedule("0 */2 * * *",crypto)

// routes
app.use("/",cryptoRouter)



app.listen(5000,async()=>{
  console.log('server is running...'); 
})