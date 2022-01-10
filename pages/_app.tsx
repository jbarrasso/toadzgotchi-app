import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { faIceCream } from '@fortawesome/free-solid-svg-icons'
import { faHotdog } from '@fortawesome/free-solid-svg-icons'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'
import { faLaughWink } from '@fortawesome/free-solid-svg-icons'

import "../styles/globals.css";
config.autoAddCss = false
library.add(fab, faLaughWink, faPepperHot, faIceCream, faCarrot, faCandyCane, faHotdog, faQuestionCircle, faHamburger, faBed, faUserGraduate, faCrown, faUmbrellaBeach, faCommentDots, faHeartbeat, faSchool, faStoreAlt, faPlane, faCog, faTimesCircle)

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
