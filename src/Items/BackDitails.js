import "./BackDitails.css"

const BackDitails = ({playerXPosition, playerYPosition, EyeX, scleraColor, pupilColor, Coins}) => {

    return (
        <div className="BackDitails">
            <div className="moon">
                <div id="white-first"></div>
                <div id="white-second"></div>
                <div id="white-third"></div>
            </div>
            <div className="lighthouse">
                <div></div>
            </div>
            <div className="disc" style={{left: playerXPosition + 5, top: playerYPosition }}></div>
            <div className="eye-container" style={{left: EyeX + 50}}>
                <div className="eye-screla" style={{backgroundColor: scleraColor}}>
                <div  className="eye-pupil">
                    <div style={{backgroundColor: pupilColor}}></div>
                </div>
                </div>
            </div>
            {Coins.map((coin, index) => (
            <div key={index} className="coin-container" style={{left: coin.x, top: coin.y}}>
                <div className="coin">
                </div>
            </div>
            ))}
        </div>
    );
}

export default BackDitails
