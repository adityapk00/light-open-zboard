import React, {useState, useEffect} from "react"
const vkRegex = /[a-z0-9]{285}/i
import ZcashLight from "../helpers/light-zcash-helpers"
import styles from './Home.css';
import {Link} from "react-router-dom"
import ThreadReplyForm from "./ThreadReplyForm"

type Props = {
    posts: object[],
    match: object,

  };

export default function Thread(props: Props) {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        ZcashLight.listReceivedByAddress(props.match.params.id, setPosts)
    },[])


    return (
        <div className="thread">
            <Link to="/"><h1 className={styles.homeLink}>{"<"} Back</h1></Link>
            <ThreadReplyForm posts={posts} setPosts={setPosts} thread={props.match.params.id} />
            <p className={styles.viewkey}>{props.match.params.id}</p>
            {posts
            ? posts.map(post => 
                post.memo ? 
                <div key={post.memo + post.txid} className={styles.post}>
                    <p>{post.memo.split("\\n").join("\n")}</p>
                    <p className={styles.amount}>{post.amount}</p>
                </div>
                : null )
            : <h1>Loading...</h1> }
            {posts && !posts.length ? <h1>No posts found for {props.match.params.id}</h1> : null}
        </div>
    )

}