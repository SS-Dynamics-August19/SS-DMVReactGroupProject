import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView";

let _DATA_TYPE = "vehicle";

let _COLUMNS = [
    {label:'Year Model',  field:'madmv_yearmodel'},
    {label:'Vehicle Make',field:'madmv_vehiclemake'},
    {label:'Vehicle Identification Number',field:'madmv_vehicleidnumber' },
    {label:'License Plate Number', field:'madmv_licenseplate'},
    {label:'Creation Time', field:'createdon',},
];
let extrarow =[{ label:' ',     field: 'click' },{ label:' ',    field: 'checkbox' }]
let _headCOLUMNS=_COLUMNS.concat(extrarow)
let _OPTION_SET_MAPPINGS = [];

const view = function () {
    return <CRMView dataType={_DATA_TYPE}
        columns={_COLUMNS}
        optionSetMappings={_OPTION_SET_MAPPINGS}
        headcolumn={_headCOLUMNS}/>;
};

view.propTypes = {
    stores: PropTypes.object.isRequired
};

export default view;