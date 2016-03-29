'use strict';

var server_ip = '37.139.17.6',
    destinations = ['Dortledhaugen (Bergen) [hpl.gruppe]', 'Oasen terminal (Bergen) [hpl.gruppe]', 'Danmarks plass (Bergen) [hpl.gruppe]', 'Åsane terminal (Bergen) [hpl.gruppe]', 'Lagunen (Bergen) [hpl.gruppe]', 'Hesthaugen (Bergen) [hpl.gruppe]'];

module.exports = {
    getApiRoot: function getApiRoot() {
        return 'http://' + server_ip;
    },
    getDestinations: function getDestinations() {
        return destinations;
    }
};
//# sourceMappingURL=config.js.map
