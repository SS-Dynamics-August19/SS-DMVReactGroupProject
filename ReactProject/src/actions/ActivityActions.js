import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import constant, { ExternalURL } from "../constants/DataLoaderConstants.js";


export default class ActivityActions {
    constructor(URL, eventSignalLabel) {
        this.URL = URL;
        this.eventSignalLabel = eventSignalLabel;
    }

    load() {
        this.signalLoadStarted();

        axios
            .get(this.URL)
            .then(this.signalLoadSuccess.bind(this))
            .catch(this.signalLoadFailure.bind(this));
    }

    signalLoadStarted() {
        let startedSignal = {
            actionType: constant.ACTION_PREFIX + this.eventSignalLabel + constant.STARTED_SUFFIX
        };
        ActivityActions.signal(startedSignal);
    }

    signalLoadSuccess(result) {
        let successSignal = {
            actionType:
                constant.ACTION_PREFIX + this.eventSignalLabel + constant.SUCCESS_SUFFIX,
            data: result.data.value
        };
        ActivityActions.signal(successSignal);
    }

    signalLoadFailure(error) {
        console.log("DataLoader received error from API:");
        console.log(error);

        let failureSignal = {
            actionType: constant.ACTION_PREFIX + this.eventSignalLabel + constant.FAILURE_SUFFIX
        };
        ActivityActions.signal(failureSignal);
    }

    static signal(signalObj) {
        Dispatcher.dispatch(signalObj);
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