// The value which the first option in every OptionSet uses.
const FIRST_VALUE = 876570000;

/** A class intended to help CRMView components render their option set fields.
 * */
export default class OptionSetMapping {
    /**@param {string} fieldName The CRM field to which this applies. For example, "madmv_applicationtype".
     * @param {Array} labelsArray Array of strings, the labels for the option set values, in order. For madmv_applicationtype, it would be ["Vehicle Registration", "Address Change", "New Driving License", "Driving License Renewal"].
     */
    constructor(fieldName, labelsArray) {
        this.fieldName = fieldName;
        this.labelsArray = labelsArray;
    }

    getField() {
        return this.fieldName;
    }

    map(fieldData) {
        if (Number.isInteger(fieldData)) {
            let offset = fieldData - FIRST_VALUE;
            return this.labelsArray[offset];
        }
        return fieldData;
    }
}