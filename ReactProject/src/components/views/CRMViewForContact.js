import React from "react";
import PropTypes from "prop-types";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/stores.js";
import { MDBDataTable, Row, Col, Card, CardBody } from "mdbreact";
import { Modal } from "./Modal.js";
import CustomerActions from "../../actions/CustomerActions.js";

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

    handleDelete(id) {
        console.log(id);
        CustomerActions.deleteCustomer(id);
    }

    handleView(obj) {
        console.log(obj);
    }

    getSuccessContent() {
        let content = {
            columns: [
                { label: 'Name', field: 'madmv_fullname' },
                { label: 'Age', field: 'madmv_age' },
                { label: 'SSN', field: 'madmv_cssn' },
                { label: 'Email', field: 'madmv_email' },
                { label: 'Phone', field: 'madmv_phonenumber' },
                { label: ' ', field: 'detail' },
                { label: ' ', field: 'delete' }
            ],
            rows: this.getTableBodyContent()
        };
    }

    
  //   return (
  //     <div>
  //       <Row className="mb-4">
  //         <Col md="12">
  //           <Card>
  //             <CardBody>
  //               <MDBDataTable striped bordered hover data={content} />
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //       <div className="pb-4">
  //         <Modal comp="customer" />
  //       </div>
  //     </div>
  //   );
  // }
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

        tableData.forEach(obj => {
            obj["detail"] = (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => this.handleView(obj)}
                >
                    Detail Info
              </button>
            );
            obj["delete"] = (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(obj.madmv_ma_customerid) }}
                >
                    Delete
              </button>
            );

            if (obj.madmv_fullname === null)
                obj.madmv_fullname = " ";
            if (obj.madmv_age === null)
                obj.madmv_age = " ";
            if (obj.madmv_cssn === null)
                obj.madmv_cssn = " ";
            if (obj.madmv_email === null)
                obj.madmv_email = " ";
            if (obj.madmv_phonenumber === null)
                obj.madmv_phonenumber = " ";
        })



        return tableData;
    }

    getFailureContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading!
      </div>
        );
    }

    componentDidMount() {
        if (this.needsToLoad()) this.loadFromCRM();
    }

    needsToLoad() {
        return stores[this.props.dataType].data.readState != State.SUCCESS;
    }

    loadFromCRM() {
        let dataType = this.props.dataType;
        let query = this.generateQuery();
        new DataLoader(query, dataType).load();
    }

    generateQuery() {
        let columns = this.props.columns;
        let rowKey = this.props.rowKey;

        let query =
            ExternalURL.DYNAMICS_PREFIX +
            this.props.dataType +
            ExternalURL.DYNAMICS_SUFFIX +
            rowKey;
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
