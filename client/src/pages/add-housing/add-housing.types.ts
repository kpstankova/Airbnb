import { DroppedFile } from "../../redux/onboarding/onboarding.types";
import { User } from "../../redux/user/user.types";
import * as Yup from 'yup'

export interface AddHousingComponentProps {
    currentUser: User;
    // serviceImage: DroppedFile | null;
    redirectToServicePage: () => void;
    // clearServiceImage: () => void;
}

export const validationSchema = Yup.object({
    title: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    guests: Yup.number().required('This field is required'),
    city: Yup.string().required('This field is required'),
    price: Yup.number().required('This field is required'),
});

export interface AddHousingInput {
    title: string;
    description: string;
    guests: number;
    city: string;
    price: number;
};