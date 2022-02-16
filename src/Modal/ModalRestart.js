import { useEffect, useState } from "react";
import "./Modal.css"

const ModalRestart = ({notLooseYet, setNotLooseYet, winner}) => {
    const [activeRestartModal, setActiveRestartModal] = useState("popup-restart-hidden")
    const [messige, setMessige] = useState("Congratulations, You win")
    console.log(notLooseYet)
    useEffect(() => {
        if(!notLooseYet){
            setActiveRestartModal("popup-restart")
            setMessige("You Loose :(")
        } 
        if(winner) {
            setActiveRestartModal("popup-restart")
            setMessige("Congratulations, You Win")
        }
    },[notLooseYet, winner])

    /*useEffect(() => {
        if(winner) {
            setActiveRestartModal("popup-restart")
            setMessige("Congratulations, You Win")
        }
    },[winner])*/
    
    const HandleRestart = () => {
        setActiveRestartModal("popup-restart-hidden")
        setNotLooseYet(true)
        window.location.reload();
    };

    return (
        <div className={activeRestartModal}>
            <div>
                <h3>{messige}</h3>
            </div>
            <div>
                <button onClick={HandleRestart}>Restart</button>
            </div>
        </div>
        
    );
}

export default ModalRestart