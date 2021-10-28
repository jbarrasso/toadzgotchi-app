//import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Button from "../components/Button";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
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
        <section className='playerButtons'>
          <Button
            text='FEED'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='100px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
          />
          <Button
            text='PLAY'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='100px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
          />
          <Button
            text='SLEEP'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='100px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
          />
        </section>
        <section className='statusBars'>
          <ProgressBar
            text='HUNGER'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='120px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
            progressValue={50}
            progressMaxValue={100}
          />
          <ProgressBar
            text='MOOD'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='120px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
            progressValue={50}
            progressMaxValue={100}
          />
          <ProgressBar
            text='REST'
            display=''
            color='#332020'
            backgroundColor='#b0a28d'
            width='120px'
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='0px'
            progressValue={50}
            progressMaxValue={100}
          />
        </section>
      </main>

      <style jsx>{`
        header {
          font-family: Pixeled;
          text-align: center;
        }

        main {
          font-family: Pixeled;
          text-align: center;
        }

        nav {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
        }
        
        section {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
