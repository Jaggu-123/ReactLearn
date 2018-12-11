import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducers from "./authReducers";

export default combineReducers({
    auth: authReducers,
    form: reduxForm
});
