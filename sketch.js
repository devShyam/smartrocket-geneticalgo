var count = 0;
var life = 600;
var liveP; // html p element to show lifespan
var target;

//beta population
var p1;

function setup() {
  universesize = 600;
  iter = 0;
  createCanvas(universesize, universesize);
  p1 = new Population();
  lifeP = createP();
  iterP = createP();
  target = createVector(width / 2, 70);
  maxF = createP();
  //beta rocket
  //b1 =new Rocket();

  //first Population
}

function draw() {
  //draws background
  background(0);

  //see rockets;
  p1.showRockets();
  lifeP.html(["time", 600 - count]);
  iterP.html(["iteration", iter]);

  if (count == life) {
    count = 0;
    p1.evaluate();
    p1.selection();
    iter += 1;
  } else {
    count++;
  }
  ellipse(target.x, target.y, 20, 20);
}
