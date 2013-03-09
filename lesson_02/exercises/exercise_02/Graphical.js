/*global Raphael */
var evoMod = (function (evo) {

    "use strict";

    evo.displayGraphic = function (individualArr) {

        var r = new Raphael("holder", 500, 250),
            clr = [],
            values = [],
            c,
            bg;

        function addGenerationPath(individualArr) {
            var path = "",
                i,
                x = 10,
                y = 0,
                dotsy = [];

            // calculate path for this generation
            for (i = 0; i < individualArr.length; i++) {
                dotsy[i] = individualArr[i].getF() / 10;

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
        bg = r.path("M0,0").attr({stroke: "none", opacity: 0.3});

        // populate with data
        values[0] = addGenerationPath(individualArr);
        clr[0] = Raphael.getColor(1);

        c.attr({path: values[0], stroke: clr[0]});
        bg.attr({path: values[0] + "L590,250 10,250z", fill: clr[0]});
    };

    return evo;

}(evoMod || {}));