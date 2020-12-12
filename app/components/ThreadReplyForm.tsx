import React, {useState, useEffect} from "react"
import ZcashLight, { send } from "../helpers/light-zcash-helpers"
import styles from './Home.css';
import {Link} from "react-router-dom"

type Props = {
    posts: object[],
    match: object,
    thread: string

  };



export default function Thread(props: Props) {
    const INITIAL_POST = {
        memo: "",
        amount: 0
    }
    const [post, setPost] = useState(INITIAL_POST)
    const handleChange = e => setPost({...post, [e.target.name]: e.target.value})
    const [sending, setSending] = useState(false)
    const [failed, setFailed] = useState(false)


    useEffect(() => {
        if (sending == false && post.memo) {
            props.setPosts([ {amount: post.amount, datetime: Date.now(), txid: "none yet", address: props.thread, memo: post.memo}, ...props.posts])
            setPost(INITIAL_POST)
        }
    }, [sending])

    const sendZec = e => {
        e.preventDefault()
        setSending(true)
        ZcashLight.send(props.thread, post.amount, post.memo, setSending)
        

    }

    return (
        <div className="form-container">
            <form className={styles.postForm}>
                <div className={styles.postInput}>
                <label>Make a new post:</label>
                    <textarea
                    name="memo"
                    value={post.memo}
                    onChange={handleChange} />
                </div>
                <div className={styles.amountInput}>
                <label>Zatoshis to send:</label>
                <input
                name="amount"
                value={post.amount}
                onChange={handleChange} />
                </div>
               <div class={styles.sendButton}>
                   <button onClick={sendZec}>{sending ? "Sending Transaction..." : "Post"}</button>
                   <p className={styles.amountInZec}>{(post.amount / 100000000).toFixed(8)} ZEC</p>
               </div>
            </form>
            {failed ? <p>Sending failed. Make sure you have confirmed balance. If you do, maybe do a rescan.</p> : null}
            
        </div>
    )

}