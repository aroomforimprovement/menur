import React from 'react';
import { useMainContext } from './Main';

export const Header = () => {
    return(
        <h5>Menur</h5>
    );
}

export const Footer = () => {
    const { state, dispatch } = useMainContext();

    const handleClearData = () => {
        dispatch({type: 'CLEAR_DATA', data: true});
    }
    return(
        <div>
            <div className='row'>
                <div className='col col-4 clear'>
                    <button className='btn btn-sm btn-danger'
                        onClick={handleClearData}>Clear data and start again</button>
                </div>
                <div className='col col-4'>
                    <p>Menur</p>
                </div>
            </div>
        </div>
    );
}