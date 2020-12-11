import React, {useState, useEffect} from "react"
import hexToAscii from "../helpers/hexToAscii"
import {Link} from "react-router-dom"
const vkRegex = /[a-z0-9]{285}/i
import ZcashLight from "../helpers/light-zcash-helpers"
import styles from './Home.css';

type Props = {
    threads: object[],
  };

export default function ThreadList(props: Props) {
    console.log(props.threads)
    const [transactions, setTransactions] = useState([])
    const [exportedKey, setExportedKey] = useState({zaddr: "", viewKey: ""})
    const [importing, setImporting] = useState(false)
    const [viewKey, setViewKey] = useState("")
    const [importedKey, setImportedKey] = useState({
        viewKey: "",
        birthday: 0
    })
    const [success, setSuccess] = useState(0)

    const fetchTransactions = _ => {
        ZcashLight.listTransactions(setTransactions)
    }

    const handleChange = e => setImportedKey({...importedKey, [e.target.name] : e.target.value})

    const importViewKey = _ => {
        ZcashLight.importViewKey(viewKey, success, birthday)

    }

    useEffect(() => {
        fetchTransactions()
    }, [])
    

    return (
        <div className="thread-list">
            <h1>All Threads</h1>
            <button onClick={_ => setImporting(!importing)}>{!importing? "Import View Key" : "Close"}</button>

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
                <div className="form-pair">
                    <label>Birthday (optional)</label><br/>
                    <input
                        name="birthday"
                        value={importedKey.birthday}
                        onChange={handleChange} /><br/>
                    
            <button onClick={importViewKey}>Begin View Key Import</button>
                </div>
            </form>
            </>
            
        
            : null}

            {!props.threads.length 
            ? <h1>Loading ...</h1>
            : props.threads.map(thread => 
                <>
                <Link to={`/${thread}`}>
                    <div key={thread} className="thread">
                        <h3>{thread}</h3>
                        {transactions.length ? <h4>{transactions.filter(transaction => transaction.address === thread && transaction.memo).length} Posts</h4> : null}
                        
                    </div>
                </Link>
                {exportedKey.zaddr === thread && exportedKey.viewKey
                            ? <p className={styles.viewkey}>{exportedKey.viewKey}</p>
                            :  <button onClick={() => {setExportedKey({zaddr: thread, viewKey: ""}); ZcashLight.getViewKey(thread, setExportedKey)}}>{thread === exportedKey.zaddr && !exportedKey.viewKey ? "Loading view key..." : "Export View Key"}</button>}
               
                </>
            )}
        </div>
    )

}