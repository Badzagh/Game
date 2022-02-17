import App from '../App';

function Items ({startGame, setStartGame}){

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
      context.beginPath();
      context.arc(light.x, light.y, light.width, 0, 2 * Math.PI);
      context.fill()

      ////triangle light
      context.fillStyle = '#F9DC5C'
      context.beginPath()
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
      color: "black"
    }
  }

  const PlatformAction = {
    drawitem(context, platform){
      context.fillStyle = platform.color
      context.fillRect(platform.x , platform.y, platform.width, platform.height)
    }
  }

  Platform.drawitem = PlatformAction.drawitem

  const Platforms = [Platform(600, 350), Platform(1200, 400), Platform(1565, 300), Platform(1840, 400), Platform(2200, 300), Platform(2700, 450),Platform(3100, 400)]


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

  ////blades
  const BladeUpDirection = (positionX, positionY, widthB, heightB, colorB) =>  {
    return {
      x: positionX,
      y: positionY,
      width: widthB,
      height: heightB,
      color: colorB
    }
  }

  const bladeUpDirectionAction = {
    drawitem(context, blade){
      context.fillStyle = blade.color
      context.beginPath()
      context.moveTo(blade.x + blade.width/2, blade.y)
      context.lineTo(blade.x, blade.y + blade.height)
      context.lineTo(blade.x + blade.width, blade.y + blade.height)
      context.lineTo(blade.x + blade.width/2, blade.y)
      context.fill()
      context.closePath()
    }
  }

  BladeUpDirection.drawitem = bladeUpDirectionAction.drawitem

  const BladesUpDirection = [BladeUpDirection(1300, 500, 20, 100, "black"), BladeUpDirection(1600, 400, 100, 200, "black"), BladeUpDirection(1840, 350, 50, 50, "black"), BladeUpDirection(1890, 380, 110, 20, "#222831")]

  //down
  const BladeDownDirection = (positionX, positionY, widthB, heightB, colorB) =>  {
    return {
      x: positionX,
      y: positionY,
      width: widthB,
      height: heightB,
      color: colorB
    }
  }

  const bladeDownDirectionAction = {
    drawitem(context, blade){
      context.fillStyle = blade.color
      context.beginPath()
      context.moveTo(blade.x + blade.width/2, blade.y)
      context.lineTo(blade.x, blade.y - blade.height)
      context.lineTo(blade.x + blade.width, blade.y - blade.height)
      context.lineTo(blade.x + blade.width/2, blade.y)
      context.fill()
      context.closePath()
    }
  }

  BladeDownDirection.drawitem = bladeDownDirectionAction.drawitem

  const BladesDownDirection = [BladeDownDirection(2220, 370, 30, 20, "#222831"), BladeDownDirection(2250, 370, 30, 20, "#222831"), BladeDownDirection(2280, 370, 30, 20, "#222831"), BladeDownDirection(2310, 370, 30, 20, "#222831"), BladeDownDirection(2340, 370, 30, 20, "#222831"), BladeDownDirection(2700, 120, 30, 20, "#222831"), BladeDownDirection(2730, 120, 30, 20, "#222831"), BladeDownDirection(2760, 120, 30, 20, "#222831"), BladeDownDirection(2790, 120, 30, 20, "#222831"), BladeDownDirection(2820, 120, 30, 20, "#222831"), BladeDownDirection(2850, 120, 30, 20, "#222831")]

  //left
  const BladeLeftDirection = (positionX, positionY, widthB, heightB, colorB) =>  {
    return {
      x: positionX,
      y: positionY,
      width: widthB,
      height: heightB,
      color: colorB
    }
  }

  const bladeLeftDirectionAction = {
    drawitem(context, blade){
      context.fillStyle = blade.color
      context.beginPath()
      context.moveTo(blade.x, blade.y + blade.height/2)
      context.lineTo(blade.x + blade.width, blade.y)
      context.lineTo(blade.x + blade.width, blade.y + blade.height)
      context.lineTo(blade.x, blade.y + blade.height/2)
      context.fill()
      context.closePath()
    }
  }

  BladeLeftDirection.drawitem = bladeLeftDirectionAction.drawitem

  const BladesLeftDirection = [BladeLeftDirection(2660, 450, 40, 30, "#222831"), BladeLeftDirection(2660, 480, 40, 30, "#222831"), BladeLeftDirection(2660, 510, 40, 30, "#222831"), BladeLeftDirection(2660, 540, 40, 30, "#222831"), BladeLeftDirection(2660, 570, 40, 30, "#222831")]



  //coins
  const Coin = (positionX, positionY) =>  {
    return {
      x: positionX,
      y: positionY,
      width: 18,
      height: 28,
    }
  }

  const CoinAction = {
    drawitem(context, coin){
      context.fillStyle = "#222831"
      context.fillRect(coin.x, coin.y, coin.width, coin.height)
    }
  }

  Coin.drawitem = CoinAction.drawitem

  const Coins = [Coin(650, 300), Coin(690, 300), Coin(730, 300), Coin(1250, 350), Coin(1290, 350), Coin(1330, 350), Coin(1470, 270), Coin(1630, 250), Coin(1670, 250), Coin(1710, 250), Coin(1970, 350), Coin(2010, 350), Coin(2300, 400), Coin(2300, 450), Coin(2300, 500), Coin(2250, 250 ), Coin(2290, 250), Coin(2360, 250), Coin(2750, 400 ), Coin(2860, 400) ]



  return (
    <div>
      <App 
        light={light} 
        player={player} 
        Platform={Platform}
        Platforms={Platforms}
        enemy={enemy}
        BladeUpDirection={BladeUpDirection}
        BladesUpDirection={BladesUpDirection}
        BladeDownDirection={BladeDownDirection}
        BladesDownDirection={BladesDownDirection}
        BladeLeftDirection={BladeLeftDirection}
        BladesLeftDirection={BladesLeftDirection}
        startGame={startGame}
        setStartGame={setStartGame}
        Coin={Coin}
        Coins={Coins}
      />
    </div>
  );
}

export default Items;