var evoMod = (function (evo) {

    "use strict";

    function getNormSample(sigma) {
        var u = 0,
            x = Math.random(),
            fakt1,
            fakt2,
            fakt3;

        fakt1 = 1 / (sigma * (Math.sqrt(2 * Math.PI)));
        fakt2 = Math.E;
        fakt3 = -0.5 * Math.pow(x - u, 2) / Math.pow(sigma, 2);

        return fakt1 * Math.pow(fakt2, fakt3);
    }

    evo.isotropicObjectMutation = function (individual) {
        // TODO: selbstadaption für pm und sigma
        var pm = 0.1,
            direction = (Math.random() > 0.5) ? 1 : -1,
            sigma = 1;

        // mutate d
        if (Math.random() < pm) {
            individual.setD(individual.getD() + direction * getNormSample(sigma));// TODO: richtiger weg mit direction?
        }

        // mutate h
        if (Math.random() < pm) {
            individual.setH(individual.getH() + direction * getNormSample(sigma));// TODO: richtiger weg mit direction?
        }

        return individual;
    };

    return evo;

}(evoMod || {}));