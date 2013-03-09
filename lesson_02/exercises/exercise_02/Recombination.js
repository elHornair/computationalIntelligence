var evoMod = (function (evo) {

    "use strict";

    evo.averageObjectRecombine = function (pool) {
        var i,
            hSum = 0,
            dSum = 0;

        // fill population with randomly picked parent individuals to keep population size constant
        for (i = 0; i < pool.length; i++) {
            dSum += pool[i].getD();
            hSum += pool[i].getH();
        }

        return evo.generateIndividual(dSum / 3, hSum / 3);
    };

    return evo;

}(evoMod || {}));