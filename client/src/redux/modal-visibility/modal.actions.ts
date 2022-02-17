import { ModalActionTypes } from './modal.types';

export interface IModalBaseAction {
    type: ModalActionTypes;
}

export interface IToggleRegister extends IModalBaseAction {
    type: ModalActionTypes.TOGGLE_REGISTER_MODAL
}

export interface IToggleLogin extends IModalBaseAction {
    type: ModalActionTypes.TOGGLE_LOGIN_MODAL
}

export interface IToggleForgotPassword extends IModalBaseAction {
    type: ModalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL
}

export interface IResetToggles extends IModalBaseAction {
    type: ModalActionTypes.RESET_TOGGLES_MODAL;
}



export type TModalReducerActions = IToggleRegister | IToggleLogin | IToggleForgotPassword | IResetToggles;