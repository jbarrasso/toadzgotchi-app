//import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Account from "../components/Account";
//import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import ProgressBar from "../components/ProgressBar";


function Home() {
  const { account, library, active} = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  let isConnected = typeof account === "string" && !!library;

  isConnected = true;

  console.log(isConnected)

  //const Pixeled = 

  return (
    <div>
      <div className='bgWrap'>
        <Image
          alt='Swamp'
          src='/img/ToadzBG-Sample2.png'
          layout='fill'
          objectFit='fill'
          quality={100}
        />
      </div>
      <Head>
        <title>Toadzgotchi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          {/* {isConnected && (
            <ETHBalance
              margin='0px'
              padding='10px'
            />
          )} */}

          <Account
            triedToEagerConnect={triedToEagerConnect}
            color='white'
            padding='10px'
            borderRadius='10px'
            fontFamily='Pixeled'
          />
        </nav>
      </header>

      <main>
        <h1>
          TOADZGOTCHI
        </h1>
        <section className='playerActions'>
          <div className='feedDiv'>
            <Button
              text='FEED'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='10px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
            />
            <ProgressBar
              text='HUNGER'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='0px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
              progressValue={50}
              progressMaxValue={100}
            />
          </div>
          <div className='playDiv'>
            <Button
              text='PLAY'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='10px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
            />
            <ProgressBar
              text='MOOD'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='0px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
              progressValue={50}
              progressMaxValue={100}
            />
          </div>
          <div className='sleepDiv'>
          <Button
              text='SLEEP'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='10px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
            />
          <ProgressBar
              text='REST'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              width='100px'
              margin='0px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
              progressValue={50}
              progressMaxValue={100}
            />
          </div>
        </section>
      </main>

      <style jsx>{`
        header {
          font-family: Pixeled;
          text-align: center;
        }

        .bgWrap {
          position: fixed;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          z-index: -1;
        }

        main {
          font-family: Pixeled;
          text-align: center;
        }

        nav {
          height:300px;
          display: flex;
          justify-content: flex-end;
          padding: 10px;
        }
        
        .feedSection {
          display:inline-block;
        }
        .playSection {
          display:inline-block;
        }
        .sleepSection {
          display:inline-block;
        }

        section {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
