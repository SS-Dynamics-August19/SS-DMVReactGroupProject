import Dispatcher from "../dispatcher/appDispatcher";

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
    Xrm.WebApi.online.createRecord("madmv_ma_customer", customer)
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
    vehicle.madmv_yearmodel = "";
    vehicle.madmv_vehiclemake = "";
    vehicle.madmv_modelorseries = "";
    vehicle.madmv_vehicleidnumber = "";

    Dispatcher.dispatch({
      actionType: "creating_record"
    });
    Xrm.WebApi.online.createRecord("madmv_ma_vehicle", vehicle)
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
