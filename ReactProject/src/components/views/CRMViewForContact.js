import React from "react";
import PropTypes from "prop-types";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';

export default class CRMViewContact extends React.Component {
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
    
    getSuccessContent() {
        console.log(stores[this.props.dataType].data.records);
         
        let content = {columns: [

            {
    
              label:'Name',
    
              field:'madmv_fullname',
    
            },
    
            {
    
              label:'Age',
    
              field:'madmv_age',
    
            },
    
            {
    
              label:'SSN',
    
              field:'madmv_cssn',
    
            },
            {
    
                label:'Email',
      
                field:'madmv_email',
      
              },
              {
    
                label:'Phone',
      
                field:'madmv_phonenumber',
      
              }
          ],

    
          rows: stores[this.props.dataType].data.records,
    
        }
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
    }

    getTableBodyContent() {
        let tableData = stores[this.props.dataType].data.records;

        return tableData
        
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

CRMViewContact.propTypes = {
  dataType: PropTypes.string.isRequired,
  rowKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};