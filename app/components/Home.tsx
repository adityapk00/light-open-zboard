import React, {useState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import routes from '../constants/routes.json';
import hexToAscii from "../helpers/hexToAscii"
import styles from './Home.css';
import ThreadList from "./ThreadList";
import Thread from "./Thread";
import ZcashLight from "../helpers/light-zcash-helpers"




export default function Home() {

  const [threads, setThreads] = useState([])
  const [sum, setSum] = useState(0)

  useEffect(() => {
    setInterval(ZcashLight.sync(), 120000)
    ZcashLight.listZaddrs(setThreads)
  },[])

  useEffect(() => {
  }, [threads])

  return (
    
    <div className={styles.container} data-tid="container">
      
      <Route exact path="/" render={ _ => <ThreadList threads={threads} setThreads={setThreads} /> } />
      <Route path="/:id" render={ props => <Thread {...props} threads={threads}  /> } />
    
    </div>
  );
}
