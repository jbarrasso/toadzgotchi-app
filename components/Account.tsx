import useENSName from "../hooks/useENSName";
import { formatEtherscanLink, shortenHex } from "../util";
import { address, requestAccount } from "../pages/index"

type Props = {
  isWalletConnected: boolean;
  isWeb3Injected: boolean;
  color: string;
  padding: string;
  borderRadius: string;
  fontFamily: string;
};

const Account = ({isWalletConnected, isWeb3Injected, color, padding, borderRadius, fontFamily }: Props) => {
  const ENSName = useENSName(address);

  if (!isWeb3Injected) {
    return (
      <a {...{
        href: 'https://metamask.io/download',
        target: "_blank",
        rel: "noopener noreferrer",
        }}>
        INSTALL METAMASK
      </a>
    );  
  } else if (!isWalletConnected) {
    return (
      <button onClick={() => { requestAccount() }}>
        CONNECT METAMASK
      </button>
    );
  } else {
    return (
      <a {...{
        href: formatEtherscanLink("Account", [1337, address]),
        target: "_blank",
        rel: "noopener noreferrer",
        }}>
        {ENSName || `${shortenHex(address, 4)}`}
      </a>
    );
  }
};

export default Account;
