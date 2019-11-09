/************************************
 * Name:            VehicleActions.js
 * Description:     Function declarations and descriptions for performing actions
 *                  on vehicles and sending them through the dispatcher
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
    updateVehicle:
                VehicleActions.updateVehicle(id, vehicle);
                        DO NOT SEND VIN TO THIS FUNCTION IN THE OBJECT PARAMETER
                        takes object with data member variables named after application field
                        names from Dynamics with their values and makes a web api call
                        to the Dynamics system to update the vehicle. Sends an action to dispatcher
                        to notify store of this process starting, on success, and on failure
    updateVehicleVin:   
                VehicleActions.updateVehicleVIN(id, vin);
                        takes the new VIN number and calls the vin decoder api and updates the vehicle
*/
const VehicleActions = {
    /* Example call to function updateVehicle   
        let vehicle = { 
            madmv_vehiclemake: "FORD",    // string field
            madmv_fueltype: 876570001,         // option set field
            madmv_lengthtrailer: 78.9       // float field
        }

        VehicleActions.updateVehicle("f65bdd9a-81fd-e911-a811-000d3a3682ac", vehicle);    // function call
    */
    /**********************************************
     * Function: updateVehicle
     * Description: updates the vehicle with new information
     * Input Parameters: string id, object vehicle
     * Input: Response from REST api
     * Output: action sent to dispatcher
     * Return: none
     **********************************************/
    updateVehicle: (id, updateObj) => {
        console.log(id, updateObj);
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'update_vehicle_started'
        });

       let vehicle = {
            madmv_bodytypemodel: updateObj.madmv_bodytypemodel,
            madmv_fueltype: updateObj.madmv_fueltype,
            madmv_lengthtrailer: updateObj.madmv_lengthtrailer,
            madmv_licenseplate: updateObj.madmv_licenseplate,
            madmv_ma_vehicleid: updateObj.madmv_ma_vehicleid,
            madmv_modelorseries: updateObj.madmv_modelorseries,
            madmv_typeofvehicle: updateObj.madmv_typeofvehicle,
            madmv_vehicleidnumber: updateObj.madmv_vehicleidnumber,
            madmv_vehiclemake: updateObj.madmv_vehiclemake,
            madmv_yearmodel: updateObj.madmv_yearmodel
        }
        console.log(vehicle);
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles(" + id + ")";
        let config = {
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }

        // make axios put call
        axios.patch(uri, vehicle, config)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'update_vehicle_success',
                    data: res.data
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'update_vehicle_failure'
                });
            });

    },

    /**********************************************
     * Function: updateVehicleVin
     * Description: calls the vin decoder api and updates the vehicle
     *              with new information
     * Input Parameters: string id, string vin
     * Input: Response from REST api 
     * Output: action sent to dispatcher
     * Return: none
     **********************************************/
    updateVehicleVin: (id, vin) => {
        // notify store that update has started
        Dispatcher.dispatch({
            actionType: 'update_vehicle_started'
        });
        // make call to vin decoder api
        let webApi = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/";
        let apiParams = "?format=json";
        // build uri and headers
        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles(" + id + ")";
        let config = {
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }

        axios.get(webApi+vin+apiParams)
            .then(res => {
                // create the vehicle object
                let vehicle = parseVinDecodeResult(res.data.Results[0]);
                vehicle["madmv_vehicleidnumber"] = vin;
                // make the axios call to Dynamics CRM to update the vehicle
                axios.patch(uri, vehicle, config)
                    .then(result => {
                        Dispatcher.dispatch({
                            actionType: 'update_vehicle_success',
                            data: result.data
                        });
                    })
                    .catch( (error) => {
                        console.log(error);
                        Dispatcher.dispatch({
                            actionType: 'update_vehicle_failure'
                        });
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'update_vehicle_failure'
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
    axios.post("https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles",vehicle,config)
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

        //just send the guid of the record you want deleted in the function call VehicleActions.deleteVehicle(id)
        deleteVehicle: (id) => {
            // notify store that update has started
            Dispatcher.dispatch({
                actionType: 'delete_vehicle_started'
            });
            // build uri and headers
            let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles(" + id + ")";
    
    
            // make axios put call
    
                axios.delete(uri)
                    .then(res => {
                        console.log(res.data);
                        Dispatcher.dispatch({
                        actionType: 'delete_vehicles_success'
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        Dispatcher.dispatch({
                            actionType: 'delete_vehicles_failure'
                        });
                    });
        }
}


/*********************************************************
 * Function: parseVinDecodeResult
 * Description: creates a vehicle object from the result of api call
 * Input Parameters: result
 * Input: none
 * Output: none
 * Return: object
 *********************************************************/
let parseVinDecodeResult = (result) => {
    // create object with fields given by the api
    let vehicle = {};
    if (result.Make != "" && result.Make != null){
        vehicle["madmv_vehiclemake"] = result.Make;
    }
    if (result.ModelYear != "" && result.ModelYear != null){
        vehicle["madmv_yearmodel"] = result.ModelYear;
    }
    if (result.Model != "" && result.Model != null){
        vehicle["madmv_modelorseries"] = result.Model;
    }
    // check vehicle type from api
    if (result.VehicleType != "" && result.VehicleType != null){
        let type = 876570000;

        switch ((result.VehicleType).toLowerCase())
        {
            case "bus":
                type = 876570001;
                break;
            case "motorcycle":
                type = 876570002;
                break;
            case "off road vehicle":
                type = 876570003;
                break;
            case "trailer":
                type = 876570004;
                break;
            default:
                type = 876570000;
                break;
        }
        vehicle["madmv_typeofvehicle"] = type;
    }
    if (result.BodyClass != "" && result.BodyClass != null){
        vehicle["madmv_bodytypemodel"] = result.BodyClass;
        if ((result.BodyClass).toLowerCase().includes("truck")){
            vehicle["madmv_typeofvehicle"] = 876570001;
        }
    }
    // check the fuel type from api
    if (result.FuelTypePrimary != "" && result.FuelTypePrimary != null){
        let fuel = 876570000;
        // check fuel type
        switch ((result.FuelTypePrimary).toLowerCase())
        {
            case "gasoline":
                fuel = 876570000;
                break;
            case "diesel":
                fuel = 876570001;
                break;
            case "liquefied petroleum gas (propane or lpg)":
                fuel = 876570002;
                break;
            case "compressed natural gas (cng)":
                fuel = 876570003;
                break;
            case "ethanol (e85)":
            case "neat ethanol (e100)":
                fuel = 876570004;
                break;
            case "bio-diesel":
                fuel = 876570005;
                break;
            default:
                break;
        }
        vehicle["madmv_fueltype"] = fuel;
    }
    if (result.TrailerLength != "" && result.TrailerLength != null){
        vehicle["madmv_lengthtrailer"] = parseFloat(result.TrailerLength);
    }
    else {
        vehicle["madmv_lengthtrailer"] = null;
    }

    vehicle["madmv_widthtrailer"] = null;
    vehicle["madmv_motorcycleenginenumber"] = null;

    return vehicle;
}

module.exports = VehicleActions;

