//依赖导入>>
import { AppPage } from 'framework';

class Index extends AppPage {

    getInitialState() {
        return {
            list:[
            ]
        }
    }

    onLoad() {
    }
}

module.exports = new Index();