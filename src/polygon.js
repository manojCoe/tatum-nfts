require("dotenv").config();
const fs = require("fs");
const axios = require("axios");

class Polygon {
    constructor(url, params) {
        this.url = url;
        this.params = params;
    }

    /**
    * Generate Polygon wallet.
    * @return {Object}  JSON object with mnemonic and xpub.
    */
    generateWallet = async () => {
        const balanceUrl = `${this.url}/wallet`;
        let filename = "data/custodial/wallet1.json";
        axios.get(balanceUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            console.log(JSON.stringify(res.data, null, 4));
            return JSON.stringify(res.data, null, 4);
        })
    }

    getPendingTransaction = async (signatureId) => {
        // const payload = { "signatures": signatureId };
        const txUrl = `https://api-eu1.tatum.io/v3/kms/${signatureId}`;
        let filename = "data/pendingTransaction.json";
        axios.get(txUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            console.log(JSON.stringify(res.data, null, 4));
        })
    }


    /**
    * Generate Polygon walletAddress.
    * @param {string} xpub - Extended public key of wallet.
    * @param {number} index - Derivation index of desired address to be generated.
    * @return {void} Nothing.
    */
    generateWalletAddress = async (xpub, index) => {
        const walletUrl = `${this.url}/address/${xpub}/${index}`;
        let filename = "data/custodial/walletAddress.json";
        axios.get(walletUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            console.log(JSON.stringify(res.data, null, 4));
        })
    }

    /**
    * Generate Polygon Wallet ptivatekey.
    * @param {Object} payload - payLoad containing index and mnemonic.
    * @return {void} Nothing.
    */
    geneartePrivateKey = async (payload) => {
        const walletUrl = `${this.url}/wallet/priv`;
        let filename = "data/custodial/walletKey.json";
        axios.post(walletUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            console.log(JSON.stringify(res.data, null, 4));
        })
    }

    getTransaction = async (txId) => {
        const txUrl = `${this.url}/transaction/${txId}`;
        let filename = "data/tx.json";
        axios.get(txUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            // console.log(JSON.stringify(res.data, null, 4));
        })
    }

    getTransactionsByAddress = async (address) => {
        const txUrl = `${this.url}/account/transaction/${address}?pageSize=20`;
        let filename = "data/txByAddress.json";
        axios.get(txUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            // console.log(JSON.stringify(res.data, null, 4));
        })
    }

    sendMatic = async (payload) => {
        const transactionUrl = `${this.url}/transaction`;
        let filename = "data/transaction.json";
        axios.post(transactionUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
        }).catch(err => {
            console.error(err);
        })
    }

    /**
    * Get Polygon Transaction Fee.
    * @param {object} payload - payLoad containing from, to, amount and data.
    * @return {void} Nothing.
    */
    getTransactionFee = async (payload) => {
        console.log("🚀 ~ file: index.js ~ line 102 ~ Polygon ~ getTransactionFee= ~ payload", typeof payload)

        const txFeeUrl = `${this.url}/gas`;
        let filename = "data/txFeeEstimation.json";
        axios.post(txFeeUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`)
            })
            // console.log(JSON.stringify(res.data, null, 4));
        })
    }

}

exports.Polygon = Polygon;

