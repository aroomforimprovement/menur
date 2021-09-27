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
                <div className='clear'>
                    <button className='col col-10 btn btn-sm btn-danger border border-success'
                        onClick={handleClearData}>Clear data and start again</button>
                </div>
            </div>
        </div>
    );
}