/*global Raphael */
var evoMod = (function (evo) {

    "use strict";

    evo.displayGraphic = function (populationHistory) {

        var r = new Raphael("holder", 620, 250),
            i,
            clr = [],
            values = [],
            currentGenerationIndex = 0,
            label,
            rightc,
            right,
            leftc,
            left,
            c,
            bg,
            dotsy = [];

        function addGenerationPath(j, generation) {
            var path = "",
                i,
                x = 10,
                y = 0,
                length = generation.length;

            // sort population by f value
            generation.sort(function sortFun(a, b) {
                return a.getF() - b.getF();
            });

            // calculate path for this generation
            dotsy[j] = dotsy[j] || [];
            for (i = 0; i < length; i++) {
                dotsy[j][i] = generation[i].getF() / 20;
                if (i !== 0) {
                    x += 20;
                    y = 240 - dotsy[j][i];
                    path += "," + [x, y];
                } else {
                    path += "M" + [10, (y = 240 - dotsy[j][i])] + "R";
                }
            }
            return path;
        }

        function animateStats() {
            var time = 500,
                anim = Raphael.animation({path: values[currentGenerationIndex], stroke: clr[currentGenerationIndex]}, time, "<>");

            c.animate(anim);
            bg.animateWith(c, anim, {path: values[currentGenerationIndex] + "L590,250 10,250z", fill: clr[currentGenerationIndex]}, time, "<>");
            label.attr({text: 'Gen. ' + (currentGenerationIndex + 1)});
        }

        function showNext() {
            if (currentGenerationIndex < (populationHistory.length - 1)) {
                currentGenerationIndex++;
                animateStats();
            }
        }

        function showPrev() {
            if (currentGenerationIndex >= 1) {
                currentGenerationIndex--;
                animateStats();
            }
        }

        // setup graphics
        label = r.text(310, 27, 'Gen. 1').attr({fill: "#fff", stroke: "none", "font": '100 18px "Helvetica Neue", Helvetica, "Arial Unicode MS", Arial, sans-serif'});
        rightc = r.circle(364, 27, 10).attr({fill: "#fff", stroke: "none"});
        right = r.path("M360,22l10,5 -10,5z").attr({fill: "#000"});
        leftc = r.circle(256, 27, 10).attr({fill: "#fff", stroke: "none"});
        left = r.path("M260,22l-10,5 10,5z").attr({fill: "#000"});
        c = r.path("M0,0").attr({fill: "none", "stroke-width": 4, "stroke-linecap": "round"});
        bg = r.path("M0,0").attr({stroke: "none", opacity: 0.3});

        // navigation
        rightc.click(showNext);
        right.click(showNext);
        leftc.click(showPrev);
        left.click(showPrev);

        // populate with data
        for (i = 0; i < populationHistory.length; i++) {
            values[i] = addGenerationPath(i, populationHistory[i]);
            clr[i] = Raphael.getColor(1);
        }

        c.attr({path: values[0], stroke: clr[0]});
        bg.attr({path: values[0] + "L590,250 10,250z", fill: clr[0]});

    };

    return evo;

}(evoMod || {}));