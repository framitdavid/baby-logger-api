"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
var ValidationMessage;
(function (ValidationMessage) {
    ValidationMessage["Email"] = "Invalid e-mail!";
    ValidationMessage["Number"] = "Numberformat is requried!";
    ValidationMessage["Required"] = "Field is required!";
    ValidationMessage["MaxLength"] = "String is to long, max length is: ";
    ValidationMessage["MinLength"] = "String is to short, min length is: ";
})(ValidationMessage || (ValidationMessage = {}));
var isRequiredValid = function (value) {
    return value.length > 0;
};
var isEmailValid = function (value) {
    var validaitonRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return validaitonRegex.test(value);
};
var isNumberValid = function (value) {
    var parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue);
};
var isMaxLengthValid = function (value, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return maxLength ? value.length <= maxLength : true;
};
var isMinLengthValid = function (value, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return minLength ? value.length >= minLength : true;
};
exports.ValidationUtils = {
    validate: function (value, validation) {
        if (validation === void 0) { validation = { isRequired: true, minLength: 2 }; }
        var errors = [];
        if (validation.isEmail) {
            !isEmailValid(value) && errors.push(ValidationMessage.Email);
        }
        if (validation.isNumber) {
            !isNumberValid(value) && errors.push(ValidationMessage.Number);
        }
        if (validation.maxLength) {
            !isMaxLengthValid(value, validation.maxLength) &&
                errors.push(ValidationMessage.MaxLength + " " + validation.maxLength + " signs!");
        }
        if (validation.minLength) {
            !isMinLengthValid(value, validation.minLength) &&
                errors.push(ValidationMessage.MinLength + " " + validation.minLength + " signs!");
        }
        if (validation.isRequired) {
            !isRequiredValid(value) && errors.push(ValidationMessage.Required);
        }
        return {
            isValid: !errors.length,
            errors: errors,
        };
    },
    getModelState: function (validations) {
        var validationErrors = [];
        validations.forEach(function (validation) {
            var _a;
            return validation.errors.length &&
                validation.key &&
                validationErrors.push((_a = {}, _a[validation.key] = validation.errors, _a));
        });
        return {
            isValid: validationErrors.length === 0,
            errors: validationErrors,
        };
    },
};
