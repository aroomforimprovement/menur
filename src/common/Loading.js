import React from 'react';

export const Loading = ({message, classes, size}) => {
    if(!size){
        size = 1;
    }
    return(
        <div className='col col-12 float-center'>
            <div className={`spinner-border ${classes}`}>
            </div>
            <p>{message}</p>
        </div>
    );
}