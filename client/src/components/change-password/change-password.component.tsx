import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, Dialog, Fade, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { selectChangePasswordModal } from '../../redux/modal-visibility/modal.selectors';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { Dispatch } from "redux";
import { ChnagePasswordProps, validationSchema } from './change-password.types';
import { useFormik } from 'formik';
import { dialogStyles } from '../login/login.types';
import axios from 'axios';

const ChangePasswordComponent: React.FC<ChnagePasswordProps> = ({ ...props }) => {
    const { toggleChangePasswordModal, resetTogglesModalAction } = props;
    const token = localStorage.getItem('accessToken');
    const [response, setResponseState] = useState<string>("");

    const handleClose = () => {
        resetTogglesModalAction();
    }

    const styles = dialogStyles();

    const handleChangePassword = (oldPassword: string, newPassword: string) => {
        return axios
            .post(`http://localhost:3001/api/auth/changePassword`, {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response: any) => {
                handleClose();
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
            });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const { oldPassword, newPassword } = values;
            handleChangePassword(oldPassword, newPassword);
            
        }
    })

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleChangePasswordModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleChangePasswordModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Change password</h1>

                        {response ? <div className='error-box'>{response}</div> : null}
                        <form className='login-form' autoComplete='on' onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='password'
                                autoComplete='off'
                                placeholder="Old password"
                                hiddenLabel={true}
                                name='oldPassword'
                                variant='standard'
                                value={values.oldPassword} onChange={handleChange} error={errors.oldPassword === ""}
                                helperText={errors.oldPassword ? errors.oldPassword : null}
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
                                placeholder="New password"
                                hiddenLabel={true}
                                name='newPassword'
                                variant='standard'
                                value={values.newPassword} onChange={handleChange} error={errors.newPassword === ""}
                                helperText={errors.newPassword ? errors.newPassword : null}
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
                                Submit
                            </button>
                            {/* {isLoading ? <LoadingSpinner /> : null} */}
                        </form>
                    </div>
                </div>
            </Fade>
        </Dialog>
    )
};

const mapStateToProps = (state: StoreState): { toggleChangePasswordModal: boolean } => {
    return {
        toggleChangePasswordModal: selectChangePasswordModal(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent);