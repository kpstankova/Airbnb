import React, { useState } from 'react';
import './onboarding.styles.scss'
import { useFormik } from 'formik';
import { OnboardingComponentProps, onboardingForm, validationSchema } from './onboarding.types';
import axios from 'axios';
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from 'react-redux';
import { StoreState } from '../../redux/root-reducer';
import { User } from '../../redux/user/user.types';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Box, TextField } from '@material-ui/core';
import ProfileImageUploader from '../../components/upload-tools/profile-image/profile-image-uploader'
import { DroppedFile } from '../../redux/onboarding/onboarding.types';
import { selectProfileImage } from '../../redux/onboarding/onboarding.selectors';

const OnboardingPageComponent: React.FC<OnboardingComponentProps> = ({ ...props }) => {
    const { currentUser, profileImage, redirectToMainPage } = props;
    const styles = onboardingForm();
    const [response, setResponseState] = useState<string>("");
    const token = localStorage.getItem('accessToken');

    const handleAdditionalInfo = (name: string, phoneNumber: string) => {
        return axios
            .put(`http://localhost:3001/api/user/`, {
                name: name,
                phone: phoneNumber
            }, { headers: { Authorization: 'Bearer ' + token } })
            .then((response: any) => {
                redirectToMainPage();
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`);
            });
    };

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            name: '',
            phoneNumber: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { name, phoneNumber } = values;
            handleAdditionalInfo(name, phoneNumber);

        }
    })


    return (
        <div className='onboarding-page'>
            <Box sx={{
                width: '70%',
                height: '550px',
                boxShadow: '0px 3px 6px #ff5c5c',
                marginLeft: '15%',
                marginTop: '5%'
            }}>
                <h1 className='title'>Additional information</h1>
                <div className='onboarding-container'>
                    <div className='leftside-container'>
                        <ProfileImageUploader />
                    </div>
                    <div className='rightside-container'>
                        {response ? <div className='error-box'>{response}</div> : null}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Name"
                                hiddenLabel={true}
                                name='name'
                                variant='standard'
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name === ""}
                                helperText={errors.name ? errors.name : null}
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
                                type='text'
                                autoComplete='off'
                                placeholder="Phone number"
                                hiddenLabel={true}
                                name='phoneNumber'
                                variant='standard'
                                value={values.phoneNumber}
                                onChange={handleChange}
                                error={errors.phoneNumber === ""}
                                helperText={errors.phoneNumber ? errors.phoneNumber : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                        </form>
                        <button className='submit-button' type='submit' onClick={(e: any) => handleSubmit(e)}>
                            Let's get started!
                        </button>
                    </div>
                </div>
            </Box>
        </div>

    );
};

const mapStateToProps = (state: StoreState): { profileImage: null | DroppedFile, currentUser: User } => {
    return {
        profileImage: selectProfileImage(state),
        currentUser: selectCurrentUser(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToMainPage: () => dispatch(push('/services')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPageComponent);