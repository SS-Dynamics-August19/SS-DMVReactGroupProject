import React from "react";
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";
import VehicleActions from "../../actions/VehicleActions.js";

class VehicleDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            disabled: true,
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.fetchFromCRM();
    }
    handleClick() {
        console.log("clickckck");
        this.setState({ disabled: !this.state.disabled })
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value)
    }
    handleCancel  () {
        console.log("cancel");
        
        this.setState({
            madmv_bodytypemodel: this.state.olddata.madmv_bodytypemodel,
            madmv_fueltype: this.state.olddata.madmv_fueltype,
            madmv_lengthtrailer: this.state.olddata.madmv_lengthtrailer,
            madmv_licenseplate: this.state.olddata.madmv_licenseplate,
            madmv_ma_vehicleid: this.state.olddata.madmv_ma_vehicleid,
            madmv_modelorseries: this.state.olddata.madmv_modelorseries,
            madmv_typeofvehicle: this.state.olddata.madmv_typeofvehicle,
            madmv_vehicleidnumber: this.state.olddata.madmv_vehicleidnumber,
            madmv_vehiclemake: this.state.olddata.madmv_vehiclemake,
            madmv_yearmodel: this.state.olddata.madmv_yearmodel,
            disabled: !this.state.disabled,
        })
      }

      handleSubmit (event)  {
        event.preventDefault();
        console.log(this.state);
        VehicleActions.updateVehicle(this.state.olddata.madmv_ma_vehicleid,this.state)
        //this.props.changeStore(this.state)
        this.setState({disabled: !this.state.disabled})

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

        let vehicle = this.state;


        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Vehicle</h1>
                <button  className={(!this.state.disabled)?"invisible":"btn btn-primary"} onClick={this.handleClick} type="button">Update Record</button>
            </div>
            <div className="h2Th">
                <h2>Detailed Information</h2>
            </div>
            <form onSubmit={this.handleSubmit} className="detailedForm">
                <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                    <table>
                        <tbody>

                            <tr className="trDetailedView">

                                <th className="thDetailedView">

                                    <div className="form-group fieldDetailed form-inline">
                                        <label>VIN:</label>
                                        <input name="madmv_vehicleidnumber" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_vehicleidnumber} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Year Model:</label>
                                        <input name="madmv_yearmodel" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_yearmodel} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Vehicle Make:</label>
                                        <input name="madmv_vehiclemake" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_vehiclemake} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Model or Series:</label>
                                        <input name="madmv_modelorseries" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_modelorseries} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>License Plate:</label>
                                        <input name="madmv_licenseplate" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_licenseplate} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Fuel Type:</label>
                                        <input name="madmv_fueltype" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_fueltype} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Body Type Model:</label>
                                        <input name="madmv_bodytypemodel" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_bodytypemodel} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Type Of Vehicle:</label>
                                        <input name="madmv_typeofvehicle" onChange={this.handleChange} type="text" className="form-control" value={vehicle.madmv_typeofvehicle} />
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>

                <button className={(this.state.disabled)?"invisible":"btn btn-primary cancel-submit btn-lg"}   onClick={this.handleCancel} type="button">Cancel</button>
                <button className={(this.state.disabled)?"invisible":"btn btn-primary cancel-submit btn-lg"}   type="submit">Save</button>

            </form>

        </div>

    }

    fetchFromCRM() {
        console.log(this.props);
        if(this.props.match === undefined) return;
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(this.props.match.params.id, "vehicle",  "madmv_bodytypemodel",
        "madmv_fueltype", "madmv_lengthtrailer", "madmv_licenseplate", "madmv_ma_vehicleid", "madmv_modelorseries", "madmv_typeofvehicle","madmv_vehicleidnumber","madmv_vehiclemake","madmv_yearmodel");
           

        axios.get(cosQuery)
            .then(function (response) {
                console.log(response);
                
                this.setState({
                    olddata: response.data,
                    madmv_bodytypemodel: response.data.madmv_bodytypemodel,
                    madmv_fueltype: response.data.madmv_fueltype,
                    madmv_lengthtrailer: response.data.madmv_lengthtrailer,
                    madmv_licenseplate: response.data.madmv_licenseplate,
                    madmv_ma_vehicleid: response.data.madmv_ma_vehicleid,
                    madmv_modelorseries: response.data.madmv_modelorseries,
                    madmv_typeofvehicle: response.data.madmv_typeofvehicle,
                    madmv_vehicleidnumber: response.data.madmv_vehicleidnumber,
                    madmv_vehiclemake: response.data.madmv_vehiclemake,
                    madmv_yearmodel: response.data.madmv_yearmodel,
                    loaded: true
                });
            }.bind(this));
    }
}
VehicleDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

export default VehicleDetailsView;