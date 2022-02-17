import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';
import { selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { StoreState } from '../../redux/root-reducer';
import { IResetToggles, IToggleLogin, IToggleVerificationModal, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { useFormik } from 'formik';
import axios from "axios";
// import { push, CallHistoryMethodAction } from "connected-react-router";
import { headers, RegisterModalProps, validationSchema } from './register.types';
import { dialogStyles } from '../login/login.types';
import { Dialog, Fade, TextField } from '@material-ui/core';
import { LoginState, RegisterState, User, UserActionTypes } from '../../redux/user/user.types';
import { ILoginFailure, ILoginSuccess, IRegisterFailure, IRegisterSuccess, TUserReducerActions} from '../../redux/user/user.actions';


const RegisterModalComponent: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { resetTogglesModalAction, toggleLoginModalAction, toggleRegisterModal, registerUserSuccessAction, registerUserErrorAction,
        loginSuccessAction, loginFailureAction, toggleVerificationModalAction } = props;
    const [response, setResponseState] = useState<string>("");

    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const handleOpenLogin = () => {
        toggleLoginModalAction();
    };

    // const handleVerification = (email : string) => {
    //     return axios
    //         .post(`http://localhost:3001/email/verification`, {
    //             to: email,
    //         }, { headers: headers })
    //         .then((response: any) => {
    //             return response.data;
    //         })
    //         .catch((error: any) => {
    //             setResponseState(`${error}`);
    //         });
    // }

    // const handleLogin = (newUser: LoginState) => {
    //     return axios
    //         .post(`http://localhost:3001/api/auth/login`, {
    //             email: newUser.email,
    //             password: newUser.password,
    //         }, { headers: headers })
    //         .then((response: any) => {
    //             loginSuccessAction({ id: response.data.id, email: response.data.email });
    //             localStorage.setItem('accessToken', response.data.accessToken);
    //         })
    //         .catch((error: any) => {
    //             setResponseState(`${error}`);
    //             loginFailureAction(error);
    //         });
    // }

    const handleRegister = (newUser: RegisterState) => {
        return axios
            .post(`http://localhost:3001/api/auth/register`, {
                email: newUser.email,
                password: newUser.password
            }, { headers: headers })
            .then((response: any) => {
                registerUserSuccessAction(response.data.uid);
                // handleVerification(newUser.email);
                // handleLogin({ email: newUser.email, password: newUser.password });
                toggleVerificationModalAction();
            })
            .catch((error: any) => {
                setResponseState(error)
                registerUserErrorAction(error);
            })
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            const { email, password } = values;
            handleRegister(values);
            handleClose();
            resetForm();
            resetTogglesModalAction();
        }
    })

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleRegisterModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleRegisterModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Welcome to Airbnb</h1>

                        {response ? <div className='error-box'>{response}</div> : null}
                        <form className='login-form' autoComplete='on' onSubmit={handleSubmit} >
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
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='password'
                                autoComplete='off'
                                placeholder="Password"
                                hiddenLabel={true}
                                name='password'
                                variant='standard'
                                value={values.password} onChange={handleChange} error={errors.password === ""}
                                helperText={errors.password ? errors.password : null}
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
                                placeholder="Confirm Password"
                                hiddenLabel={true}
                                name='confirmPassword'
                                variant='standard'
                                value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword === ""}
                                helperText={errors.confirmPassword ? errors.confirmPassword : null}
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
                                Sign up
                            </button>
                            <div>
                                <div className='hyperlinks'>
                                    <Link className='hyperlink' to={'/'} onClick={handleOpenLogin}>Already have an account?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    );
}

const mapStateToProps = (state: StoreState): { toggleRegisterModal: boolean } => {
    return {
        toggleRegisterModal: selectRegisterModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
        toggleLoginModalAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.TOGGLE_LOGIN_MODAL }),
        registerUserSuccessAction: (data: string) => dispatch<IRegisterSuccess>({ type: UserActionTypes.REGISTER_SUCCESS, data: data }),
        registerUserErrorAction: (data: string) => dispatch<IRegisterFailure>({ type: UserActionTypes.REGISTER_FAILED, data: data }),
        loginSuccessAction: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LOGIN_SUCCESS, data: data }),
        loginFailureAction: (data: string) => dispatch<ILoginFailure>({ type: UserActionTypes.LOGIN_FAILED, data: data }),
        toggleVerificationModalAction: () =>  dispatch<IToggleVerificationModal>({type: ModalActionTypes.TOGGLE_VERIFICATION_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModalComponent);