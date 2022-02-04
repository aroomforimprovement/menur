import React from 'react';
import { useMainContext } from '../../main/MenurRouter';

export const ClearData = () => {
    
    const {dispatch} = useMainContext();

    const handleClearData = () => {
        dispatch({type: 'CLEAR_DATA', data: true});
    }

    return(
        <div className='row'>
            <button className='shadow col col-11 btn btn-sm btn-danger border border-success mx-auto mt-2 mb-5 shadow'
                onClick={handleClearData}>
                <span className='fa fa-close me-2'></span> Clear data and start again <span className='fa fa-close ms-2'></span>
            </button> 
        </div>
    );

}