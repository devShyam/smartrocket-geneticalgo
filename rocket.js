
function Rocket(child) {

    //completion of journey boolean
    this.completed = false;

    //crashed boolean 
    this.crashed = false;
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
    this.applyForce = function (force) {
        this.acc.add(force);
    };

    this.calcFitness = function () {
        var d = abs(dist(this.pos.x, this.pos.y, target.x, target.y));
        this.fitness = map(d, 0, width, width, 0);

        if (this.completed) {
            this.fitness *= 10;
        }
    };

    this.update = function () {

        if (this.pos.x > universesize || this.pos.y > universesize || this.pos.x < 0 || this.pos.y < 0) {
            this.crashed = true;
        }
        var d = abs(dist(this.pos.x, this.pos.y, target.x, target.y));

        if (d < 20) {
            this.completed = true;
            this.pos = target.copy();
        }
        if (!this.completed && !this.crashed) {

            this.applyForce(this.dna.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(5);
        }
    };
    //end of physics engine
    //see rocket
    this.show = function () {
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
