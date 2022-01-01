import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

function Mint() {
    return (
        <div>
            <nav>Socials</nav>
            <div className='topBuffer'>Customize your Toadzgotchi experience!</div>
            <main>
                <div className='card1'>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                    <p>
                        Step 1:<br></br>Mint a randomn Toadzgotchi case (10,000 possible combinations)
                    </p>
                    <img className='cardImage' src='/img/tamagotchi.png'></img>
                </div>
                <div className='card2'>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                    <p>
                        Step 2:<br></br>Select which CrypToad you'd like to play with
                    </p>
                    <img className='cardImage' src='/img/ghostbones.png'></img>
                </div>
                <div className='card3'>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
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
                    box-shadow: 2px 10px 10px 1px grey;
                    flex-direction: column;
                    text-align: center;
                    width: 23vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 40px;
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