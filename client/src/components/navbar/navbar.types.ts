import { makeStyles } from "@material-ui/core";
import { User } from "../../redux/user/user.types";
import { SearchProps } from "../helperFunctions";

export const useStyles = makeStyles((theme) => ({
    buttonRoot : {
        textTransform: "none",
        color: "white"
    },
    avatarIconRoot: {
        fill: "white",
        width: "50px",
        cursor: "pointer"
    }
}));

export interface NavbarComponentProps {
    path: string;
    searchUrl: string;
    searchString: string;
    startDateFilter: Date;
    endDateFilter: Date;
    numberOfGuestsFilter: number;
    placeholder: string;
    redirectToHome: () => void;
    toggleSearchStringAction: (data: string) => void;
    toggleStartDateFilterAction: (data: Date) => void;
    toggleEndDateFilterAction: (data: Date) => void;
    redirectToSearchResultsPage: (data: SearchProps) => void;
    toggleGuestNumberFilerAction: (data: number) => void;
    resetSearchFilters: () => void;
}

export interface DropdownComponentProps {
    open: boolean;
    anchorEl: any;
    currentUser: User;
    handleClose: () => void;
    toggleLoginModalAction: () => void;
    toggleRegisterModalAction: () => void;
    logoutUserSuccessAction: () => void;
    redirectToHome: () => void;
    logoutUserErrorAction: (data: string) => void;
    toggleChangePasswordModalAction: () => void;
}

export const dropdownStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        border: '1px solid #d3d4d5',
        borderRadius: '25px !important',
    }
}));