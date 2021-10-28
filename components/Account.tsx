import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";

type Props = {
  triedToEagerConnect: boolean;
  color: string;
  padding: string;
  borderRadius: string;
  fontFamily: string;
};

const Account = ({ triedToEagerConnect, color, padding, borderRadius, fontFamily }: Props) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div
        style={{padding: padding}}
      >
        {isWeb3Available ? (
          <button
            style={{backgroundColor: color,
                    borderRadius: borderRadius,
                    padding: padding,
                    fontFamily: fontFamily,
                  }}
            disabled={connecting}
            onClick={() => {
              setConnecting(true);
              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "CONNECT METAMASK" : "CONNECT WALLET"}
          </button>
        ) : (
          <button onClick={startOnboarding}>INSTALL METAMASK</button>
        )}
      </div>
    );
  }

  return (
    <a style={{ padding: padding,
      }}
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
