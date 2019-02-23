
/**
 * 
 *
 * @class Validation
 */
class Validation {
  constructor(name, rules, errMsg) {
    this.name = name
    this.rules = rules
    this.errMsg = errMsg
  }

  check = (text = '') => {
    if (typeof this.rules === 'function') {
      return this.rules(text)
    } else {
      console.error('validation rules should be a function, please check the validation:' + this.assertion)
    }
  }

}


/**
 * validate if the input is empty
 * @param {string} text the input value
 */
export const existence = new Validation(
  'required',
  text => /\S/.test(text),
  'Required'
)

/**
 * validate email 
 */
export const emailFormat = new Validation(
  'email',
  text => !!text.match(/[\w-]+@([\w-]+\.)+[\w-]+/i),
  'invalid email'
)

/**
 * validate at least one uppercase
 */
export const uppercase = new Validation(
  'uppercase',
  text => !!text.match(/(?=.*[A-Z])/g),
  'at least one upper case'
)

/**
 * validate at least on lower case
 */
export const lowercase = new Validation(
  'lowercase',
  text => !!text.match(/(?=.*[a-z])/g),
  'at least one lower case'
)

/**
 * validate login password length
 */
export const passwordLength = makeValidateLength(6, 15)

/**
 * valid name length
 */
export const nameLength = makeValidateLength(0, 200)

/**
 * valid password equivalence
 */
export const passwordConfirmation = (password) => new Validation(
  'equivalence',
  text => text === password,
  'Passwords do not match'
)

/**
 * validate if given input value longer than len
 * @param {number} max_len the max length of input
 * @param {number} min_len the min length of input
 * @param {string} text the input value
 */
export function makeValidateLength(min_len, max_len) {
  return new Validation(
    'input_length',
    text => text.length >= min_len && text.length <= max_len,
    `Input has to be ${min_len}-${max_len} letters`
  )
}


/**
 * validate the test according to the validation rules
 * 
 * @export
 * @param {Validation| [Validation]} validations
 * @param {string} text
 * @returns {string} error message if validation fails
 */
export default function validate(validations, text = '') {
  if (!Array.isArray(validations)) {
    validations = [validations]
  }
  const len = validations.length;

  for (let i = 0; i < len; i++) {
    if (!validations[i].check(text)) {
      return validations[i].errMsg
    }
  }
}



