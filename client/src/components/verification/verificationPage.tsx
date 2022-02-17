import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/root-reducer';
import { selectUserUid } from '../../redux/user/user.selectors';
import { VerificationPageProps } from './verificationModal.types';

const VerificationPage: React.FC<VerificationPageProps> = ({ ...props }) => {

    const { userUid, routeParams } = props;

    const [response, setResponseState] = useState('');
    const handleVerification = () => {
        return axios
            .get(`http://localhost:3001/api/auth/verify/${userUid}`)
            .then((response: any) => {
                setResponseState(`${response.data.message}`)
                return response.data;
            })
            .catch((error: any) => {
                setResponseState(`${error}`)
            });
    }

    useEffect(() => {
        handleVerification();
    }, []);

    return (
        <div>
            <h1>{response}</h1>
        </div>

    )
}

const mapStateToProps = (state: StoreState): { userUid: string } => {
    return {
        userUid: selectUserUid(state)
    }
}

export default connect(mapStateToProps, null)(VerificationPage);