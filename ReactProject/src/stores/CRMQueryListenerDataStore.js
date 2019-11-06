import constant, { State } from "../constants/DataLoaderConstants.js";
import GenericDataStore from "./GenericDataStore.js";

const getStartingState = function() {
    return {
        records: [],
        readState: State.DEFAULT_STATE
    };
}

const getActionHandlers = function(dataTypeName) {
    let dataAction = constant.ACTION_PREFIX + dataTypeName;
    let started = dataAction + constant.STARTED_SUFFIX;
    let success = dataAction + constant.SUCCESS_SUFFIX;
    let failure = dataAction + constant.FAILURE_SUFFIX;

    let ret = {};
    ret[started] = function() {
        this.data.readState = State.STARTED;
    }
    ret[success] = function(action) {
        this.data.readState = State.SUCCESS;
        this.data.records = action.data;
    }
    ret[failure] = function() {
        this.data.readState = State.FAILURE;
    }
    return ret;
}

export default class CRMQueryListenerDataStore extends GenericDataStore {
    constructor(dataTypeName) {
        super(dataTypeName, getStartingState(), getActionHandlers(dataTypeName));
    }
}
