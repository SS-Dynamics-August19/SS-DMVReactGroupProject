import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

/**
 * Todo: create class for returning data from a lookup field
 * * CONVERSE WITH TEAM ABOUT HOW THEY WANT TO DISPLAY THINGS
 * ? What will they pass as props? / Should there be seperate return components?
 * @param props would be ideal if it was an objetct containing an id field
 */
export function Lookup(props) {
    // Creates a persistent state variable.
    // Equivalent to:
    //     this.state.record = {};
    // in a React.Component constructor, and:
    //     setRecord(newRecordValue) {
    //         this.setState({record: newRecordValue});
    //     }
    // in the React.Component.

    const [record, setRecord] = useState({});

    // useEffect runs after every render
    useEffect(() => {
        getRecord(info);
    });
    
    const getRecord = async info => {
        console.log(info); //log what we are requesting
        const url = ""; // !ADD URL HERE! INCLUDING ID PARAM NAME (ex: 'https://domain.io/api/Controller/Method?Param='\\
        const res = await axios.get(`${url}{info.id}`); //make get request, await will halt code until we get the response

        const recordData = await res.data;
        console.log(recordData); //while in dev mode log results
        setRecord(recordData);
        alert("this worked");
    };

    const info = props.props; //replace with actual object with id
    const infoAsList = [];
    console.log(info);


    

    for (const [key, value] of Object.entries(record)) {
        //create a list with the fields and values
        infoAsList.push(
            <li>
                {key} | {value}
            </li>
        );
    }

    return (
        <div>
            <ul>{infoAsList}</ul>
            This Worked!!! USE RECORD HERE (IT NOW HOLDS THE RETURNED RECORD)!!!
        </div>
    );
}

Lookup.propTypes = {
    props: PropTypes.object.isRequired
};
