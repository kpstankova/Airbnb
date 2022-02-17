import { makeStyles } from "@material-ui/core";
import { User } from "../../redux/user/user.types";

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
    redirectToHome: () => void;
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
}

export const dropdownStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        border: '1px solid #d3d4d5',
        borderRadius: '25px !important',
        left: '1700px !important'
    }
}));