import './assets/basic.scss';
import { printMe } from '@/flow';

axios.post('/api', {
    a: '1'
});

if (module['hot']) {
    module['hot'].accept('./flow.ts', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    });
}