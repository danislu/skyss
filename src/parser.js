import htmlparser from 'htmlparser2';

const DATE = 0;
const START_TIME = 1;
const END_TIME = 2;
const DURATION = 3;

class Value {
    constructor(){
        this.index = 0;
    }

    addValue(value){
        switch (this.index) {
            case DATE:
                this.date = value;
                break;
            case START_TIME:
                this.start = value;
                break;
            case END_TIME:
                this.end = value;
                break;
            case DURATION:
                this.dur = value;
                break;
            default:
                break;
        }
        this.index++;
    }
}

export function parseHtml(htmlData){
    let readDate = false,
        readStart = false,
        readEnd = false,
        readDur = false,
        date, start, end, dur;

    const parser = new htmlparser.Parser({
        onopentag: (name, attr) => {
            if (name === 'h2' && attr['class'] === 'tm-alpha tm-reiseforslag-header'){
                readDate = true;
            }

        },
        ontext: (text) => {
            if (readDate){
                date = text;
            } else if (readStart){
                start = text;
            } else if (readEnd){
                end = text;
            } else if (readDur){
                dur = text;
            }

            readDate = false;
            readStart = false;
            readEnd = false;
            readDur = false;
        },
        onclosetag: (name) => {}
    });

    parser.write(htmlData);
    parser.end();


}
