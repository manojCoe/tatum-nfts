require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const { Polygon } = require('./polygon');

let response;

const getPromisData = function (res) {
    let promiseData = res.data;
    console.log("meta: ", promiseData);
    return promiseData;
}

class ERC721 extends Polygon {
    constructor(url, params) {
        super(url, params);
    }

    getTokenMetadata = async (contractAddress, tokenId) => {
        let metadataUrl = `${this.url}/metadata/MATIC/${contractAddress}/${tokenId}`;
        let filename = "data/ERC721/output/tokenMetadata.json";
        // .then((res) => { return res });
        // .then(res => console.log(res.data))
        // .then(res => { return res });
        const res = await axios.get(metadataUrl, this.params);
        // return res.data;
        var promise1 = new Promise(function (resolve, reject) {
            resolve(res.data);
        });
        // // let tokenData = "";
        // // promise1.then(function (value) {
        // //     tokenData = value;
        // // })
        return promise1;
    }

    getTkData = async (contractAddress, tokenId, params_) => {
        console.log("🚀 ~ file: erc721.js ~ line 17 ~ ERC721 ~ constructor ~ params", this.params)
        let metadataUrl = `${this.url}/metadata/MATIC/${contractAddress}/${tokenId}`;
        return new Promise(function (resolve, reject) {
            // const res = await axios.get(metadataUrl, this.params);
            // resolve(res.data);

            axios.get(metadataUrl, params_).then(res => {
                resolve(res.data);
            })
        })
    }

    deploySmartContract = async (payload) => {
        let mintUrl = `${this.url}/deploy`;
        let filename = "data/ERC721/output/sm_deploy.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    getContractAddress = async (txId) => {
        let metadataUrl = `https://api-eu1.tatum.io/v3/blockchain/sc/address/MATIC/${txId}`;
        let filename = "data/ERC721/output/contractAddress.json";
        axios.get(metadataUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        });
    }

    mintERC721Token = async (payload) => {
        let mintUrl = `${this.url}/mint/`;
        let filename = "data/ERC721/output/mint.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    mintBatchERC721Tokens = async (payload) => {
        let mintUrl = `${this.url}/mint/batch`;
        let filename = "data/ERC721/output/batchMint.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    transferERC721Token = async (payload) => {
        let mintUrl = `${this.url}/transaction`;
        let filename = "data/ERC721/output/transferNFT.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    burnERC721Token = async (payload) => {
        let mintUrl = `${this.url}/burn`;
        let filename = "data/ERC721/output/burnNFT.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    getTokenCollection = async (contractAddress) => {
        let metadataUrl = `${this.url}/collection/MATIC/${contractAddress}?pageSize=10&offset=0`;
        let filename = "data/ERC721/output/tokenCollection.json";
        axios.get(metadataUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        });

    }

    getRoyaltyInfo = async (contractAddress, tokenId) => {
        let metadataUrl = `${this.url}/royalty/MATIC/${contractAddress}/${tokenId}`;
        let filename = "data/ERC721/output/tokenRoyaltyInfo.json";
        axios.get(metadataUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        });

    }

    addNftMinter = async (payload) => {
        let mintUrl = `${this.url}/mint/add`;
        let filename = "data/ERC721/output/addNftMinter.json";
        axios.post(mintUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

    getProvenanceData = async (contractAddress, tokenId) => {
        let metadataUrl = `${this.url}/provenance/MATIC/${contractAddress}/${tokenId}`;
        let filename = "data/ERC721/output/provenanceData.json";
        axios.get(metadataUrl, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        });
    }

    updateRoyaltyInfo = async (payload) => {
        let royaltyUrl = `${this.url}/royalty`;
        let filename = "data/ERC721/output/royaltyUpdated.json";
        axios.put(royaltyUrl, payload, this.params).then(res => {
            fs.writeFile(filename, JSON.stringify(res.data, null, 4), err => {
                if (err) throw err;
                console.log(`${filename} has been created.`);
            })
        })
    }

}

const params = {
    "headers": {
        // "x-api-key": process.env.API_KEY,
        'content-type': "application/json",
        // "x-testnet-type": "polygon-mumbai"
    }
}

const nftUrl = "https://api-us-west1.tatum.io/v3/nft";
const polygonUrl = "https://api-us-west1.tatum.io/v3/polygon";
nftObj = new ERC721(nftUrl, params);
// polObj = new Polygon(polygonUrl, params);
// const trData = polObj.getTransaction("0x4018730444951018377054f4a049055a4e164d378b0075498a9154e7fbd591b9");
// console.log("🚀 ~ file: erc721.js ~ line 187 ~ trData", trData)

