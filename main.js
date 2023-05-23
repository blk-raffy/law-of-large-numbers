import { plot } from 'nodeplotlib';
import crypto from 'crypto';

class Thrower {
    heads = 0;    
    headsFrequency = [];
    tails = 0;
    tailsFrequency = [];
    throws = [];
    throwsResult = [];
    errors = [];
    error = 0;

    constructor() {
        this.heads = 0;
        this.tails = 0;
        this.throws = [];
        this.throwsResult = [];
        this.errors = [];
        this.error = 0;
    }

    throw() {
        let random = crypto.randomInt(0, 2);
        return random;
    }

    throwCoins(n) {
        for (let i = 0; i < n; i++) {
            let result = this.throw();
            this.throwsResult.push(result);

            this.throws.push(this.throws.length + 1);

            if (result === 0) {
                this.heads++;

                let frequency = this.heads / this.throws.length;
                this.headsFrequency.push(frequency);
            } else {
                this.tails++;

                let frequency = this.tails / this.throws.length;
                this.tailsFrequency.push(frequency);
            }

            if (this.throwsResult.length % 2 == 0) {
                let half = this.throwsResult.length/2;
                let temporaryError = half - this.heads;
                this.errors.push(temporaryError);
            }
        }
    }

    getPercentageError() {
        let sum = 0;
        for (let i = 0; i < this.errors.length; i++) {
            sum += this.errors[i];
        }
        return sum / this.errors.length;
    }

    getHeads() {
        return this.heads;
    }

    getTails() {
        return this.tails;
    }

    getThrows() {
        return this.throws;
    }

    getThrowsResult() {
        return this.throwsResult;
    }

    getErrors() {
        return this.errors;
    }

    getHeadsFrequency() {
        return this.headsFrequency;
    }

    getTailsFrequency() {
        return this.tailsFrequency;
    }
}


let thrower = new Thrower();

thrower.throwCoins(1000);

console.log(`testa: ${thrower.getHeads()}`);
console.log(`croce: ${thrower.getTails()}`);
//console.log(thrower.getThrowsResult());
//console.log(thrower.getErrors());
//console.log(thrower.getPercentageError())

const plotData = [{
    x: thrower.getThrows(),
    y: thrower.getErrors(),
    type: 'scatter',
    name: "Errori / lanci totali"
}]

plot(plotData);

const plotData1 = [{
    x: thrower.getThrows(),
    y: thrower.getHeadsFrequency(),
    type: 'scatter',
    name: "Frequenza testa"
}]

plot(plotData1);

const plotData2 = [{
    x: thrower.getThrows(),
    y: thrower.getTailsFrequency(),
    type: 'scatter',
    name: "Frequenza croce"
}]

plot(plotData2);