import React from "react";
import PropTypes from "prop-types";
import CRMView from "./CRMView.js";

let _DATA_TYPE = "application";
let _ROW_KEY = "madmv_ma_applicationid";
let _COLUMNS = [
  { header: "Name"         , key: "madmv_appid"              },
  { header: "Type"         , key: "madmv_applicationtype"    },
  { header: "Subject"      , key: "madmv_applicationsubject" },
  { header: "Creation Time", key: "createdon"                }
];

const view = function(props) {
  return <CRMView dataType={_DATA_TYPE} rowKey={_ROW_KEY} columns={_COLUMNS} />;
};

view.propTypes = {
  stores: PropTypes.object.isRequired
};

export default view;
