import React from "react";
import axios from "axios";
import { adalApiFetch } from "../../adalConfig";
import LookupFieldFormControl from "../Lookup/LookupFieldFormControl";

export class CreateApplication extends React.Component {
  constructor() {
    super();
    this.state = {
      applicationType: "",
      existingUser: "",
      userId: "",
      vehicleId: "",
      ssn: "",
      firstname: "",
      lastname: "",
      bday: "",
      email: "",
      street1: "",
      street2: "",
      city: "",
      stateProv: "",
      zip: "",
      year: "",
      make: "",
      model: "",
      vin: "",
      update_successful: false,
      application_successful: false
    };
    //||||||||||DISPLAY METHODS||||||||||\\
    this.applicationTypeOption = this.applicationTypeOption.bind(this);
    this.existingUserOption = this.existingUserOption.bind(this);
    this.showExisting = this.showExisting.bind(this);
    this.applicationCustomerDisplay = this.applicationCustomerDisplay.bind(
      this
    );
    this.applicationVehicleDisplay = this.applicationVehicleDisplay.bind(this);
    this.addressChangeDisplay = this.addressChangeDisplay.bind(this);
    this.updateUserAddress = this.updateUserAddress.bind(this);
    this.renewLicenseDisplay = this.renewLicenseDisplay.bind(this);
    this.vehicleRegDisplay = this.vehicleRegDisplay.bind(this);
    this.newDriverDisplay = this.newDriverDisplay.bind(this);
    this.showSubmitBtn = this.showSubmitBtn.bind(this);
    this.createNewApplication = this.createNewApplication.bind(this);
    //||||||||||CUSTOMER FILED CHANGE METHODS||||||||||\\
    this.createNewCustomer = this.createNewCustomer.bind(this);
    this.ssnFieldChange = this.ssnFieldChange.bind(this);
    this.firstNameFieldChange = this.firstNameFieldChange.bind(this);
    this.lastNameFieldChange = this.lastNameFieldChange.bind(this);
    this.bdayFieldChange = this.bdayFieldChange.bind(this);
    this.emailFieldChange = this.emailFieldChange.bind(this);
    this.street1FieldChange = this.street1FieldChange.bind(this);
    this.street2FieldChange = this.street2FieldChange.bind(this);
    this.cityFieldChange = this.cityFieldChange.bind(this);
    this.stateFieldChange = this.stateFieldChange.bind(this);
    this.zipFieldChange = this.zipFieldChange.bind(this);
    //||||||||||VEHICLE FIELD CHANGE METHODS||||||||||\\
    this.createNewVehicle = this.createNewVehicle.bind(this);
    this.yearFieldChange = this.yearFieldChange.bind(this);
    this.makeFieldChange = this.makeFieldChange.bind(this);
    this.modelFieldChange = this.modelFieldChange.bind(this);
    this.vinFieldChange = this.vinFieldChange.bind(this);
  }

  //|||||||||||||||||||||HANDLES FIELD CHANGES FOR CUSTOMER VALUE'S||||||||||||||||||||||||\\
  firstNameFieldChange(e) {
    this.setState({ firstname: capitalize(e.target.value) });
  }
  lastNameFieldChange(e) {
    this.setState({ lastname: capitalize(e.target.value) });
  }
  bdayFieldChange(e) {
    this.setState({ bday: e.target.value });
  }
  ssnFieldChange(e) {
    this.setState({ ssn: e.target.value });
  }
  emailFieldChange(e) {
    this.setState({ email: e.target.value.toLowerCase() });
  }
  street1FieldChange(e) {
    this.setState({ street1: e.target.value.toUpperCase() });
  }
  street2FieldChange(e) {
    this.setState({ street2: e.target.value.toUpperCase() });
  }
  cityFieldChange(e) {
    this.setState({ city: e.target.value.toUpperCase() });
  }
  stateFieldChange(e) {
    this.setState({ stateProv: e.target.value.toUpperCase() });
  }
  zipFieldChange(e) {
    this.setState({ zip: e.target.value });
  }

