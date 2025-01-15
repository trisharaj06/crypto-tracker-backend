const {Router} = require("express")
const cryptoModel = require("../models/index")
const cryptoRouter = Router()

cryptoRouter.get("/stats/:coin", async (req, res) => {
  try {
    const coin = req.params.coin.toLowerCase(); 
   
    if (!["bitcoin", "ethereum","matic-network"].includes(coin)) {
      return res.status(400).json({ message: "Invalid coin!" });
    }

    const data = await cryptoModel.findOne({ name: { $regex: new RegExp(`^${coin}`, "i") } })
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

module.exports = cryptoRouter