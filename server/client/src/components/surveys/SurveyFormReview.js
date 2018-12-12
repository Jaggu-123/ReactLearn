import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";

const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = _.map(FIELDS, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please Review Your Details</h5>
            <div>{reviewFields}</div>
            <button
                className="btn-flat yellow darken-3 white-text"
                onClick={onCancel}
            >
                Back
            </button>
            <button className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);
