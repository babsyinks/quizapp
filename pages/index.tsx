import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
 
  return (
    <>
    <Head>
      <title>Quiz</title>
    </Head>
    
    <video className={styles.vid} muted  crossOrigin="anonymous" preload="auto" loop={true} autoPlay = {true} src="/quizvid.mp4">
    </video>
    <h1 className={styles.heading}>Its Time To Test Your Knowledge!</h1> 
      <div className= {styles.wrapper}>  
        <div className={styles.btnWrapper}>
          <Link href={{ pathname: '/quiz', query: { name: 'timed' } }}>
          <a className={styles.s}>
            <button className={styles.timed}>Start Timed Quiz <i className="fa-solid fa-stopwatch-20"></i></button> 
          </a>
          </Link> 
          <Link href={{ pathname: '/quiz', query: { name: 'untimed' } }}>
            <a className={styles.s}>
              <button className={styles.untimed}>Start Untimed Quiz <i className ="fa-solid fa-clipboard-question"></i> </button>
            </a>
          </Link>
          
                  
        </div>
      </div> 
    </>
  )
}

export default Home
