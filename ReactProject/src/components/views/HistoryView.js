import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView";

let _DATA_TYPE = "applicationhist";
let _COLUMNS = [
                { label: 'Application ID',  field: 'madmv_appidhist'},
                { label: 'Subject',       field: 'madmv_applicationsubject' },
                { label: 'Deletion Time', field: 'createdon' }

];
let extrarow =[{ label:' ',     field: 'click' },{ label:' ',    field: 'checkbox' }]
let _headCOLUMNS=_COLUMNS.concat(extrarow)
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