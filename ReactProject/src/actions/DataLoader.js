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

    /** Generates an HTTP query string for the team shared MS Dynamics, based on the input parameters.
     * Will return every record in the table.
     * 
     * @param {string} tableDataType Which table to query, without the publisher prefix.
     *                               For example, "user" will get a record from "madmv_ma_user".
     * @param {...string} columns The name of each field to include in the result set.
     *                            For example, ...[ "madmv_name", "madmv_password", "madmv_securityroles" ]
     *                            would return the Name, Password, and Security Roles fields in the result set.
     */
    static generateDynamicsQuery(tableDataType, ...columns) {
        let query = ExternalURL.DYNAMICS_PREFIX + tableDataType + ExternalURL.DYNAMICS_PLURAL_S + ExternalURL.DYNAMICS_SELECT_SUFFIX;

        let isSecondOrLaterColumnSoUseComma = false;
        for(let column of columns) {
            if (isSecondOrLaterColumnSoUseComma) query += ",";
            isSecondOrLaterColumnSoUseComma = true;
            query += column;
        }

        return query;
    }
    
    /** Generates an HTTP query string for the team shared MS Dynamics, based on the input parameters.
     * Will return one record, specified by GUID.
     * 
     * @param {string?} GUID The GUID of the record to retrieve, in the format "12345678-1234-1234-1234-123456789012".
     * @param {string} tableDataType Which table to query, without the publisher prefix.
     *                               For example, "user" will get a record from "madmv_ma_user".
     * @param {...string} columns The name of each field to include in the result set.
     *                            For example, ...[ "madmv_name", "madmv_password", "madmv_securityroles" ]
     *                            would return the Name, Password, and Security Roles fields in the result set.
     */
    static generateDynamicsQuerySingleRecord(GUID, tableDataType, ...columns) {
        let query = ExternalURL.DYNAMICS_PREFIX + tableDataType + ExternalURL.DYNAMICS_PLURAL_S;

        if(GUID !== undefined) query += "(" + GUID + ")";

        query += ExternalURL.DYNAMICS_SELECT_SUFFIX;

        let isSecondOrLaterColumnSoUseComma = false;
        for(let column of columns) {
            if (isSecondOrLaterColumnSoUseComma) query += ",";
            isSecondOrLaterColumnSoUseComma = true;
            query += column;
        }

        return query;
    }
}