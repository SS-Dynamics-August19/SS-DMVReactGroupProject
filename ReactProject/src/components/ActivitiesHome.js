import React from "react";
//import PropTypes from "prop-types";
//import { State, ExternalURL } from "../constants/DataLoaderConstants.js";
//import DataLoader from "../actions/DataLoader.js";
//import Activitystore from "../stores/ActivityStore.js";
import ActivityActions from "../actions/ActivityActions.js";

import DataLoader from "../actions/DataLoader.js";
//import ActivityStore from "../stores/ActivityStore.js";
import { State } from "../constants/DataLoaderConstants.js";
import stores from "../stores/stores.js";

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

//const DATA_STORE = "user";
export default class ActivitiesHome extends React.Component {

    render() {
        
        return <div> {this.getContent()} </div>;
    }

    getContent() {
        
        let state = stores.activity.data.readState;
        //console.log(stores.activity.data);
        switch (state) {
            case State.DEFAULT:
                return this.getDefaultContent();
            case State.STARTED:
                return this.getStartedContent();
            case State.FAILURE:
                return this.getFailureContent();
            case State.SUCCESS:
                return this.getSuccessContent();
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

    getFailureContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading!
            </div>
        );
    }

    getSuccessContent() {

        let records = stores.activity.data.records;
        let appRecords = stores.application.data.records;
        let cusRecords = stores.customer.data.records;
        let vehRecords = stores.vehicle.data.records;
        let appValidDates = [], cusValidDates = [], vehValidDates = [];
        //let appCounter = 0;
       
        console.log(records);
        console.log(appRecords);


        appRecords.forEach(appRecord => {
            this.checkDate(appRecord, appValidDates);
        });
        cusRecords.forEach(cusRecord => {
            this.checkDate(cusRecord, cusValidDates);
        });
        vehRecords.forEach(vehRecord => {
            this.checkDate(vehRecord, vehValidDates);
        });
        console.log(appValidDates.length)
        console.log(cusValidDates.length)
        console.log(vehValidDates.length)


        return (
            <div className="row">
                <div className="cardContainer col-4">
                   {records.map((value, index) => {
                       let cdate = (new Date(value.createdon)).toLocaleDateString('en-US', DATE_OPTIONS);
                       
                                return (<div key={index} className="card">
                                <h5 className="card-header">Activity - {cdate}</h5>
                                <div className="card-body">
                                    <h5 className="card-title">{value.subject}</h5>
                                    <p className="card-text">{value.description}</p>
                                    <a href="#" className="btn btn-primary">Regarding Record</a>
                                </div>
                            </div>)
                            })}
                </div>
                <div className="cardCounterContainer col-8">
                    <div className="cardCounter">
                        <h5 className="card-header">Applications</h5>
                        <div className="card-body">
                            <h5 className="card-title">{appValidDates.length}</h5>
                            <p className="card-text">Created this week</p>
                        </div>
                    </div>
                    <div className="cardCounter">
                        <h5 className="card-header">Customers</h5>
                        <div className="card-body">
                            <h5 className="card-title">{cusValidDates.length}</h5>
                            <p className="card-text">Created this week</p>
                        </div>
                    </div>
                    <div className="cardCounter">
                        <h5 className="card-header">Vehicles</h5>
                        <div className="card-body">
                            <h5 className="card-title">{vehValidDates.length}</h5>
                            <p className="card-text">Created this week</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    checkDate(appRecord, validDates) {
        let currentDate = new Date(Date.now());
        let dateWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000); 
        let recordDate = new Date(appRecord.createdon);

        if (recordDate > dateWeekAgo) {
            validDates.push(recordDate)
        }
        return validDates;

    }

    componentDidMount(){
        //if (this.needsToLoad()) 
        //console.log("component did mount");
        this.loadFromCRM();
    }

    needsToLoad() {
        //console.log(stores.activity.data.readState);
        return (stores.activity.data.readState === State.DEFAULT_STATE);
    }

    loadFromCRM() {
        //let query = this.generateQuery();
        new ActivityActions().load();
        let dataType = "application";
        new DataLoader(DataLoader.generateDynamicsQuery("application", ["madmv_appid", "createdon"]), dataType).load();
        dataType = "customer";
        new DataLoader(DataLoader.generateDynamicsQuery("customer", ["madmv_fullname", "createdon"]), dataType).load();
        dataType = "vehicle";
        new DataLoader(DataLoader.generateDynamicsQuery("vehicle", ["madmv_vehicleidnumber", "createdon"]), dataType).load();
        
    }

/*
    getFieldList() {
        let keyField = "madmv_ma_" + this.props.dataType + "id";
        let ret = [keyField];

        for (let column of this.props.columns) {
            ret.push(column.field);
        }

        return ret;
    }
    */
}



