import CRMQueryListenerDataStore from "./CRMQueryListenerDataStore.js";

const stores = {

    applicationhist:     new CRMQueryListenerDataStore("applicationhist"),
    activityHome:        new CRMQueryListenerDataStore("activityHome"),
    userHome:            new CRMQueryListenerDataStore("userHome"),
    customerHome:        new CRMQueryListenerDataStore("customerHome"),
    applicationHome:     new CRMQueryListenerDataStore("applicationHome"),
    vehicleHome:         new CRMQueryListenerDataStore("vehicleHome"),
    customer:            new CRMQueryListenerDataStore("customer"),
    application:         new CRMQueryListenerDataStore("application"),
    vehicle:             new CRMQueryListenerDataStore("vehicle"),
    user:                new CRMQueryListenerDataStore("user"),
    testLookup:          new CRMQueryListenerDataStore("testLookup"),
};
export default stores;