main = async () => {
    const nftUrl = "https://api-us-west1.tatum.io/v3/nft";
    nftObj = new ERC721(nftUrl, params);
    const metadata = await nftObj.getTkData("0x5bbd9cacdf87f295ecbdd8d958a5671730de968d", "11012", params);
    console.log("metadata: ", metadata);
    response = {
        'statusCode': 200,
        // 'trData': trData,
        'body': metadata
    }

    // const trData = polygonClass.Polygon.getTransaction("0xe38f05caedad3d58136885497c383bf4d40eb01eaeb79005f4a67cd8e0dc921c");
    // console.log("trData: ", trData);

    //     // ===========metaData========================

    //     // const metadata = nftObj.getTokenMetadata("0x2469bc764bFdC7DF5d2803F27045Dc6f85873E35", "1");
    //     // metadata.then(res => console.log(res));

    //     // const metadata = nftObj.getTokenMetadata("0x2469bc764bFdC7DF5d2803F27045Dc6f85873E35", "1")
    //     // metadata.then(res => {
    //     //     response = {
    //     //         'statusCode': 200,
    //     //         'body': res.data
    //     //     }
    //     //     // console.log("metadata: ", response);

    //     //     // var promise1 = new Promise(function (resolve, reject) {
    //     //     //     resolve(res.data);
    //     //     // });
    //     //     // let tokenData = "";
    //     //     // promise1.then(function (value) {
    //     //     //     tokenData = value;
    //     //     // })
    //     //     // return promise1;

    //     //     var promise1 = new Promise(function (resolve, reject) {
    //     //         resolve(JSON.stringify(response));
    //     //     });
    //     // return promise1;
    //     // });



    //     var responsePromise;
    //     const tokenPromise = nftObj.getTokenMetadata("0x2469bc764bFdC7DF5d2803F27045Dc6f85873E35", "1");
    //     tokenPromise.then(function (value) {
    //         tokenMeta = value;
    //         // console.log("repsonse: ", tokenMeta)
    //         response = {
    //             'statusCode': 200,
    //             'body': tokenMeta
    //         }
    //         console.log("repsonse1: ", response)
    //     }).catch(err => {
    //         console.error(err);
    //     })
    //     // console.log("repsonse2: ", response)
    //     return response;
}


var y = main();
console.log("response: ", y);

// y.then(res => console.log(res));
// nftObj.getTokenCollection("0x5bbd9cacdf87f295ecbdd8d958a5671730de968d");
// nftObj.getContractAddress("0x9bc6d34350ab0a4548e634aff94cdd5b8d49d8de83f45d39b27d93df514e0280");
// nftObj.getProvenanceData("0xf3Ff21b1F1234d6ED43eb01d21838f3227F0d542", "4");
// nftObj.getRoyaltyInfo("0x5bbd9cacdf87f295ecbdd8d958a5671730de968d", "11012");

// =============smartContract=================

// fs.readFile("data/ERC721/input/smartContractPayload.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var mintData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ mintData", mintData);
//     nftObj.deploySmartContract(JSON.stringify(mintData, null, 4));

// })

// ================mint=======================

// fs.readFile("data/ERC721/input/mintPayload.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var mintData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ mintData", mintData);
//     nftObj.mintERC721Token(JSON.stringify(mintData, null, 4));

// })

// fs.readFile("data/ERC721/input/test.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var mintData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ mintData", mintData);
//     nftObj.mintBatchERC721Tokens(JSON.stringify(mintData, null, 4));

// })

// ==============burn========================
// fs.readFile("data/ERC721/input/burnPayload.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var mintData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ mintData", mintData);
//     nftObj.burnERC721Token(JSON.stringify(mintData, null, 4));

// })

// ============transfer======================
// fs.readFile("data/ERC721/input/transferPayload.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var mintData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ mintData", mintData);
//     nftObj.transferERC721Token(JSON.stringify(mintData, null, 4));

// })

// ============Royalty========================
// fs.readFile("data/ERC721/input/updateRoyaltyPayload.json", 'utf-8', function (err, data) {
//     if (err) throw err;
//     var royaltyData = JSON.parse(data);
//     // console.log("🚀 ~ file: erc721.js ~ line 52 ~ royaltyData", royaltyData);
//     nftObj.updateRoyaltyInfo(JSON.stringify(royaltyData, null, 4));

// })