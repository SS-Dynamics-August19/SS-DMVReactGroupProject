import DataStore from "./DataStore.js";

const stores = {
    customer:    new DataStore("customer"),
    application: new DataStore("application"),
    vehicle:     new DataStore("vehicle"),
    user:        new DataStore("user"),
    //customerID:  new DataStore("customerID"),
    ///customerDetails: new DataStore("customerDetails")
};
export default stores;