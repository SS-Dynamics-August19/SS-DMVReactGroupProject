import React, {useState , useEffect} from 'react'
import axios from 'axios'
/**
 * Todo: create class for returning data from a lookup field
 * * CONVERSE WITH TEAM ABOUT HOW THEY WANT TO DISPLAY THINGS
 * ? What will they pass as props? / Should there be seperate return components?
 * @param props would be ideal if it was an objetct containing an id field
 */


export function Lookup(props) {
    const info = props.props;
    console.log(info);

    useEffect(() => {//use effect to to set a local state
        getRecord(info);
    }, [])

    const [ record, setRecord ] = useState({});//{record} will be used as a local state for this component and hold the data returned
    const getRecord = async (info) => {
        console.log(info)//log what we are reguesting
        const url = ""; // !ADD URL HERE! INCLUDING ID PARAM NAME (ex: 'https://domain.io/api/Controller/Method?Param='\\
        const res = await axios.get(`${url}{info.id}`);//make get request
        
        const recordData = await res.data;
        console.log(recordData);//while in dev mode log results
        setRecord(recordData);
        alert("this worked");
    }


    return (
        <div>
            This Worked!!! USE RECORD HERE (IT NOW HOLDS THE RETURNED RECORD)!!! 
        </div>
    );
}