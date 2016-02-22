import { getData, HOLDEPLASSER } from './index';

getData(HOLDEPLASSER.Dortlehaugen, HOLDEPLASSER.Lagunen).then((data) => {
    console.log(data);
})
