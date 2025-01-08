
class Network {
    constructor(data, next = null) {
        this.layers = 0;
        this.head = null;
    }
    
    push(neuron) {
        if (this.layers != 0) {
            this.head = neuron;
        } else {
            console.log('there is not a layer to push this neuron in');
        }
    }
    
    list() {
        console.log("hello")
    }

    addLayer() {
        this.layers = this.layers + 1;
    }

    info() {
        console.log("layers:" + this.layers);
    }
}


class Layer {
    constructor () {
        this.n = 0;
    }
}

class Neuron {
    constructor () {
        this.place = 0;
    }

    move (newplace) {
        console.log("idk");
    }
}
