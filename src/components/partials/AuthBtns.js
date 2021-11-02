import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMainContext } from '../MenurRouter';

export const LoginBtn = ({size}) => {
    const classes = `btn btn-secondary ${size} m-1`;
    
    const { loginWithPopup } = useAuth0();

    const loginPop = async () => {
        loginWithPopup().then(() => {
            console.log('loginWithPopup, then...');
            window.location.href = '/account';
        });
    }
    return <button 
            onClick={() => loginPop()}
            type='button' 
            className={classes}
            >Login</button>
               
}

export const LogoutBtn = ({size}) => {
    const {dispatch} = useMainContext();
    const classes = `btn btn-secondary ${size} m-1`;
    const url = `${process.env.REACT_APP_URL}/`;
    const { logout } = useAuth0();
    const logoutMenur = () => {
        logout({url}).then(() => {
            dispatch({type: 'LOGOUT', data: true})
        });
    }
    return <button 
            onClick={() => logoutMenur()}
            type='button' 
            className={classes}>
                Log out
            </button>
                        
}

export const SignupBtn = ({size}) => {
    const classes = `btn btn-success ${size} m-1`;
    const { loginWithPopup } = useAuth0();
    return <button
            onClick={() => loginWithPopup(
                {
                    screen_hint: 'signup'
                }
            )}
            type='button'
            className={classes}
            >Sign up</button>

}

