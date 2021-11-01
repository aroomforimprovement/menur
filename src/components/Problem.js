import React from 'react';

export const Problem = ({message}) => {
    return(
        <div className='col-12'>
            <span className='fa fa-skull fa-3x fa-fw'></span>
            <p>{message}</p>
            <p><a href='/'>Take me home!</a></p>
        </div>
    );
}