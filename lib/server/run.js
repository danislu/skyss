'use strict';

var _index = require('./index');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 8181;

var log = function log(msg) {
    console.log(new Date() + ': ' + msg);
};

var doQuery = function doQuery(req, res, fn) {
    var from = req.query.from;
    var to = req.query.to;

    log('req: ' + from + ' -> ' + to);

    if (!_index.HOLDEPLASSER.hasOwnProperty(from)) {
        var msg = 'res: 404 destination ' + from + ' not not found';
        log(msg);
        res.status(404).end(msg);
        return;
    }
    if (!_index.HOLDEPLASSER.hasOwnProperty(to)) {
        var msg = 'res: 404 destination ' + to + ' not found';
        log(msg);
        res.status(404).end(msg);
        return;
    }

    fn({ from: _index.HOLDEPLASSER[from], to: _index.HOLDEPLASSER[to] }).then(function (data) {
        log('res: 200 ' + JSON.stringify(data));
        res.json(data);
    }).catch(function (e) {
        log('res: 500 ' + JSON.stringify(e));
        res.status(500).json(e);
    });
};

app.get('/next', function (req, res) {
    doQuery(req, res, _index.getNextDeparture);
});

app.get('/departures', function (req, res) {
    doQuery(req, res, _index.getDepartures);
});

app.get('/destinations', function (req, res) {
    log('destinations fetched');
    res.json(Object.keys(_index.HOLDEPLASSER));
});

app.get('/', function (req, res) {
    log('service document fetched');
    res.json({
        departues: {
            endpoint: '/departures2?from=<latLng>&to=<destination>',
            description: 'get the next 10 departues from the nearest stop to the given position to the given destination.',
            parameters: [{
                name: 'from_x',
                description: 'x coordinates'
            }, {
                name: 'from_y',
                description: 'y coordinates'
            }, {
                name: 'to',
                format: '*',
                description: 'a stop name'
            }]

        },
        stop_suggest: {
            suggest: '/suggest?filter=<filter>',
            description: 'get the suggested stops based on the filter'
        }
    });
});

app.get('/departures2', function (req, res) {
    var _req$query = req.query;
    var from_x = _req$query.from_x;
    var from_y = _req$query.from_y;
    var to = _req$query.to;


    try {
        if (from_x < 0 || from_y < 0 || !to) throw { error: 'invalid input' };

        (0, _index.getNextDeparturesFromGeoToLocation)({ x: from_x, y: from_y }, to).then(function (value) {
            res.json(value);
        }).catch(function (e) {
            res.status(500).json(e);
        });
    } catch (e) {
        console.log(e);
        res.status(405).json(e);
        return;
    }
});

app.get('/suggest', function (req, res) {
    var filter = req.query.filter;

    (0, _index.getSuggestions)(filter).then(function (value) {
        return res.json(value);
    }).catch(function (e) {
        return res.status(500).json(e);
    });
});

app.listen(port);
console.log('listening to port ' + port);
//# sourceMappingURL=run.js.map
