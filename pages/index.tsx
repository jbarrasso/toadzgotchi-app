//import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
//import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";

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
          {/* <Link href="/">
            <a>next-web3-boilerplate</a>
          </Link> */}

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
      </main>

      <style jsx>{`
        nav {
          font-family: Pixeled;
          display: flex;
          justify-content: flex-end;
          padding: 10px;
        }
        
        h1 {
          font-family: Pixeled;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
