import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import {provider} from "../pages/index"
import {signer} from "../pages/index"
import { address } from "../pages/index"
import { requestAccount } from "../pages/index"
import { handleAccountsChanged } from "../pages/index"
import { ethereum } from "../pages/index"
import { checkWeb3 } from "../pages/index";
import { ethers } from "ethers";

type Props = {
  isWalletConnected: boolean;
  color: string;
  padding: string;
  borderRadius: string;
  fontFamily: string;
};
const Account = ({isWalletConnected, color, padding, borderRadius, fontFamily }: Props) => {

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

  if (!isWalletConnected) {
    return (
        <button
          disabled={connecting}
          onClick={() => {
            setConnecting(true)
            requestAccount().catch((error) => {
              if (error) {
                setConnecting(false)
              }
            })
          }}>
          {isMetaMaskInstalled ? "CONNECT METAMASK" : "CONNECT WALLET"}
        </button>
    );
  } else {
    return (
      <a {...{
        href: formatEtherscanLink("Account", [chainId, address]),
        target: "_blank",
        rel: "noopener noreferrer",
        }}>
        {ENSName || `${shortenHex(address, 4)}`}
      </a>
    );
  }
};

export default Account;
