import React from "react";
import PropTypes from "prop-types";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';

export default class CRMViewVehicle extends React.Component {
  render() {
    return <div>{this.getContent()}</div>;
  }

  getContent() {
    let state = stores[this.props.dataType].data.readState;
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
    return this.getStartedContent();
  }

    getDefaultContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Loading did not start.
            </div>
        );
    }

    getStartedContent() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }

    handleDelete(id){
        console.log(id)
        //ApplicationActions.deleteApplication(id) same, call the deleteVehicle function
    }

    handleView(obj){
        console.log(obj)
    }

    getSuccessContent() {
         
        let content = {columns: [

            {label:'Year Model',  field:'madmv_yearmodel'},
            {label:'Vehicle Make',field:'madmv_vehiclemake'},
            {label:'Vehicle Identification Number',field:'madmv_vehicleidnumber' },
            {label:'License Plate Number', field:'madmv_licenseplate'},
            {label:'Creation Time', field:'createdon',},
            {label:' ',field:'detail',},
            {label:' ',field:'delete',}],

    
          rows: this.getTableBodyContent(),
    
        }
        return (
            <Row className="mb-4">
                <Col md="12">
                    <Card>
                        <CardBody>
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={content}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
/*
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
*/

//this will now be use to make sure the data is in correct format so the datata can run successful
//without any null error
    getTableBodyContent() {
     
        let tableData = stores[this.props.dataType].data.records;
         
        
          tableData.forEach(obj => {
            obj["detail"] = <input type="button" value="Detail Info"  onClick={()=>this.handleView(obj)}/>
            obj["delete"] = <input type="button" value="delete" onClick={()=>this.handleDelete(obj.madmv_ma_vehicleid)}/>
            
            if(obj.madmv_yearmodel === null) 
                 obj.madmv_yearmodel = " ";
            if(obj.madmv_vehiclemake === null) 
                obj.madmv_vehiclemake = " ";
            if(obj.madmv_licenseplate === null)
                obj.madmv_licenseplate = " ";
            if(obj.madmv_vehicleidnumber === null)
                obj.madmv_vehicleidnumber = " ";
                
              })
            
        

        return tableData
        
    }
    
   /* 
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
    }*/

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
        return (stores[this.props.dataType].data.readState != State.SUCCESS);
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

CRMViewVehicle.propTypes = {
  dataType: PropTypes.string.isRequired,
  rowKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};