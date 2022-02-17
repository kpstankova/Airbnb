import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { DropdownComponentProps, dropdownStyles } from './navbar.types';
import './navbar.styles.scss';
import { IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import LoginComponent from '../login/login.component';
import ForgotPasswordComponent from '../forgot-password/forgot-password.component';
import RegisterModalComponent from '../register/register.component';
import VerificationModal from '../verificationModal/verificationModal';

const DropdownComponent: React.FC<DropdownComponentProps> = ({ ...props }) => {
    const { open,anchorEl, handleClose, toggleLoginModalAction, toggleRegisterModalAction } = props;

    const classes = dropdownStyles();

    const handleOpenLogin = () => {
        toggleLoginModalAction();
        handleClose();
    }

    const handleOpenRegister = () => {
        toggleRegisterModalAction();
        handleClose();
    }

    return (
        <React.Fragment>
            <LoginComponent />
            <ForgotPasswordComponent />
            <RegisterModalComponent />
            <VerificationModal/>
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
                <div>
                    <MenuItem onClick={handleOpenLogin}> Log in </MenuItem>
                    <MenuItem onClick={handleOpenRegister}> Sign up </MenuItem>
                </div>
            </Menu>
        </React.Fragment>
    )
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL }),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.TOGGLE_REGISTER_MODAL }),
    }
}

export default connect(null, mapDispatchToProps)(DropdownComponent);
