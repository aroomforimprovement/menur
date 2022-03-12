import React, { useState } from 'react';
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

export const ToastConfirm = ({t, approve, dismiss, message, approveBtn, dismissBtn, canHide}) => {
    
    const [dontShowAgain, setDontShowAgain] = useState(false);

    return (
        <div className='container'>
            <div className='row'>
            <h5 className={'col col-11'}>Confirm</h5> 
                <button className='btn btn-sm btn-close col col-1'
                    onClick={() => dismiss(t.id, dontShowAgain)}></button>
            </div>
            <div className='row'>
                <h6>
                    {message}
                </h6>
            </div>
            <div className='row mt-4 mx-auto end-zone'>
                <button className='butt butt-alternate-outline col col-6' 
                    onClick={() => dismiss(t.id, dontShowAgain)}>
                        {dismissBtn}
                </button>
                <button className='butt butt-standard col col-6'
                    onClick={() => approve(t.id, dontShowAgain)}>
                        {approveBtn}
                </button>
            </div>
            {canHide ? <div className='row float-start col col-12 mt-3'>
                <input type='checkbox' id='dontshow' name='dontshow'
                    onChange={() => {setDontShowAgain(!dontShowAgain)}}
                    className='col col-1 mt-1'></input>
                <label htmlFor='dontshow' className='col col-10 ms-0 px-0'>Don't show this again</label>
            </div> : <div></div>}
        </div>
    );
}

export const ToastOptions = ({t, options, dismiss, message, optionBtns, dismissBtn, canHide}) => {

    const [dontShowAgain, setDontShowAgain] = useState(false);

    const optionButtons = options.map((option, i) => {

        return(
            <button key={i} onClick={() => option(t.id, dontShowAgain)}
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
                    onClick={() => toast.dismiss(t.id, dontShowAgain)}></button>   
            </div>
            <div className='row'>
                <h6>
                    {message}
                </h6>
            </div>
            <div className='row mt-4 mx-auto'>
                <div className={`col col-${12/(options.length+1)} float-start ms-0`}>
                    <button className='butt butt-alternate-outline col col-12'
                        onClick={() => dismiss(t.id, dontShowAgain)}>
                        {dismissBtn}        
                    </button>
                </div> 
                <div className={`col float-end me-0`}>
                    {optionButtons}   
                </div>
            </div>
            {canHide ? <div className='row float-start col col-12 mt-3'>
                <input type='checkbox' id='dontshow' name='dontshow'
                    onChange={() => {setDontShowAgain(!dontShowAgain)}}
                    className='col col-1 mt-1'></input>
                <label for='dontshow' className='col col-10 ms-0 px-0'>Don't show this again</label>
            </div> : <div></div>}
        </div>
    );
}
