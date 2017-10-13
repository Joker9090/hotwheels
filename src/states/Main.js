import Car from './../objects/car';
import Stage from './../objects/stage';

var _Stage = new Stage();
var _Car = new Car().createCar;

var p_start = 0, p_reBuild = 0;

var blocks, car, ramp, moveStick, spaceKey;
var ace ;
export default class Main extends Phaser.State {
  preload(){
    this.load.image('block', '/app/dist/img/32x32.png');
    this.load.physics('physicsData', '/app/dist/sprites.json');
  }

  create(){

    // game.physics.startSys;
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 50;
    game.physics.p2.defaultRestitution = 0.01;
    game.physics.p2.setImpactEvents(true);


    blocks = game.add.group();

    car = _Car({ x: 96, y: game.height-48 });
    car.render = game.add.tileSprite(car.x, car.y, car.width, car.height, 'block');
    game.physics.p2.enable(car.render);
    car.render.body.gravity.y = 1200;
    // car.render.anchor.setTo(0, 0.5);
    this.createPartOfStage();
    this.createPartOfStage();
    this.createRamp();
    game.camera.follow(car.render);

    // moveStick = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    //game.scale.setGameSize(640, 480);
    p_start = game.camera.bounds.width;
    p_reBuild = game.camera.bounds.width + ( game.camera.bounds.width / 2 );

    var graphics = game.add.graphics(240, 320);
    graphics.beginFill(0xFF3300);
    // draw a shape
    graphics.moveTo(320,0);
    //   320, 0 , 320, 128 , 0, 128  ]
    graphics.lineTo(320, 128);
    graphics.lineTo(0, 128);
    graphics.endFill();
    ramp = game.add.tileSprite(400, (game.height-(32*3)) +1, 32*10, (32*4), "block");
    game.physics.p2.enable(ramp);
    ramp.body.clearShapes();
    ramp.body.loadPolygon('physicsData', 'ramp');
    ramp.body.kinematic = true;
    // ramp = game.add.tileSprite(100, game.height-32-160, 800, 160, "block");
    game.world.swap(ramp,car.render);

    car.render.body.createBodyCallback(blocks, this.hitPlatform, this);
  }
  hitPlatform(){
    console.log(123)
  }
  createRamp(){

  }
  update(){
    this.setNewPoints();

    if(spaceKey.isDown){
      car.render.body.velocity.x = 500;
    }
    game.world.setBounds(game.camera.view.x, 0, game.camera.view.x+1000, 480);

    //console.log(car.render.position.x);
    // if(hitPlatform || this.carInRamp()){
    //   console.log(123,hitPlatform,car.render.body.velocity.x)
    //   car.render.body.gravity.y = 0;
    //   if(moveStick.right.isDown){
    //     ace = true;
    //     if(this.carInRamp()){
    //       car.render.body.position.y -= 0.5;
    //       car.render.body.gravity.y = 0;
    //       if(car.render.angle < 45 ) car.render.angle -= 0.1;
    //     }
    //     car.render.body.velocity.x +=3;
    //   }else if(moveStick.left.isDown){
    //     ace = true;
    //     car.render.body.velocity.x -=3;
    //   }else{
    //     car.render.body.velocity.x +=(car.render.body.velocity.x > 0) ? -1 : (car.render.body.velocity.x < 0) ? 1: 0;
    //   }
    //   if (spaceKey.isDown){
    //     car.render.body.velocity.y = - 2;
    //   }
    // }else if(!ace && car.render.body.gravity.y == 0) {
    //   car.render.body.gravity.y = 4;
    //   car.render.body.velocity.x+= (car.render.body.velocity.x > 4.2) ? (- 4.2) : (car.render.body.velocity.x < -4.2) ? (+ 4.2) : 0 ;
    // }else{
    //   if(car.render.angle < 0 ) car.render.angle += 0.05;
    //   ace = false;
    // }
  }
  render(){
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(car.render, 32, 500);
  }
  carInRamp(){
    return ((car.render.position.x < ramp.position.x + ramp.width && car.render.position.x > ramp.position.x ) &&
           ( car.render.position.y < ramp.position.y + ramp.width && car.render.position.y > ramp.position.y) )
  }
  setNewPoints(){
    p_start = game.camera.bounds.width;
    if(p_start > p_reBuild) {
      p_start = p_reBuild;
      p_reBuild = game.camera.bounds.width + ( game.camera.bounds.width / 2 );
      this.createPartOfStage();
    }
  }
  createPartOfStage(){
    this.createFloor();
  }
  createFloor(){
    for (var i = 0; i < (game.width / 32); i++) {
      var last_block = blocks.children[blocks.children.length-1];
      var block;
      if(last_block === undefined){
        block = game.add.tileSprite(0, game.height-16, 32, 32 ,'block');
      }else{
        block = game.add.tileSprite(last_block.position.x+32, game.height-16, 32, 32 ,'block');
      }
      // block.reset(x,y);
      blocks.add(block);
      game.physics.p2.enable(block);
      block.body.kinematic = true;
    }
  }

}
