import useENSName from "../hooks/useENSName";
import { formatEtherscanLink, shortenHex } from "../util";
import { account, requestAccount } from "../pages/index"

type Props = {
  isWalletConnected: boolean;
  isWeb3Injected: boolean;
  color: string;
  padding: string;
  borderRadius: string;
  fontFamily: string;
};

const Account = ({isWalletConnected, isWeb3Injected, color, padding, borderRadius, fontFamily }: Props) => {
  const ENSName = useENSName(account);

  if (!isWeb3Injected) {
    return null;
    (<a {...{
        href: 'https://metamask.io/download',
        target: "_blank",
        rel: "noopener noreferrer",
        }}>
        INSTALL METAMASK
    </a>);  
  } else if (!isWalletConnected) {
    return null;
    ( <button onClick={() => { requestAccount() }}>
        CONNECT METAMASK
      </button>);
  } else {
    return (
      <a {...{
        href: formatEtherscanLink("Account", [1337, account]),
        target: "_blank",
        rel: "noopener noreferrer",
        }}>
        {ENSName || `${shortenHex(account, 4)}`}
      </a>
    );
  }
};

export default Account;
