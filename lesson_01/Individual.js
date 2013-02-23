var evoMod = (function (evo) {

    "use strict";

    evo.generateRandomBitString  = function (len) {
        var myRand = '',
            i;

        if (!len) {
            len = 3;
        }

        for (i = 0; i < len; i++) {
            myRand += Math.round(Math.random());
        }

        return myRand;
    };

    evo.generateIndividual = function (part1, part2) {
        // default values
        if (!part1) {
            part1 = evo.generateRandomBitString(5);
        }
        if (!part2) {
            part2 = evo.generateRandomBitString(part1.length);
        }

        function binToInt(binString) {
            var i,
                intNum = 0,
                binStringLength = binString.length;

            for (i = binStringLength - 1; i >= 0; i--) {
                if (binString.charAt(i) === '1') {
                    intNum += Math.pow(2, binStringLength - i - 1);// 2^weight
                }
            }
            return intNum;
        }

        // binary encoded data of the individual
        function getBinVal() {
            return part1 + part2;
        }

        function setBinVal(binVal) {
            part1 = binVal.substring(0, binVal.length / 2);
            part2 = binVal.substring(binVal.length / 2);
        }

        // diameter as real number
        function getRealD() {
            return binToInt(part1);
        }

        // height as real number
        function getRealH() {
            return binToInt(part2);
        }

        // surface, to be minimized
        function f() {
            return ((Math.PI * Math.pow(getRealD(), 2)) / 2) + Math.PI * getRealD() * getRealH();
        }

        // volume, additional condition
        function g() {
            return ((Math.PI * Math.pow(getRealD(), 2) * getRealH()) / 4);
        }

        // additional condition: volume must be >= 300
        function isValid() {
            return g() >= 300;
        }

        // interface
        return {
            getBinVal: getBinVal,
            setBinVal: setBinVal,
            getRealD: getRealD,
            getRealH: getRealH,
            getF: f,
            getG: g,
            isValid: isValid
        };
    };

    return evo;

}(evoMod || {}));