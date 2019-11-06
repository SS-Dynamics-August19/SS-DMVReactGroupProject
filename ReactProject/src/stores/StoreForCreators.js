import Dispatcher from "../Dispatcher/AppDispatcher";
import { EventEmitter } from "events";



const CHANGE = "change";
//*********FOR CREATOR COMPONENT*********\\
let _creating = {
  status: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
};
class StoreForCreators extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE, cb);
  }

  emitChange() {
    this.emit(CHANGE);
  }

  newCreation() {
    return _creating.status;
  }

  resetReadState() {
    _creating.status = {
      pending: false,
      success: false,
      failure: false
    };
  }
}
export const ForCreator = new StoreForCreators();
//*****************END*************************\\

//***GLOBAL DISPATCHER***\\
Dispatcher.register(action => {
  switch (action.actionType) {
    //***ACTIONS FOR CREATOR COMPONENT***\\
    case "created_successfully":
      ForCreator.resetReadState();
      _creating.status.success = true;
      ForCreator.emitChange();
      break;
    case "creation_failed":
      ForCreator.resetReadState();
      _creating.status.failure = true;
      ForCreator.emitChange();
      break;
    case "creating_record":
      ForCreator.resetReadState();
      _creating.status.pending = true;
      ForCreator.emitChange();
      break;
    //************END************\\

    //***NOTHING'S HAPPENING***\\
    default:
      return;
  }
});
