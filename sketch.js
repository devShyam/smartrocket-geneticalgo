var count = 0;
var life = 600;
var liveP; // html p element to show lifespan
var target;

//beta population
var p1;

function DNA(genes) {
  if (genes) {
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i = 0; i < life; i++) {
      this.genes[i] = p5.Vector.random2D();
      //reduce the force of random vector generated
      this.genes[i].setMag(0.5);
    }
  }
  this.crossover = function(ma) {
    //newdna conatining genes of child
    var newdna = [];
    var index = random(0, life - 1);
    for (var i = 0; i < index; i++) {
      newdna[i] = this.genes[i];
    }
    for (var i = index; i < life; i++) {
      newdna[i] = ma.genes[i];
    }

    return new DNA(newdna);
  };
}

function Population() {
  this.rockets = [];
  this.popsize = 100;
  this.maxfit = 0;
  this.matingpool = [];

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.showRockets = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  };

  this.evaluate = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > this.maxfit) {
        this.maxfit = this.rockets[i].fitness;
      }
    }

    console.log(this.maxfit);
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= this.maxfit;
    }

    this.maxfit = 0;

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var temp = this.rockets[i].fitness * 100;
      for (var j = 0; j < temp; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  };
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.popsize; i++) {
      var pa = random(this.matingpool).dna;
      var ma = random(this.matingpool).dna;
      var child = pa.crossover(ma);
      newRockets[i] = new Rocket(child);
    }

    this.rockets = newRockets;
  };
}

function Rocket(child) {
  this.acc = createVector();
  this.vel = createVector();
  this.pos = createVector(width / 2, height);
  this.fitness = 0;
  if (child) {
    this.dna = child;
  } else {
    this.dna = new DNA();
  }

  //physics engine
  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.calcFitness = function() {
    var d = abs(dist(this.pos.x, this.pos.y, target.x, target.y));
    this.fitness = map(d, 0, width, width, 0);
  };
  this.update = function() {
    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(5);
  };
  //end of physics engine
  //see rocket
  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 7);
    pop();
  };
}
function setup() {
  createCanvas(600, 600);
  p1 = new Population();
  lifeP = createP();
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
  lifeP.html(count);

  if (count == life) {
    count = 0;
    p1.evaluate();
    p1.selection();
  } else {
    count++;
  }
  ellipse(target.x, target.y, 20, 20);
}
