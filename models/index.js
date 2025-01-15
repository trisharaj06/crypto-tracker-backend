const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema

const cryptoSchema = new Schema({
  name: String,
  price: Number,
  market_cap: Number,
  price_change_24h: Number,
  timeStamp: { type: Date, default: Date.now }
})

const cryptoModel = mongoose.model('crypto',cryptoSchema)

module.exports = cryptoModel
