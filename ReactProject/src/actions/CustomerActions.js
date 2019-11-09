/************************************
 * Name:            CustomerActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on customers(contacts) and sending them through the dispatcher
 * Author:          Christopher Cooper
 * Date:            Nov 04, 2019
 *************************************/
import Dispatcher from "../dispatcher/appDispatcher.js";
import axios from "axios";
const config = {
  "OData-MaxVersion": 4.0,
  "OData-Version": 4.0,
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8"
};

/*
Functions included in file
    updateCustomer:  
                CustomerActions.updateCustomer(id, customer);
                        takes object with data member variables named after application field
                        names from Dynamics with their values and makes a web api call
                        to the Dynamics system to update the customer. Sends an action to dispatcher
                        to notify store of this process starting, on success, and on failure
*/
const CustomerActions = {
  /* Example call to function updateCustomer
        let customer = { 
            madmv_cssn: "111-22-4444",    // string field
            madmv_lastname: "Smith"         // sting field
            madmv_age: 23,                  // numerical field
            madmv_birthdate: new Date("10/13/2019")   // date field
        }

        CustomerActions.updateCustomer("f7407fa0-81fd-e911-a811-000d3a36857d", customer);    // function call
    */
  updateCustomer: (id, updateObj) => {
    // notify store that update has started
    Dispatcher.dispatch({
      actionType: "update_customer_started"
    });

        // create customer object
        let customer = {
            madmv_age: updateObj.madmv_age,
            madmv_birthdate: updateObj.madmv_birthdate,
            madmv_city: updateObj.madmv_city,
            madmv_country: updateObj.madmv_country,
            madmv_cssn: updateObj.madmv_cssn,
            madmv_email: updateObj.madmv_email,
            madmv_firstname: updateObj.madmv_firstname,
            madmv_lastname: updateObj.madmv_lastname,
            madmv_phonenumber: updateObj.madmv_phonenumber,
            madmv_stateprovince: updateObj.madmv_stateprovince,
            madmv_street1: updateObj.madmv_street1,
            madmv_street2: updateObj.madmv_street2,
            madmv_zippostalcode: updateObj.madmv_zippostalcode
        }
        
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers(" + id + ")";
        let config = {
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }

        // make axios put call
        axios.patch(uri, customer, config)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'update_customer_success',
                    data: res.data
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'update_customer_failure'
                });
            });

    },
  /*
   * *Send customer create request to the Dynamics365 api
   * @param person object built from the creator component
   */
  createCustomer: function(person) {
    //build record object (customer) for CRM from parameter object (person)
    var customer = {};
    if (person.ssn !== "" && person.ssn !== null) {
      customer.madmv_cssn = person.ssn;
    }
    if (person.firstname !== "" && person.firstname !== null) {
      customer.madmv_firstname = person.firstname;
    }
    if (person.lastname !== "" && person.lastname !== null) {
      customer.madmv_lastname = person.lastname;
    }
    if (person.bday !== "" && person.bday !== null) {
      customer.madmv_birthdate = person.bday;
    }
    if (person.email !== "" && person.email !== null) {
      customer.emailaddress = person.email;
    }
    if (person.street1 !== "" && person.street1 !== null) {
      customer.madmv_street1 = person.street1;
    }
    if (person.street2 !== "" && person.street2 !== null) {
      customer.madmv_street2 = person.street2;
    }
    if (person.city !== "" && person.city !== null) {
      customer.madmv_city = person.city;
    }
    if (person.state !== "" && person.state !== null) {
      customer.madmv_stateprovince = person.state;
    }
    if (person.zip !== "" && person.zip !== null) {
      customer.madmv_zippostalcode = person.zip;
    }
    customer.madmv_fullname = `${person.firstname} ${person.lastname}`

    Dispatcher.dispatch({
      actionType: "creating_record"
    });
    axios.post(
        "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers",
        customer,
        config
      )
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

  //just send the guid of the record you want deleted in the function call CustomerActions.deleteCustomer(id)
  deleteCustomer: id => {
    // notify store that update has started
    Dispatcher.dispatch({
      actionType: "delete_customer_started"
    });
    // build uri and headers
    let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers(" + id + ")";
    // make axios put call
    axios
      .delete(uri)
      .then(res => {
        console.log(res.data);
        Dispatcher.dispatch({
          actionType: "delete_customer_success"
        });
      })
      .catch(err => {
        console.log(err);
        Dispatcher.dispatch({
          actionType: "delete_customer_failure"
        });
      });
  }
};

module.exports = CustomerActions;
