
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
    this.crossover = function (ma) {
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
