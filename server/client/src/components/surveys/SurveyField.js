// this is component for label and input
import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
    //({ input }) = props.input
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: "5px" }} />
            <div className="red-text" style={{ marginBottom: "20px" }}>
                {touched && error}
            </div>
        </div>
    );
};
