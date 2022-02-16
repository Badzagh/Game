import { useEffect, useState } from "react"
import App from "../App"
import "./Modal.css"
import Items from '../Items/Items'

const Modal = () => {

    const [startGame, setStartGame] = useState(false)
    const [active, setActive] = useState(true)
    const [activeClass, setActiveClass] = useState("popup")

    const HandleClick = () => {
        
        setStartGame(true)
        setActive(false)
        setActiveClass("popup-hidden")
            
        
        console.log("start")
    };
    

    return (
        <div>
        <div className={activeClass}>
            <div>
                <h3>Game Rules</h3>
            </div>
            <div className="container">
                <div className="container-button">
                    <span>up</span>
                    <span className="button">w</span>
                </div>
                <div className="container-wrap">
                    <div className="container-button">
                    <span>left</span>
                    <span className="button">A</span>
                    </div>
                    <div className="container-button">
                        <span>right</span>
                        <span className="button">D</span>
                    </div>
                </div>
            </div>
            <div>
                <p>There are obstacles which you must overcome </p>
                <p>Be aware of surprizes :)</p>
                <p>Hint: use lighthouse</p>
            </div>
            <div>
                <button onClick={HandleClick}>Start Game</button>
            </div>
        </div>
        <Items startGame={startGame} setStartGame={setStartGame}/>
        </div>
    );
}

export default Modal