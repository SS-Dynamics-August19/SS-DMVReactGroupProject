import React from "react";
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";

class VehicleDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: undefined,
            disabled: true
        };
    }

    componentDidMount() {
        this.fetchFromCRM();
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        let customer = this.state.data;
        

 

        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Vehicle</h1>
                <button className="btn btn-primary" onClick={() => console.log(customer.madmv_ma_customerid)} type="button">Update Record</button>
            </div>
            <div className="h2Th">
                <h2>General Information</h2>
                <h2>Detailed Information</h2>
            </div>
            <form className="detailedForm">
            <fieldset disabled={(this.state.disabled)?"disabled":null}>
                <table>
                    <tbody>

                        <tr className="trDetailedView">

                            <th className="thDetailedView">

                                <div className="form-group fieldDetailed form-inline">
                                    <label>Owner:</label>
                                    <select  className="form-control">
                                        <option>{customer.owninguser}</option>
                                    </select>
                                </div>
                               
                            </th>

                            <th className="thDetailedView">

<div className="form-group fieldDetailed form-inline">
 <label>VIN:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_vehicleidnumber}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Year Model:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_yearmodel}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Vehicle Make:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_vehiclemake}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Model or Series:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_modelorseries}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>License Plate:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_licenseplate}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Fuel Type:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_fueltype}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Body Type Model:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_bodytypemodel}/>
</div>
<div className="form-group fieldDetailed form-inline">
 <label>Type Of Vehicle:</label>
  <input type="text" className="form-control"  value={vehicle.madmv_typeofvehicle}/>
</div>
</th>
                        </tr>
                    </tbody>
                </table>
                </fieldset>
            </form>
        </div>
    }

    fetchFromCRM() {
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(match.params.id, "vehicle", "madmv_vehicleidnumber", "madmv_yearmodel", "madmv_vehiclemake",
            "madmv_modelorseries", "madmv_licenseplate", "madmv_fueltype", "madmv_bodytypemode", "madmv_typeofvehicle");

        axios.get(cosQuery)
            .then(function (response) {
                console.log(response);
                let newState = {};
                newState.data = response.data;
                newState.owninguser = "Example User";
                newState.loaded = true;
                this.setState(newState);
            }.bind(this));
    }
}
VehicleDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

export default VehicleDetailsView;