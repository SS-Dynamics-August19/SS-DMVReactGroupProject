import React from 'react';
import PropTypes from 'prop-types';
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader             from '../../actions/DataLoader.js';

export default class CRMView extends React.Component {
    render() {
        return (
            <div>
                {this.getContent()}
            </div>
        );
    }

    getContent() {
        let state = this.props.tableState.readState;
        switch (state) {
            case State.DEFAULT:
                return this.getDefaultContent();
            case State.STARTED:
                return this.getStartedContent();
            case State.SUCCESS:
                return this.getSuccessContent();
            case State.FAILURE:
                return this.getFailureContent();
        }
    }

    getDefaultContent() { return "Error..."; }

    getStartedContent() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }
    
    getSuccessContent() {
        return (
            <table className="CRMTable">
                <thead>
                    {this.getTableHeaderContent()}
                </thead>
                <tbody>
                    {this.getTableBodyContent()}
                </tbody>    
            </table>
        );
    }

    getTableHeaderContent() {
        return (
            <tr className="CRMTable">
                {this.createHeaderRowCells()}
            </tr>
        );
    }

    createHeaderRowCells() {
        let columns = this.props.columns;
        let ret = [];

        columns.forEach(function(column) {
            ret.push(
                <th key={column.header} className="CRMTable">
                    {column.header}
                </th>
            );
        });

        return ret;
    }

    getTableBodyContent() {
        let tableData = this.props.tableState.records;
        return tableData.map(this.createTableRow, this);
    }
    
    
    createTableRow(record) {
        let key = record[this.props.rowKey];

        return (
            <tr key={key} className="CRMTable">
                {this.createTableRowCells(record, key)}
            </tr>
        );
    }

    createTableRowCells(record, keyPrefix) {
        let columns = this.props.columns;
        let ret = [];

        columns.forEach( function(column) {
            ret.push(
                <td key={keyPrefix + ":" + column.key} className="CRMTable">
                    { record[column.key] }
                </td>
            );
        });

        return ret;
    }

    getFailureContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading!
            </div>
        );
    }

    componentDidMount() {
        if(this.needsToLoad()) this.loadFromCRM();
    }

    needsToLoad() {
        return (this.props.tableState.readState != State.SUCCESS);
    }

    loadFromCRM() {
        let dataType = this.props.dataType;
        let query = this.generateQuery();
        new DataLoader(query, dataType).load();
    }

    generateQuery() {
        let columns = this.props.columns;
        let rowKey = this.props.rowKey;

        let query = ExternalURL.DYNAMICS_PREFIX + this.props.dataType + ExternalURL.DYNAMICS_SUFFIX + rowKey;
        for (let i = 0; i < columns.length; i++) {
            let key = columns[i].key;
            query += "," + key;
        }

        return query;
    }
}

CRMView.propTypes = {
    dataType:   PropTypes.string.isRequired,
    tableState: PropTypes.object.isRequired,
    rowKey:     PropTypes.string.isRequired,
    columns:    PropTypes.array.isRequired
};