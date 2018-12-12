// here user will give input to us

import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    type="text"
                    name={name}
                    label={label}
                    component={SurveyField}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(() =>
                        this.props.onSurveySubmit()
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red white-text btn-flat">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        <b>Submit</b>
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}; // if errors is empty, then it is considered that there is no validation error

    errors.recipients = validateEmails(values.recipients || "");

    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide this field";
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false
})(SurveyForm);
