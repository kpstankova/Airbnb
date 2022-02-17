import { ModalActionTypes, ModalState } from './modal.types';
import { TModalReducerActions } from './modal.actions';

const InitialState: ModalState = {
    toggleRegisterModal: false,
    toggleLoginModal: false,
    toggleForgotPasswordModal: false,
    toggleVerificationModal: false
};

export const modalReducer = (state = InitialState, action: TModalReducerActions): ModalState => {
    switch (action.type) {
        case ModalActionTypes.TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                toggleRegisterModal: true,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleVerificationModal: false
            };
        case ModalActionTypes.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: true,
                toggleForgotPasswordModal: false,
                toggleVerificationModal: false
            };
        case ModalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: true,
                toggleVerificationModal: false
            };
        case ModalActionTypes.TOGGLE_VERIFICATION_MODAL:
            return {
                ...state,
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false,
                toggleVerificationModal: true
            }
        case ModalActionTypes.RESET_TOGGLES_MODAL:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;