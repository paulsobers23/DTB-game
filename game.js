var myCanvas = document.getElementById('world');
var engine = Matter.Engine.create();
var world = engine.world;
var render = Matter.Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    background: '000000',
    wireframes: false,
    showAngleIndicator: true
  }
});

var ball = Matter.Bodies.circle(400, 400, 30, {
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.8,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: 'black',
    lineWidth: 1,
    // sprite: {
    //   texture: sprite img,
    //     height: 50,
    //     width: 50
    // }
  }
});

Matter.World.add(world, ball);

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

var ceiling = Matter.Bodies.rectangle(400, 0, 800, 80, {
  isStatic: true,
  render: {
    visible: true
  }
});

var floor = Matter.Bodies.rectangle(400, 600, 800, 80, {
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