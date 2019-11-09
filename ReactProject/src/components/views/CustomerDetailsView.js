import React from "react";
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";
import { adalApiFetch } from '../../adalConfig.js';

class CustomerDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: undefined
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
        

        //console.log(customer.madmv_lastname);
        
        //console.log(customer);
 

        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Customer</h1>
                <button className="btn btn-primary" onClick={() => console.log("ignore this"/*customer.madmv_ma_customerid*/)} type="button">Update Record</button>
            </div>
            <div className="h2Th">
                <h2>General Information</h2>
                <h2>Detailed Information</h2>
            </div>
            <form className="detailedForm">
                <table>
                    <tbody>

                        <tr className="trDetailedView">

                            <th className="thDetailedView">

                                <div className="form-group fieldDetailed form-inline">
                                    <label>Owner:</label>
                                    <select disabled className="form-control">
                                        <option>{customer.owninguser}</option>
                                    </select>
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Vehicle 1:</label>
                                    <select disabled className="form-control">
                                        <option>BMW 3 Series</option>
                                    </select>
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Vehicle 2:</label>
                                    <select disabled className="form-control">
                                        <option>Lexus</option>
                                    </select>
                                </div>
                            </th>

                            <th className="thDetailedView">

                                <div className="form-group fieldDetailed form-inline">
                                    <label>First Name:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_firstname} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Last Name:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_lastname} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>SSN:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_cssn} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Birth Date:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_birthdate} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Age:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_age} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Phone Number:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_phonenumber} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Email Address:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_email} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Street 1:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_street1} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Street 2:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_street2} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>City:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_city} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>State/Province:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_stateprovince} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>ZIP/Postal Code:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_zippostalcode} />
                                </div>
                                <div className="form-group fieldDetailed form-inline">
                                    <label>Country:</label>
                                    <input type="text" className="form-control" disabled value={customer.madmv_country} />
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    }

    fetchFromCRM() {
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(this.props.match.params.id, "customer", "madmv_firstname", "madmv_lastname", "madmv_cssn",
            "madmv_birthdate", "madmv_age", "madmv_phonenumber", "madmv_email", "madmv_street1", "madmv_street2", "madmv_city",
            "madmv_stateprovince", "madmv_zippostalcode", "madmv_country");

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
                //console.log(response);
                let newState = {};
                newState.data = response.data;
                newState.owninguser = "Example User";
                newState.loaded = true;
                this.setState(newState);
            }.bind(this));
    }
}
CustomerDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

export default CustomerDetailsView;