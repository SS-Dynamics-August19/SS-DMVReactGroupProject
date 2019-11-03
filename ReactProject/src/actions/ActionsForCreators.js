import Dispatcher from "../dispatcher/appDispatcher";
import Axios from "axios";

const config = {
  'OData-MaxVersion': 4.0,
  'OData-Version': 4.0,
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
}

//***ACTIONS PERFORMED BY THE CREATOR COMPONENT***\\
export const ActionsForCreator = {
  /**
   * *Send customer create request to the Dynamics365 api
   * @param person object built from the creator component
   */
  createCustomer: function(person) {
    //build record object (customer) for CRM from parameter object (person)
    var customer = {};
    customer.madmv_cssn = person.ssn;
    customer.madmv_firstname = person.firstname;
    customer.madmv_lastname = person.lastname;
    customer.madmv_birthdate = person.bday;
    customer.emailaddress = person.email;
    customer.madmv_street1 = person.street1;
    customer.madmv_street2 = person.street2;
    customer.madmv_city = person.city;
    customer.madmv_stateprovince = person.state;
    customer.madmv_zippostalcode = person.zip;

    Dispatcher.dispatch({
      actionType: "creating_record"
    });
    Axios.post("https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers",customer,config)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "created_successfully",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "creation_failed"
        });
      });
  },
  /**
   * *Send vehicle create request to the Dynamics365 api
   * @param vehicle object built from the creator component
   */
  createVehicle: function(description) {
    //build record object (vehicle) for CRM from parameter object (description)
    var vehicle = {};
    vehicle.madmv_yearmodel = description.year;
    vehicle.madmv_vehiclemake = description.make;
    vehicle.madmv_modelorseries = description.model;
    vehicle.madmv_vehicleidnumber = description.vin;

    Dispatcher.dispatch({
      actionType: "creating_record"
    });
    Axios.post("https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles",vehicle,config)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "created_successfully",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "creation_failed"
        });
      });
  }
};

// var entity = {};
// entity.madmv_yearmodel = "";
// entity.madmv_vehiclemake = "";
// entity.madmv_modelorseries = "";
// entity.madmv_vehicleidnumber = "";

// *To make xhr req
// var req = new XMLHttpRequest();
// req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/madmv_ma_vehicles", true);
// req.setRequestHeader("OData-MaxVersion", "4.0");
// req.setRequestHeader("OData-Version", "4.0");
// req.setRequestHeader("Accept", "application/json");
// req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
// req.onreadystatechange = function() {
//     if (this.readyState === 4) {
//         req.onreadystatechange = null;
//         if (this.status === 204) {
//             var uri = this.getResponseHeader("OData-EntityId");
//             var regExp = /\(([^)]+)\)/;
//             var matches = regExp.exec(uri);
//             var newEntityId = matches[1];
//         } else {
//             Xrm.Utility.alertDialog(this.statusText);
//         }
//     }
// };
// req.send(JSON.stringify(entity));