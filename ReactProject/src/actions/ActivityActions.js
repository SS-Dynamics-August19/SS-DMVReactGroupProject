//import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import { ExternalURL } from "../constants/DataLoaderConstants.js";
import { adalApiFetch } from '../adalConfig.js';
import DataLoader from './DataLoader';


export default class ActivityActions extends DataLoader {
    constructor(URL, eventSignalLabel) {
        super()
        this.URL = URL;
        this.eventSignalLabel = eventSignalLabel;
    }

    getCurrentUser() {
        super.signalLoadStarted();
        //this.URL = generateFindUserQuery();

        let config = {
            'method': 'get',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        };
//*/                 
        adalApiFetch(axios, this.URL, config)
            .then(this.signalGetUserSuccess.bind(this))
            .catch(super.signalLoadFailure.bind(this));
                //axios
                //    .get(this.URL)
                //    .then(this.signalLoadSuccess.bind(this))
                //    .catch(this.signalLoadFailure.bind(this));
 //           })
   //         .catch(this.signalLoadFailure.bind(this));
    }


    signalGetUserSuccess(result) {
        let dataType = "activityHome";
        let query = ActivityActions.generateDynamicsTaskQuery("task", result.data.UserId);
        new ActivityActions(query, dataType).load();
    }

    static generateDynamicsQuery(tableDataType, ...columns) {
        let query = ''
        if (tableDataType == "task")
        {
            return ExternalURL.DYNAMICS_OOB_PREFIX + tableDataType + ExternalURL.DYNAMICS_PLURAL_S;
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

    static generateDynamicsTaskQuery(tableDataType, userGuid) {
        return ExternalURL.DYNAMICS_OOB_PREFIX + tableDataType + ExternalURL.DYNAMICS_PLURAL_S +  
            ExternalURL.DYNAMICS_FILTER_SUFFIX + "_createdby_value%20eq%20" + userGuid;

    }

    static generateFindUserQuery() {
        return ExternalURL.DYNAMICS_OOB_PREFIX + ExternalURL.DYNAMICS_USERID_SUFFIX;
    }
}

module.exports = ActivityActions;