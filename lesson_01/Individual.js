var evoMod = (function (evo) {

    evo.generateIndividual = function (part1, part2) {
        var part1 = part1 || generateRandomBitString(5),
            part2 = part2 || generateRandomBitString(part1.length);

        function generateRandomBitString(len) {
            var len = len || 3,
                myRand = '',
                i;

            for (i = 0; i < len; i++) {
                myRand += Math.round(Math.random());
            }

            return myRand;
        }

        function binToInt(binString) {
            var i,
                intNum = 0,
                binStringLength = binString.length;

            for (i = binStringLength-1; i>=0; i--) {
                if (binString.charAt(i) === '1') {
                    intNum += Math.pow(2, binStringLength-i-1);// 2^wertigkeit
                }
            }

            return intNum;
        }

        function getRealD() {
            return binToInt(part1);
        }

        function getRealH() {
            return binToInt(part2);
        }

        function f() {
            return ((Math.PI * Math.pow(getRealD(), 2)) / 2) + Math.PI * getRealD() * getRealH();
        }

        function g() {
            return ((Math.PI * Math.pow(getRealD(), 2) * getRealH()) / 4);
        }

        // interface
        return{
            binVal: part1 + part2,
            realD: getRealD(),
            realH: getRealH(),
            fVal: f(),
            gVal: g()
        };
    }

    return evo;

}(evoMod || {}));