const axios = require("axios")
const secrets = require("../secrets/secrets")
const rpcCreds = secrets.ZCASH_RPC_CREDS;
const {DIRECTORY_ZADDR} = secrets
// const rpcCreds = 'yourrpcusername:yourrpcpassword';
const hash = Buffer.from(rpcCreds).toString('base64')
// const {getPriceMessage} = require("./exchanges")

// TODO: Import View Key
// TODO: Remove Address/View Key (if possible)

async function importViewKey(viewKey) {
    try {
        const creds = 'Basic ' + hash.trim();

        r = await axios({
            method: 'post',
            // url: "http://localhost:8232",
            url: "http://localhost:18232",
            headers: {
                "Authorization": creds, 
                'content-type': "application/json"
            }, 
            data: {
                "jsonrpc": "1.0",
                "id":"curltest", 
                "method": "z_importviewingkey",
                "params": [viewKey, "whenkeyisnew", 1000000]
            }
        })

        return r.data.result
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}

async function getViewKey(zaddr) {
    try {
        const creds = 'Basic ' + hash.trim();

        r = await axios({
            method: 'post',
            // url: "http://localhost:8232",
            url: "http://localhost:18232",
            headers: {
                "Authorization": creds, 
                'content-type': "application/json"
            }, 
            data: {
                "jsonrpc": "1.0",
                "id":"curltest", 
                "method": "z_exportviewingkey",
                "params": [zaddr]
            }
        })

        return r.data.result
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}

async function getNewZaddr() {
    try {
        const creds = 'Basic ' + hash.trim();

        r = await axios({
            method: 'post',
            // url: "http://localhost:8232",
            url: "http://localhost:18232",
            headers: {
                "Authorization": creds, 
                'content-type': "application/json"
            }, 
            data: {
                "jsonrpc": "1.0",
                "id":"curltest", 
                "method": "z_getnewaddress"
            }
        })

        return r.data.result
    } catch (err) {
        console.log(err)
    }
}


function isValidViewKey(key) {
    const vkRegex = /[a-zA-Z0-9]{285}/
    return vkRegex.test(key) && key.includes("view")
}


async function getTransactions(zaddr) {
    try {
    let transactions = []
    const creds = 'Basic ' + hash.trim();

    r = await axios({
        method: 'post',
        // url: "http://localhost:8232",
        url: "http://localhost:18232",
        headers: {
            "Authorization": creds, 
            'content-type': "application/json"
        }, 
        data: {
            "jsonrpc": "1.0",
            "id":"curltest", 
            "method": "z_listreceivedbyaddress", 
            "params": [zaddr] 
        }
    })

    transactions = r.data.result

    return transactions.map(transaction => { return {...transaction, currency: "ZEC" } } ).filter(tx => !tx.change)
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}


async function fetchThreads() {
    try {
    let transactions = []
    const creds = 'Basic ' + hash.trim();

    r = await axios({
        method: 'post',
        // url: "http://localhost:8232",
        url: "http://localhost:18232",
        headers: {
            "Authorization": creds, 
            'content-type': "application/json"
        }, 
        data: {
            "jsonrpc": "1.0",
            "id":"curltest", 
            "method": "z_listreceivedbyaddress", 
            "params": [DIRECTORY_ZADDR] 
        }
    })

    transactions = r.data.result

    return transactions.map(transaction => { return {...transaction, currency: "ZEC" } } ).filter(tx => !tx.change)
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}

async function getZcashPriceUSD() {
    try {
    const r = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=zcash%2Cycash&vs_currencies=usd")
    return r.data.zcash.usd
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}



async function sendZcash(zaddr, amount) {

    let r;
    let memo; 
    // let memo = "00"

    amount = +amount.toFixed(8)
    
    try {
        let transactions = []
        const creds = 'Basic ' + hash.trim();
        r = await axios({
            method: 'post',
            // url: "http://localhost:8232",
            url: "http://localhost:18232",
            headers: {
                "Authorization": creds, 
                'content-type': "application/json"
            }, 
            data: {
                "jsonrpc": "1.0",
                "id":"curltest", 
                "method": "z_sendmany", 
                "params": ["ztestsapling16hflfkd0q76t5kt77gala06k9st85ctsrw904q5mmhuw2j3nzal2p48muzad9t7xq6lz7g9qpy6", [{"address": zaddr ,"amount": amount, "memo": memo}]] 
            }
        })
    
    return r
    } catch (err) {
        console.log(err)
        console.log(err.response.data.error)
    }
}

module.exports = {
    fetchThreads,
    sendZcash,
    getZcashPriceUSD,
    getNewZaddr,
    getViewKey
};