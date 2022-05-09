require("dotenv").config();
const fs = require("fs");
const axios = require("axios");

// const { Polygon } = require('./polygon');

class Account {
    constructor(url, params) {
        this.url = url;
        this.params = params;
    }

    getBalance = async (address) => {
        const balanceUrl = `${this.url}/account/balance/${address}`;
        let filename = "data/balance.json";
        axios.get(balanceUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            console.log(JSON.stringify(res.data, null, 4));
        })
    }

}

const params = {
    "headers": {
        'x-api-key': process.env.API_KEY,
        'content-type': "application/json",
    }
}

const polygonUrl = "https://api-eu1.tatum.io/v3/polygon";

accObj = new Account(polygonUrl, params);
accObj.getBalance("0x9923f239d4a037da546684e953882ba61601b782");

// exports.Account = Account;