var evoMod = (function (evo) {

    evo.generateIndividual = function (part1, part2) {
        var part1 = part1 || generateRandomBitString(5),
            part2 = part2 || generateRandomBitString(part1.length);

        function generateRandomBitString (len) {
            var len = len || 3,
                myRand = '',
                i;

            for (i = 0; i < len; i++) {
                myRand += Math.round(Math.random());
            }

            return myRand;
        }

        function binToInt (binString) {
            var i,
                intNum = 0,
                binStringLength = binString.length;

            for (i = binStringLength-1; i>=0; i--) {
                if (binString.charAt(i) === '1') {
                    intNum += Math.pow(2, binStringLength-i-1);// 2^weight
                }
            }

            return intNum;
        }

        // binary encoded data of the individual
        function getBinVal () {
            return part1 + part2;
        }

        // diameter as real number
        function getRealD () {
            return binToInt(part1);
        }

        // height as real number
        function getRealH () {
            return binToInt(part2);
        }

        // surface, to be minimized
        function f () {
            return ((Math.PI * Math.pow(getRealD(), 2)) / 2) + Math.PI * getRealD() * getRealH();
        }

        // volume, additional condition
        function g () {
            return ((Math.PI * Math.pow(getRealD(), 2) * getRealH()) / 4);
        }

        // additional condition: volume must be >= 300
        function isValid () {
            return g() >= 300;
        }

        // interface
        return{
            binVal: getBinVal(),
            realD: getRealD(),
            realH: getRealH(),
            fVal: f(),
            gVal: g(),//
            isValid: isValid
        };
    };

    return evo;

}(evoMod || {}));