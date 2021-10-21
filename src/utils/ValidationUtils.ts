enum ValidationMessage {
  Email = "Invalid e-mail!",
  Number = "Numberformat is requried!",
  Required = "Field is required!",
  MaxLength = "String is to long, max length is: ",
  MinLength = "String is to short, min length is: ",
}

export type ValidationType = {
  isRequired?: boolean;
  isEmail?: boolean;
  isNumber?: boolean;
  maxLength?: number;
  minLength?: number;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
  key?: string;
};

export type ModelState = {
  isValid: boolean;
  errors: { [x: string]: string[] }[];
};

type IValidationUtils = {
  validate: (value: string, validation?: ValidationType) => ValidationResult;
  createModelState: <T>(validations: ValidationResult[]) => ModelState;
};

const isRequiredValid = (value: string): boolean => {
  return value.length > 0;
};

const isEmailValid = (value: string): boolean => {
  const validaitonRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return validaitonRegex.test(value);
};

const isNumberValid = (value: string): boolean => {
  const parsedValue = parseInt(value, 10);
  return !isNaN(parsedValue);
};

const isMaxLengthValid = (value: string, maxLength = 0): boolean => {
  return maxLength ? value.length <= maxLength : true;
};

const isMinLengthValid = (value: string, minLength = 0): boolean => {
  return minLength ? value.length >= minLength : true;
};

export const ValidationUtils: IValidationUtils = {
  validate: (
    value: string,
    validation: ValidationType = { isRequired: true, minLength: 2 }
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (validation.isEmail) {
      value
        ? !isEmailValid(value) && errors.push(ValidationMessage.Email)
        : errors.push(ValidationMessage.Email);
    }
    if (validation.isNumber) {
      value
        ? !isNumberValid(value) && errors.push(ValidationMessage.Number)
        : errors.push(ValidationMessage.Number);
    }
    if (validation.maxLength) {
      value
        ? !isMaxLengthValid(value, validation.maxLength) &&
          errors.push(
            `${ValidationMessage.MaxLength} ${validation.maxLength} signs!`
          )
        : errors.push(
            `${ValidationMessage.MaxLength} ${validation.maxLength} signs!`
          );
    }
    if (validation.minLength) {
      value
        ? !isMinLengthValid(value, validation.minLength) &&
          errors.push(
            `${ValidationMessage.MinLength} ${validation.minLength} signs!`
          )
        : errors.push(
            `${ValidationMessage.MinLength} ${validation.minLength} signs!`
          );
    }
    if (validation.isRequired) {
      value
        ? !isRequiredValid(value) && errors.push(ValidationMessage.Required)
        : errors.push(ValidationMessage.Required);
    }
    return {
      isValid: !errors.length,
      errors,
    };
  },
  createModelState: function <T>(validations: ValidationResult[]): ModelState {
    const validationErrors: { [x: string]: string[] }[] = [];

    validations.forEach(
      (validation) =>
        validation.errors.length &&
        validation.key &&
        validationErrors.push({ [validation.key]: validation.errors })
    );

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  },
};
