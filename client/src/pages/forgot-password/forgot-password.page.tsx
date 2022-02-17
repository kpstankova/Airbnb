import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { forgotPassword, ForgotPasswordProps, validationSchema } from './forgot-password.types';
import './forgot-password.styles.scss'
import { useFormik } from 'formik';
import axios from 'axios';
import { headers } from '../../components/register/register.types';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({ ...props }) => {
    const { routeParams, redirectToHome } = props;
    const styles = forgotPassword();
    const [response, setResponseState] = useState<string>("");
    
    const handleChangePassword = (password: string) => {
        return axios
            .put(`http://localhost:3001/api/auth/setNewPassword`, {
                newPassword: password,
                uid: routeParams.uid
            }, { headers: headers })
            .then((response: any) => {
                redirectToHome();
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
            });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const { password } = values;
            handleChangePassword(password);
            resetForm({});
        }
    })

    return (
        <div className='change-password'>
            <h2 className='title'>Change password</h2>
            <form className='change-password-form' onSubmit={handleSubmit}>
                <TextField
                    classes={{ root: styles.formControlRoot }}
                    autoComplete='off' type='password' placeholder="New password"
                    hiddenLabel={true} name='password' variant='standard'
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
                    classes={{ root: styles.formControlRoot }}
                    autoComplete='off' type='password' placeholder="Confirm new password"
                    hiddenLabel={true} name='confirmPassword' variant='standard'
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

                <Button classes={{ root: styles.buttonRoot }} type='submit' className='submit-button' variant='contained'>Change password</Button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToHome: () => dispatch(push('/')),
    }
}

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);