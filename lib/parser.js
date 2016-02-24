'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseData = parseData;

var _htmlparser = require('htmlparser2');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseData(data) {
    var tagName = 'span';
    var attrValue1 = 'tm-inline-block tm-result-time';
    var attrValue2 = 'tm-result-time-wrapper';
    var attrValue3 = 'tm-result-fratil';

    var depth = 0;
    var getValue = false;

    var result = [];

    //    if (name === 'h2' && attr['class'] === 'tm-alpha tm-reiseforslag-header'){
    var parser = new _htmlparser2.default.Parser({
        onopentag: function onopentag(name, attribs) {

            /*
            h2 class="tm-alpha tm-reiseforslag-header"
                dato
            
            span class=tm-inline-block tm-result-time
                span class=tm-result-time-wrapper
                    span class=tm-result-fratil
                        start tid
                    span class=tm-result-fratil
                        slutt tid
                    span class="tm-result-info-val"
                        duration
                    span class="tm-tripmenu-linenr"
                        linjeNo
            */

            if (name === tagName) {
                getValue = false;
                switch (attribs['class']) {
                    case attrValue1:
                        depth = 1;
                        break;
                    case attrValue2:
                        depth = depth === 1 ? 2 : 0;
                        break;
                    case attrValue3:
                        if (depth === 2) {
                            getValue = true;
                            depth = 0;
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        ontext: function ontext(text) {
            if (getValue) {
                getValue = !getValue;
                result.push(text);
            }
        }
    });
    parser.write(data);
    parser.end();

    return result;
}
//# sourceMappingURL=parser.js.map
