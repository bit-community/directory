/**
 * This utility will manage all the validation for our forms on the client side
 * Using the validator[props] in any Fields we can pass a validator function for any user input on the client side
 */
import validator from 'validator';
const mobile = /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/g;
export function isRequired(value, _values) {
    if (!value || value === null)
        return ['Missing required field'];
    if (value && typeof value === 'string' && validator.isEmpty(value))
        return ['Field cannot be empty'];
    if (value && typeof value === 'object' && Object.keys(value).length === 0)
        return ['This field is required'];
}
export function isEmail(value) {
    if (!value)
        return ['This field is required'];
    if (value && !validator.isEmail(value))
        return ['Email address is invalid'];
}
export function isNumeric(value) {
    if (!value)
        return ['This field is required'];
    if (value && !validator.isNumeric(value))
        return ['Please Input a Number'];
}
export function isMobile(value) {
    if (!value)
        return ['This field is required'];
    if (value && mobile.test(value))
        return ['Phone must start with (+) country code'];
}
export function notLessThan(value, base, minimum) {
    if (value === undefined || value === null)
        return ['This field is required'];
    if ((value && value <= base) || value <= minimum)
        return ['Cannot Update below minimum value'];
}
