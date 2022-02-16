import "./BackDitails.css"

const BackDitails = ({playetXPosition, EyeX, scleraColor, pupilColor}) => {
    return (
        <div>
            <div className="moon">
                <div id="moon-first"></div>
                <div id="moon-second"></div>
                <div id="moon-third"></div>
            </div>
            <div className="lighthouse">
                <div></div>
            </div>
            <div style={{position: "absolute",zIndex: "1", left: playetXPosition, top: "500px" }}>ncwjenfwkjenkw</div>
            <div className="eye-container" style={{left: EyeX + 50}}>
                <div className="eye-screla" style={{backgroundColor: scleraColor}}>
                <div  className="eye-pupil">
                    <div style={{backgroundColor: pupilColor}}></div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default BackDitails
