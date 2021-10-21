import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import initToadzgotchi from './api/toadzgotchi'

export default function Home() {
    initToadzgotchi();
    return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a id="connectWeb3Button" className={styles.card}>
            <p>CONNECT METAMASK</p>
          </a>
          <p className={styles.toadtitle}> TOADZGOTCHI </p>
          <a id="feedButton" className={styles.card}>
            <p>FEED</p>
          </a>
          <a id="playButton" className={styles.card}>
            <p>PLAY</p>
          </a>
          <a id="sleepButton" className={styles.card}>
            <p>SLEEP</p>
          </a>
        </div>
        <div className={styles.grid}>
          <a id="hunger" className={styles.card}>
            <p>HUNGER</p>
            <progress id="hungerBar" value="50" max="100"></progress>
          </a>
          <a id="mood" className={styles.card}>
            <p>MOOD</p>
            <progress id="moodBar" value="50" max="100"></progress>
          </a>
          <a id="rest" className={styles.card}>
            <p>REST</p>
            <progress id="restBar" value="50" max="100"></progress>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}