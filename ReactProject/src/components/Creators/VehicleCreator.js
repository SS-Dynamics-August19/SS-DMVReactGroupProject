import React from "react";
import PropTypes from "prop-types";
import VehicleActions from "../../actions/VehicleActions";

/**
 * *Component with input fields for creating a vehicle record in the CRM
 * @param modal boolean / if true this component renders with a submit button for quick create inside a modal
 */
export class VehicleCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: "",
            make: "",
            model: "",
            vin: ""
        };
        //field change methods
        this.yearFieldChange = this.yearFieldChange.bind(this);
        this.makeFieldChange = this.makeFieldChange.bind(this);
        this.modelFieldChange = this.modelFieldChange.bind(this);
        this.vinFieldChange = this.vinFieldChange.bind(this);
        this.startCreation = this.startCreation.bind(this); //the submit action
    }

    //*the field change methods are bound to the class
    //*when the field's value changes the event triggers a state change
    //*the event is passed as a param and the targets value is stored in the component's state
    yearFieldChange(e) {
        this.setState({ year: e.target.value });
    }
    makeFieldChange(e) {
        this.setState({ make: e.target.value.toUpperCase() });
    }
    modelFieldChange(e) {
        this.setState({ model: e.target.value.toUpperCase() });
    }
    vinFieldChange(e) {
        this.setState({ vin: e.target.value });
    }
    /**
     * submits the values provided to create a new record
     */
    startCreation() {
        VehicleActions.createVehicle(this.state);
        this.props.modalClose();
    }

    render() {
        let display = ""//display's the form
        let thisYear = new Date().getFullYear();//to set the max value on the year field
        let button = "";//will display a button if this component is in a modal

        display = ( //displays the form
            <div className="card-header">
                <div className="input-group mb-3">
                    <input
                        type="number"
                        max={thisYear + 1}//next year's model should be the max value in this field
                        onChange={this.yearFieldChange}
                        className="form-control"
                        placeholder="Enter year of car's release .."
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            Year
            </span>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        onChange={this.makeFieldChange}
                        className="form-control"
                        placeholder="Enter vehicle's make / manufacturer .."
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            Make
            </span>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        onChange={this.modelFieldChange}
                        className="form-control"
                        placeholder="Enter model / series .."
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            Model
            </span>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        onChange={this.vinFieldChange}
                        className="form-control"
                        placeholder="Enter vin number .."
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            VIN
            </span>
                    </div>
                </div>
            </div>
        );
        if (this.props.modal === true) {//this component is in a modal
            button = (
                <div>
                    <hr />
                    <button
                        onClick={this.startCreation} //triggers the create action
                        className="btn btn-block btn-primary btn-lg"
                    >
                        SUBMIT
                    </button>
                    <hr />
                </div>
            );
        }
        return (
            <div>
                {display}
                {button}
            </div>
        );
    }
}

VehicleCreator.propTypes = {
    modal: PropTypes.bool.isRequired,
    modalClose: PropTypes.func
};
