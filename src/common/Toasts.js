import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
            <h5 className={'col col-11'}>Confirm</h5> 
                <button className='btn btn-sm btn-close col col-1'
                    onClick={() => toast.dismiss(t.id)}></button>
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

export const ToastOptions = ({t, options, dismiss, message, optionBtns, dismissBtn}) => {

    const optionButtons = options.map((option, i) => {

        return(
            <button key={i} onClick={() => option(t.id)}
                className={`butt butt-standard${i%2 === 0 ? '-outline ' : ' '} col col-6`}>
                {optionBtns[i]}
            </button>    
        );
    })

    return(
        <div className='container'>
            <div className='row'>
                <h5 className={'col col-11'}>Options</h5> 
                <button className='btn btn-sm btn-close col col-1'
                    onClick={() => toast.dismiss(t.id)}></button>   
            </div>
            <div className='row'>
                <h6>
                    {message}
                </h6>
            </div>
            <div className='row mt-4 mx-auto'>
                <div className={`col col-${12/(options.length+1)} float-start ms-0`}>
                    <button className='butt butt-alternate-outline col col-12'
                        onClick={() => dismiss(t.id)}>
                        {dismissBtn}        
                    </button>
                </div> 
                <div className={`col float-end me-0`}>
                    {optionButtons}   
                </div>
                
            </div>
        </div>
    );
}
