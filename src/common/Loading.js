import React from 'react';

export const Loading = ({message, classes, size}) => {
    if(!size){
        size = 1;
    }
    return(
        <div>
            <div className={`spinner-border ${classes}`}>
            </div>
            <p>{message}</p>
        </div>
    );
}