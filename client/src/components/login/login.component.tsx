import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Fade, TextField } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { IResetToggles, IToggleForgotPassword, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { selectForgotPasswordModal, selectLoginModal } from '../../redux/modal-visibility/modal.selectors';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { dialogStyles, LoginModalProps } from './login.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import Backdrop from '@material-ui/core/Backdrop';
import './login.styles.scss';

const LoginComponent: React.FC<LoginModalProps> = ({...props}) => {
    const { toggleLoginModal, resetTogglesModalAction, toggleForgotPasswordModalAction, toggleRegisterModalAction } = props;

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenForgotPasswordModal = () => {
        toggleForgotPasswordModalAction();
    };
    const handleOpenRegister = () => {
        toggleRegisterModalAction();
    }
    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleLoginModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleLoginModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Log in to Airbnb</h1>

                        {/* {response ? <div className='error-box'>{response}</div> : null} */}
                        <form className='login-form' autoComplete='on'>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='email'
                                autoComplete='off'
                                placeholder="Email"
                                hiddenLabel={true}
                                name='email'
                                variant='standard'
                                // value={values.email} onChange={handleChange} error={errors.email === ""}
                                // helperText={errors.email ? errors.email : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='password'
                                autoComplete='off'
                                placeholder="Password"
                                hiddenLabel={true}
                                name='password'
                                variant='standard'
                                // value={values.password} onChange={handleChange} error={errors.password === ""}
                                // helperText={errors.password ? errors.password : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                            <button
                                className='submit-button'
                                type='submit'>
                                Sign in
                            </button>
                            <button
                                className='google-button'
                                type='submit'>
                                Sign in with google
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenForgotPasswordModal}>Forgot password?</Link>
                                </div>
                                <div className='hyperlinks'>
                                    <span>No account yet? </span>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenRegister}>Register</Link>
                                </div>
                            </div>

                            {/* {isLoading ? <LoadingSpinner /> : null} */}
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
};

const mapStateToProps = (state: StoreState): { toggleForgotPasswordModal: boolean, toggleLoginModal: boolean } => {
    return {
        toggleForgotPasswordModal: selectForgotPasswordModal(state),
        toggleLoginModal: selectLoginModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions >) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleRegisterModalAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.TOGGLE_REGISTER_MODAL }),
        toggleForgotPasswordModalAction: () => dispatch<IToggleForgotPassword>({ type: ModalActionTypes.TOGGLE_FORGOT_PASSWORD_MODAL })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);;