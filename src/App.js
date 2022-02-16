//import './App.css';
import {useEffect, useRef, useState } from "react"
import BackDitails from './Items/BackDitails';
import ModalStart from "./Modal/ModalStart";
import ModalRestart from './Modal/ModalRestart'


function App({light, player, Platform, Platforms, enemy, Blade, Blades, startGame, setStartGame}) {

  const canvasRef = useRef(null);
  
  const gravity = 7
  
  const [notLooseYet, setNotLooseYet] = useState(true)
  const [winner, setWinner] = useState(false)

  let gameOver = false

  let onlyOneTime = true
  //let countUpPress = 0
  const [playetXPosition, setPlayetXPosition] = useState(0)
  const [EyeX, setEyeX] = useState(0)
  const [pupilColor, setPupilColor] = useState("black")
  const [scleraColor, setScleraColor] = useState("black")
  
  ////

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = window.innerWidth;
    //canvas.width = 800
    canvas.height = 600

    console.log(startGame)
    //Our first draw
    const drawAllItem = () => {
      ////
      context.fillStyle = '#222831'
      context.fillRect(0,  0, canvas.width, canvas.height)

      ////protagonist
      //shape
      context.fillStyle = player.color
      context.fillRect(player.x, player.y, player.width, player.height)
      ///blades
      //shape
      Blades.forEach((blade) => {
        Blade.drawitem(context, blade)
      })
      ////light
      light.drawitem(context)
    
      ////platforms
      Platforms.forEach((platform) => {
        Platform.drawitem(context, platform)
      })
      
      enemy.drawitem(context)

      ////Blades
      ////1
      context.fillStyle = 'black'
      context.beginPath()
      context.moveTo(Blades[0].x + 10, 500)
      context.lineTo(Blades[0].x, 600)
      context.lineTo(Blades[0].x + 20, 600)
      context.lineTo(Blades[0].x + 10, 500)
      context.fill()
      context.closePath()
      ////2
      context.fillStyle = 'black'
      context.beginPath()
      context.moveTo(Blades[1].x + 50, 400)
      context.lineTo(Blades[1].x, 600)
      context.lineTo(Blades[1].x + 100, 600)
      context.lineTo(Blades[1].x + 50, 400)
      context.fill()
      context.closePath()
      ////3
      context.fillStyle = 'black'
      context.beginPath()
      context.moveTo(Blades[2].x + 25, 350)
      context.lineTo(Blades[2].x, 400)
      context.lineTo(Blades[2].x + 50, 400)
      context.lineTo(Blades[2].x + 25, 350)
      context.fill()
      context.closePath()


      ////
      const drawMultiBlades = (Blade, valocityX, y1, y2) => {
        context.fillStyle = '#222831'
        context.beginPath()
        context.moveTo(Blades[Blade].x + 15 + 30 * valocityX , y1)
        context.lineTo(Blades[Blade].x + 30 * valocityX, y2)
        context.lineTo(Blades[Blade].x + 30 * (valocityX + 1), y2)
        context.lineTo(Blades[Blade].x + 15 + 30 * valocityX, y1)
        context.fill()
        context.closePath()
      }
      //4
      /*drawMultiBlades(3, 0, 380, 400)
      drawMultiBlades(3, 1, 380, 400)
      drawMultiBlades(3, 2, 380, 400)
      drawMultiBlades(3, 3, 380, 400)*/
      for(let i = 0; i < 4; i++){
        drawMultiBlades(3, i, 380, 400)
      }

      //5
      /*drawMultiBlades(4, 0, 370, 350)
      drawMultiBlades(4, 1, 370, 350)
      drawMultiBlades(4, 2, 370, 350)
      drawMultiBlades(4, 3, 370, 350)
      drawMultiBlades(4, 4, 370, 350)
      drawMultiBlades(4, 5, 370, 350)*/
      for(let i = 0; i < 6; i++){
        drawMultiBlades(4, i, 370, 350)
      }

      /////
      const drawMultiBladesVertical = (Blade, valocityY) => {
        context.fillStyle = '#222831'
        context.beginPath()
        context.moveTo(Blades[Blade].x, 465 + 30 * valocityY)
        context.lineTo(Blades[Blade].x + 40, 450 + 30 * valocityY)
        context.lineTo(Blades[Blade].x + 40, 480 + 30 * valocityY)
        context.lineTo(Blades[Blade].x, 465 + 30 * valocityY)
        context.fill()
        context.closePath()
      }
      //6
      /*drawMultiBladesVertical(5, 0)
      drawMultiBladesVertical(5, 1)
      drawMultiBladesVertical(5, 2)
      drawMultiBladesVertical(5, 3)
      drawMultiBladesVertical(5, 4)*/
      for(let i = 0; i < 5; i++){
        drawMultiBladesVertical(5, i)
      }

      /*
      context.fillStyle = 'black'
      context.beginPath()
      context.moveTo(Blades[6].x + 100, Blades[6].y + 40)
      context.lineTo(Blades[6].x, Blades[6].y)
      context.lineTo(Blades[6].x + 200, Blades[6].y)
      context.lineTo(Blades[6].x + 100, Blades[6].y + 40)
      context.fill()
      context.closePath()*/


      ////protagonist
      player.drawitem(context)
      
    }

    const update = () => {
    
      player.x += player.valocityX
      player.y += player.valocityY
      if(player.y + player.height + player.valocityY <= canvas.height){
        player.valocityY += gravity
        
      } else {
        player.valocityY = 0
        
      }

      enemy.y += enemy.valocityY
      if(enemy.y  >= 450){
        enemy.valocityY = -5 
      }
      if(enemy.y  <= 150){
        enemy.valocityY = 5
      }
      
      if(player.x + player.width + player.valocityX >= enemy.x && player.x <= enemy.x + enemy.width &&
         player.y + player.height + player.valocityY >= enemy.y && player.y <= enemy.y + enemy.height
        ){
        player.eyeColor = "red"
      } 
      
      drawAllItem()
    }

    const keys = {
      right: {
        pressed: false
      },
      down: {
        pressed: false
      },
      left: {
        pressed: false
      },
      up: {
        pressed: false
      }
    }

    const animate = () => {
      
      window.requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)
      update()
      console.log(startGame)
      if(startGame && !gameOver){
      if(keys.right.pressed && player.x < 400){
        player.valocityX = 10
      } else if(keys.left.pressed && player.x > 100) {
        player.valocityX = -10
      } else {
        player.valocityX = 0
       //if(notLooseYet){
        if(keys.right.pressed){
          Platforms.forEach((platform) => {
            platform.x -= 8
            onlyOneTime = true
          })
          Blades.forEach((blade) => {
            blade.x -= 8
          })
          enemy.x -= 8
        } else if(keys.left.pressed) {
          Platforms.forEach((platform) => {
            platform.x += 8
          })
          Blades.forEach((blade) => {
            blade.x += 8
          })
          enemy.x += 8
        } 
       //}
      } 
    }
      ////platform 
      Platforms.forEach((platform) => {
        if(player.x + player.width >= platform.x && player.x <= platform.x + platform.width &&
          player.y + player.height <= platform.y && player.y + player.height + player.valocityY >= platform.y
         ){
         player.valocityY = 0
        }
      })

      ////blades
      Blades.forEach((blade) => {
        if(player.x + player.width + player.valocityX >= blade.x && player.x <= blade.x + blade.width &&
          player.y + player.height + player.valocityY >= blade.y && player.y <= blade.y + blade.height
          ){
          player.eyeColor = "red"
          light.x = player.x + 100
          light.y = player.y + 50
          console.log("You lose")
           
          //player.valocityX = 0
          //notLooseYet = false
          setNotLooseYet(false)
          gameOver = true
          //setStartGame(false)
          //window.location.reload();
          Platforms.forEach((platform) => {
            platform.x -= 0
            onlyOneTime = true
          })
          setTimeout(() => {
            player.eyeColor = "white"
          }, 1000)
        }
      })
      if(startGame && notLooseYet){
      if(keys.up.pressed && player.y > 100 && player.valocityY === 0){
        player.valocityY = -60
      } 
    }
      if(onlyOneTime && player.x >= Platforms[1].x + Platforms[1].width/4 && player.x <= Platforms[1].x + Platforms[1].width/2){
        Platforms[1].x -= 150
        setTimeout(() => {
          Platforms[1].x += 150
        }, 1500)
      }

      if(onlyOneTime && player.x >= Platforms[4].x - 100 && player.x <= Blades[5].x - Platforms[5].width){
        console.log("mooove")
        console.log(Platforms[1].x)
        Blades[5].x -= 500
        console.log(Blades[5].x)
      }
      if(onlyOneTime && player.x >= Blades[6].x && player.x <= Blades[6].x + Blades[6].width){
       console.log("mooove")
       console.log(Platforms[1].x)
       Blades[6].y = 410
       console.log(Blades[5].x)
      }
      onlyOneTime = false

      if(Platforms[6].x <= player.x){
        setWinner(true)
        gameOver = true
        console.log("you win")
      }

      setPlayetXPosition(player.x)
      setEyeX(Platforms[0].x)
    }

    animate()

    window.addEventListener('mousemove', function(e) {
      if(!gameOver){
      if(e.clientY > 50){
        if(e.clientX > 200){
          light.x = e.clientX;
          light.y = e.clientY;
        }
          light.y = e.clientY;
      }
      }
      //}
      if(light.x <= enemy.x + enemy.width && light.x >= enemy.x &&
         light.y <= enemy.y + enemy.height && light.y >= enemy.y
         ){
        enemy.color = "black"
        console.log("touch")
      } else {
        enemy.color = "#222831"
      }

      if(light.x <= Platforms[0].x + Platforms[0].width && light.x >= Platforms[0].x + 50 &&
        light.y <= 385 && light.y >= 360
        ){
          setPupilColor("white")
          setScleraColor("white")
          console.log("eye")
      } else {
        setPupilColor("black")
          setScleraColor("black")
      }
      
    });

    window.addEventListener('click', function(e) {
      //console.log("-----------mouse click")
      if(e.clientX >= enemy.x && e.clientX <= enemy.x + enemy.width &&
         e.clientY >= enemy.y && e.clientY <= enemy.y + enemy.height
        ){

        let promise = new Promise((resolve, reject) => {
          enemy.color = "yellow"
          player.eyeColor = "red"
          if(enemy.color === "yellow" && player.eyeColor === "red"){
            resolve();
          } else reject();
        });

        promise.
        then(function () {
            console.log('Success, You are a GEEK');
            setTimeout(() => {
              player.eyeColor = "white"
              
            }, 2000)
        }).
        catch(function () {
            console.log('Some error has occurred');
        });

      }
    });

    window.addEventListener('keydown', ({key}) => {
      
      switch (key){
        case "a":
          keys.left.pressed = true
          break
        case "s":
          keys.down.pressed = true
          break
        case "d":
          keys.right.pressed = true
          break
        case "w":
          keys.up.pressed = true
          //countUpPress++
          break
      }
    });

    window.addEventListener('keyup', ({key}) => {

      switch (key){
        case "a":
          keys.left.pressed = false
          break
        case "s":
          keys.down.pressed = false
          break
        case "d":
          keys.right.pressed = false
          break
        case "w":
          //countUpPress = 0
          keys.up.pressed = false
          break
      }
    });

  }, [startGame])
  
  return (
    <div>
      <ModalRestart notLooseYet={notLooseYet} setNotLooseYet={setNotLooseYet} winner={winner} />
      <BackDitails playetXPosition={playetXPosition} EyeX={EyeX} scleraColor={scleraColor} pupilColor={pupilColor}/>
      <canvas ref={canvasRef} id="canvas"/>
    </div>
  );
}

export default App;
