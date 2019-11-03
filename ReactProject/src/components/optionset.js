import React from "react";
import PropTypes from "prop-types";

/********************************
 * Component: optionset
 * Description: returns the html select tag
 * Input Parameters: props with array called opset where each index includes name
 *              and value, and a starting value
 *           ex: props {
 *                  opset[] = [{ name: value: }, { name: value: }]     (required)
 *                  currentValue                                       (optional)
 *                  updateValue(returnValue)                           (required)
 *              }
 * Input: none
 * Output: makes a call to callback function updateValue in props passing the changed value of
 *          the option set as a parameter
 * Return: jsx object of html select input
 ********************************/
let Optionset = props => {
  // create variables list
  let optionsList = "";

  // function for on change of the option set
  // makes a call to the callback function
  const handleChange = event => {
    props.updateValue(event.target.value);
  };

  // creates the option jsx object from object passed by map
  const makeOption = opt => {
    return (
      <option key={opt.value} value={opt.value}>
        {opt.name}
      </option>
    );
  };

  // map each in option set list to optionsList
  optionsList = (
    <select defaultValue={props.currentValue} onChange={handleChange}>
      <option value=""></option>
      {props.opset.map(makeOption, this)}
    </select>
  );

  return (
    // create the option set
    <div className="optionset">{optionsList}</div>
  );
};

Optionset.propTypes = {
  opset: PropTypes.array.isRequired,
  currentValue: PropTypes.string,
  updateValue: PropTypes.func.isRequired
};

export default Optionset;
