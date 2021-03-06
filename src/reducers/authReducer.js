import * as C from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        //Starting fetching user with username and password
        case C.LOGIN_USER:
            return state.merge({
                logging_in: true
            });

        //Stopped logging in for whatever reason
        case C.CANCEL_LOGIN:
            return state.merge({
                logging_in: false
            });
        case C.LOGIN_SUCCESS: // Add current user to the store
            return state.merge({ ...action.userModel, logged_in: true });

        case C.LOGIN_FAILURE: //Add error to list of current errors
            return state.merge({
                errors: [...state.errors, action.error]
            });

        case C.SIGN_UP_USER:
            return state.merge({
                signingUp: true
            });

        case C.CANCEL_REGISTRATION:
            return state.merge({
                signingUp: false
            });

        case C.REGISTRATION_SUCCESS:
            return state.merge({ ...action.userModel, logged_in: true });

        case C.REGISTRATION_FAILURE:
            return state.merge({
                errors: [...state.errors, action.newError]
            });
        case C.LOGOUT_SUCCESS:
            return state.merge({
                logged_in: false,
                logging_in: false,
                currentUser: null,
                username: "",
                email: "",
                first_name: "",
                last_name: ""
            });
        case C.SEND_SIGNUP_EMAIL_FAILURE:
            return state.merge({
                errors: [...state.errors, action.error],
                sentWelcome: false,
                sendingSignup: false
            });
        case C.SEND_SIGNUP_EMAIL:
            return state.merge({
                sendingSignup: true
            });
        case C.SEND_SIGNUP_EMAIL_SUCCESS:
            return state.merge({
                sendingSignup: false,
                sentWelcome: true
            });

        case C.SAVE_USERINFO_SUCCESS:
            return state.merge({
                email: action.req.userInfo.email,
                first_name: action.req.userInfo.first_name,
                last_name: action.req.userInfo.last_name,
                notification: action.req.userInfo.notification
            });

        default:
            return state;
    }
}
