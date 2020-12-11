const axios = require("axios")
const secrets = require("../secrets/secrets")
const rpcCreds = secrets.ZCASH_RPC_CREDS;
const {DIRECTORY_ZADDR} = secrets
const hash = Buffer.from(rpcCreds).toString('base64')
const {getNewZaddr, getViewKey} = require("./zcash-helpers")

// Generate new address
// Get that address's view key
// Append New Memo (up to 227 chars) to view key

module.exports = async (title="Untitled") => {
    title = title.slice(0,225)
    // get new z
    const newAddress = await getNewZaddr();
    console.log(newAddress)
    const newViewKey = await getViewKey(newAddress);
    console.log(newViewKey)

    
}