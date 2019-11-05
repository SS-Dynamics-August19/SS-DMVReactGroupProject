import DataStore from "./DataStore.js";

const stores = {
    customer:    new DataStore("customer"),
    application: new DataStore("application"),
    vehicle:     new DataStore("vehicle"),
    user:        new DataStore("user")
};
export default stores;