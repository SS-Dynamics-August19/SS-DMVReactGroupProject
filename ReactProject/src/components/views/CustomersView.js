import React from "react";
import PropTypes from "prop-types";
import CRMViewContact from "./CRMViewForContact";

let _DATA_TYPE = "customer";
let _ROW_KEY = "madmv_ma_customerid";
let _COLUMNS = [
  { header: "Name" , key: "madmv_fullname"    },
  { header: "Age"  , key: "madmv_age"         },
  { header: "SSN"  , key: "madmv_cssn"        },
  { header: "Email", key: "madmv_email"       },
  { header: "Phone", key: "madmv_phonenumber" }
];

const view = function() {
  return <CRMViewContact dataType={_DATA_TYPE} rowKey={_ROW_KEY} columns={_COLUMNS} />;
};

view.propTypes = {
  stores: PropTypes.object.isRequired
};

export default view;
