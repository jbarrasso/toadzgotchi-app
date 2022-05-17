// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
// import '@fortawesome/fontawesome-svg-core/styles.css'

function Mint() {
    return (
        <div>
            <div className='bgWrap'>
                <Image
                    alt='Swamp'
                    src='/img/swamp.gif'
                    layout='fill'
                    objectFit='fill'
                    quality={100}
                />
            </div>
            <nav>Socials</nav>
            <div className='topBuffer'>Customize your Toadzgotchi experience!</div>
            <main>
                <div className='card1'>
                    <div className='tooltip'>
                        {/* <FontAwesomeIcon icon="question-circle" style={{fontSize: '18px', position:'absolute', top:'6%', left: '86%'}}/> */}
                        <span className="tooltiptext">
                            * 10,000 CASES TOTAL.<br></br><br></br>
                            * YOU DON'T NEED A CASE TO PLAY! HOWEVER, OWNING A CASE UNLOCKS ADDITIONAL IN-GAME ASSETS AND GAMEPLAY, AS WELL AS ELIGIBILITY FOR FUTURE PERKS.<br></br><br></br>
                            * CRYPTOADZ HOLDERS ARE ELIGIBLE FOR ONE FREE CASE MINT PER WALLET, AS WELL AS ONE ADDITIONAL MINT IF WHITELISTED FROM BETA (2 MAX PER WALLET).
                        </span>
                    </div>
                    <p>
                        Step 1:<br></br>Mint a randomn Toadzgotchi case
                    </p>
                    <img className='cardImage' src='/img/tamagotchi.png'></img>
                </div>
                <div className='card2'>
                    <div className='tooltip'>
                        {/* <FontAwesomeIcon icon="question-circle" style={{fontSize: '18px', position:'absolute', top:'6%', left: '86%'}}/> */}
                        <span className="tooltiptext">
                            * YOU DON'T NEED TO OWN A CRYPTOAD TO PLAY. THOSE THAT DON'T OWN CRYPTOADZ WILL BE GIVEN A SPECIAL TOADZGOTCHI TOAD TO PLAY WITH!<br></br><br></br>
                            * SOME SPECIAL TOADZ SUCH AS THE 'MURDERED BY FRONKZ' AND 'LEGENDARY' SERIES WILL NOT BE EILIGIBLE FOR PLAY.<br></br><br></br>
                            * THERE'S NO NEED TO MOVE YOUR TOAD OUT OF YOUR WALLET! SIMPLY CONNECT WITH THE WALLET THAT CONTAINS YOUR TOADZ TO PLAY!
                        </span>
                    </div>
                    <p>
                        Step 2:<br></br>Select which CrypToad you'd like to play with
                    </p>
                    <img className='cardImage' src='/img/ghostbones.png'></img>
                </div>
                <div className='card3'>
                    <div className='tooltip'>
                        {/* <FontAwesomeIcon icon="question-circle" style={{fontSize: '18px', position:'absolute', top:'6%', left: '86%'}}/> */}
                        <span className="tooltiptext">
                            * MIX AND MATCH YOUR CASES AND TOADZ HOWEVER YOU SEE FIT!<br></br><br></br>
                            * A CASE CAN BE ASSIGNED TO ONLY ONE TOAD AT A TIME.
                        </span>
                    </div>
                    <p>
                        Step 3:<br></br>Combine them for a personalized gameplay experience!
                    </p>
                    <img className='cardImage' src='/img/combined.png'></img>
                </div>
            </main>
            <div className='bottomBuffer'>Don't own a Toadzgotchi case or a CrypToad? You can still play!</div>
            <footer>Support</footer>
            <style jsx>{`
                * {
                    font-family: Pixeled;
                    font-size: 10px;
                }
                .bgWrap {
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                    z-index: -1;
                }
                nav {
                    display: flex;
                    height: 10vh;
                    border: 2px green solid;
                }
                .topBuffer {
                    font-size: 20px;
                    display: flex;
                    height: 10vh;
                    border: 2px blue solid;
                    align-items: center;
                    justify-content: center;
                }
                main {
                    display: flex;
                    justify-content: space-around;
                    border: 2px red solid;
                    height: 60vh;
                }
                .cardImage {
                    height: 50%;
                    width: 70%;
                    margin: 0px;
                }
                .card1, .card2, .card3 {
                    position: relative;
                    min-width: 200px;
                    box-shadow: 2px 10px 10px 1px grey;
                    background-color: white;
                    flex-direction: column;
                    text-align: center;
                    width: 23vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 40px;
                }
                .tooltiptext {
                    visibility: hidden;
                    box-shadow: 2px 10px 10px 1px grey;
                    background-color: white;
                    text-align: left;
                    font-size: 8px;
                    padding: 10px;
                    width: 300px;
                    border: 1px grey solid;
                    border-radius: 6px;
                    position: absolute;
                    left:-20px;
                    z-index: 1;
                }
                .tooltip:hover .tooltiptext{
                    visibility: visible;
                    cursor: pointer;
                }
                p {
                    margin-top: 0px;
                    margin-bottom: 0px;
                    margin-right: 12px;
                    margin-left: 15px;
                }
                .bottomBuffer {
                    display: flex;
                    height: 10vh;
                    border: 2px yellow solid;
                    align-items: center;
                    justify-content: center;
                }
                footer {
                    display: flex;
                    height: 10vh;
                    border: 2px purple solid;
                }
                `}
            </style>
        </div>
    );
}

export default Mint