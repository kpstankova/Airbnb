import React, { useState } from "react";
import './navbar.styles.scss';
import logoImage from '../../assets/logo.png';
import Avatar from '@material-ui/icons/AccountCircle';
import { Button } from "@material-ui/core";
import { NavbarComponentProps, useStyles } from "./navbar.types";
import DropdownComponent from "./dropdown.component";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

const NavbarComponent: React.FC<NavbarComponentProps> = ({ ...props }) => {
    const { redirectToHome } = props;
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const styles = useStyles();

    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget)
        setOpenMenu(true);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    return (
        <div className='navbar-container'>
            <img className='navbar-logo' src={logoImage} alt='Airbnb' onClick={() => redirectToHome()}/>
            <div className='search-component'>
                <div className='field-component'>
                    <div className='search-fields-label'>Location</div>
                    <input className='search-fields-input' placeholder='Where are you going' readOnly/>
                </div>
                <div className='field-component'>
                    <div className='search-fields-label'>Check in</div>
                    <input className='search-fields-input' placeholder='Add dates' readOnly/>
                </div>
                <div className='field-component'>
                    <div className='search-fields-label'>Check out</div>
                    <input className='search-fields-input' placeholder='Add dates' readOnly/>
                </div>
                <div className='field-component'>
                    <div className='search-fields-label'>Guests</div>
                    <input className='search-fields-input' placeholder='Add guests' readOnly/>
                </div>
            </div>
            <div className='user-container'>
                <Button className='host-button' classes={{ root: styles.buttonRoot }}>Become a host</Button>
                <Avatar classes={{ root: styles.avatarIconRoot }} onClick={handleOpenMenu} />
                <DropdownComponent open={openMenu} handleClose={handleCloseMenu} anchorEl={anchorEl} />
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToHome: () => dispatch(push('/')),
    }
}

export default connect(null, mapDispatchToProps)(NavbarComponent);