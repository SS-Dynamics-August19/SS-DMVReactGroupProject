import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView.js";
import OptionSetMapping from "./OptionSetMapping.js";

let _DATA_TYPE = "application";
let _COLUMNS = [
  { header: "Name",            key: "madmv_appid"},
  { header: "Type",            key: "madmv_applicationtype"},
  { header: "Subject",         key: "madmv_applicationsubject"},
  { header: "Creation Time",   key: "createdon"},
  { header: "Insurance Proof", key: "madmv_insuranceproof"},
  { header: "ID Proof",        key: "madmv_idproof"},
  { header: "Owner",           key: "madmv_OwnerInfo"}
];
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
        />
    );
};

view.propTypes = {
    stores: PropTypes.object.isRequired
};

export default view;
