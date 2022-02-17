import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StoreState } from '../../redux/root-reducer';
import { Dispatch } from "redux";
import { selectForgotPasswordModal } from '../../redux/modal-visibility/modal.selectors';
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import Backdrop from '@material-ui/core/Backdrop';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../login/login.styles.scss'
import { dialogStyles } from '../login/login.types';
import axios from 'axios';
import { useFormik } from 'formik';
import { ForgotPasswordComponentProps } from './fortgot-password.types';
import { Dialog, Fade, TextField } from '@material-ui/core';

const ForgotPasswordComponent:React.FC<ForgotPasswordComponentProps> = ({ ...props }) => {
    const { toggleForgotPasswordModal, resetTogglesModalAction, toggleLoginModalAction, toggleRegisterModalAction } = props;

    const styles = dialogStyles();
    const [response, setResponseState] = useState<string>("");

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenRegisterWrapper = () => {
        toggleRegisterModalAction();
    }

    const handleOpenLogin = () => {
        toggleLoginModalAction();
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: ''
        },
        validateOnBlur: true,
        // validationSchema,
        onSubmit: (values, {resetForm}) => {
            const { email } = values;
            // handleSendNewPassword(email);
            resetForm();
            handleClose();
            resetTogglesModalAction();
        }
    })
    
    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleForgotPasswordModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleForgotPasswordModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Forgot password</h1>

                        {response ? <div className='error-box'>{response}</div> : null}
                        <form className='login-form' autoComplete='on' onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='email'
                                autoComplete='off'
                                placeholder="Email"
                                hiddenLabel={true}
                                name='email'
                                variant='standard'
                                value={values.email} onChange={handleChange} error={errors.email === ""}
                                helperText={errors.email ? errors.email : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <div className="info-message">The system will send you a recovery email</div>
                            <button
                                className='submit-button'
                                type='submit'>
                                Send
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                    Return to <Link className='hyperlink' to={'/'} onClick={handleOpenLogin}>sign in</Link>
                                </div>
                                <div className='hyperlinks'>
                                    <span>No account yet? </span>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenRegisterWrapper}>Create an account!</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    )
}

const mapStateToProps = (state: StoreState): { toggleForgotPasswordModal: boolean } => {
    return {
        toggleForgotPasswordModal: selectForgotPasswordModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL}),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.TOGGLE_REGISTER_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);