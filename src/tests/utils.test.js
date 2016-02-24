import { readFileSync } from 'fs';

export function readTestData(file) {
    return readFileSync(`./testdata/${file}`);
}

export function asyncCatch(fn, done) {
    return function(...data){
        try {
            fn(...data);
            done();
        } catch (e) {
            done(e);
        }
    };
}
