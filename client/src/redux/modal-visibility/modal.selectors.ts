import { createSelector } from "reselect";
import { StoreState } from "../root-reducer";

const selectModal = (state: StoreState) => state.modal;

export const selectLoginModal = createSelector(
    [selectModal],
    (modal) => modal.toggleLoginModal
)

export const selectRegisterModal = createSelector (
    [selectModal],
    (modal) => modal.toggleRegisterModal
)

export const selectForgotPasswordModal = createSelector (
    [selectModal],
    (modal) => modal.toggleForgotPasswordModal
)

export const selectVerificationModal = createSelector (
    [selectModal],
    (modal) => modal.toggleVerificationModal
)

export const selectChangePasswordModal = createSelector (
    [selectModal],
    (modal) => modal.toggleChangePasswordModal
)
