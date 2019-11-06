import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import constant, { ExternalURL } from "../constants/DataLoaderConstants.js";

export default class DataLoader {
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
        DataLoader.signal(startedSignal);
    }

    signalLoadSuccess(result) {
        let successSignal = {
            actionType:
                constant.ACTION_PREFIX + this.eventSignalLabel + constant.SUCCESS_SUFFIX,
            data: result.data.value
        };
        DataLoader.signal(successSignal);
    }

    signalLoadFailure(error) {
        console.log("DataLoader received error from API:");
        console.log(error);

        let failureSignal = {
            actionType: constant.ACTION_PREFIX + this.eventSignalLabel + constant.FAILURE_SUFFIX
        };
        DataLoader.signal(failureSignal);
    }

    static signal(signalObj) {
        Dispatcher.dispatch(signalObj);
    }

    static generateDynamicsQuery(tableDataType, ...columns) {
        let query = ExternalURL.DYNAMICS_PREFIX + tableDataType + ExternalURL.DYNAMICS_SUFFIX;

        let isSecondOrLaterColumnSoUseComma = false;
        for(let column of columns) {
            if (isSecondOrLaterColumnSoUseComma) query += ",";
            isSecondOrLaterColumnSoUseComma = true;
            query += column;
        }

        return query;
    }
}