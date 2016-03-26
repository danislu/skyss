'use strict';

var UI = require('ui');
var Vector2 = require('vector2');

var init = function init(options) {
    var destinations = options.destinations,
        destText = [],
        selectedIndex = 0,
        i,
        dest,
        text;

    var wind = new UI.Window({
        fullscreen: true
    });

    var getFont = function getFont(index) {
        return index === selectedIndex ? 'gothic-18-bold' : 'gothic-18';
    };

    for (i in destinations) {
        if (destinations.hasOwnProperty(i)) {
            dest = destinations[i];
            text = new UI.Text({
                position: new Vector2(0, 10 + 20 * i),
                size: new Vector2(144, 20),
                font: getFont(i),
                text: dest
            });
            destText.push(text);
            wind.add(text);
        }
    }

    var updateList = function updateList() {
        for (var i in destText) {
            if (destText.hasOwnProperty(i)) {
                destText[i].font(getFont(i));
            }
        }
    };

    wind.on('click', 'select', function () {
        options.onDestinationSelected(destinations[selectedIndex]);
    });

    wind.on('click', 'back', function () {
        wind.hide();
        options.onCancel();
    });

    wind.on('click', 'up', function () {
        if (selectedIndex <= 0) {
            return;
        }
        selectedIndex--;

        updateList();
    });

    wind.on('click', 'down', function () {
        if (selectedIndex >= destinations.length - 1) {
            return;
        }
        selectedIndex++;

        updateList();
    });

    updateList();

    wind.show();
};

module.exports = {
    show: init
};
//# sourceMappingURL=destpicker.js.map
