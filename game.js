var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;
var render = Matter.Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: 1200,
    height: 800,
    background: 'space.png',
    wireframes: false,
    showAngleIndicator: true
  }
});

engine.timing.timeScale = 0.8;

//Game classes below
class Projectile{
  constructor(x,y,r){
    this.dimensions = Matter.Bodies.circle(x, y, r, {
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
      render: {
        fillStyle: '#F35e66',
        strokeStyle: 'black',
        lineWidth: 1,
      }
    });
  }
}

class Character{
  constructor(x,y,w,h,texture){
    this.dimensions = Matter.Bodies.rectangle(x, y, w, h,{
        density: 0.01,
        friction: 0.7,
        frictionStatic: 0,
        frictionAir: 0.01,
        restitution: 0.5,
        ground: false,
        render: {
          fillStyle: '#000000',
          strokeStyle: 'black',
          lineWidth: 1,
          sprite: {
            texture: texture,
            xScale: 0.3,
            yScale: 0.3
          }
        }
    });
  }
}

class Fodder{
  constructor(x,y,w,h,texture){
    this.dimensions = Matter.Bodies.rectangle(x, y, w, h,{
      density: 0.1,
      friction: 0.7,
      frictionStatic: 0,
      frictionAir: 0.01,
      restitution: 0.5,
      ground: false,
      render: {
        fillStyle: '#000000',
        strokeStyle: 'black',
        lineWidth: 1,
        sprite: {
          texture: texture,
          xScale: 0.3,
          yScale: 0.3
        }
      }
    });
  }
}

class SlingShot {
  constructor(x,y,body){
    const options = {
      pointA: {
        x:x,
        y:y
      },
      bodyB: body,
      stiffness: 0.02,
      length: 20,
      render: {
        fillStyle: '#000000',
        strokeStyle: 'black',
        lineWidth: 1,
      }
    }
    this.sling = Matter.Constraint.create(options)
    Matter.World.add(world, this.sling)
  }
  
  fly(){
    this.sling.bodyB = null
    this.sling.pointA = null
  }
}


var ball = new Projectile(200, 400, 30).dimensions
var slingShot = new SlingShot(200, 400, ball)
var player = new Character(700, 400, 40, 120, 'alien.png').dimensions

Matter.World.add(world, [
  ball, 
  player, 
  new Fodder(600, 400, 77, 77, 'crate.png').dimensions, 
  new Fodder(600, 400, 77, 77, 'crate.png').dimensions,
  new Fodder(600, 400, 77, 77, 'crate.png').dimensions, 
  new Fodder(600, 400, 77, 77, 'crate.png').dimensions]);



var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
  element: myCanvas,
  constraint: {
    render: {
      visible: true
    },
    stiffness:0.5
  }
});

mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
Matter.World.add(world, mouseConstraint);

//Allows the ball to be released 1 second after the user releases the mouse
myCanvas.addEventListener('mouseup', function(){
  setTimeout(() => {
    slingShot.fly() 
  }, 100)
})

//Create 4 walls to play the game within.
var ceiling = Matter.Bodies.rectangle(700, 0, 1400, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});

var floor = Matter.Bodies.rectangle(700, 800, 1400, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});

var left_wall = Matter.Bodies.rectangle(20, 400, 40, 720, {
  isStatic: true,
  render: {
    visible: true
  }
});

var right_wall = Matter.Bodies.rectangle(1180, 400, 40, 720, {
  isStatic: true,
  render: {
    visible: true
  }
});

//Add gameplay area to world
Matter.World.add(world, [floor, ceiling, left_wall, right_wall]);



Matter.Engine.run(engine);
Matter.Render.run(render);
