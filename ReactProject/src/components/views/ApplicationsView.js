import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView.js";
import OptionSetMapping from "./OptionSetMapping.js";      
let _DATA_TYPE = "application";
let _COLUMNS = [
    { label: 'ID',            field: 'madmv_appid' },
    { label: 'Type',          field: 'madmv_applicationtype' },
    { label: 'Subject',       field: 'madmv_applicationsubject' },
    { label: 'Creation Time', field: 'createdon' }
];
let extrarow =[{ label:' ',     field: 'click' },{ label:' ',    field: 'checkbox' }]
let _headCOLUMNS=_COLUMNS.concat(extrarow)


let _OPTION_SET_MAPPINGS = [
    new OptionSetMapping("madmv_applicationtype",
        ["Vehicle Registration", "Address Change", "New Driving License", "Driving License Renewal"])
];

const view = function() {
    return (
        <CRMView
            dataType={_DATA_TYPE}
            columns={_COLUMNS}
            optionSetMappings={_OPTION_SET_MAPPINGS}
            headcolumn={_headCOLUMNS}
        />
    );
};

view.propTypes = {
    stores: PropTypes.object.isRequired
};

export default view;
