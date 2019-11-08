import { EventEmitter } from "events";
import Dispatcher from "../dispatcher/appDispatcher.js";

const CHANGE_EVENT = "change";
export default class GenericDataStore extends EventEmitter {
    constructor(name, startingStateObject, actionHandlersMapObject) {
        super();

        this.name              = name;
        this.data              = startingStateObject;
        this.actionHandlersMap = actionHandlersMapObject;

        this.registerActionHandler();
    }

    registerActionHandler() {
        Dispatcher.register(this.actionHandler.bind(this));
    }

    setOnChanged(callback) {
        if(this.onChange !== undefined) this.removeOnChanged();
        this.onChange = callback;
        this.addListener(CHANGE_EVENT, this.onChange);
    }

    removeOnChanged() {
        if(this.onChange === undefined) return;
        this.removeListener(CHANGE_EVENT, this.onChange);
        this.onChange = undefined;
    }
    
    getData() {
        return this.data;
    }

    actionHandler(action) {
        for (let handlerActionType in this.actionHandlersMap) {
            if (action.actionType === handlerActionType) {
                this.actionHandlersMap[handlerActionType].bind(this)(action);
                this.emitChange();
                return;
            }
        }
    }

    emitChange() {
        // Hack to duck a bug.

        let self = this
        setTimeout(function() { // Run after dispatcher has finished
            self.emit(CHANGE_EVENT);
        }, 0);
    }

    // Debug method, overridden in CRMQueryListenerDataStore.
    getName() {
        return this.name;
    }
}