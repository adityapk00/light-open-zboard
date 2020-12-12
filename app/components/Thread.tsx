import React, {useState, useEffect} from "react"
const vkRegex = /[a-z0-9]{285}/i
import ZcashLight from "../helpers/light-zcash-helpers"
import styles from './Home.css';
import {Link} from "react-router-dom"
import ThreadReplyForm from "./ThreadReplyForm"
import getColorFromAmount from "../helpers/getColorFromAmount"
import invertColor from "../helpers/invertColor"

type Props = {
    posts: object[],
    match: object,
};

  

export default function Thread(props: Props) {
    const [posts, setPosts] = useState(null)
    const [technicolor, setTechnicolor] = useState(false)
    const [threshold, setThreshold] = useState(0)

    useEffect(() => {
        ZcashLight.listReceivedByAddress(props.match.params.id, setPosts)
    },[])

    const handleChange = e => setThreshold(e.target.value)
    const formatzat = value => value + ' zat'
    


    return (
        <div className="thread">
            <div style={{display:'flex', width: "95%", justifyContent: "space-between"}}>
                <Link to="/"><h1 className={styles.homeLink}>{"<"} Back</h1></Link>
                <label style={{textAlign: 'center'}}>Filter By Minimum Amount
                <div style={{margin: '1% auto', width: "330px", display: 'flex', alignItems: 'center'}}>
                    <label style={{margin: '3px'}}>0 ZEC</label>
                    <input style={{width: "200px" }} type="range" min="1" max="10000000" value={threshold} onChange={handleChange} />
                    <label style={{margin: '3px'}}>1 ZEC</label>
                </div>
                </label>
                <button onClick={_ => setTechnicolor(!technicolor)} style={{width: "150px", height: "35px"}}>{technicolor ? "Business Mode" : "Technicolor Payments"}</button>
            </div>
            <ThreadReplyForm posts={posts} setPosts={setPosts} thread={props.match.params.id} />
            <p className={styles.viewkey}>{props.match.params.id}</p>
            {posts
            ? posts.map(post => 
                post.memo && post.amount >= threshold ? 
                <div style={technicolor ? {color: `#${getColorFromAmount(post.amount)}`, background: `${invertColor(getColorFromAmount(post.amount))}` } : {}} key={post.memo + post.txid} className={styles.post}>
                    <p>{post.memo.split("\\n").join("\n")}</p>
                    <p className={styles.amount}>{post.amount} Zats</p>
                </div>
                : null )
            : <h1>Loading...</h1> }
            {posts && !posts.length ? <h1>No posts found for {props.match.params.id}</h1> : null}
        </div>
    )

}