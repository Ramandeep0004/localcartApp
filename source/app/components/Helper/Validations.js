import { t } from "i18next";
import React from "react";
import sprintf from "sprintf-js";

export default class Validation extends React.Component {
    constructor(props) {
        super(props);
        this.messages = {
            required: t("validations.This field is required"),
            checked: t("validations.The terms and conditions field is required"),
            email: t("validations.Please enter a valid email address"),
            password:
                t("validations.Password requirements - min 8 characters long, one uppercase, one lowercase, one special character and one numeric."),
            username:
                t("validations.Usernames can only use letters, numbers, underscores and periods."),
            decimel: t("validations.Please enter a valid amount"),
            alphabetic: t("validations.Please enter a valid alphabetic characters"),
            alphanumeric: t("validations.Please enter a valid alphanumeric characters"),
            numeric: t("validations.Please enter a valid number"),
            min: t("validations.Minimum length should be %s digits"),
            max: t(`validations.Please enter maximum amount of %s`),
            minmax: t(`validations.Please enter minimum value of %s and maximum value of %s`),
            url: t("validations.Please enter a valid link"),
            match: t("validations.The entered input did not match"),
            image: t("validations.Please select an image"),
            adhar: t('validations.Minimum length should be 12 digits'),
            gst: t("validations.Please enter a valid GST number"),
            array: t('validations.This field is required'),
            phoneNumberRequired: t("validations.Please enter mobile number"),
            passwordRequired: t("validations.Please enter password")
        };
    }
    validateField(key, value) {
        let input = this.props[key];
        let error = input;
        if (input.rules && input.rules.length > 0) {
            for (let i = 0; i < input.rules.length; i++) {
                let element = input.rules[i];
                error = this.validateRule(element, value);
                error.rules = input.rules;
                if (!error.isValid) {
                    break;
                }
            }
        }
        return error;
    }

    validateRule(rule, value) {
        let error = {
            isValid: true,
            message: "",
        };

        rule = rule.split(":");
        if (rule.length > 0) {
            switch (rule[0]) {
                case "required":
                    if (value === null || value === "") {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "checked":
                    if (value === null || value === "" || value === false) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;

                case "alphabetic":
                    if (value && !/^[a-zA-Z ]+$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "alphanumeric":
                    if (value && !/^[0-9a-zA-Z ]+$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "numeric":
                    if (value && !/^[0-9]*$/.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "decimel":
                    if (value && !"^d+(.d{1,2})?$".test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "min":
                    if (value && value.length < rule[1]) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1]
                            ),
                        };
                    }
                    break;
                case "max":
                    if (value && value.length > rule[1]) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1]
                            ),
                        };
                    }
                    break;
                case "minmax":
                    if (
                        value &&
                        !(value.length > rule[1] && value.length < rule[2])
                    ) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(
                                this.messages[rule[0]],
                                rule[1],
                                rule[2]
                            ),
                        };
                    }
                    break;
                case 'url':
                    let tested = value ? /^(ftp|http|https):\/\/[^ "]+$/.test(value) : true;
                    if (
                        value && !tested
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "image":
                    if (value && value.length < 1) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case "email":
                    if (
                        !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case 'gst':
                    let reg = /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}[Zz][0-9A-Za-z]{1}$/;
                    if (value && !reg.test(value)) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case 'adhar':
                    if (value && value.length < rule[1]) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case 'array':
                    if (value && value.length <= 0) {
                        error = {
                            isValid: false,
                            message: sprintf.sprintf(this.messages[rule[0]]),
                        };
                    }
                    break;
                case "username":
                    if (
                        !/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;

                case "phoneNumberRequired":
                    if (value === null || value === "") {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;

                case "passwordRequired":
                    if (value === null || value === "") {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
                case "password":
                    /*
                    ** USE THESE REJEX FOR OTHER CASES ** 
                    Minimum eight characters, at least one letter and one number:
                    "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

                    Minimum eight characters, at least one letter, one number and one special character:
                    "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

                    Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

                    Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

                    Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
                    ** USE THESE REJEX FOR OTHER CASES ** 
                    */
                    if (
                        value &&
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&-_]{8,}$/.test(
                            value
                        )
                    ) {
                        error = {
                            isValid: false,
                            message: this.messages[rule[0]],
                        };
                    }
                    break;
            }
        }

        return error;
    }

    isFormValid(values) {
        let allFields = this.props;
        let haveError = false;
        for (let i in allFields) {
            if (typeof values[i] !== "undefined") {
                let error = this.validateField(i, values[i]);
                allFields[i] = error;
                if (!error.isValid) {
                    haveError = true;
                }
            }
        }

        return {
            haveError: haveError,
            errors: allFields,
        };
    }

    render() {
        return null;
    }

    // validateEmail(email) {
    //     return User.findOne({ email: email }).then(function (result) {
    //         return result !== null;
    //     });
    // }
}
