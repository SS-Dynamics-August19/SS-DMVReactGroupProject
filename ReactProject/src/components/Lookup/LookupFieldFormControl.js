import React from "react";
import PropTypes from "prop-types";
import DataLoader from "../../actions/DataLoader";
import stores from "../../stores/stores.js";
import { State } from "../../constants/DataLoaderConstants.js";

const capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

/** This component is intended to mimic the lookup field form control from MS Dynamics.
 * It renders an optionbox with options pulled from the CRM, and runs a callback provided
 * by the caller via props when the user changes selections.
 *  
 *  Props:
 *      storeName - The name of the data store to use, from stores.js. Recommended to use
 *                  a unique store for each LookupFieldFormControl on each page.
 *      crmTableName - The name (no prefix) of the CRM table to pull lookup options from.
 *      valueCRMColumn - The full name of the CRM field to return as data when a user
 *                       select the record.
 *      labelCRMColumns - Array containing full names of CRM fields to use as labels in
 *                        the optionbox.
 *      onChange - A callback to run when the user changes the selected option.
 *  
 *  Example usage:
 *  
 *  <LookupFieldFormControl
 *      storeName="testLookup"
 *      crmTableName="customer"
 *      valueCRMColumn="madmv_ma_customerid"
 *      
 *      labelCRMColumns={[
 *          "madmv_fullname"
 *      ]}
 *      
 *      onChange={function(event) {
 *      
 *          // The name provided above in LookupFieldFormControl.props.storeName.
 *          let name = event.target.name;
 *          
 *          // The value of the selected record's field chose above via
 *          //     LookupFieldFormControl.props.valueCRMColumn.
 *          let value = event.target.value;
 *          
 *          alert(name + ": " + value); // Replace this with the payload code.
 *      }}
 *  />  */
export default class LookupFieldFormControl extends React.Component {
    constructor(props) {
        super(props);

        this.sendCRMQuery();
        this.state = {
            selectedOption: undefined
        }
    }

    render() {
        return (<div>{this.getContent()}</div>);
    }

    getContent() {
        let state = stores[this.props.storeName].data.readState;
        switch (state) {
            case State.DEFAULT:
            case State.FAILURE:
                return this.getErrorContent();
            case State.STARTED:
                return this.getStartedContent();
            case State.SUCCESS:
                return this.getSuccessContent();
        }
        return this.getStartedContent();
    }

    getErrorContent() {
        return (
            <select name={this.props.storeName} defaultValue="Error">
                <option value="Error">Error sending query to CRM.</option>
            </select>
        );
    }

    getStartedContent() {
        return (
            <select name={this.props.storeName} defaultValue="Loading">
                <option value="Loading">Loading records from CRM...</option>
            </select>
        );
    }

    getSuccessContent() {
        return (
            <select name={this.props.storeName} onChange={this.props.onChange}>
                <option value="None Selected">🔍 {capitalize(this.props.crmTableName)}</option>
                {this.generateOptions()}
            </select>
        );
    }

    generateOptions() {
        let ret = [];
        let valueKey = this.props.valueCRMColumn;
        for (let record of stores[this.props.storeName].data.records) {
            ret.push(
                <option key={record[valueKey]} value={record[valueKey]}>
                    {this.getConcatenatedLabelColumns(record)}
                </option>
            );
        }
        return ret;
    }

    getConcatenatedLabelColumns(record) {
        let ret = "";
        for (let column of this.props.labelCRMColumns) {
            ret += record[column] + " ";
        }
        return ret;
    }

    sendCRMQuery() {
        let query = DataLoader.generateDynamicsQuery(this.props.crmTableName, this.props.valueCRMColumn, ...this.props.labelCRMColumns);
        new DataLoader(query, this.props.storeName).load();
    }
}

LookupFieldFormControl.propTypes = {
    storeName      : PropTypes.string.isRequired,
    crmTableName   : PropTypes.string.isRequired,
    valueCRMColumn : PropTypes.string.isRequired,
    labelCRMColumns: PropTypes.array.isRequired,
    onChange       : PropTypes.func.isRequired
};