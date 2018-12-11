// here user will give input to us

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class SurveyForm extends Component {
    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        console.log(values)
                    )}
                >
                    <Field type="text" name="SurveyTitle" component="input" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: SurveyForm
})(SurveyForm);
