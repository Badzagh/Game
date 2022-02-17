import { useEffect, useRef, useState } from "react"
import BackDitails from './Items/BackDitails';
import ModalRestart from './Modal/ModalRestart'


function App({light, player, Platform, Platforms, enemy, BladeUpDirection, BladesUpDirection, BladeDownDirection, BladesDownDirection, BladeLeftDirection, BladesLeftDirection, startGame, setStartGame, Coin, Coins}) {

  const canvasRef = useRef(null);

  let coinsNum = 0
  const gravity = 7
  let gameOver = false
  let Move = true
  
  const [notLooseYet, setNotLooseYet] = useState(true)
  const [winner, setWinner] = useState(false)
  const [playerXPosition, setPlayerXPosition] = useState(0)
  const [playerYPosition, setPlayerYPosition] = useState(0)
  const [EyeX, setEyeX] = useState(0)
  const [pupilColor, setPupilColor] = useState("black")
  const [scleraColor, setScleraColor] = useState("black")
  const [CoinsCount, setCoinsCount] = useState(0)
  
  ////

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = window.innerWidth;
    canvas.height = 600

    const drawAllItem = () => {
      ////
      context.fillStyle = '#222831'
      context.fillRect(0,  0, canvas.width, canvas.height)

      ////protagonist
      //shape
      context.fillStyle = player.color
      context.fillRect(player.x, player.y, player.width, player.height)

      ///coins
      //shape
      Coins.forEach((coin) => {
        Coin.drawitem(context, coin)
      })

      ////light
      light.drawitem(context)
    
      ///blades
      BladesUpDirection.forEach((blade) => {
        BladeUpDirection.drawitem(context, blade)
      })

      BladesDownDirection.forEach((blade) => {
        BladeDownDirection.drawitem(context, blade)
      })

      BladesLeftDirection.forEach((blade) => {
        BladeLeftDirection.drawitem(context, blade)
      })

      ////platforms
      Platforms.forEach((platform) => {
        Platform.drawitem(context, platform)
      })
      
      ////enemy
      enemy.drawitem(context)
      
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
        light.x = enemy.x + 100
        light.y = enemy.y + 50
        setNotLooseYet(false)
        gameOver = true
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
      
      if(startGame && !gameOver){
        if(keys.right.pressed && player.x < 400){
          player.valocityX = 10
        } else if(keys.left.pressed && player.x > 100) {
          player.valocityX = -10
        } else {
          player.valocityX = 0
          
          ////background schroll
          if(notLooseYet){
            if(keys.right.pressed){
              Platforms.forEach((platform) => {
                platform.x -= 8
                Move = true
              })
              BladesUpDirection.forEach((blade) => {
                blade.x -= 8
              })
              BladesDownDirection.forEach((blade) => {
                blade.x -= 8
              })
              BladesLeftDirection.forEach((blade) => {
                blade.x -= 8
              })
              Coins.forEach((coin) => {
                coin.x -= 8
              })
              enemy.x -= 8
            } else if(keys.left.pressed) {
              Platforms.forEach((platform) => {
                platform.x += 8
              })
              BladesUpDirection.forEach((blade) => {
                blade.x += 8
              })
              BladesDownDirection.forEach((blade) => {
                blade.x += 8
              })
              BladesLeftDirection.forEach((blade) => {
                blade.x += 8
              })
              Coins.forEach((coin) => {
                coin.x += 8
              })
              enemy.x += 8
            } 
          }
        } 
      }

      ////jump on platform 
      Platforms.forEach((platform) => {
        if(player.x + player.width >= platform.x && player.x <= platform.x + platform.width &&
          player.y + player.height <= platform.y && player.y + player.height + player.valocityY >= platform.y
         ){
         player.valocityY = 0
        }
      })

      ////killer blades
      const KillerBlades = (Blades) => {
        Blades.forEach((blade) => {
          if(player.x + player.width + player.valocityX >= blade.x && player.x <= blade.x + blade.width &&
            player.y + player.height + player.valocityY >= blade.y && player.y <= blade.y + blade.height
            ){
            player.eyeColor = "red"
            light.x = player.x + 100
            light.y = player.y + 50
            setNotLooseYet(false)
            gameOver = true
            Platforms.forEach((platform) => {
              platform.x -= 0
              Move = true
            })
            setTimeout(() => {
              player.eyeColor = "white"
            }, 1000)
          }
        })
      }

      KillerBlades(BladesUpDirection)
      KillerBlades(BladesDownDirection)
      KillerBlades(BladesLeftDirection)

      if(startGame && notLooseYet){
        if(keys.up.pressed && player.y > 100 && player.valocityY === 0){
          player.valocityY = -60
        } 
      }

      ////Coins
      Coins.forEach((coin, index) => {
        if(player.x + player.width + player.valocityX >= coin.x && player.x <= coin.x + coin.width &&
          player.y + player.height + player.valocityY >= coin.y && player.y <= coin.y + coin.height
          ){
            Coins.splice(index, 1)
            coinsNum++  
        }
      })


      /////movement blades and platforms
      if(Move && player.x >= Platforms[1].x + Platforms[1].width/4 && player.x <= Platforms[1].x + Platforms[1].width/2){
        Platforms[1].x -= 150
        setTimeout(() => {
          Platforms[1].x += 150
        }, 1500)
      }

      if(Move && player.x >= Platforms[4].x - 100 && player.x <= BladesLeftDirection[0].x - Platforms[1].width){
        for(let i = 0; i < 6; i++){
          BladesLeftDirection[i].x -= 500
        }
      }
      if(Move && player.x >= BladesDownDirection[5].x && player.x <= BladesDownDirection[5].x + BladesDownDirection[5].width){
        for(let i = 5; i < 12; i++){
          BladesDownDirection[i].y = 450
        }
      }
      Move = false

      if(Platforms[6].x <= player.x){
        setWinner(true)
        gameOver = true
      }

      setPlayerXPosition(player.x)
      setPlayerYPosition(player.y)
      setEyeX(Platforms[0].x)
      setCoinsCount(coinsNum)
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

      if(light.x <= enemy.x + enemy.width && light.x >= enemy.x &&
         light.y <= enemy.y + enemy.height && light.y >= enemy.y
         ){
        enemy.color = "black"
      } else {
        enemy.color = "#222831"
      }

      if(light.x <= Platforms[0].x + Platforms[0].width && light.x >= Platforms[0].x + 10 &&
        light.y <= 385 && light.y >= 360
        ){
        setPupilColor("white")
        setScleraColor("white")
      } else {
        setPupilColor("black")
        setScleraColor("black")
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
          keys.up.pressed = false
          break
      }
    });

  }, [startGame])
  
  return (
    <div>
      <ModalRestart notLooseYet={notLooseYet} setNotLooseYet={setNotLooseYet} winner={winner} CoinsCount={CoinsCount} />
      <BackDitails playerXPosition={playerXPosition} playerYPosition={playerYPosition} EyeX={EyeX} scleraColor={scleraColor} pupilColor={pupilColor} Coins={Coins}/>
      <canvas ref={canvasRef} id="canvas"/>
    </div>
  );
}

export default App;
