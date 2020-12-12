import React, {useState, useEffect} from "react"
import hexToAscii from "../helpers/hexToAscii"
import {Link} from "react-router-dom"
const vkRegex = /[a-z0-9]{285}/i
import ZcashLight, { prodResourcesPath } from "../helpers/light-zcash-helpers"
import styles from './Home.css';

type Props = {
    threads: object[],
  };

export default function ThreadList(props: Props) {
    const [transactions, setTransactions] = useState([])
    const [exportedKey, setExportedKey] = useState({zaddr: "", viewKey: ""})
    const [importing, setImporting] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [importedKey, setImportedKey] = useState({
        viewKey: "",
        birthday: ""
    })
    const [success, setSuccess] = useState(0)

    const fetchTransactions = _ => {
        ZcashLight.listTransactions(setTransactions)
    }
    const newThread = _ => {
        ZcashLight.listZaddrsWithNewZ(props.setThreads)
    }

    const handleChange = e => setImportedKey({...importedKey, [e.target.name] : e.target.value})

    const importViewKey = e => {
        e.preventDefault()
        ZcashLight.importViewKey(importedKey.viewKey, success, setSuccess, importedKey.birthday)
        setShowMessage(true)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])
    

    return (
        <div className="thread-list">
            <h1>All Threads</h1>
            <button onClick={newThread}>Create New Zaddr/Thread</button>
            <button onClick={_ => setImporting(!importing)}>{!importing? "Import View Key" : "Close Import Form"}</button>
            <button onClick={_ => ZcashLight.rescan()}>Rescan Wallet</button>
            {importing ? 
            <>
            <form className={styles.importForm} onSubmit={importViewKey}>
                <div className={styles.vkInput}>
                    <label>View Key</label><br/>
                    <textarea 
                        name="viewKey"
                        value={importedKey.viewKey}
                        onChange={handleChange} />
                </div>
                <div className={styles.birthday}>
                    <label>Wallet Birthday (optional, doesn't seem to work in zecwallet-cli right now. Expect a long import/rescan.)</label><br/>
                    <input
                        name="birthday"
                        value={importedKey.birthday}
                        onChange={handleChange} /><br/>
                    
            <button onClick={importViewKey}>Begin View Key Import</button>
                </div>
            </form>
            {showMessage ? <p>Vk import has begun. When it's done, you can refresh this page and you'll see the new thread/address.</p> : null}
            </>
            
        
            : null}


            {!props.threads.length 
            ? <h3>{ZcashLight.prodResourcesPath()}</h3>
            : props.threads.map((thread, index) => 
                <div className={styles.thread}>
                {index > 0 && <hr />}
                <Link to={`/${thread}`}>
                    <div key={thread} className="thread">
                        <h3 className={styles.threadLink}>{thread} ></h3>
                        {transactions.length ? <h4>{transactions.filter(transaction => transaction.address === thread && transaction.memo).length} Posts</h4> : null}
                        
                    </div>
                </Link>
                {exportedKey.zaddr === thread && exportedKey.viewKey
                            ? <p className={styles.viewkey}>{exportedKey.viewKey}</p>
                            :  <button onClick={() => {setExportedKey({zaddr: thread, viewKey: ""}); ZcashLight.getViewKey(thread, setExportedKey)}}>{thread === exportedKey.zaddr && !exportedKey.viewKey ? "Loading view key..." : "Export View Key"}</button>}
               
                </div>
            )}
        </div>
    )

}