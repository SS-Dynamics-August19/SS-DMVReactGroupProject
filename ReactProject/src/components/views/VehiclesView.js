import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView.js";

let _DATA_TYPE = "vehicle";
let _ROW_KEY = "madmv_ma_vehicleid";
let _COLUMNS = [
    { header: "Year Model", key: "madmv_yearmodel" },
    { header: "Vehicle Make", key: "madmv_vehiclemake" },
    { header: "Vehicle Identification Number", key: "madmv_vehicleidnumber" },
    { header: "License Plate Number", key: "madmv_licenseplate" },
    { header: "Creation Time", key: "createdon" }
];

const view = function () {
    return <CRMView dataType={_DATA_TYPE} rowKey={_ROW_KEY} columns={_COLUMNS} />;
};

view.propTypes = {
    stores: PropTypes.object.isRequired
};

export default view;