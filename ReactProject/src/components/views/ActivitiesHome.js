import React from "react";
import ActivityActions from "../../actions/ActivityActions.js";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { State } from "../../constants/DataLoaderConstants.js";
import stores from "../../stores/stores.js";

//used when checking what records were created in the last week.
const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

export default class ActivitiesHome extends React.Component {
    render() {
        return <div> {this.getContent()} </div>;
    }

    //check the stte of the load to determine what content to render
    getContent() {
        
        let state = stores.activityHome.data.readState;
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

    //shows if no state was set so probably an error before api call returned
    getDefaultContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Loading did not start.
            </div>
        );
    }

    //loading spinner
    getStartedContent() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    //api call failed
    getFailureContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading!
            </div>
        );
    }

    getSuccessContent() {
        //get the data from the corresponding stores
        let actRecords = stores.activityHome.data.records;
        let appRecords = stores.applicationHome.data.records;
        let cusRecords = stores.customerHome.data.records;
        let vehRecords = stores.vehicleHome.data.records;
        let appValidDates = [], cusValidDates = [], vehValidDates = [], actValidCategory = [];

        //generates a list of activities by only including those with categories. 
        //task created by plugins have categories and therefore will work for redirect while others wont
        actRecords.forEach(actRecord => {
            this.checkActCategory(actRecord, actValidCategory);
        });

        //retrieve array of records for each app/cus/veh entities that were created within the last week
        appRecords.forEach(appRecord => {
            this.checkDate(appRecord, appValidDates);
        });
        cusRecords.forEach(cusRecord => {
            this.checkDate(cusRecord, cusValidDates);
        });
        vehRecords.forEach(vehRecord => {
            this.checkDate(vehRecord, vehValidDates);
        });
        

        //generate the data for the pie chart.
        let pieData = {
                  labels: ["Vehicle Registration", "Address Change", "New License", "License Renewal"],
                  datasets: [
                    {
                      data: this.appTypeCounter(appRecords),
                      backgroundColor: [
                        "#F7464A", "#46BFBD", "#FDB45C", "#949FB1"
                      ],
                      hoverBackgroundColor: [
                        "#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"
                      ]
                    }
                  ]
            };

        //display all the stuff and things
        return (
            <div className="row">
                <div className="cardActContainer col-lg-4 col-sm-12">
                   {actValidCategory.map((value, index) => {
                       let cdate = (new Date(value.createdon)).toLocaleDateString('en-US', DATE_OPTIONS);
                       
                            return (
                                <div key={index} className="card">
                                    <h5 className="card-header">Activity - {cdate}</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">{value.subject}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <button
                                            className="btn btn-block btn-primary"
                                            //onClick={() => this.handleView(record)}
                                            onClick={() => this.handleView(value._regardingobjectid_value, value.category)}
                                        >
                                            Detail Info
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className="cardCounterContainer col-lg-8 col-sm-12">
                    <div className="row">
                        <div className="cardCounter col-3">
                            <h5 className="card-header">Applications</h5>
                            <div className="card-body">
                                <h5 className="card-title">{appValidDates.length} Created</h5>
                                <h5 className="card-text">this week</h5>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="cardCounter col-3">
                            <h5 className="card-header">Customers</h5>
                            <div className="card-body">
                                <h5 className="card-title">{cusValidDates.length} Created</h5>
                                <h5 className="card-text">this week</h5>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="cardCounter col-3">
                            <h5 className="card-header">Vehicles</h5>
                            <div className="card-body">
                                <h5 className="card-title">{vehValidDates.length} Created</h5>
                                <h5 className="card-text">this week</h5>
                            </div>
                        </div>
                        <div className="pieContainer col-12">
                            <div className="row">
                                    <MDBContainer>
                                        <h3 className="">Application Types</h3>
                                        <Pie data={pieData} options={{ responsive: true }} />
                                    </MDBContainer>
                            </div>
                        </div>
                    </div>
                </div>    
                
            </div>
        );
    }

    //redirects to the details view page for the record related to the activity
    handleView(id, category){
        var res = category.substring(9);
        window.location.href = "/#/" + res + "Details/"+id;
    }

    // creates arry with number of each type of activity for pie chart
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
        
    //gets records created in the last week
    checkDate(appRecord, validDates) {
        let currentDate = new Date(Date.now());
        let dateWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000); 
        let recordDate = new Date(appRecord.createdon);

        if (recordDate > dateWeekAgo) {
            validDates.push(recordDate)
        }
        return validDates;
    }

    // only pushes the activities that have a category value set
    checkActCategory(actRecord, actValidCategory) {
        if (actRecord.category != null && actRecord.category != "") {
            actValidCategory.push(actRecord)
        }
        return actValidCategory;
    }

    //triggers when component is loaded
    componentDidMount(){
        if (this.needsToLoad()) this.loadFromCRM();
    }

    needsToLoad() {
        return (stores.activityHome.data.readState === State.DEFAULT_STATE);
    }

    //create the datastores and make the api calls. loading takes time because i have to get user id before
    //i can generate list of activities. TODO: find a quicker way to load like loading part of the content.
    loadFromCRM() {
        let query = ActivityActions.generateFindUserQuery();
        let dataType = "userHome";
        new ActivityActions(query, dataType).getCurrentUser();
        dataType = "applicationHome";
        query = ActivityActions.generateDynamicsQuery("application", ["madmv_applicationtype" ,"createdon"]);
        new ActivityActions(query, dataType).load();
        dataType = "customerHome";
        query = ActivityActions.generateDynamicsQuery("customer", ["createdon"]);
        new ActivityActions(query, dataType).load();
        dataType = "vehicleHome";
        query = ActivityActions.generateDynamicsQuery("vehicle", ["createdon"]);
        new ActivityActions(query, dataType).load();
    }
}
