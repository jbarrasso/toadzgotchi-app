import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../hooks/useETHBalance";
import { parseBalance } from "../util";


const ETHBalance = ({ margin, padding }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account);
  

  return <p style={{margin: margin,
                    padding: padding}}
          >TOADZ IN SWAMP:
          </p>;
};

export default ETHBalance;

//Query Eth Balance
//Ξ{parseBalance(data ?? 0)}