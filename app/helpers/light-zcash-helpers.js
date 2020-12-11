const {exec} = require("child_process")

module.exports = {
    listZaddrs,
    listTransactions,
    listReceivedByAddress,
    send,
    importViewKey,
    getViewKey
}

function importViewKey(viewKey, setSuccess, birthday=1060000) {
    exec(`import ${viewKey} ${birthday}`, (err, stdout, stderr) => {
        
        if (err) {
            console.log(err, stderrr)
            return
        }
        console.log(stdout)
        
    })
}

function listZaddrs(setZaddrs) {
    exec(`zecwallet-cli balance`, (err, stdout, stderr) => {
        console.log("hi", JSON.parse(stdout)["z_addresses"])
        if (err) {
            console.log(err, stderrr)
            return
        }

        let zaddrs = JSON.parse(stdout)["z_addresses"].map(item => item.address)
        setZaddrs(zaddrs)
        return zaddrs
    })
}

function listTransactions(setTransactions) {
    exec(`zecwallet-cli list`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let transactions = JSON.parse(stdout)
        console.log(transactions)
        setTransactions(transactions)
        return transactions
    })
}

function listReceivedByAddress(zaddr, setPosts) {
    
    exec(`zecwallet-cli list`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let transactions = JSON.parse(stdout)
        transactions = transactions.filter(item => item.address === zaddr).sort((a,b) => b.datetime - a.datetime)
        console.log(transactions)
        setPosts(transactions)
        return transactions
    })
}
function getViewKey(zaddr, setExportedKey) {
    exec(`zecwallet-cli export ${zaddr}`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let keys = JSON.parse(stdout)[0]
        let viewKey = keys.viewing_key
        setExportedKey({zaddr, viewKey })
        return transactions
    })


}

function send(zaddr, amount, memo, setSending) {
    console.log(`zecwallet-cli send ${zaddr} ${amount} ${JSON.stringify(memo)}`)
    exec(`zecwallet-cli send ${zaddr} ${amount} ${JSON.stringify(memo)}`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr)
            return
        }
        console.log(stdout)
        if (stdout.includes("txid")) {
            setSending(false)

        }

    })
}

