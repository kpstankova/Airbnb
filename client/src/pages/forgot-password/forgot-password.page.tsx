import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { forgotPassword } from './forgot-password.types';
import './forgot-password.styles.scss'
const ForgotPasswordPage = () => {
    const styles = forgotPassword();

    return (
        <div className='change-password'>
            <h2 className='title'>Change password</h2>
            <form className='change-password-form'>
                    <TextField 
                        classes = {{root: styles.formControlRoot}}
                        autoComplete='off' type='password' placeholder="New password"
                        hiddenLabel={true} name='password' variant='standard' 
                        // value={values.password} onChange={handleChange} error={errors.password === ""} 
                        // helperText={errors.password ? errors.password : null} 
                        InputLabelProps={{shrink: false}}
                        FormHelperTextProps={{ style:{
                            color: 'red',
                            fontSize: '10px',
                            width:'200px'
                        } }}/>
                    <TextField  
                        classes = {{root: styles.formControlRoot}}
                        autoComplete='off' type='password' placeholder="Confirm new password" 
                        hiddenLabel={true} name='confirmPassword' variant='standard' 
                        // value={values.confirmPassword} onChange={handleChange} error={errors.confirmPassword === ""} 
                        // helperText={errors.confirmPassword ? errors.confirmPassword : null} 
                        InputLabelProps={{shrink: false}}
                        FormHelperTextProps={{ style:{
                            color: 'red',
                            fontSize: '10px',
                            width:'200px'
                        } }}/>

                    <Button classes= {{root: styles.buttonRoot}} type='submit' className='submit-button' variant='contained'>Change password</Button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;