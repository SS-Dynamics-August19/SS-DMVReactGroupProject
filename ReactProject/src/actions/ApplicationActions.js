/************************************
 * Name:            ApplicationActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on applications and sending them through the dispatcher
 * Author:          Christopher Cooper
 * Date:            Nov 02, 2019
 *************************************/
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios';

/*
Functions included in file
    updateApplication:  takes object with data member variables named after application field
                        names from Dynamics with their values and makes a web api call
                        to the Dynamics system to update the application. Sends an action to dispatcher
                        to notify store of this process starting, on success, and on failure
*/

const ApplicationActions = {
    updateApplication: (id, application) => {
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'update_application_started'
        });
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_applications(" + id + ")";
        let config = {
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }

        // make axios put call
        axios.patch(uri, application, config)
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

    }
}

module.exports = ApplicationActions;

