import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import constant from "../constants/DataLoaderConstants.js";

export default class DataLoader {
  constructor(URL, prefix) {
    this.URL = URL;
    this.prefix = prefix;
    this.authHeader = undefined;
  }

  load() {
    this.signalLoadStarted();

    axios
      .get(this.URL, this.authHeader)
      .then(this.signalLoadSuccess.bind(this))
      .catch(this.signalLoadFailure.bind(this));
  }

  signalLoadStarted() {
    let startedSignal = {
      actionType: constant.ACTION_PREFIX + this.prefix + constant.STARTED_SUFFIX
    };
    DataLoader.signal(startedSignal);
  }

  signalLoadSuccess(result) {
    console.log(result);
    let successSignal = {
      actionType:
        constant.ACTION_PREFIX + this.prefix + constant.SUCCESS_SUFFIX,
      data: result.data.value
    };
    DataLoader.signal(successSignal);
  }

  signalLoadFailure(error) {
    console.log(error);

    let failureSignal = {
      actionType: constant.ACTION_PREFIX + this.prefix + constant.FAILURE_SUFFIX
    };
    DataLoader.signal(failureSignal);
  }

  static signal(signalObj) {
    Dispatcher.dispatch(signalObj);
  }
}
