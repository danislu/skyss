var UI = require('ui');
var Vector2 = require('vector2');

var init = function(options) {
    var destinations = options.destinations,
        destText = [],
        selectedIndex = 0,
        i = 0, dest, text;

    var wind = new UI.Window({
        fullscreen: true
    });

    wind.add(new UI.TimeText({
        position: new Vector2(0, 10),
        size: new Vector2(144, 20),
        textAlign: 'center',
        font: 'gothic-18',
        text: '%X'
    }));

    var getFont = function(index) {
        return (index == selectedIndex) ? 'gothic-18-bold' : 'gothic-18';
    };

    for (i in destinations) {
        if (destinations.hasOwnProperty(i)) {
            dest = destinations[i];
            text = new UI.Text({
                position: new Vector2(0, 40 + (20 * i)),
                size: new Vector2(144, 20),
                textOverflow: 'ellipsis',
                font: getFont(i),
                text: dest
            });
            wind.add(text);
            destText.push(text);
            if (destText.length >= 6) {
                break;
            }
        }
    }

    var updateList = function(){
        for (var i in destText) {
            if (destText.hasOwnProperty(i)) {
                destText[i].font(getFont(i));
            }
        }
    };

    wind.on('click', 'select', function() {
        options.onDestinationSelected(destinations[selectedIndex]);
    });

    wind.on('click', 'back', function(){
        wind.hide();
        options.onCancel();
    });

    wind.on('click', 'up', function(){
        if (selectedIndex <= 0){
            return;
        }
        selectedIndex--;

        updateList();
    });

    wind.on('click', 'down', function(){
        if (selectedIndex >= destText.length-1){
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
