//import Dispatcher from '../dispatcher/appDispatcher';
//import axios from 'axios';
import { ExternalURL } from "../constants/DataLoaderConstants.js";
//import { adalApiFetch } from '../adalConfig.js';
import DataLoader from './DataLoader';


export default class ActivityActions extends DataLoader {
    constructor(URL, eventSignalLabel) {
        super()
        this.URL = URL;
        this.eventSignalLabel = eventSignalLabel;
    }

    static generateDynamicsQuery(tableDataType, ...columns) {
        let query = ''
        //console.log(columns.length);
        if (tableDataType == "task")
        {
            return "https://sstack.crm.dynamics.com/api/data/v9.1/" + tableDataType + ExternalURL.DYNAMICS_PLURAL_S;
        } else 
        {
            query = ExternalURL.DYNAMICS_PREFIX + tableDataType + ExternalURL.DYNAMICS_PLURAL_S + ExternalURL.DYNAMICS_SELECT_SUFFIX;
        }

        let isSecondOrLaterColumnSoUseComma = false;
        for(let column of columns) {
            if (isSecondOrLaterColumnSoUseComma) query += ",";
            isSecondOrLaterColumnSoUseComma = true;
            query += column;
        }

        return query;
    }
}

module.exports = ActivityActions;