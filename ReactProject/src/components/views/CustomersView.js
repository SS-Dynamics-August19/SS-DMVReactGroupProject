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
  { header: "Phone", key: "madmv_phonenumber" },
  { header: "Birth Date" , key: "madmv_birthdate"},
  { header: "First Name"  , key: "madmv_firstname"},
  { header: "Last Name"  , key: "mmadmv_lastname"},
  { header: "Street1", key: "madmv_street1"},
  { header: "Street2", key: "madmv_street2" },
  { header: "City", key: "madmv_city"},
  { header: "Country", key: "madmv_country" },
  { header: "State/Province" , key: "madmv_stateprovince"},
  { header: "Zip Code", key: "madmv_zippostalcode"},
  { header: "Owning User"  , key: "owninguser"}

];

const view = function() {
  return <CRMViewContact dataType={_DATA_TYPE} rowKey={_ROW_KEY} columns={_COLUMNS} />;
};

view.propTypes = {
  stores: PropTypes.object.isRequired
};

export default view;
