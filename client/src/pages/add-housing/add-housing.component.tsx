import { Box, TextField } from "@material-ui/core";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DroppedFile } from "../../redux/onboarding/onboarding.types";
import { StoreState } from "../../redux/root-reducer";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { User } from "../../redux/user/user.types";
import { onboardingForm } from "../onboarding/onboarding.types";
import { AddHousingComponentProps, AddHousingInput, validationSchema } from "./add-housing.types";
import { Dispatch } from "redux";
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  
  import "@reach/combobox/styles.css";

const AddHousingComponent: React.FC<AddHousingComponentProps> = ({ ...props }) => {
    const { currentUser, redirectToServicePage } = props;
    const styles = onboardingForm();
    const [response, setResponseState] = useState<string>("");
    const token = localStorage.getItem('accessToken');
    const libraries:any = ["places"]

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();

    const handleAddService = (service: AddHousingInput) => {
        // return axios
        //     .post(`http://localhost:3001/service/add`, {
        //         name: service.nameOfService,
        //         category: service.category,
        //         price: service.price,
        //         duration: service.duration,
        //         city: service.city,
        //         description: service.description,
        //         contributor_id: currentUser.id,
        //         publish_date: new Date()
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: 'Bearer ' + token
        //         }
        //     })
        //     .then((response: any) => {
        //         if (serviceImage) {
        //             handleServiceImageUpload(response.data.service_id)
        //         }
        //         return response.data;
        //     })
        //     .catch((error: any) => {
        //         setResponseState(`${error}`);
        //     })
    }

    const handleServiceImageUpload = (serviceId: number) => {
        // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        // let fd = new FormData();
        // fd.append('file', serviceImage!.fileWithMeta.file)
        // return axios.post(`http://localhost:3001/files/servicePic?id=${serviceId}`, fd, config);
    };

    const handleAddButton = (service: AddHousingInput) => {
        handleAddService(service);
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            title: '',
            description: '',
            guests: 0,
            city: '',
            price: 0
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { title, description, price, guests, city } = values;
            handleAddButton(values);
            redirectToServicePage();
            // clearServiceImage();
        }
    });

    return (
        <div className='onboarding-page'>
            <Box sx={{
                width: '70%',
                height: '700px',
                boxShadow: '0px 3px 6px #5fa6ff',
                marginLeft: '15%',
                marginTop: '5%'
            }}>
                <h1 className='title'>Add housing</h1>
                <div className='onboarding-container'>
                    <div className='leftside-container'>
                        {/* <ServiceImageUploader /> */}
                    </div>
                    <div className='rightside-container'>
                        {response ? <div className='error-box'>{response}</div> : null}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Title"
                                hiddenLabel={true}
                                name='title'
                                variant='standard'
                                value={values.title}
                                onChange={handleChange}
                                error={errors.title === ""}
                                helperText={errors.title ? errors.title : null}
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
                                placeholder="Description"
                                hiddenLabel={true}
                                name='description'
                                variant='standard'
                                value={values.description}
                                onChange={handleChange}
                                error={errors.description === ""}
                                helperText={errors.description ? errors.description : null}
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
                                type='number'
                                autoComplete='off'
                                placeholder="Number of guests"
                                hiddenLabel={true}
                                name='guests'
                                variant='standard'
                                value={values.guests}
                                error={errors.guests === ""}
                                helperText={errors.guests ? errors.guests : null}
                                onChange={handleChange}
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
                                placeholder="City"
                                hiddenLabel={true}
                                name='city'
                                variant='standard'
                                value={values.city}
                                onChange={handleChange}
                                error={errors.city === ""}
                                helperText={errors.city ? errors.city : null}
                                InputLabelProps={{ shrink: false }}
                                disabled={!ready}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />

                            {/* <Combobox onSelect={(val: any) => setValue(val, false)} aria-labelledby="demo">
                                <ComboboxInput value={value} onChange={(e: any) => setValue(e.target.value)} disabled={!ready} />
                                <ComboboxPopover>
                                    <ComboboxList>
                                        {status === "OK" &&
                                            data.map(({ place_id, description }) => (
                                                <ComboboxOption key={place_id} value={description} />
                                            ))}
                                    </ComboboxList>
                                </ComboboxPopover>
                            </Combobox> */}

                            <TextField
                                classes={{ root: styles.textFieldRoot }}
                                type='text'
                                autoComplete='off'
                                placeholder="Price per night"
                                hiddenLabel={true}
                                name='price'
                                variant='standard'
                                value={values.price}
                                onChange={handleChange}
                                error={errors.price === ""}
                                helperText={errors.price ? errors.price : null}
                                InputLabelProps={{ shrink: false }}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                        fontSize: '10px',
                                        width: '200px'
                                    }
                                }} />
                        </form>
                        <button className='submit-button' onClick={(e: any) => handleSubmit(e)}>
                            Upload
                        </button>
                    </div>
                </div>
            </Box>
        </div>

    );
};

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        // serviceImage: selectServiceImage(state),
        currentUser: selectCurrentUser(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToServicePage: () => dispatch(push('/my-services')),
        // clearServiceImage: () => dispatch<IClearServiceImage>({ type: ServicesActionTypes.CLEAR_SERVICE_IMAGE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHousingComponent);