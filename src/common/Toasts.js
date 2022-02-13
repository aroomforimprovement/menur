import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Toast = () => {
    return (
            <Toaster />
    )
}

export const toastConfirmStyle = () => {
    const style = {
        paddingBottom: 12, 
        border: `2px solid #550000`, 
        backgroundColor: 'rgba(170, 170, 214)',
        fontWeight: 'bold'
    }
    return {duration: 60000, 
        style: style
    };    
}

export const ToastConfirm = ({t, approve, dismiss, message, approveBtn, dismissBtn}) => {

    return (
        <div className='container'>
            <div className='row'>
                <h5>Confirm</h5>
            </div>
            <div className='row'>
                <h6>
                    {message}
                </h6>
            </div>
            <div className='row mt-4 mx-auto end-zone'>
                <button className='butt butt-alternate-outline col col-6' 
                    onClick={() => dismiss(t.id)}>
                        {dismissBtn}
                </button>
                <button className='butt butt-standard col col-6'
                    onClick={() => approve(t.id)}>
                        {approveBtn}
                </button>
            </div>
        </div>
    );
}
