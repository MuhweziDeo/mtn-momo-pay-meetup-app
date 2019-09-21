const express = require("express");
const momo = require("mtn-momo");
require("dotenv").config();

const {Collections, Disbursements} = momo.create({
    callbackHost: "example.com"
});

//collections are for receiving/viewing payments
const collections = Collections({
    userSecret: process.env.UserSecret,
    userId: process.env.UserId,
    primaryKey: process.env.PrimaryKey
});

const app = express();

app.use(express.json());

app.get('/pay', (req, res) => {
    return collections.requestToPay({
        amount: 4000,
        currency: "EUR",
        externalId: "1sssa",
        payer: {
            partyId: "242242",
            partyIdType: "msisdn"
        },
    })
        .then(id => collections.getTransaction(id))
        .then(t => res.json(t));
});
app.listen(4000, () => {
   console.log('running');
});
