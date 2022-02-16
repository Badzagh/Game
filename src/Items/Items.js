import App from '../App';

function Items ({startGame, setStartGame}){
  ////light
  //const startGameBool = startGame
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
    width: 40,
    height: 100,
    color: '#222831',
    eyeColor: "white",
    valocityX: 0,
    valocityY: 1
  }

  const playerAction = {
    drawitem(context){
      //left ear
      context.fillStyle = "gray"
      context.fillRect(player.x, player.y, 2, 30)

      //right ear
      context.fillStyle = "gray"
      context.fillRect(player.x + 38, player.y, 2, 30)

      //head
      context.fillStyle = "gray"
      context.fillRect(player.x, player.y + 30, 40, 10)

      //body
      context.fillStyle = "gray"
      context.fillRect(player.x + 10, player.y + 25, 20, 50)

      //eye
      context.fillStyle = player.eyeColor
      context.beginPath()
      context.moveTo(player.x + 20, player.y + 45)
      context.lineTo(player.x + 15, player.y + 35)
      context.lineTo(player.x + 25, player.y + 35)
      context.lineTo(player.x + 20, player.y + 45)
      context.fill()
      context.closePath()

      //left leg
      context.fillStyle = 'gray'
      context.beginPath()
      context.moveTo(player.x + 10, player.y + 100)
      context.lineTo(player.x + 10, player.y + 50)
      context.lineTo(player.x + 25, player.y + 50)
      context.lineTo(player.x + 10, player.y + 100)
      context.fill()
      context.closePath()

      //right leg
      context.fillStyle = 'gray'
      context.beginPath()
      context.moveTo(player.x + 30, player.y + 100)
      context.lineTo(player.x + 15, player.y + 50)
      //context.bezierCurveTo(player.x + 120, player.y, player.x + 120, player.y + 200, player.x + 60, player.y + 200);
      context.lineTo(player.x + 30, player.y + 50)
      context.lineTo(player.x + 30, player.y + 100)
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

  const Platforms = [Platform(600, 350), Platform(1200, 400), Platform(1580, 300), Platform(1840, 400), Platform(2200, 300), Platform(2700, 450),Platform(3100, 400)]


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

  const Blade = (positionX, positionY, widthB, heightB, colorB) =>  {
    return {
      x: positionX,
      y: positionY,
      width: widthB,
      height: heightB,
      valocityX: 0,
      valocityY: 0,
      color: colorB
    }
  }

  const bladeAction = {
    drawitem(context, blade){
      context.fillStyle = blade.color
      context.fillRect(blade.x, blade.y, blade.width, blade.height)
    }
  }

  Blade.drawitem = bladeAction.drawitem

  const Blades = [Blade(1300, 500, 20, 100, "#222831"), Blade(1600, 400, 100, 200, "#222831"), Blade(1840, 350, 50, 50, "#222831"), Blade(1890, 380, 120, 20, "#222831"), Blade(2200, 350, 200, 20, "#222831"), Blade(2660, 450, 40, 150, "#222831"), Blade(2700, 150, 200, 40, "black")]

  return (
    <div>
      <App 
        light={light} 
        player={player} 
        Platform={Platform}
        Platforms={Platforms}
        enemy={enemy}
        Blade={Blade}
        Blades={Blades}
        startGame={startGame}
        setStartGame={setStartGame}
      />
    </div>
  );
}

export default Items;