  //|||||||||||||||||||||HANDLES FIELD CHANGES FOR VEHICLE VALUE'S||||||||||||||||||||||||\\
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
  //||||||||||||||||||||CREATE METHODS||||||||||||||||||||||||||||||||||||||\\
  /**
   * submits the values provided to create a new customer record and returns the id
   */
  createNewCustomer() {
    let customer = {};
    if (this.state.ssn !== "" && this.state.ssn !== null) {
      customer.madmv_cssn = this.state.ssn;
    }
    if (this.state.firstname !== "" && this.state.firstname !== null) {
      customer.madmv_firstname = this.state.firstname;
    }
    if (this.state.lastname !== "" && this.state.lastname !== null) {
      customer.madmv_lastname = this.state.lastname;
    }
    if (this.state.bday !== "" && this.state.bday !== null) {
      customer.madmv_birthdate = this.state.bday;
    }
    if (this.state.email !== "" && this.state.email !== null) {
      customer.emailaddress = this.state.email;
    }
    if (this.state.street1 !== "" && this.state.street1 !== null) {
      customer.madmv_street1 = this.state.street1;
    }
    if (this.state.street2 !== "" && this.state.street2 !== null) {
      customer.madmv_street2 = this.state.street2;
    }
    if (this.state.city !== "" && this.state.city !== null) {
      customer.madmv_city = this.state.city;
    }
    if (this.state.stateProv !== "" && this.state.stateProv !== null) {
      customer.madmv_stateprovince = this.state.state;
    }
    if (this.state.zip !== "" && this.state.zip !== null) {
      customer.madmv_zippostalcode = this.state.zip;
    }
    customer.madmv_fullname = `${this.state.firstname} ${this.state.lastname}`;
    let config = {
      method: "post",
      "OData-MaxVersion": 4.0,
      "OData-Version": 4.0,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      data: customer
    };
    adalApiFetch(
      axios,
      "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers",
      config
    )
      .then(res => {
        this.setState({
          userId: extractId(res.headers["odata-entityid"])
        });
      })
      .then(() => alert("created successfully"))
      .catch(e => {
        alert("creation failed");
        console.log(e);
      });
  }
  /**
   * submits the values provided to create a new vehicle record and returns the id
   */
  createNewVehicle() {
    //build record object (vehicle) for CRM from parameter object (description)
    var vehicle = {};
    vehicle.madmv_yearmodel = this.state.year;
    vehicle.madmv_vehiclemake = this.state.make;
    vehicle.madmv_modelorseries = this.state.model;
    vehicle.madmv_vehicleidnumber = this.state.vin;
    let config = {
      method: "post",
      "OData-MaxVersion": 4.0,
      "OData-Version": 4.0,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      data: vehicle
    };

    adalApiFetch(
      axios,
      "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_vehicles",
      config
    )
      .then(res => {
        this.setState({
          vehicleId: extractId(res.headers["odata-entityid"])
        });
      })
      .then(() => alert("created successfully"))
      .catch(e => {
        alert("creation failed");
        console.log(e);
      });
  }
  createNewApplication() {
    let newApp = {};

    switch (this.state.applicationType) {
      case "vehicle_reg":
        newApp.madmv_applicationtype = 876570000;
        newApp[
          "madmv_ownerinfo@odata.bind"
        ] = `/madmv_ma_customers(${this.state.userId})`;
        newApp[
          "madmv_vehicledetails@odata.bind"
        ] = `/madmv_ma_vehicles(${this.state.vehicleId})`;
        break;

      case "address_change":
        newApp.madmv_applicationtype = 876570001;
        newApp["madmv_ownerinfo@odata.bind"] =
          "/madmv_ma_customers(" + this.state.userId + ")";
        newApp.madmv_newstreet1 = this.state.street1;
        if (this.state.street2 !== "" || this.state.street2 !== null) {
          newApp.madmv_newstreet2 = this.state.street2;
        }
        newApp.madmv_newcity = this.state.city;
        newApp.madmv_newstate = this.state.stateProv;
        newApp.madmv_newzip = this.state.zip;
        break;

      case "new_license":
        newApp.madmv_applicationtype = 876570002;
        newApp[
          "madmv_ownerinfo@odata.bind"
        ] = `/madmv_ma_customers(${this.state.userId})`;
        break;

      case "renew_license":
        newApp.madmv_applicationtype = 876570003;
        newApp[
          "madmv_ownerinfo@odata.bind"
        ] = `/madmv_ma_customers(${this.state.userId})`;
        console.log(newApp);
        break;
    }

    let config = {
      method: "post",
      "OData-MaxVersion": 4.0,
      "OData-Version": 4.0,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      data: newApp
    };


    adalApiFetch(
      axios,
      "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_applications",
      config
    )
      .then(() => {
        this.setState({
          application_successful: true
        });
      })
      .then(() => alert("submitted successfully"))
      .catch(e => {
        alert("creation failed");
        console.log(e);
      });
  }
  updateUserAddress() {
    var customer = {};
    customer.madmv_street1 = this.state.street1;
    alert("made it here");
    if (this.state.street2 !== "" || this.state.street2 !== null) {
      customer.madmv_street2 = this.state.street2;
    }
    customer.madmv_city = this.state.city;
    customer.madmv_stateprovince = this.state.stateProv;
    customer.madmv_zippostalcode = this.state.zip;

    let config = {
      method: "patch",
      "OData-MaxVersion": 4.0,
      "OData-Version": 4.0,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      data: customer
    };

    // make axios put call
    adalApiFetch(
      axios,
      `https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers(${this.state.userId})`,
      config
    )
      .then(() => alert("updated successfully"))
      .then(() => {
        this.setState({
          update_successful: true
        });
      })
      .catch(e => {
        alert("creation failed");
        console.log(e);
      });
  }
  //|||||||||||||||||||||TYPE SELECTOR METHODS|||||||||||||||||||||||||||||||||||||\\
  /**
   * *Changes the application type when the value changes in the option set
   * @param event when the selection changes
   */
  applicationTypeOption(event) {
    this.setState({ applicationType: event.target.value });
  }
  /**
   * @param event when the existing user option selector change
   */
  existingUserOption(event) {
    this.setState({ existingUser: event.target.value });
  }
  /**
   * *Sets the current display
   * @param appType value from the application type option set
   * @param existing value from the existing user option set
   */
  showExisting(apptype, id) {
    if (
      apptype === "new_license" ||
      apptype === "address_change" ||
      apptype === "renew_license" ||
      id !== ""
    ) {
      return "";
    } else {
      return (
        <div className="input-group mb-3">
          <select
            className="custom-select"
            id="existing_user"
            onChange={this.existingUserOption}
            value={this.state.existingUser}
          >
            <option defaultValue="">Are you an existing user?..</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="appType">
              Existing User
            </label>
          </div>
        </div>
      );
    }
  }
  //|||||||||||||||||||DISPLAY BY CONDITIONS|||||||||||||||||||||||||||||||||||||||\\
  /**
   * returns a customer creation view / for if customer isn't an existing user
   */
  createCustomerView() {
    let createDisplay = "";

    if (this.state.userId === "") {
      createDisplay = (
        <div className="card-header">
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.firstNameFieldChange}
              className="form-control"
              placeholder="Enter first name.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                First Name
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.lastNameFieldChange}
              className="form-control"
              placeholder="Enter last name.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Last Name
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="date"
              onChange={this.bdayFieldChange}
              className="form-control"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Birthdate
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.ssnFieldChange}
              className="form-control"
              placeholder="Enter Social Security Number"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Social Security Number
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              onChange={this.emailFieldChange}
              className="form-control"
              placeholder="Enter email address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Email
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.street1FieldChange}
              className="form-control"
              placeholder="Enter line 1 of street address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Street 1
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.street2FieldChange}
              className="form-control"
              placeholder="Enter line 2 of street address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Street 2
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.cityFieldChange}
              className="form-control"
              placeholder="Enter city of residence.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                City
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.stateFieldChange}
              className="form-control"
              maxLength="2"
              placeholder="Enter state abbreviation.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                State
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.zipFieldChange}
              className="form-control"
              placeholder="Enter zip code.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Zip Code
              </span>
            </div>
          </div>
          <button
            onClick={this.createNewCustomer} //triggers the create action
            className="btn btn-primary btn-lg"
          >
            Create User
          </button>
          <br />
        </div>
      );
    } else {
      createDisplay = (
        <div>
          <p>Customer ID Applied</p>;
          <br />
        </div>
      );
    }

    return createDisplay;
  }
  /**
   * decides what to render in the customer section of the page
   * @param appType what type of application is being created? / value from applicationTypeOption
   * @param existing is this an existing user? / value from existingUserOption
   */
  applicationCustomerDisplay(appType, existing) {
    if (existing === "" && appType === "") {
      return "";
    } else if (this.state.userId !== "" && appType == "renew_license") {
      return (
        <div>
          ID Applied..
          <br />
          <br />
        </div>
      );
    } else {
      switch (appType) {
        case "address_change":
          return this.addressChangeDisplay();
        case "renew_license":
          return this.renewLicenseDisplay();
        case "vehicle_reg":
          return this.vehicleRegDisplay(existing);
        case "new_license":
          return this.newDriverDisplay();
        default:
          return "";
      }
    }
  }
  /**
   * decides what to render in the vehicle section of the page
   * @param appType what type of application is being created? / value from applicationTypeOption
   * @param vId is there a vehicle applied to the application already? / value from this.state.vehicleId
   */
  applicationVehicleDisplay(appType, vId) {
    if (appType === "vehicle_reg" && vId === "") {
      let thisYear = new Date().getFullYear(); //to set the max value on the year field
      return (
        <div className="">
          <div className="input-group mb-3">
            <input
              type="number"
              max={thisYear + 1} //next year's model should be the max value in this field
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
            onClick={this.createNewVehicle} //triggers the create action
            className="btn btn-primary btn-lg"
          >
            Create Vehicle
          </button>
        </div>
      );
    } else if (vId !== "") {
      return <div>Vehicle Applied</div>;
    } else {
      return "";
    }
  }
  /**
   * returns an update address view in the customer section
   */
  addressChangeDisplay() {
    let updateView = "";
    let updateBtn = "";

    if (this.state.update_successful === false) {
      updateView = (
        <div>
          <LookupFieldFormControl
            storeName="testLookup"
            crmTableName="customer"
            valueCRMColumn="madmv_ma_customerid"
            labelCRMColumns={["madmv_fullname", "madmv_cssn"]}
            onChange={e => this.setState({ userId: e.target.value })}
          />
          <br />
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.street1FieldChange}
              className="form-control"
              placeholder="Enter line 1 of new street address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Street 1
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.street2FieldChange}
              className="form-control"
              placeholder="Enter line 2 of new street address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Street 2
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.cityFieldChange}
              className="form-control"
              placeholder="Enter city of new address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                City
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.stateFieldChange}
              className="form-control"
              maxLength="2"
              placeholder="Enter state abbreviation of new address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                State
              </span>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.zipFieldChange}
              className="form-control"
              placeholder="Enter zip code of new address.."
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Zip Code
              </span>
            </div>
          </div>
          <hr />
        </div>
      );
    } else {
      updateView = (
        <div>
          <p>Customer successfully updated. You can submit the application.</p>
        </div>
      );
    }

    if (
      this.state.street1 !== "" &&
      this.state.city !== "" &&
      this.state.stateProv !== "" &&
      this.state.zip !== "" &&
      this.state.update_successful === false
    ) {
      updateBtn = (
        <button
          onClick={this.updateUserAddress} //triggers the create action
          className="btn btn-primary btn-lg"
        >
          Update Customer&apos;s Address
        </button>
      );
    }

    return (
      <div className="">
        {updateView}
        {updateBtn}
      </div>
    );
  }
  /**
   * returns a renew driver's license display in the customer section
   */
  renewLicenseDisplay() {
    return (
      <div className="">
        <LookupFieldFormControl
          storeName="testLookup"
          crmTableName="customer"
          valueCRMColumn="madmv_ma_customerid"
          labelCRMColumns={["madmv_fullname", "madmv_cssn"]}
          onChange={e => this.setState({ userId: e.target.value })}
        />
        <br />
      </div>
    );
  }
  /**
   * returns the vehicle registration display
   * @param existing is this customer an existing customer? / value from existingUserOption
   */
  vehicleRegDisplay(existing) {
    if (existing === "yes") {
      return (
        <div>
          <LookupFieldFormControl
            storeName="testLookup"
            crmTableName="customer"
            valueCRMColumn="madmv_ma_customerid"
            labelCRMColumns={["madmv_fullname", "madmv_cssn"]}
            onChange={e => this.setState({ userId: e.target.value })}
          />
          <br />
          <br />
        </div>
      );
    } else {
      return this.createCustomerView();
    }
  }
  /**
   * returns display for new driver's license in customer section
   */
  newDriverDisplay() {
    return this.createCustomerView();
  }
  /**
   * shows submit application button if the base requirements are met for the application type
   * @param appType the type of application being created / value from this.state.applicationType
   * @param uId is there a customer connected to the application? / value from this.state.userId
   * @param vId is there a vehicle connected to the application? / value from this.state.vehicleId
   */
  showSubmitBtn(appType, uId, vId) {
    if (appType === "" && uId === "" && vId === "") {
      return "";
    } else if (appType === "vehicle_reg" && uId !== "" && vId !== "") {
      return (
        <button
          onClick={this.createNewApplication} //triggers the create action
          className="btn btn-block btn-primary btn-lg"
        >
          SUBMIT APPLICATION
        </button>
      );
    } else if (
      appType === "address_change" &&
      uId !== "" &&
      this.state.street1 !== "" &&
      this.state.city !== "" &&
      this.state.stateProv !== "" &&
      this.state.zip !== "" &&
      this.state.update_successful === true
    ) {
      return (
        <button
          onClick={this.createNewApplication} //triggers the create action
          className="btn btn-block btn-primary btn-lg"
        >
          SUBMIT APPLICATION
        </button>
      );
    } else if (appType === "renew_license" && uId !== "") {
      return (
        <button
          onClick={this.createNewApplication} //triggers the create action
          className="btn btn-block btn-primary btn-lg"
        >
          SUBMIT APPLICATION
        </button>
      );
    } else if (appType === "new_license" && uId !== "") {
      return (
        <button
          onClick={this.createNewApplication} //triggers the create action
          className="btn btn-block btn-primary btn-lg"
        >
          SUBMIT APPLICATION
        </button>
      );
    }
  }
  //||||||||||||||||||||||RENDER||||||||||||||||||||||||||||||||||||\\
  render() {
    var appTypeSelector = "";
    var existingUserSelect = "";
    var customerDisplay = "";
    var vehicleDisplay = "";
    var submitAppBtn = "";
    var successful_msg = "";

    if (this.state.application_successful === false) {
      appTypeSelector = ( //what type of application is it?
        <div className="input-group mb-3">
          <select
            className="custom-select"
            id="appType"
            onChange={this.applicationTypeOption}
            value={this.state.applicationType}
          >
            <option defaultValue="">Choose appliction type..</option>
            <option value="vehicle_reg">Vehicle Registration</option>
            <option value="address_change">Address Change</option>
            <option value="renew_license">Renew Driver&apos;s License</option>
            <option value="new_license">New Driver&apos;s License</option>
          </select>
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="appType">
              Application Type
            </label>
          </div>
        </div>
      );
    }
    if (this.state.application_successful === false) {
      existingUserSelect = this.showExisting(
        //is this user an existing user / for if this is a vehicle registration
        this.state.applicationType,
        this.state.userId
      );
    }
    if (this.state.application_successful === false) {
      customerDisplay = this.applicationCustomerDisplay(
        //who is this application for?
        this.state.applicationType,
        this.state.existingUser
      );
    }
    if (this.state.application_successful === false) {
      vehicleDisplay = this.applicationVehicleDisplay(
        //is this a vehicle registration?
        this.state.applicationType,
        this.state.vehicleId
      );
    }
    if (this.state.application_successful === false) {
      submitAppBtn = this.showSubmitBtn(
        //submit the application
        this.state.applicationType,
        this.state.userId,
        this.state.vehicleId
      );
    }
    if (this.state.application_successful === true) {
      successful_msg = (
        <div>
          <h1>Application Successfully Submitted!!</h1>
        </div>
      );
    }

    //||||||||||||||||||||||RETURN||||||||||||||||||||||||||||||\\
    return (
      <div>
        {appTypeSelector}
        {existingUserSelect}
        {customerDisplay}
        {vehicleDisplay}
        {submitAppBtn}
        {successful_msg}
      </div>
    );
  }
}

