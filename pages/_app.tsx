import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

// config.autoAddCss = false
// library.add(fab, faLaughWink, faPepperHot, faIceCream, faCarrot, faCandyCane, faHotdog, faQuestionCircle, faHamburger, faBed, faUserGraduate, faCrown, faUmbrellaBeach, faCommentDots, faHeartbeat, faSchool, faStoreAlt, faPlane, faCog, faTimesCircle)

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;