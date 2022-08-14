import React, { useState } from 'react';
import toast from 'buttoned-toaster';

export const ResendVerification = ({user}) => {
    
    const endpoint = `${process.env.REACT_APP_API_URL}app/verify`;
    const [sent, setSent] = useState(false);

    const resendVerification = () => {
        setSent(true);
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            },
            body: JSON.stringify({user_id: `auth0|${user.userid}`})
        }).then(response => response.text())
        .then(data => {
            if(data.indexOf('job') > -1){
                toast.info("Verification email resent successfully");
            }
        }).catch(error => console.error(error));
    }

    const Verified = () => {
        return <div className='container mt-5 mb-5 default-servings-area'>{'Your account has been verified'}</div>
    }

    const Unverified = () => {
        return (
            <div className='container mt-5 mb-5 default-servings-area'>
                <h5>Account verification:</h5>
                <div className='row'>
                    <div className='col col-8'>
                        {`You need to verify your account to use features.
                        Check the email account you signed up with for the verification email
                        or click here to resend the verification mail.`}
                    </div>
                    <div className='col col-3 float-end'>
                        <button 
                            className='butt butt-good fa fa-lg fa-check-circle shadow p-4'
                            onClick={resendVerification}></button>
                    </div>
                </div>
            </div>
        )
    }

    const Sent = () => {
        return(
            <div className='container mt-5 mb-5 default-servings-area'>{`Verification email requested`}</div>
        )
    }
    
    return(
        <div className=''>
            <div >
                {
                    sent 
                    ? <Sent/> 
                    : user 
                    ? user.isVerified 
                    ? <Verified /> 
                    : <Unverified/> 
                    : <div></div>
                } 
            </div>       
        </div>
    )

}