//||||||||||||||||||||MISC|||||||||||||||||||||||||||\\
/**
 * capitalizes the first letter in a name / takes into consideration multi-word names
 * @param name the name being formatted
 */
const capitalize = name => {
  if (typeof name !== "string") {
    //check the type of the value to make sure string methods can be applied
    return "";
  } else {
    let lowercased = name.toLowerCase(); //lowercase the entire string
    let capped = []; //create empty array of capitalized words
    let forMultiWordName = lowercased.split(" "); //will create an array of lowercased words, if its only one word the array will only contain that one word
    forMultiWordName.map(element => {
      //will capitalize the first letter of each word in the array and add the word to the capped array
      capped.push(element.charAt(0).toUpperCase() + element.slice(1));
    });
    let newName = ""; //the new name
    capped.forEach(element => {
      //concatenate the elements, seperating them by a space
      newName += `${element} `;
    });

    return newName.trim(); //delete the space at the end of the string and return it as the newly formatted name
  }
};

/**
 * the id can be extracted from within the response's url
 * @param responseString the string that contains the id
 */
const extractId = responseString => {
  let newStr1 = responseString.replace(
    //remove the following from the url
    "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_customers(",
    ""
  );
  let newStr2 = newStr1.replace(")", ""); //remove the the closing paren from the url
  return newStr2; //return the extracted id
};
