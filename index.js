const express = require("express");
const momo = require("mtn-momo");

const {Collections, Disbursements} = momo.create({
    callbackHost: "example.com"
});
const app = express();

app.use(express.json());

app.listen(4000, () => {
   console.log('running');
});
