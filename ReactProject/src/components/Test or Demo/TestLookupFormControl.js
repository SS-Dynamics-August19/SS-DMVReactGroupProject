import React from "react";
import LookupFieldFormControl from "../Lookup/LookupFieldFormControl.js";

const testLookupFormControl = function() {
    return (
        <LookupFieldFormControl
            storeName="testLookup"
            crmTableName="customer"
            valueCRMColumn="madmv_ma_customerid"

            labelCRMColumns={[
                "madmv_fullname"
            ]}

            onChange={function(event) {
                // The name provided above in LookupFieldFormControl.props.storeName.
                let name = event.target.name;

                // The value of the selected record's field chose above via
                //     LookupFieldFormControl.props.valueCRMColumn.
                let value = event.target.value;

                alert(name + ": " + value); // Replace this with the payload code.
            }}
        />
    );
}
export default testLookupFormControl;