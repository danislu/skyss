var UI = require('ui');
var Vector2 = require('vector2');
//var Settings = require('settings');
var config = require('config');
var apiRoot = config.getApiRoot();

var skysser = require('skysser');
skysser.setApiRoot(apiRoot);

var destpicker = require('destpicker');
var trippicker = require('trippicker');

var wind = new UI.Window({
    fullscreen: true
});

wind.on('click', 'back', cancel);

wind.add(new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 40),
    textAlign: 'center',
    font: 'gothic-18-bold',
    text: 'dsl.skyss.ting'
}));

function selected(destination){
    skysser.update(destination, function(error, data){
        if (error) {
            onError(error);
            return;
        }

        trippicker.show({
            data: data
        });
    });
}

function cancel(){
    wind.hide();
}

function onError(error){
    console.log('ERROR: ' + JSON.stringify(error));
}

wind.show();

setTimeout(function(){
    destpicker.show({
        destinations: config.getDestinations(), //Settings.option('destinations'),
        onDestinationSelected: selected,
        onCancel: cancel
    });
}, 2000);
