import React from 'react';
import { useMainContext } from './MenurRouter';

const Account = () => {
    const { state, dispatch } = useMainContext();
    return(
        <div className='container'>
            <h1>Account</h1>
        </div>
    );
}

export default Account;