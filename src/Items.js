import App from './App';

function Items (){
  ////light

  const light = {
    x: 500,
    y: 100,
    width: 50,
    height: 100,
    lineX: 0,
    lineY: 0
  }

  const lightAction = {
    drawitem(context){
      ////circle light
      context.fillStyle = '#F9DC5C'
      //context.fillRect(light.x,  light.y, light.width, light.height)
      context.beginPath();
      context.arc(light.x, light.y, light.width, 0, 2 * Math.PI);
      context.fill()
      ////triangle light
      context.fillStyle = '#F9DC5C'
      context.beginPath()
      //context.moveTo(light.x, light.y - light.height/2)
      context.moveTo(40,400)
      context.lineTo(light.x + light.lineX, light.y + light.height/2 - light.lineY)
      context.lineTo(light.x - light.lineX, light.y - light.height/2 + light.lineY)
      context.lineTo(50, 350)
      context.fill()
      context.closePath()
    }
  }

  light.drawitem = lightAction.drawitem


  ////player

  const player = {
    x: 200,
    y: 500,
    width: 100,
    height: 100,
    color: 'black',
    eyeColor: "white",
    valocityX: 0,
    valocityY: 1
  }

  let laserValocityX = 0
  let laserValocityY = 0
  //let laserEndX = player.x + player.width/2 +2
  //let laserEndY = player.y + 38
  let laserEndX = player.x + player.width/2 +2
  let laserEndY = player.y + 38
  /*const laserEnd = {
    x: player.x + player.width/2 +2,
    y: player.y + 38
  }*/

  const playerAction = {
    drawitem(context){
      //left ear
      context.fillStyle = "gray"
      context.fillRect(player.x + 30, player.y, 2, 30)

      //right ear
      context.fillStyle = "gray"
      context.fillRect(player.x + 68, player.y, 2, 30)

      //head
      context.fillStyle = "gray"
      context.fillRect(player.x + 30, player.y + 30, 40, 10)

      //body
      context.fillStyle = "gray"
      context.fillRect(player.x + 40, player.y + 25, 20, 50)

      //eye
      context.fillStyle = player.eyeColor
      context.beginPath()
      context.moveTo(player.x + 50, player.y + 45)
      context.lineTo(player.x + 45, player.y + 35)
      context.lineTo(player.x + 55, player.y + 35)
      context.lineTo(player.x + 50, player.y + 45)
      context.fill()
      context.closePath()

      //laser

      /*context.fillStyle = player.eyeColor
      context.beginPath();
      context.arc(player.x + player.width/2 + laserValocityX, player.y + 38, 3, 0, 2 * Math.PI);
      context.fill()*/
      context.beginPath();
      /*context.moveTo(player.x + player.width/2, player.y + 38)
      context.lineTo(laserEndX, laserEndY);*/
      context.moveTo(laserEndX, laserEndY)
      context.lineTo(player.x + player.width/2, player.y + 38);
      //context.lineTo(player.x + player.width/2 + laserValocityX, player.y + 38 + laserValocityY);
      context.strokeStyle = 'red';
      context.stroke();


      //left leg
      context.fillStyle = 'gray'
      context.beginPath()
      context.moveTo(player.x + 40, player.y + 100)
      context.lineTo(player.x + 40, player.y + 50)
      context.lineTo(player.x + 55, player.y + 50)
      context.lineTo(player.x + 40, player.y + 100)
      context.fill()
      context.closePath()

      //right leg
      context.fillStyle = 'gray'
      context.beginPath()
      context.moveTo(player.x + 60, player.y + 100)
      context.lineTo(player.x + 45, player.y + 50)
      //context.bezierCurveTo(player.x + 120, player.y, player.x + 120, player.y + 200, player.x + 60, player.y + 200);
      context.lineTo(player.x + 60, player.y + 50)
      context.lineTo(player.x + 60, player.y + 100)
      context.fill()
      context.closePath()
    }
  }

  player.drawitem = playerAction.drawitem


  ////Platform

  const Platform = (positionX, positionY) => {
    return {
      x: positionX,
      y: positionY,
      width: 200,
      height: 50,
      color: "black",
      valocityX: 0,
      valocityY: 0
    }
  }

  const PlatformAction = {
    drawitem(context, platform){
      context.fillStyle = platform.color
      context.fillRect(platform.x , platform.y, platform.width, platform.height)
    }
  }

  Platform.drawitem = PlatformAction.drawitem

  //const platform = new Platform(400, 400)
  //const platforms = [new Platform(400, 400), new Platform(1000, 400)]
  const platform = Platform(400, 400)
  const platforms = [Platform(600, 350), Platform(1200, 400), Platform(1600, 300), Platform(1910, 400), Platform(2300, 300), Platform(2800, 450),Platform(3200, 400)]


  ////enemy

  const enemy = {
    x: 500,
    y: 200,
    width: 100,
    height: 100,
    color: '#222831',
    valocityX: 1,
    valocityY: 5
  }

  const enemyAction = {
    drawitem(context){
      context.fillStyle = enemy.color
      context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
    }
  }

  enemy.drawitem = enemyAction.drawitem

  const blade = {
    x: 1300,
    y: 500,
    width: 20,
    height: 100,
    valocityX: 0,
    valocityY: 0
  }

  const bladeAction = {
    drawitem(context){
      context.fillStyle = "black"
      context.fillRect(blade.x, blade.y, blade.width, blade.height)
    }
  }

  blade.drawitem = bladeAction.drawitem

  return (
    <div>
      <App 
        light={light} 
        player={player} 
        laserValocityX={laserValocityX} 
        laserValocityY={laserValocityY}  
        laserEndX={laserEndX}
        laserEndY={laserEndY}
        Platform={Platform}
        platform={platform}
        platforms={platforms}
        enemy={enemy}
        blade={blade}
      />
    </div>
  );
}

export default Items;