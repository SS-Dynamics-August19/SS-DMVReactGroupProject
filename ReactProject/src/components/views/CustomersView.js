import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView";

let _DATA_TYPE = "customer";
let _COLUMNS = [
                { label: 'Name',  field: 'madmv_fullname'},
                { label: 'Age'  , field: 'madmv_age'},
                { label: 'SSN'  , field: 'madmv_cssn'},
                { label: 'Email', field: 'madmv_email'},
                { label: 'Phone', field: 'madmv_phonenumber'},
];

let extraRow =[{ label:' ',     field: 'click' },{ label:' ',    field: 'checkbox' }]
let _headCOLUMNS=_COLUMNS.concat(extraRow)

let _OPTION_SET_MAPPINGS = [];

const view = function() {
  return <CRMView 
      dataType={_DATA_TYPE}
      columns={_COLUMNS}
      optionSetMappings={_OPTION_SET_MAPPINGS}
      headcolumn={_headCOLUMNS}/>;
};

view.propTypes = {
  stores: PropTypes.object.isRequired
};

export default view;
