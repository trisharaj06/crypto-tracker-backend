const {Router} = require("express")
const cryptoModel = require("../models/index")
const cryptoRouter = Router()

cryptoRouter.get("/stats/:coin", async (req, res) => {
  try {
    const coin = req.params.coin.toLowerCase(); 
   
    if (!["bitcoin", "ethereum","matic-network"].includes(coin)) {
      return res.status(400).json({ message: "Invalid coin!" });
    }

    const data = await cryptoModel.findOne({ name: coin })
      .sort({ _id: -1 }) 
      .exec();

    if (!data) {
      return res.status(404).json({ message: `No data found for ${coin}` });
    }

    res.status(200).json({
      success: true,
      data:{
        price: data.price,
        marketCap: data.market_cap,
        price24hChange: data.price_change_24h
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



cryptoRouter.get("/deviation/:coin", async (req, res) => {
  try {
    const coin = req.params.coin.toLowerCase();

    // Fetch the last 100 records for the given coin
    const records = await cryptoModel
      .find({ name: coin })
      .sort({ _id: -1 }) 
      .limit(100); 

    if (records.length === 0) {
      return res.status(404).json({ message: "No records found for this coin" });
    }

    const prices = records.map(record => record.price);

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

    const standardDeviation = Math.sqrt(variance);

    res.json({
      standardDeviation: standardDeviation.toFixed(2),
      totalRecords: records.length // To confirm how many records were used
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


module.exports = cryptoRouter