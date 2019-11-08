import React from "react";
//import PropTypes from "prop-types";
//import { State, ExternalURL } from "../constants/DataLoaderConstants.js";
//import DataLoader from "../actions/DataLoader.js";
//import Activitystore from "../stores/ActivityStore.js";
import ActivityActions from "../../actions/ActivityActions.js";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { State } from "../../constants/DataLoaderConstants.js";
import stores from "../../stores/stores.js";

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };


//const DATA_STORE = "user";
export default class ActivitiesHome extends React.Component {


    render() {
        
        
        return <div> {this.getContent()} </div>;
    }

    getContent() {
        
        let state = stores.activity.data.readState;
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

        appRecords.forEach(appRecord => {
            this.checkDate(appRecord, appValidDates);
        });
        cusRecords.forEach(cusRecord => {
            this.checkDate(cusRecord, cusValidDates);
        });
        vehRecords.forEach(vehRecord => {
            this.checkDate(vehRecord, vehValidDates);
        });

        let pieData = {
                  labels: ["Vehicle Registration", "Address Change"],
                  datasets: [
                    {
                      data: this.appTypeCounter(appRecords),
                      backgroundColor: [
                        "#F7464A",
                        "#46BFBD"
                      ],
                      hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1"
                      ]
                    }
                  ]
            };


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
                     <div className="col-12">
                    <MDBContainer>
                        <h3 className="">Application Types</h3>
                        <Pie data={pieData} options={{ responsive: true }} />
                    </MDBContainer>
                    </div>
                </div>
            </div>
        );
    }

    appTypeCounter(appRecords) {
        let appTypes = [0,0,0,0];
        for (let i = 0; i < appRecords.length; i++)
        {
            switch(appRecords[i].madmv_applicationtype) {
                
                case 876570000:
                    appTypes[0]++;
                    break;
                case 876570001:
                    appTypes[1]++;
                    break;
                case 876570002:
                    appTypes[2]++;
                    break;
                case 876570003:
                    appTypes[3]++;
                    break;
            }
        }
        return appTypes;
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
        this.loadFromCRM();
    }

    needsToLoad() {
        return (stores.activity.data.readState === State.DEFAULT_STATE);
    }

    loadFromCRM() {
        let dataType = "activity";
        let query = ActivityActions.generateDynamicsQuery("task");
        new ActivityActions(query, dataType).load();
        
        dataType = "application";
        query = ActivityActions.generateDynamicsQuery("application", ["madmv_applicationtype" ,"createdon"]);
        new ActivityActions(query, dataType).load();
        dataType = "customer";
        query = ActivityActions.generateDynamicsQuery("customer", ["createdon"]);
        new ActivityActions(query, dataType).load();
        dataType = "vehicle";
        query = ActivityActions.generateDynamicsQuery("vehicle", ["createdon"]);
        new ActivityActions(query, dataType).load();
    }
}
