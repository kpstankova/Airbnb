import { makeStyles } from "@material-ui/core";

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

export interface DropdownComponentProps {
    open: boolean;
    anchorEl: any;
    handleClose: () => void;
    toggleLoginModalAction: () => void;
    toggleRegisterModalAction: () => void;
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