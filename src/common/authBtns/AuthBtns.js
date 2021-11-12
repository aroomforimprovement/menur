import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMainContext } from '../../main/MenurRouter';

export const LoginBtn = ({size}) => {
    const classes = `btn btn-secondary ${size} m-1`;
    
    const { loginWithPopup } = useAuth0();

    const loginPop = async () => {
        loginWithPopup().then(() => {
            console.log('loginWithPopup, then...');
            window.location.href = '/planner';
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
    const url = `/planner`;
    const { logout } = useAuth0();
    const logoutMenur = async () => {
        await dispatch({type: 'CLEAR_DATA', data: true});
        logout({url});
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

