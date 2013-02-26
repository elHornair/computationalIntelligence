var evoMod = (function (evo) {

    "use strict";

    function invertBit(bit) {
        return (bit === '0') ? '1' : '0';
    }

    function mutateRandomBits(ind, pm) {
        var i,
            oldBinVal = ind.getBinVal(),
            newBinVal = '';

        for (i = 0; i < oldBinVal.length; i++) {
            newBinVal += (Math.random() <= pm) ? invertBit(oldBinVal[i]) : oldBinVal[i];
        }

        ind.setBinVal(newBinVal);
        return ind;
    }

    /**
     * Mutate a population
     *
     * @param {Array} population the original population
     * @param {Number} pm mutation probability
     * @return {Array} the mutated population
     */
    evo.doMutation = function (population, pm) {
        var i,
            mutatedPopulation = [];

        for (i = 0; i < population.length; i++) {
            mutatedPopulation.push(mutateRandomBits(population[i], pm));
        }

        return mutatedPopulation;
    };

    return evo;

}(evoMod || {}));