import React from "react";
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";
import { adalApiFetch } from '../../adalConfig.js';
import ApplicationActions from "../../actions/ApplicationActions.js";


class ApplicationDetailsView extends React.Component {
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
        //console.log("clickckck");
        this.setState({ disabled: !this.state.disabled })
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        //console.log(event.target.value)
    }
    handleCancel  () {
        //console.log("cancel");

        this.setState({
            
          madmv_applicationsubject: this.state.olddata.madmv_applicationsubject,
          madmv_applicationtype:   this.state.olddata.madmv_applicationtype,
          madmv_describeother:   this.state.olddata.madmv_describeother,
          madmv_insurancecompany:   this.state.olddata.madmv_insurancecompany,
          madmv_newcity:   this.state.olddata.madmv_newcity,
          madmv_newcountry:   this.state.olddata.madmv_newcountry,
          madmv_newstate:   this.state.olddata.madmv_newstate,
          madmv_newstreet1:   this.state.olddata.madmv_newstreet1,
          madmv_newstreet2:   this.state.olddata.madmv_newstreet2,
          /*
          madmv_birthdate: this.state.olddata.madmv_birthdate,
          madmv_city: this.state.olddata.madmv_city,
          madmv_country: this.state.olddata.madmv_country,
          madmv_cssn: this.state.olddata.madmv_cssn,
          madmv_email: this.state.olddata.madmv_email,
          madmv_firstname: this.state.olddata.madmv_firstname,
          madmv_fullname: '',
          madmv_hiddendifday: '',
          madmv_lastname: this.state.olddata.madmv_lastname,
          madmv_ma_applicationid: this.state.olddata.madmv_ma_applicationid,
          madmv_phonenumber: this.state.olddata.madmv_phonenumber,
          madmv_stateprovince: this.state.olddata.madmv_stateprovince,
          madmv_street1: this.state.olddata.madmv_street1,
          madmv_street2: this.state.olddata.madmv_street2,
          madmv_zippostalcode: this.state.olddata.madmv_zippostalcode,
          owninguser: this.state.olddata.owninguser,
          */
          disabled: true,
        })
      }

      handleSubmit (event)  {
        event.preventDefault();
        //console.log(this.state);
        ApplicationActions.updateApplication(this.state.olddata.madmv_ma_applicationid,this.state)
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

        let application = this.state;


        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Application</h1>
                <button className="btn btn-primary" onClick={this.handleClick} type="button">Update Record</button>
            </div>
            <div className="h2Th">
                <h2>General Information</h2>
                <h2>Detailed Information</h2>
            </div>
            <form onSubmit={this.handleSubmit} className="detailedForm">
                <fieldset disabled={(this.state.disabled) ? "disabled" : ""}>
                    <table>
                        <tbody>

                            <tr className="trDetailedView">


                                <th className="thDetailedView">

                                    <div className="form-group fieldDetailed form-inline">
                                        <label>Application Subject:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={application.madmv_applicationsubject} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>First Name:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={application.madmv_applicationtype} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>First Name:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={application.madmv_insurancecompany} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>First Name:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={application.madmv_fee} />
                                    </div>
                                    <div className="form-group fieldDetailed form-inline">
                                        <label>First Name:</label>
                                        <input name="madmv_firstname" onChange={this.handleChange} type="text" className="form-control" value={application.madmv_newcity} />
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
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(this.props.match.params.id, "application", "madmv_applicationsubject"
        , "madmv_applicationtype", "madmv_describeother", "madmv_fee", "madmv_insurancecompany"
        , "madmv_newcity", "madmv_newcountry", "madmv_newstate", "madmv_newstreet1");

        //console.log(cosQuery);
        let config = {
            'method': 'get',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        };

        adalApiFetch(axios, cosQuery, config)
            .then(function (response) {
                console.log(response);
                
                this.setState({
                    
                    olddata:                    response.data,
                    madmv_applicationsubject:   response.data.madmv_applicationsubject,
                    madmv_applicationtype:   response.data.madmv_applicationtype,
                    madmv_describeother:   response.data.madmv_describeother,
                    madmv_insurancecompany:   response.data.madmv_insurancecompany,
                    madmv_newcity:   response.data.madmv_newcity,
                    madmv_newcountry:   response.data.madmv_newcountry,
                    madmv_newstate:   response.data.madmv_newstate,
                    madmv_newstreet1:   response.data.madmv_newstreet1,
                    madmv_newstreet2:   response.data.madmv_newstreet2,
                    /*
                    madmv_birthdate:     response.data.madmv_birthdate,
                    madmv_city:          response.data.madmv_city,
                    madmv_country:       response.data.madmv_country,
                    madmv_cssn:          response.data.madmv_cssn,
                    madmv_email:         response.data.madmv_email,
                    madmv_firstname:     response.data.madmv_firstname,
                    madmv_fullname:      '',
                    madmv_hiddendifday:  '',
                    madmv_lastname:      response.data.madmv_lastname,
                    madmv_ma_applicationid: response.data.madmv_ma_applicationid,
                    madmv_phonenumber:   response.data.madmv_phonenumber,
                    madmv_stateprovince: response.data.madmv_stateprovince,
                    madmv_street1:       response.data.madmv_street1,
                    madmv_street2:       response.data.madmv_street2,
                    madmv_zippostalcode: response.data.madmv_zippostalcode,
                    */
                    loaded: true
                });
            }.bind(this));
    }
}
ApplicationDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

export default ApplicationDetailsView;