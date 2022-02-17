import { TUserReducerActions } from "./user.actions";
import { User, UserActionTypes, UserState } from "./user.types";

const InitialState: UserState = {
    registeredUser: false,
    authenticatedUser: false,
    currentUser: {} as User,
    uid: ''
};

export const userReducer = (state = InitialState, action: TUserReducerActions): UserState => {
    switch (action.type) {
        case UserActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registeredUser: true,
                uid: action.data
            };
        case UserActionTypes.REGISTER_FAILED:
            return {
                ...state,
                registeredUser: false
            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authenticatedUser: true,
                currentUser: action.data
            }
        case UserActionTypes.LOGIN_FAILED:
            return {
                ...state,
                authenticatedUser: false
            }
        case UserActionTypes.LOGOUT_SUCESS:
            return {
                ...state,
                authenticatedUser: false,
                registeredUser: false,
                currentUser: {} as User,
                uid: ''
            }
        case UserActionTypes.LOGOUT_FAILED:
            return {
                ...state,
                authenticatedUser: false
            }
        default:
            return state;
    }
}

export default userReducer;