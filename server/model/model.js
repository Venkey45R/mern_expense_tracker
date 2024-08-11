// model.js
const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    type: {type: String, required: true},
    date: { type: Date, default: Date.now }
});

const TransactionModel = mongoose.model("transactions", TransactionsSchema);

module.exports = { TransactionModel};
