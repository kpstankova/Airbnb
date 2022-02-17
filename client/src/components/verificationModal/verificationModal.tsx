import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, Dialog, Fade } from '@material-ui/core';
import React from 'react';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.actions';
import { selectVerificationModal } from '../../redux/modal-visibility/modal.selectors';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { VerificationModalProps } from './verificationModal.types';
import { dialogStyles } from '../login/login.types';

const VerificationModal: React.FC<VerificationModalProps> = ({ ...props }) => {

    const { toggleVerificationModal, resetTogglesModalAction } = props;
    const styles = dialogStyles();

    const handleClose = () => {
        resetTogglesModalAction();
    }

    return (
        <Dialog
            classes={{ root: styles.dialogRoot, paper: styles.dialogPaper }}
            closeAfterTransition={true}
            onClose={handleClose}
            open={toggleVerificationModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800
            }}>

            <Fade in={toggleVerificationModal}>
                <div className='login-modal'>
                    <button className='close-button-login' aria-label='google' onClick={handleClose}>
                        <FontAwesomeIcon className='icon-button-login' icon={faTimes} />
                    </button>
                    <div className='login'>
                        <h1 className='title'>Register successful! Check your email for verification!</h1>
                        {/* <button
                                className='submit-button'
                                type='submit'>
                                Sign in
                            </button> */}
                    </div>
                </div>
            </Fade>
        </Dialog>
    )
};

const mapStateToProps = (state: StoreState): { toggleVerificationModal: boolean } => {
    return {
        toggleVerificationModal: selectVerificationModal(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions >) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.RESET_TOGGLES_MODAL })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationModal)