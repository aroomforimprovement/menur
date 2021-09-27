import React from 'react';
import { useMainContext } from './Main';

export const Header = () => {
    return(
        <div className='shadow-sm bg-light mt-2'>
            <h5 className='mb-2'>Menur</h5>
        </div>
        
    );
}

export const Footer = () => {
    const { dispatch } = useMainContext();

    const handleClearData = () => {
        dispatch({type: 'CLEAR_DATA', data: true});
    }
    return(
        <div className='shadow shadow-lg'>
            <div className='row'>
                <div className='shadow clear'>
                    <button className='col col-10 btn btn-sm btn-danger border border-success mb-3 mt-4'
                        onClick={handleClearData}>Clear data and start again</button>
                </div>
            </div>
        </div>
    );
}