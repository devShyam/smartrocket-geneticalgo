
function Population() {
    this.rockets = [];
    this.popsize = 100;
    this.maxfit = 0;
    this.matingpool = [];

    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.showRockets = function () {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    };

    this.evaluate = function () {
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
    this.selection = function () {
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
