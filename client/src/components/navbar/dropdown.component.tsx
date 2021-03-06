import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { DropdownComponentProps, dropdownStyles } from './navbar.types';
import './navbar.styles.scss';
import { IToggleChangePasswordModal, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import LoginComponent from '../login/login.component';
import ForgotPasswordComponent from '../forgot-password/forgot-password.component';
import RegisterModalComponent from '../register/register.component';
import VerificationModal from '../verification/verificationModal';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { StoreState } from '../../redux/root-reducer';
import { User, UserActionTypes } from '../../redux/user/user.types';
import axios from 'axios';
import { headers } from '../register/register.types';
import { ILogoutFailure, ILogoutSuccess, TUserReducerActions } from '../../redux/user/user.actions';
import { push, CallHistoryMethodAction } from "connected-react-router";
import ChangePasswordComponent from '../change-password/change-password.component';

const DropdownComponent: React.FC<DropdownComponentProps> = ({ ...props }) => {
    const { currentUser, open, anchorEl, handleClose, toggleLoginModalAction, toggleRegisterModalAction,
        logoutUserSuccessAction, redirectToHome, logoutUserErrorAction, toggleChangePasswordModalAction, redirectToOnboarding } = props;

    const classes = dropdownStyles();

    const handleOpenLogin = () => {
        toggleLoginModalAction();
        handleClose();
    }

    const handleOpenRegister = () => {
        toggleRegisterModalAction();
        handleClose();
    }

    const handleOpenChangePassword = () => {
        toggleChangePasswordModalAction();
        handleClose();
    }

    const handleOpenMessages = () => {

    }

    const handleOpenWishList = () => {

    }

    const handleOpenAccount = () => {
        redirectToOnboarding();
        handleClose();
    }

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        handleClose();
        return axios
            .post(`http://localhost:3001/api/auth/logout`, {
                accessToken: accessToken,
                refreshToken: refreshToken
            }, { headers: headers })
            .then((response: any) => {
                logoutUserSuccessAction();
                localStorage.clear();
                redirectToHome();
                // clearProfileImageAction();
                return response.data;
            })
            .catch((error: any) => {
                logoutUserErrorAction(error);
            });
    };

    return (
        <React.Fragment>
            <LoginComponent />
            <ForgotPasswordComponent />
            <RegisterModalComponent />
            <VerificationModal />
            <ChangePasswordComponent />
            <Menu
                id="fade-menu"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                classes={{ paper: classes.paper, list: classes.list }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handleClose}
            >
                {currentUser && currentUser.email ?
                    <div>
                        <MenuItem onClick={handleOpenMessages}> Messages </MenuItem>
                        <MenuItem onClick={handleOpenWishList}> Wishlist </MenuItem>
                        <MenuItem onClick={handleOpenAccount}>Account</MenuItem>
                        <MenuItem onClick={handleOpenChangePassword}>Change password</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </div> :
                    <div>
                        <MenuItem onClick={handleOpenLogin}> Log in </MenuItem>
                        <MenuItem onClick={handleOpenRegister}> Sign up </MenuItem>
                    </div>
                }
            </Menu>
        </React.Fragment>
    )
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions | CallHistoryMethodAction>) => {
    return {
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL }),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.TOGGLE_REGISTER_MODAL }),
        logoutUserSuccessAction: () => dispatch<ILogoutSuccess>({ type: UserActionTypes.LOGOUT_SUCESS }),
        logoutUserErrorAction: (data: string) => dispatch<ILogoutFailure>({ type: UserActionTypes.LOGOUT_FAILED, data: data }),
        redirectToHome: () => dispatch(push('/')),
        toggleChangePasswordModalAction: () => dispatch<IToggleChangePasswordModal>({ type: ModalActionTypes.TOGGLE_CHANGE_PASSWORD_MODAL }),
        redirectToOnboarding: () => dispatch(push('/onboarding')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent);
