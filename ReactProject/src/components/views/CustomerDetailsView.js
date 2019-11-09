import React from "react";
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";
import CustomerActions from "../../actions/CustomerActions.js";

class CustomerDetailsView extends React.Component {
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
          madmv_age: this.state.olddata.madmv_age,
          madmv_birthdate: this.state.olddata.madmv_birthdate,
          madmv_city: this.state.olddata.madmv_city,
          madmv_country: this.state.olddata.madmv_country,
          madmv_cssn: this.state.olddata.madmv_cssn,
          madmv_email: this.state.olddata.madmv_email,
          madmv_firstname: this.state.olddata.madmv_firstname,
          madmv_fullname: '',
          madmv_hiddendifday: '',
          madmv_lastname: this.state.olddata.madmv_lastname,
          madmv_ma_customerid: this.state.olddata.madmv_ma_customerid,
          madmv_phonenumber: this.state.olddata.madmv_phonenumber,
          madmv_stateprovince: this.state.olddata.madmv_stateprovince,
          madmv_street1: this.state.olddata.madmv_street1,
          madmv_street2: this.state.olddata.madmv_street2,
          madmv_zippostalcode: this.state.olddata.madmv_zippostalcode,
          owninguser: this.state.olddata.owninguser,
          disabled: true,
        })
      }

      handleSubmit (event)  {
        event.preventDefault();
        console.log(this.state);
        CustomerActions.updateCustomer(this.state.olddata.madmv_ma_customerid,this.state)
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

        let customer = this.state;


        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Customer</h1>
                <button className="btn btn-primary" onClick={this.handleClick} type="button">Update Record</button>
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
                                        <label>Owner:</label>
                                        <select className="form-control">
                                            <option>{customer.owninguser}</option>
                                        </select>
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Vehicle 1:</label>
                                        <select className="form-control">
                                            <option>BMW 3 Series</option>
                                        </select>
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Vehicle 2:</label>
                                        <select className="form-control">
                                            <option>Lexus</option>
                                        </select>
                                    </div>
                                </th>

                                <th className="thDetailedView">

                                    <div className="form-group fieldDetailed form-inline">
                                        <label>First Name:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_firstname} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Last Name:</label>
                                        <input name="madmv_lastname" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_lastname} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>SSN:</label>
                                        <input name="madmv_cssn" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_cssn} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Birth Date:</label>
                                        <input name="madmv_birthdate" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_birthdate} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Age:</label>
                                        <input name="madmv_age" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_age} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Phone Number:</label>
                                        <input name="madmv_phonenumber" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_phonenumber} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Email Address:</label>
                                        <input name="madmv_email" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_email} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Street 1:</label>
                                        <input name="madmv_street1" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_street1} />
                                    </div><div className="form-group fieldDetailed form-inline">
                                        <label>Street 2:</label>
                                        <input name="madmv_street2" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_street2} />
                                    </div><div className="form-group fieldDetailed form-inline">
                                        <label>City:</label>
                                        <input name="madmv_city" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_city} />
                                    </div><div className="form-group fieldDetailed form-inline">
                                        <label>State/Province:</label>
                                        <input name="madmv_stateprovince" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_stateprovince} />
                                    </div><div className="form-group fieldDetailed form-inline">
                                        <label>ZIP/Postal Code:</label>
                                        <input name="madmv_zippostalcode" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_zippostalcode} />
                                    </div><div className="form-group fieldDetailed form-inline">
                                        <label>Country:</label>
                                        <input name="madmv_country" onChange={this.handleChange} type="text" className="form-control" value={customer.madmv_country} />
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
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(this.props.match.params.id, "customer", "madmv_firstname", "madmv_lastname", "madmv_cssn",
            "madmv_birthdate", "madmv_age", "madmv_phonenumber", "madmv_email", "madmv_street1", "madmv_street2", "madmv_city",
            "madmv_stateprovince", "madmv_zippostalcode", "madmv_country");

        axios.get(cosQuery)
            .then(function (response) {
                console.log(response);
                
                this.setState({
                    olddata:             response.data,
                    madmv_age:           response.data.madmv_age,
                    madmv_birthdate:     response.data.madmv_birthdate,
                    madmv_city:          response.data.madmv_city,
                    madmv_country:       response.data.madmv_country,
                    madmv_cssn:          response.data.madmv_cssn,
                    madmv_email:         response.data.madmv_email,
                    madmv_firstname:     response.data.madmv_firstname,
                    madmv_fullname:      '',
                    madmv_hiddendifday:  '',
                    madmv_lastname:      response.data.madmv_lastname,
                    madmv_ma_customerid: response.data.madmv_ma_customerid,
                    madmv_phonenumber:   response.data.madmv_phonenumber,
                    madmv_stateprovince: response.data.madmv_stateprovince,
                    madmv_street1:       response.data.madmv_street1,
                    madmv_street2:       response.data.madmv_street2,
                    madmv_zippostalcode: response.data.madmv_zippostalcode,
                    loaded: true
                });
            }.bind(this));
    }
}
CustomerDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

export default CustomerDetailsView;