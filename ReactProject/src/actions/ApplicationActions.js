/************************************
 * Name:            ApplicationActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on applications and sending them through the dispatcher
 * Author:          Christopher Cooper
 * Date:            Nov 02, 2019
 *************************************/
import Dispatcher from '../dispatcher/appDispatcher.js';
import axios from 'axios';
import ExternalURL from '../constants/DataLoaderConstants.js';

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
        // build uri
        let uri = ExternalURL.DYNAMICS_PREFIX + "application(" + id + ")/";

        // make axios put call
        axios.patch(uri, application)
                .then(res => {
                    Dispatcher.dispatch({
                        actionType: 'update_application_success',
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

