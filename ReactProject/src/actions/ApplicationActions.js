/************************************
 * Name:            ApplicationActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on applications and sending them through the dispatcher
 * Author:          Christopher Cooper
 * Date:            Nov 02, 2019
 *************************************/
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios';
import { adalApiFetch } from '../adalConfig.js';

/*
Functions included in file
    updateApplication:  
                ApplicationActions.updateApplication(id, application);
                        takes object with data member variables named after application field
                        names from Dynamics with their values and makes a web api call
                        to the Dynamics system to update the application. Sends an action to dispatcher
                        to notify store of this process starting, on success, and on failure
*/
const ApplicationActions = {
    /* Example call to function updateApplication
        let app = { 
            madmv_appid: "APP-2022",    // string field
            madmv_applicationtype: 876570001,   // option set field
            madmv_age: 23,  // numerical field
            madmv_addressfieldeffectivedate: new Date("10/13/2019")   // date field
        }
        app["madmv_OwnerInfo@odata.bind"] = "/madmv_ma_customers(f7407fa0-81fd-e911-a811-000d3a36857d)";    // lookup field

        ApplicationActions.updateApplication("765fc9b6-81fd-e911-a811-000d3a36880e", app);    // function call
    */
    updateApplication: (id, updateObj) => {
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'update_application_started'
        });
        let application = {
            madmv_applicationsubject:         updateObj.madmv_applicationsubject,
            madmv_applicationtype:            updateObj.madmv_applicationtype,
            madmv_describeother:              updateObj.madmv_describeother,
            madmv_insurancecompany:           updateObj.madmv_insurancecompany,
            fee:                              updateObj.fee,
            madmv_newcity:                    updateObj.madmv_newcity,
            madmv_newcountry:                 updateObj.madmv_newcountry,
            madmv_newstate:                   updateObj.madmv_newstate,
            madmv_newstreet1:                 updateObj.madmv_newstreet1,
            madmv_newstreet2:                 updateObj.madmv_newstreet2,
            madmv_newzip:                     updateObj.madmv_newzip,
            madmv_platetype:                  updateObj.madmv_platetype,
            madmv_reasonforaddresschange:     updateObj.madmv_reasonforaddresschange,
            madmv_registrationperiod:         updateObj.madmv_registrationperiod,
            madmv_registrationtype:           updateObj.madmv_registrationtype,
            madmv_reissuedplates:             updateObj.madmv_reissuedplates,
            madmv_ssn:                        updateObj.madmv_ssn
        }
        application["madmv_ownerinfo@odata.bind"] = "/madmv_ma_customers(" + updateObj.madmv_ownerinfo + ")";
        application["madmv_vehicledetails@odata.bind"] = "/madmv_ma_vehicles(" + updateObj.madmv_vehicledetails + ")";
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_applications(" + id + ")";
        let config = {
            method: 'patch',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            data: application
        };
      
        // send the api call
        adalApiFetch(axios, uri, config)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'update_application_success',
                data: res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_application_failure'
            });
        });
    },

    //just send the guid of the record you want deleted in the function call ApplicationActions.deleteApplication(id)
    deleteApplication: (id) => {
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'delete_application_started'
        });
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_applications(" + id + ")";
        let config = {
            method: 'delete',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          };
      
        // send the api call
        adalApiFetch(axios, uri, config)
            .then(res => {
                console.log(res.data);
                Dispatcher.dispatch({
                actionType: 'delete_application_success'
                });
            })
            .catch((err) => {
                console.log(err);
                Dispatcher.dispatch({
                    actionType: 'delete_application_failure'
                });
            });
            

    }
}

module.exports = ApplicationActions;

