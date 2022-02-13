import './App.css';
import {useEffect, useRef } from "react"


function App({light, player, laserValocityX, laserValocityY, laserEndX, laserEndY, Platform, platform, platforms, enemy, blade}) {
  /*const light = props.light
  const player = props.player
  const laserValocityX = props.laserValocityX
  const laserValocityY = props.laserValocityY
  const laserEndX = props.laserEndX
  const laserEndY = props.laserEndY
  const Platform = props.Platform
  const platform = props.platform
  const platforms = props.platforms
  const enemy = props.enemy*/

  const canvasRef = useRef(null);
  
  const gravity = 7

  let onlyOneTime = true
  //let countUpPress = 0
  
  
  ////

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    //canvas.width = window.innerWidth;
    canvas.width = 1000
    canvas.height = 600

    //Our first draw
    const drawAllItem = () => {
      ////
      context.fillStyle = '#222831'
      context.fillRect(0,  0, canvas.width, canvas.height)

      ////protagonist
      //shape
      context.fillStyle = player.color
      context.fillRect(player.x, player.y, player.width, player.height)

      ////light
      light.drawitem(context)
    
      ////platforms
      /*context.fillStyle = platform.color
      context.fillRect(platform.x , platform.y, platform.width, platform.height)*/
      platforms.forEach((platform) => {
        Platform.drawitem(context, platform)
      })
      
      ////enemy
      //context.clearRect(player.x, player.y, player.width+10, player.height+10)
      enemy.drawitem(context)

      blade.drawitem(context)

      ////protagonist
      player.drawitem(context)
      
    }

    const update = () => {
    
      player.x += player.valocityX
      player.y += player.valocityY
      laserEndX += laserValocityX
      laserEndY += laserValocityY
      
      if(player.y + player.height + player.valocityY <= canvas.height){
        player.valocityY += gravity
        laserValocityY += gravity
      } else {
        player.valocityY = 0
        laserValocityY = 0
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
      } else if(player.x + player.width + player.valocityX >= blade.x && player.x <= blade.x + blade.width &&
        player.y + player.height + player.valocityY >= blade.y && player.y <= blade.y + blade.height
        ){
        player.eyeColor = "red"
      } else {
       player.eyeColor = "white"
      }
      /*if(laserValocityX === 300){
        laserValocityX = 0
      }*/
      //console.log(player)
      
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

      if(keys.right.pressed && player.x < 400){
        player.valocityX = 10
        laserEndX +=8
        laserValocityX = 10
      } else if(keys.left.pressed && player.x > 100) {
        player.valocityX = -10
        laserEndX -=8
        laserValocityX = -10
      } else {
        player.valocityX = 0
        laserValocityX = 0

        if(keys.right.pressed){
          platforms.forEach((platform) => {
            platform.x -= 8
            onlyOneTime = true
          })
          blade.x -= 8
          enemy.x -= 8
        } else if(keys.left.pressed) {
          platforms.forEach((platform) => {
            platform.x += 8
          })
          blade.x += 8
          enemy.x += 8
        } 
      } 

      ////platform 
      platforms.forEach((platform) => {
        if(player.x + player.width >= platform.x && player.x <= platform.x + platform.width &&
          player.y + player.height <= platform.y && player.y + player.height + player.valocityY >= platform.y
         ){
         player.valocityY = 0
         laserValocityY = 0
        }
      })

      if(keys.up.pressed && player.y > 100 && player.valocityY === 0){
        player.valocityY = -60
        laserValocityY = -60
      } 
      
      if(onlyOneTime && player.x >= platforms[1].x + platforms[1].width/4 && player.x <= platforms[1].x + platforms[1].width/2){
        console.log("mooove")
        console.log(platforms[1].x)
        platforms[1].x -= 150
        setTimeout(() => {
          platforms[1].x += 150
        }, 1500)
        console.log(platforms[1].x)
      }
      onlyOneTime = false
    }

    animate()

    window.addEventListener('mousemove', function(e) {
      //if (!running) {
        //animate()
        //drawAllItem()
      /*if(e.clientX > canvas.width/2 && e.clientY < 100){
        light.lineX = light.width
        light.lineY = light.height/2
      }*/ 
      if(e.clientY > 50){
        if(e.clientX > 200){
          light.x = e.clientX;
          light.y = e.clientY;
          //light.lineX = 0
          //light.lineY = 0
          /*if(e.clientY > 400){
            light.width = 130
            light.height = 130
          } else {
            light.width = 100
            light.height = 100

          }*/
        }
        
          light.y = e.clientY;
      }
      
      
      //}
      if(light.x <= enemy.x + enemy.width && light.x >= enemy.x &&
         light.y <= enemy.y + enemy.height && light.y >= enemy.y
         ){
        enemy.color = "blue"
        console.log("touch")
      } else {
        enemy.color = "#222831"
      }
    });

    window.addEventListener('click', function(e) {
      console.log("-----------mouse click")
      if(e.clientX >= enemy.x && e.clientX <= enemy.x + enemy.width &&
         e.clientY >= enemy.y && e.clientY <= enemy.y + enemy.height
        ){
        console.log("-----------mouse click on enemy")

        //setTimeout(() => {
        /*  enemy.color = "yellow"
          player.eyeColor = "red"
          //laserValocityX = 1
          
        //}, 200)
        setTimeout(() => {
          laserEndX = e.clientX
          laserEndY = e.clientY
          //laserEnd.x = e.clientX
          //laserEnd.y = e.clientY
          //laserValocityX = e.clientX - player.x + player.width/2 +2
          laserValocityX = e.clientX - (player.x + player.width/2 +2)
          laserValocityY = -((player.y + 38) - e.clientY)
        }, 500)
        setTimeout(() => {
          //enemy.y = -20
          player.eyeColor = "white"
          laserValocityX = - (e.clientX - (player.x + player.width/2 +2))
          laserValocityY = (player.y + 38) - e.clientY
          laserEndX = player.x + player.width/2
          laserEndY = player.y + 38
          //laserEnd.x = player.x + player.width/2 +2
          //laserEnd.y = player.y + 38
        }, 2000)*/

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
              laserValocityX = - (e.clientX - (player.x + player.width/2 +2))
              laserValocityY = (player.y + 38) - e.clientY
              laserEndX = player.x + player.width/2
              laserEndY = player.y + 38
            }, 2000)
        }).
        catch(function () {
            console.log('Some error has occurred');
        });

      }
    });

    window.addEventListener('keydown', ({key}) => {
      
      //console.log("----------------------countpress", countUpPress)
      console.log("press---------")
      //console.log("key", key)
      switch (key){
        case "a":
          console.log("left")
          //player.valocityX = -1
          keys.left.pressed = true
          break
        case "s":
          console.log("down")
          keys.down.pressed = true
          break
        case "d":
          console.log("right")
          //player.valocityX = 1
          keys.right.pressed = true
          break
        case "w":
          console.log("up")
          //player.valocityY -=60
          keys.up.pressed = true
          //countUpPress++
          break
      }
    });

    window.addEventListener('keyup', ({key}) => {
      console.log("press---------")
      //console.log("key", key)
      switch (key){
        case "a":
          console.log("left")
          //player.valocityX = 0
          keys.left.pressed = false
          break
        case "s":
          console.log("down")
          //player.valocityY = 0
          keys.down.pressed = false
          break
        case "d":
          console.log("right")
          //player.valocityX = 0
          keys.right.pressed = false
          break
        case "w":
          console.log("up")
          //player.valocityY = 0
          //countUpPress = 0
          keys.up.pressed = false
          break
      }
    });

  }, [])

  return (
    <canvas ref={canvasRef} />
  );
}

export default App;
