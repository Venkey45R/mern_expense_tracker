// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { TransactionModel} = require('./model/model');
require('dotenv').config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/expense_tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = 3001;

app.post('/form', (req, res) => {
    TransactionModel.create(req.body)
        .then(transaction => {
            res.json("success");
        })
        .catch(err => res.json(err));
});

app.post('/form', (req, res)=>{
    const {email} = req.body;
    TransactionModel.findOne({email})
    .then(data => {
        res.json(data);
    })
});

app.post('/form', (req, res)=>{
    const {id} = req.body;
    TransactionModel.deleteOne(req.body)
    .then(
        res.json("deleted succesfully")
    )
})

app.post('/form', (req, res)=>{
    TransactionModel.aggregate([{
        $lookup:{
            from: "categories",
            localField: "type",
            foreignField: "type",
            as: "categories_info",
        }
    },
    {
        $unwind: "$categories_info"
    }
]).then(result =>{
    let data = result.map(v => Object.assign({},{_id: v._id, name: v.name, type: v.type, amount: v.amount}))
    res.json(data);
})
})

app.get('/transactions', (req, res) => {
    TransactionModel.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err));
});


app.delete('/form/:id', (req, res) => {
    const { id } = req.params;
    TransactionModel.findByIdAndDelete(id)
        .then(() => res.json({ message: "Transaction deleted successfully" }))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/form', (req, res) => {
    TransactionModel.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
