// const express = require("express");
import express from 'express'
import axios from 'axios'
const app = express();

app.use(express.json());

var mySet = new Set();
var arr = [];
var prev = [];
var windowSize = 10;

app.get('/numbers/:numberId', async(req , res) => {
    const mp = {
        "e" : "even",
        "p" : "primes",
        "f" : "fibo",
        "r" : "rand"
    }
    // const response = await axios.post(`http://20.244.56.144/test/${mp[req.params["numberId"]]}`);
    const response = await fetch(`http://20.244.56.144/test/${mp[req.params["numberId"]]}`);
    prev = arr;
    // console.log("response : ", response);
    arr = [...arr, ...response];

    if(arr.length > windowSize){
        var start = arr.length - windowSize;
        var end  = arr.length - 1;
        arr = arr.slice(start, end);
    }
    arr.forEach( (el) => {
        mySet.add(el);
    });
    arr = [];
    arr = Array.from(mySet);
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / arr.length;

    return res.status(200).json(
        {
            "numbers" : response,
            "windowPrevState" : prev,
            "windoCurrState" : arr,
            "avg" : average,
        }
    )
});

const port = 9876;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});