/************************************
 * Name:            CustomerActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on customers(contacts) and sending them through the dispatcher
 * Author:          Christopher Cooper
 * Date:            Nov 04, 2019
 *************************************/
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios';
const config = {
    'OData-MaxVersion': 4.0,
    'OData-Version': 4.0,
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }


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
    updateCustomer: (id, customer) => {
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'update_customer_started'
        });
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
    axios.post("https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers",customer,config)
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

}

module.exports = CustomerActions;

