import { getDepartures, getNextDeparture, HOLDEPLASSER, getNextDeparturesFromGeoToLocation, getSuggestions } from './index';
import express from 'express';
var app = express();

const port = 8181;

const log = (msg) => {
    console.log(`${new Date()}: ${msg}`);
};

const doQuery = (req, res, fn) =>{
    const from = req.query.from;
    const to = req.query.to;

    log(`req: ${from} -> ${to}`);

    if (!HOLDEPLASSER.hasOwnProperty(from)){
        const msg = `res: 404 destination ${from} not not found`;
        log(msg);
        res.status(404).end(msg);
        return;
    }
    if (!HOLDEPLASSER.hasOwnProperty(to)){
        const msg = `res: 404 destination ${to} not found`;
        log(msg);
        res.status(404).end(msg);
        return;
    }

    fn({from: HOLDEPLASSER[from], to: HOLDEPLASSER[to]}).then((data) => {
        log(`res: 200 ${JSON.stringify(data)}`);
        res.json(data);
    }).catch((e) => {
        log(`res: 500 ${JSON.stringify(e)}`);
        res.status(500).json(e);
    });
};

app.get('/next', (req, res) => {
    doQuery(req, res, getNextDeparture);
});

app.get('/departures', (req, res) => {
    doQuery(req, res, getDepartures);
});

app.get('/destinations', (req, res) => {
    log('destinations fetched');
    res.json(Object.keys(HOLDEPLASSER));
});

app.get('/', (req, res) => {
    log('service document fetched');
    res.json({
        departues: {
            endpoint: '/departures2?from_x=<x-coord>&from_y=<y-coord>&to=<destination>',
            description: 'get the next 10 departues from the nearest stop to the given position to the given destination.',
            parameters: [
                {
                    name: 'from_x',
                    description: 'x coordinates'
                },
                {
                    name: 'from_y',
                    description: 'y coordinates'
                },
                {
                    name: 'to',
                    format: '*',
                    description: 'a stop name'
                }
            ]

        },
        stop_suggest: {
            suggest: '/suggest?filter=<filter>',
            description: 'get the suggested stops based on the filter'
        }
    });
});


app.get('/departures2', (req, res) => {
    const { from_x, from_y, to } = req.query;

    try{
        if ((from_x < 0) || (from_y < 0 ) || (!to))
            throw { error: 'invalid input'};

        getNextDeparturesFromGeoToLocation({x: from_x, y: from_y}, to)
            .then((value)=>{
                res.json(value);
            }).catch((e)=>{
                res.status(500).json(e);
            });

    } catch(e) {
        console.log(e);
        res.status(405).json(e);
        return;
    }
});

app.get('/suggest', (req, res) => {
    const { filter } = req.query;
    getSuggestions(filter).then(value => res.json(value)).catch(e => res.status(500).json(e));
});

app.listen(port);
console.log(`listening to port ${port}`);
