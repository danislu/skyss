import htmlparser from 'htmlparser2';

export function parseHtmlData(data){
    const tagName = 'span';
    const attrValue1 = 'tm-inline-block tm-result-time';
    const attrValue2 = 'tm-result-time-wrapper';
    const attrValue3 = 'tm-result-fratil';

    let depth = 0;
    let getValue = false;

    let result = [];

    //    if (name === 'h2' && attr['class'] === 'tm-alpha tm-reiseforslag-header'){
    const parser = new htmlparser.Parser({
        onopentag: (name, attribs) => {

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

            if (name === tagName){
                getValue = false;
                switch (attribs['class']) {
                    case attrValue1:
                        depth = 1;
                        break;
                    case attrValue2:
                        depth = (depth === 1) ? 2 : 0;
                        break;
                    case attrValue3:
                        if (depth === 2){
                            getValue = true;
                            depth = 0;
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        ontext: (text) => {
            if (getValue){
                getValue = !getValue;
                result.push(text);
            }
        }
    });
    parser.write(data);
    parser.end();

    return result;
}
