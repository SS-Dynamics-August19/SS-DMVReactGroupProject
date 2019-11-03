import Dispatcher from "../dispatcher/appDispatcher.js";
import { EventEmitter } from "events";
import constant from "../constants/DataLoaderConstants.js";
import { State } from "../constants/DataLoaderConstants.js";

const CHANGE_EVENT = "change";
export default class DataStore extends EventEmitter {
  constructor(dataTypeName) {
    super();

    this.type = dataTypeName;
    this.data = {
      records: [],
      readState: State.DEFAULT_STATE,
      loggedIn: false,
      authorization: "user"
    };

    this.registerActionHandler();
  }

  registerActionHandler() {
    Dispatcher.register(this.actionHandler.bind(this));
  }

  actionHandler(action) {
    let dataAction = constant.ACTION_PREFIX + this.type;
    let updateAction = 'update_' + this.type;
    let started = dataAction + constant.STARTED_SUFFIX;
    let success = dataAction + constant.SUCCESS_SUFFIX;
    let failure = dataAction + constant.FAILURE_SUFFIX;
    let updateStarted = updateAction + '_started';
    let updateSuccess = updateAction + '_success';
    let updateFailure = updateAction + '_failure';

    switch (action.actionType) {
      case success:
        this.data.readState = State.SUCCESS;
        this.onSuccess(action);
        break;
      case failure:
        this.data.readState = State.FAILURE;
        this.onFailure(action);
        break;
      case started:
        this.data.readState = State.STARTED;
        this.onStarted(action);
        break;
      case updateStarted:
        break;
      case updateSuccess:
        break;
      case updateFailure:
        break;
      case 'user_logged_in':
        this.userLogIn(action);
        break;
      case 'user_Logged_out':
        this.userLogOut();
        break;
      default:
        return;
    }
    this.emitChange();
  }

  onStarted() {}
  onSuccess(action) {
    this.data.records = action.data;
  }
  onFailure() {}

  addChangeListener(cb) {
    this.addListener(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  userLogIn(action)
  {
    this.data.authorization = action.data;
    this.data.loggedIn = true;
  }

  userLogOut()
  {
    this.data.authorization = "user";
    this.data.loggedIn = false;
  }

  getData() {
    return this.data;
  }
}
