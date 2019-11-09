import React from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";

class CustomerDetailsView extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.customer)
        
        this.state ={
            madmv_cssn: this.props.customer.madmv_cssn,
            madmv_age: this.props.customer.madmv_age,
            madmv_birthdate: this.props.customer.madmv_birthdate,
            madmv_city: this.props.customer.madmv_city,
    madmv_country: this.props.customer.madmv_country,
    //madmv_cssn: this.props.customer.madmv_cssn,  
    madmv_firstname: this.props.customer.madmv_firstname,
    madmv_lastname: this.props.customer.madmv_lastname,
    madmv_ma_customerid: this.props.customer.madmv_ma_customerid,
    madmv_phonenumber: this.props.customer.madmv_phonenumber,
    madmv_stateprovince: this.props.customer.madmv_stateprovince,
    madmv_street1: this.props.customer.madmv_street1,
    madmv_street2: this.props.customer.madmv_street2,
    madmv_zippostalcode: this.props.customer.madmv_zippostalcode,
    disabled: true,
    
        }

        this.handleCancel=this.handleCancel.bind(this)
       // console.log(this.state.madmv_cssn)
    }   
    // toggle disabled and enabled fields
    handleClick()  {
        console.log("clickckck");
        this.setState({disabled: !this.state.disabled})
    }
    handleChange(event)  {
            this.setState({[event.target.name]: event.target.value})
            console.log(event.target.value)
          }

          handleCancel () {
            console.log("cancel");
            this.setState({
              madmv_age: this.props.customer.madmv_age,
              madmv_birthdate: this.props.customer.madmv_birthdate,
              madmv_city: this.props.customer.madmv_city,
              madmv_country: this.props.customer.madmv_country,
              madmv_cssn: this.props.customer.madmv_cssn,
              madmv_email: this.props.customer.madmv_email,
              madmv_firstname: this.props.customer.madmv_firstname,
              madmv_fullname: '',
              madmv_lastname: this.props.customer.madmv_lastname,
              madmv_ma_customerid: this.props.customer.madmv_ma_customerid,
              madmv_phonenumber: this.props.customer.madmv_phonenumber,
              madmv_stateprovince: this.props.customer.madmv_stateprovince,
              madmv_street1: this.props.customer.madmv_street1,
              madmv_zippostalcode: this.props.customer.madmv_zippostalcode,
              disabled: true,
            })
          }
    
    render () {
        return (<div className="detailedDiv">
        <div className="detailedHeader">
        <h1>customer</h1>
        <button className={(!this.state.disabled)?"invisible":"btn btn-primary"}  onClick={() => this.handleClick()} type="button">Update Record
        </button>
=======
import DataLoader from "../../actions/DataLoader.js";
import PropTypes from "prop-types";
import axios from "axios";

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
        

        console.log(customer.madmv_lastname);
        
        console.log(customer);
 

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

>>>>>>> 800fce8d1bd988c6535095913f10e84beac7c262
        </div>
             <div className="h2Th">
              <h2>General Information</h2>
              <h2>Detailed Information</h2>
              </div>
                     <form onSubmit={this.handleSubmit} className="detailedForm">
                    <fieldset disabled={(this.state.disabled)?"disabled":null}>
                     <table>
                     <tbody>
                     <tr className="trDetailedView">
                     <th className="thDetailedView">
                     <div className="form-group fieldDetailed form-inline">
                      <label>Owner:</label>
                      <select className="form-control">
                          <option>{this.state.owninguser}</option>
                        </select>
                     </div>
                     </th>
    
                     <pre>                                                </pre>​
                     <th className="thDetailedView">
    
                     <div className="form-group fieldDetailed form-inline">
                      <label>First Name:</label>
                       <input name="madmv_firstname" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_firstname}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Last Name:</label>
                       <input name="madmv_lastname" onChange={this.handleChange.bind(this)} type="text" className="form-control"  value={this.state.madmv_lastname}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>SSN:</label>
                       <input name="madmv_cssn" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_cssn}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Birth Date:</label>
                       <input name="madmv_birthdate" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_birthdate}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Age:</label>
                       <input name="madmv_age" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_age}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Phone Number:</label>
                       <input name="madmv_phonenumber" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_phonenumber}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Email Address:</label>
                       <input name="madmv_email" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_email}/>
                     </div>
                     <div className="form-group fieldDetailed form-inline">
                      <label>Street 1:</label>
                       <input name="madmv_street1" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_street1}/>
                     </div><div className="form-group fieldDetailed form-inline">
                      <label>Street 2:</label>
                       <input name="madmv_street2" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_street2}/>
                     </div><div className="form-group fieldDetailed form-inline">
                      <label>City:</label>
                       <input name="madmv_city" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_city}/>
                     </div><div className="form-group fieldDetailed form-inline">
                      <label>State/Province:</label>
                       <input name="madmv_stateprovince" onChange={this.handleChange.bind(this)} type="text" className="form-control" value={this.state.madmv_stateprovince}/>
                     </div><div className="form-group fieldDetailed form-inline">
                      <label>ZIP/Postal Code:</label>
                       <input name="madmv_zippostalcode" onChange={this.handleChange.bind(this)}  type="text" className="form-control" value={this.state.madmv_zippostalcode}/>
                     </div><div className="form-group fieldDetailed form-inline">
                      <label>Country:</label>
                       <input name="madmv_country" onChange={this.handleChange.bind(this)}  type="text" className="form-control" value={this.state.madmv_country}/>
                     </div>
                     </th>
                     </tr>
        
                     </tbody>
                     </table>
                     </fieldset>
    
                  <button className={(this.state.disabled)?"invisible":"btn btn-primary cancel-submit btn-lg"}   onClick={() => this.handleCancel()} type="button">Cancel</button>
                     <button className={(this.state.disabled)?"invisible":"btn btn-primary cancel-submit btn-lg"} type="submit">Save</button>
                     </form>
                    </div>)
    }
<<<<<<< HEAD
}
=======

    fetchFromCRM() {
        let cosQuery = DataLoader.generateDynamicsQuerySingleRecord(this.props.match.params.id, "customer", "madmv_firstname", "madmv_lastname", "madmv_cssn",
            "madmv_birthdate", "madmv_age", "madmv_phonenumber", "madmv_email", "madmv_street1", "madmv_street2", "madmv_city",
            "madmv_stateprovince", "madmv_zippostalcode", "madmv_country");

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
CustomerDetailsView.propTypes = {
    match: PropTypes.object.isRequired
};

>>>>>>> 800fce8d1bd988c6535095913f10e84beac7c262
export default CustomerDetailsView;