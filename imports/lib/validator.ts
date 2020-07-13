/**
 * This utility will manage all the validation for our forms on the client side
 * Using the validator[props] in any Fields we can pass a validator function for any user input on the client side
 */

import validator from 'validator';

const mobile = /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/g;
// const intMobile = /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{2,5}$/g; //stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number

type TValidator = undefined | Array<string>;

export function isRequired(value: string, _values: {}): TValidator {
  if (!value || value === null) return ['Missing required field'];
  if (value && typeof value === 'string' && validator.isEmpty(value)) return ['Field cannot be empty'];
  if (value && typeof value === 'object' && Object.keys(value).length === 0) return ['This field is required'];
}

export function isEmail(value: string): TValidator {
  if (!value) return ['This field is required'];
  if (value && !validator.isEmail(value)) return ['Email address is invalid'];
}

export function isNumeric(value: string): TValidator {
  if (!value) return ['This field is required'];
  if (value && !validator.isNumeric(value)) return ['Please Input a Number'];
}

export function isMobile(value: string): TValidator {
  if (!value) return ['This field is required'];
  if (value && mobile.test(value)) return ['Phone must start with (+) country code'];
}

export function notLessThan(value: number, base: number, minimum: number): TValidator {
  if (value === undefined || value === null) return ['This field is required'];
  if ((value && value <= base) || value <= minimum) return ['Cannot Update below minimum value'];
}
