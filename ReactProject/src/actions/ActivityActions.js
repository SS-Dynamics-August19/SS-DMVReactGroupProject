import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
import constant from "../constants/DataLoaderConstants.js";


export default class ActivityActions {
    constructor() {
        this.prefix = "activity";
    }

    load() {
        this.signalLoadStarted();
        //console.log("made it to activityactions");

        axios
        .get(`https://sstack.crm.dynamics.com/api/data/v9.1/tasks`)
        .then(this.signalLoadSuccess.bind(this))
        .catch(this.signalLoadFailure.bind(this));
    }

    signalLoadStarted() {
        console.log("signal started");
        let startedSignal = {
            actionType: constant.ACTION_PREFIX + this.prefix + constant.STARTED_SUFFIX
        };
        ActivityActions.signal(startedSignal);
    }

    signalLoadSuccess(result) {
        console.log("signal success");
        let successSignal = {
            actionType:
                constant.ACTION_PREFIX + this.prefix + constant.SUCCESS_SUFFIX,
            data: result.data.value
        };
        ActivityActions.signal(successSignal);
    }

    signalLoadFailure(error) {
        console.log("DataLoader received error from API:");
        console.log(error);

        let failureSignal = {
            actionType: constant.ACTION_PREFIX + this.prefix + constant.FAILURE_SUFFIX
        };
        ActivityActions.signal(failureSignal);
    }

    static signal(signalObj) {
        Dispatcher.dispatch(signalObj);
    }
}

module.exports = ActivityActions;