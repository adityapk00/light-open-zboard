const {exec} = require("child_process")
const commandStartString = ["linux", "darwin"].includes(process.platform) ? "./" + process.resourcesPath : process.resourcesPath
const extension = ["linux", "darwin"].includes(process.platform) ? "./" : ".exe"
module.exports = {
    listZaddrs,
    listTransactions,
    listReceivedByAddress,
    send,
    importViewKey,
    getViewKey,
    listZaddrsWithNewZ,
    sync
}

function sync() {
    exec(commandStartString + `zecwallet-cli${extension} sync`, (err, stdout, stderr) => {
        
        if (err) {
            console.log(err, stderr)
            return
        }
        return
        
    })
}

function listZaddrsWithNewZ(setZaddrs) {
    exec(`${commandStartString}zecwallet-cli${extension} new z`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr)
            return
        }
        exec(`${commandStartString}zecwallet-cli${extension} balance`, (err, stdout, stderr) => {
            if (err) {
                console.log(err, stderrr)
                return
            }
    
            let zaddrs = JSON.parse(stdout)["z_addresses"].map(item => item.address)
            setZaddrs(zaddrs)
            return zaddrs
        })
    })
}

function importViewKey(viewKey, success, setSuccess, birthday=1060000) {
    let viewKeyCommand = `${commandStartString}zecwallet-cli${extension} import "${viewKey.trim()}" ${birthday}`
    console.log(viewKeyCommand)
    exec(viewKeyCommand, (err, stdout, stderr) => {
        
        if (err) {
            console.log(err, stderr)
            return
        }
        console.log(stdout)
        setSuccess(success + 1)
        
    })
}

function listZaddrs(setZaddrs) {
    exec(`${commandStartString}zecwallet-cli${extension} balance`, (err, stdout, stderr) => {
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
    exec(`${commandStartString}zecwallet-cli${extension} list`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let transactions = JSON.parse(stdout)
        setTransactions(transactions)
        return transactions
    })
}

function listReceivedByAddress(zaddr, setPosts) {
    
    exec(`${commandStartString}zecwallet-cli${extension} list`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let transactions = JSON.parse(stdout)
        transactions = transactions.filter(item => item.address === zaddr).sort((a,b) => b.datetime - a.datetime)
        setPosts(transactions)
        return transactions
    })
}
function getViewKey(zaddr, setExportedKey) {
    exec(`${commandStartString}zecwallet-cli${extension} export ${zaddr}`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderrr)
            return
        }
        let keys = JSON.parse(stdout)[0]
        let viewKey = keys.viewing_key
        setExportedKey({zaddr, viewKey })
        return
    })


}

function send(zaddr, amount, memo, setSending) {
    exec(`${commandStartString}zecwallet-cli${extension} send ${zaddr} ${amount} ${JSON.stringify(memo)}`, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr)
            return
        }
        console.log(stdout)
        if (stdout.includes("txid")) {
            setSending(false)

        } else if (stdout.includes("Error: SendResponse")) {
            setSending(false)
            // set some kind of error message, encourage rescan
        }

    })
}

