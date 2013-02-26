/*global Raphael */
var evoMod = (function (evo) {

    "use strict";

    evo.displayGraphic = function (individualArr) {

        var r = new Raphael("holder", 500, 250),
            clr = [],
            values = [],
            c,
            d,
            bg;

        function addGenerationPath(individualArr, bestOf) {
            var path = "",
                i,
                x = 10,
                y = 0,
                bestFVal = individualArr[0].getF(),
                dotsy = [];

            // calculate path for this generation
            for (i = 0; i < individualArr.length; i++) {
                if (bestOf) {
                    bestFVal = Math.min(bestFVal, individualArr[i].getF());
                    dotsy[i] = bestFVal / 20;
                } else {
                    dotsy[i] = individualArr[i].getF() / 20;
                }
                if (i !== 0) {
                    // all individuals but the first
                    x += 5;
                    y = 240 - dotsy[i];
                    path += "," + [x, y];
                } else {
                    // first individual
                    path += "M" + [10, (y = 240 - dotsy[i])] + "R";
                }
            }
            return path;
        }
        // setup graphics
        c = r.path("M0,0").attr({fill: "none", "stroke-width": 4, "stroke-linecap": "round"});
        d = r.path("M0,0").attr({fill: "none", "stroke-width": 4, "stroke-linecap": "round"});
        bg = r.path("M0,0").attr({stroke: "none", opacity: 0.3});

        // populate with data
        values[0] = addGenerationPath(individualArr, false);
        values[1] = addGenerationPath(individualArr, true);
        clr[0] = Raphael.getColor(1);
        clr[1] = Raphael.getColor(1);

        c.attr({path: values[0], stroke: clr[0]});
        d.attr({path: values[1], stroke: clr[1]});
        bg.attr({path: values[0] + "L590,250 10,250z", fill: clr[0]});

    };

    return evo;

}(evoMod || {}));