var evoMod = (function (evo) {

    "use strict";

    function recombineSingePoint(ind1, ind2) {
        var cutIndex = Math.round(Math.random() * (ind1.getBinVal().length - 2)) + 1,
            part1 = ind1.getBinVal().substring(0, cutIndex),
            part2 = ind2.getBinVal().substring(cutIndex),
            partsCombined = part1 + part2,
            newInds = [];

        part1 = partsCombined.substring(0, partsCombined.length / 2);
        part2 = partsCombined.substring(partsCombined.length / 2);

        newInds.push(evo.generateIndividual(part1, part2));

        part1 = ind2.getBinVal().substring(0, cutIndex);
        part2 = ind1.getBinVal().substring(cutIndex);
        partsCombined = part1 + part2;
        part1 = partsCombined.substring(0, partsCombined.length / 2);
        part2 = partsCombined.substring(partsCombined.length / 2);

        newInds.push(evo.generateIndividual(part1, part2));

        return newInds;
    }

    function selectRandomIndividual(population) {
        return population[Math.round(Math.random() * (population.length - 1))];
    }

    evo.doSinglePointRecombination = function (population, amountOfNewIndividuals) {
        var i,
            originalPopulationLength = population.length,
            newPopulation = [];

        // create n new individuals by recombination
        for (i = 0; i < (amountOfNewIndividuals / 2); i++) {
            newPopulation = newPopulation.concat(
                recombineSingePoint(selectRandomIndividual(population), selectRandomIndividual(population))
            );
        }

        // fill population with randomly picked parent individuals to keep population size constant
        for (i = 0; i < (originalPopulationLength - amountOfNewIndividuals); i++) {
            newPopulation.push(selectRandomIndividual(population));
        }

        return newPopulation;
    };

    return evo;

}(evoMod || {}));