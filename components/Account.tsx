import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import provider from "../pages/index"
import requestAccount from "../pages/index"

type Props = {
  isWalletConnected: boolean;
  color: string;
  padding: string;
  borderRadius: string;
  fontFamily: string;
};
// const ethereum = () => {
//   return (window as any).ethereum
// }
const Account = ({
  isWalletConnected,
  color,
  padding,
  borderRadius,
  fontFamily,
}: Props) => {
  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);

  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  const ENSName = useENSName(account);

  // async function requestAccount() {
  //   await ethereum().request({ method: 'eth_requestAccounts' });
  // }

  // useEffect(() => {
  //   if (active || error) {
  //     setConnecting(false);
  //     stopOnboarding();
  //   }
  // }, [active, error]);

  // if (error) {
  //   return null;
  // }

  // if (!triedToEagerConnect) {
  //   return null;
  // }

  console.log(isWalletConnected) //runs before checkWeb3
  return (
      <button
        disabled={connecting}
        onClick={() => {
          setConnecting(true);
        }}>
        {isMetaMaskInstalled ? "CONNECT METAMASK" : "CONNECT WALLET"}
      </button>
  );

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {/* {ENSName || `${shortenHex(account, 4)}`} */}
    </a>
  );
};

export default Account;
