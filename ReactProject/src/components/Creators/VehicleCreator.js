import React from "react";
import PropTypes from "prop-types";
// import VehicleActions from '../../actions/VehicleActions'

/**
 * *Component with input fields for creating a vehicle record in the CRM
 * @param props should be the global state ~ actions will dispatch a status of the creation and this component will render success or failure message based on results
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
  yearFieldChange = (e) => {
    this.setState({ year: e.target.value });
  };
  makeFieldChange = (e) => {
    this.setState({ make: e.target.value });
  };
  modelFieldChange = (e) => {
    this.setState({ model: e.target.value });
  };
  vinFieldChange = (e) => {
    this.setState({ vin: e.target.value });
  };
  startCreation() {
    //submit values when form is complete
    // VehicleActions.createVehicle(this.state);
  }

  render() {
    let display = "";

    if (this.props.creationStatus.readState.success) {
      display = ( //shows success message if the creation was successful
        <div className="alert alert-success" role="alert">
          <h1 className="alert-heading">Success!!</h1>
          <hr />
          <h6 className="mb-0">Vehicle record added to the database.</h6>
        </div>
      );
    } else if (this.props.creationStatus.readState.failure) {
      display = ( //shows failure message if the create encountered any errors
        <div className="alert alert-danger" role="alert">
          <h1 className="alert-heading">Uh oh!</h1>
          <hr />
          <h6 className="mb-0">Had issues creating that vehicle.</h6>
          <p>Refresh and try again..</p>
        </div>
      );
    } else {
      let thisYear = new Date().getFullYear();
      display = ( // default (no change in global state) / display's the form since creationStatus didn't return success or failure
        <div className="card-header">
          <div className="input-group mb-3">
            <input
              type="number"
              max={thisYear + 1}
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
          <button
            onClick={this.startCreation} //should trigger the submit action
            className="btn btn-block btn-success btn-lg"
          >
            CLICK HERE TO SUBMIT
          </button>
        </div>
      );
    }
    return <div>{display}</div>;
  }
}


VehicleCreator.propTypes = {
    creationStatus: PropTypes.object.isRequired
  };
  