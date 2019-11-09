import Dispatcher from "../Dispatcher/AppDispatcher";
import { EventEmitter } from "events";



const CHANGE = "change";
//*********FOR SELECTED COMPONENT*********\\
let _selecting = {
  status: {
    details: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  }
};
class StoreForSelected extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE, cb);
  }

  emitChange() {
    this.emit(CHANGE);
  }

  selected() {
    return _selecting.status;
  }

  resetReadState() {
    _selecting.status.readState = {
      pending: false,
      success: false,
      failure: false
    };
  }
}
export const ForSelector = new StoreForSelected();
//*****************END*************************\\

//***GLOBAL DISPATCHER***\\
Dispatcher.register(action => {
  switch (action.actionType) {
    //***ACTIONS FOR CREATOR COMPONENT***\\
    case "selected_successfully":
      ForSelector.resetReadState();
      _selecting.status.details = action.data;
      _selecting.status.readState.success = true;
      ForSelector.emitChange();
      break;
    case "selected_failed":
      ForSelector.resetReadState();
      _selecting.status.readState.failure = true;
      ForCreator.emitChange();
      break;
    case "selecting_record":
      ForSelector.resetReadState();
      _selecting.status.readState.pending = true;
      ForSelector.emitChange();
      break;
    //************END************\\

    //***NOTHING'S HAPPENING***\\
    default:
      return;
  }
});