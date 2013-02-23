var evoMod = (function (evo) {

    function recombineSingePoint(ind1, ind2) {
        var cutIndex = Math.round(Math.random() * (ind1.binVal.length - 2)) + 1,
            part1 = ind1.binVal.substring(0, cutIndex),
            part2 = ind2.binVal.substring(cutIndex),
            partsCombined = part1 + part2,
            newInds = [];

        part1 = partsCombined.substring(0, partsCombined.length / 2);
        part2 = partsCombined.substring(partsCombined.length / 2);

        newInds.push(evo.generateIndividual(part1, part2));

        part1 = ind2.binVal.substring(0, cutIndex);
        part2 = ind1.binVal.substring(cutIndex);
        partsCombined = part1 + part2;
        part1 = partsCombined.substring(0, partsCombined.length / 2);
        part2 = partsCombined.substring(partsCombined.length / 2);

        newInds.push(evo.generateIndividual(part1, part2));

        return newInds;
    }

    function selectRandomIndividual(population) {
        return population[Math.round(Math.random() * (population.length - 1))];
    }

    evo.doSinglePointRecombination = function (population) {
        var i,
            halfPopulationLength = population.length / 2,
            recombinedPopulation = [];

        for (i = 0; i < halfPopulationLength; i++) {
            recombinedPopulation = recombinedPopulation.concat(
                recombineSingePoint(selectRandomIndividual(population), selectRandomIndividual(population))
            );
        }

        return recombinedPopulation;
    };

    return evo;

}(evoMod || {}));