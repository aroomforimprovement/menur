import React from 'react';
import './help.css';
import { PrivacyPolicy } from './PrivacyPolicy';

export const Help = () => {
    return(
        <div className='help-page'>
            <div className='p-5 jum'>
                <h1>What is Menur?</h1>
                <p></p>
            </div>
            <div className='jum '>
                <PrivacyPolicy />
            </div>
        </div>
    );
}