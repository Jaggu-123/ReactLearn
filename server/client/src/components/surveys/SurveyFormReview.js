import React from "react";

const SurveyFormReview = ({ onCancel }) => {
    return (
        <div>
            <h5>Please Review Your Details</h5>
            <button
                className="btn-flat yellow darken-3 white-text"
                onClick={onCancel}
            >
                Back
            </button>
        </div>
    );
};

export default SurveyFormReview;
