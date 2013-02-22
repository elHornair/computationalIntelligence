var evoMod = (function (evo) {

    function filterValidIndividuals (population) {
        var i,
            filteredPopulation = [];

        for (i = 0; i < population.length; i++) {
            if (population[i].isValid()) {
                filteredPopulation.push(population[i]);
            }
        }

        return filteredPopulation;
    }

    function generateRankMap (population) {
        var i,
            j,
            rankMap = [];

        // sort population - individual with lowest fVal has highest rank
        population.sort(function(a, b){
            return a.fVal - b.fVal
        });

        // rank map maps a number to an index in the population collection.
        // the lowest index in the population collection has the highest amount of appearances in the rank map,
        // because the better the ranking of an individual is, the lower it's index in the population collection is.
        // thus, the best ranked individuals appear in the rank map the most
        for (i = 0; i < population.length; i++) {
            for (j = 0; j < (population.length - i); j++) {
                rankMap.push(i);
            }
        }

        return rankMap;
    }

    evo.selectRankingBased = function (population) {
        var i,
            rankMap,
            originalPopulationLength = population.length,
            selectedPopulation = [];

        population = filterValidIndividuals(population);
        rankMap = generateRankMap(population);

        // select new values
        for (i = 0; i < originalPopulationLength; i++) {
            selectedPopulation.push(population[rankMap[Math.round(Math.random()*(rankMap.length-1))]]);
        }

        return selectedPopulation;
    };

    return evo;

}(evoMod || {}));