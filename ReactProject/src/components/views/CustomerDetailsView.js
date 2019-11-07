//import React from 'react'
import React from "react";
//import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class CustomerDetailsView extends React.Component {
    super(props)
    constructor(object) {
    this.object = object;
    
}

    /*
    state = {
        madmv_age: '',
        madmv_birthdate: '',
        madmv_city: '',
        madmv_country: '',
        madmv_cssn: '',
        madmv_email: '',
        madmv_firstname: '',
        madmv_fullname: '',
        madmv_hiddendifday: '',
        madmv_lastname: '',
        madmv_ma_customerid: '',
        madmv_phonenumber: '',
        madmv_stateprovince: '',
        madmv_street1: '',
        madmv_street2: '',
        madmv_zippostalcode: '',
        owninguser: ''
    }   

    */

    /*
    <div className="detailedHeader">
                <h1>Customer</h1>
                <button className="btn btn-primary" onClick={() => console.log(customer.madmv_ma_customerid)} type="button">Update Record</button>
            </div>
            <div className="h2Th">
                <h2>General Information</h2>
                <h2>Detailed Information</h2>
            </div>
            <form className="detailedForm">
                <table>
                    <tbody>owninguser

            </tbody>
                </table>
            </form>

        

    */


    render() {
        let customer = this.fetchFromCRM();


        return <div className="detailedDiv">

            <div className="detailedHeader">
                <h1>Customer</h1>
                <button className="btn btn-primary" onClick={() => console.log(customer.madmv_ma_customerid)} type="button">Update Record</button>
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

                            <pre>                                       </pre>

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
        let customer = {
            madmv_firstname:    "John",
            madmv_lastname:     "Doe",
            madmv_cssn:         "111111111",
            madmv_birthdate:    "July 4",
            madmv_age:          "34",
            madmv_phonenumber:  "1234567890",
            madmv_email:        "a@a.a",
            madmv_street1:      "sit street",
            madmv_street2:      "",
            madmv_city:         "townsville",
            madmv_stateprovince:"West Virginia",
            madmv_zippostalcode:"000000",
            madmv_country:      "US",
            owninguser:         "jack smith"
        };
        return customer;
    }

}

export default CustomerDetailsView;

