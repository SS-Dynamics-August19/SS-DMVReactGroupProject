import React from 'react';
import PropTypes from 'prop-types';


/********************************
 * Component: optionset
 * Description: returns the html select tag
 * Input Parameters: props with array called opset where each index includes name
 *              and value, and a starting value
 *           ex: props {
 *                  opset[] = [{ name: value: }, { name: value: }]
 *                  startValue
 *                  updateValue()
 *              } 
 * Input: none
 * Output: makes a call to callback function updateValue in props
 * Return: jsx object of html select input
 ********************************/
const Optionset = (props) => {
    // create variables list
    let optionsList = "";
    let currentValue = props.value;

    const handleChange = (event) => {
        currentValue = event.target.value;
        props.updateValue(currentValue);
    }

    const makeOption = (opt) => {
        return (
            <option value={opt.value}>{opt.name}</option>
        );
    }

    // map each in option set list to optionsList
    optionsList = (
        
        <select value={currentValue} onChange={handleChange}>
            <option value=""></option>
            {props.opset.map(makeOption, this)}
        </select>
        );

    return (
        // create the option set
        <div className="optionset">
            {optionsList}
        </div>
    );
}

Optionset.propTypes = {
    opset: PropTypes.array.isRequired,
    value: PropTypes.string,
    updateValue: PropTypes.func
}

export default Optionset;