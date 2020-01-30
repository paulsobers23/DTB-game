var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;
var render = Matter.Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: 1400,
    height: 600,
    background: '000000',
    wireframes: false,
    showAngleIndicator: true
  }
});

var ball = Matter.Bodies.circle(600, 400, 30, {
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

var player = Matter.Bodies.circle(540, 400, 40, {
  density: 0.001,
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
      texture: 'alien.png',
    }
  }
});

Matter.World.add(world, [ball, player]);

var keyPresses = {};
document.body.addEventListener("keydown", function(e) {
  keyPresses[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
  keyPresses[e.keyCode] = false;
});

var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
  element: myCanvas,
  constraint: {
    render: {
      visible: true
    },
    stiffness:0.8
  }
});
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
Matter.World.add(world, mouseConstraint);

var ceiling = Matter.Bodies.rectangle(800, 0, 1400, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});

var floor = Matter.Bodies.rectangle(800, 600, 1400, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});

var left_wall = Matter.Bodies.rectangle(400, 600, 800, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});
Matter.World.add(world, [floor, ceiling]);

Matter.Engine.run(engine);
Matter.Render.run(render);