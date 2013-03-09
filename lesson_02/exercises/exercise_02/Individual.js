var evoMod = (function (evo) {

    "use strict";

    evo.generateIndividual = function (d, h) {

        var age = 0;

        d = d || Math.round(31 * Math.random());
        h = h || Math.round(31 * Math.random());

        // diameter as real number
        function getD() {
            return d;
        }

        function setD(newD) {
            d = newD;
        }

        // height as real number
        function getH() {
            return h;
        }

        function setH(newH) {
            h = newH;
        }

        // surface, to be minimized
        function f() {
            return ((Math.PI * Math.pow(d, 2)) / 2) + Math.PI * d * h;
        }

        // volume, additional condition
        function g() {
            return ((Math.PI * Math.pow(d, 2) * h) / 4);
        }

        // additional condition: volume must be >= 300
        function isValid() {
            return g() >= 300;
        }

        // age of the individual
        function getAge() {
            return age;
        }

        function increaseAge() {
            age++;
        }

        // interface
        return {
            setD: setD,
            getD: getD,
            setH: setH,
            getH: getH,
            getF: f,
            getG: g,
            getAge: getAge,
            increaseAge: increaseAge,
            isValid: isValid
        };
    };

    return evo;

}(evoMod || {}));