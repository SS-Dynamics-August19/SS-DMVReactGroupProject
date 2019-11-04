import React from "react";
import PropTypes from "prop-types";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';

export default class CRMView extends React.Component {
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
    
    handleClick(event){
        console.log("hello")
    }
    
    getSuccessContent() {
        console.log(stores[this.props.dataType].data.records);
         
        let content = {columns: [

            {
    
              label:'Appname',
    
              field:'madmv_appid',
    
            },
    
            {
    
              label:'Apptype',
    
              field:'madmv_applicationtype',
    
            },
    
            {
    
              label:'Subject',
    
              field:'madmv_applicationsubject',
    
            },
            {
    
                label:'CreamTime',
      
                field:'createdon',
      
              }
          ],

    
          rows: this.getTableBodyContent(),
    
        }
        if (stores[this.props.dataType].data.authorization.includes(this.props.dataType))
        {
            return (
                <Row className ="mb-4">
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
        } else {

            
            return (
                <div>
                    You are not authorized to view this page
                </div>
            );
        }





            
          /*  <table className="CRMTable">
                <thead>
                    {this.getTableHeaderContent()}
                </thead>
                <tbody>
                    {this.getTableBodyContent()}
                </tbody>    
            </table>*/
        
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
    getTableBodyContent() {
        let tableData = stores[this.props.dataType].data.records;
     

        // check if tableData contains application info & replace appl.type digits with label
        if (tableData.some(ob => ob.madmv_applicationtype)) {
            tableData.forEach(obj => {
             switch(obj.madmv_applicationtype) {
                 case 876570000:
                  obj.madmv_applicationtype = "Vehicle Registration";
                  break;
                  case 876570001:
                   obj.madmv_applicationtype = "Address Change";
                   break;
                  case 876570002:
                   obj.madmv_applicationtype = "New Driving License";
                   break;
                   case 876570003:
                   obj.madmv_applicationtype = "Driving License Renewal";
                   break;
               }

            })

            tableData.forEach(obj => {
                obj["clickEvent"] = ()=>this.handleClick(event)
                if(obj.madmv_appid === null) 
                     obj.madmv_appid = " ";
                if(obj.madmv_applicationtype === null) 
                    obj.madmv_applicationtype = " ";
                if(obj.applicationsubject === null)
                    obj.madmv_applicationsubject = " ";
           
                    
                  })
        
        }

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

CRMView.propTypes = {
  dataType: PropTypes.string.isRequired,
  rowKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};
