import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";

function Home() {
  const { account, library, active} = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  //isConnected = true;

  console.log(isConnected)

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

          {isConnected && (
            <ETHBalance />
          )}

          <Account triedToEagerConnect={triedToEagerConnect} color='red' />
        </nav>
      </header>

      <main>
        <h1>
          TOADZGOTCHI
        </h1>
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          padding: 10px;
        }
        
        button {
          background-color: red;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
