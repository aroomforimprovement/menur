import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMainContext } from '../../main/MenurRouter';
import { Navigate } from 'react-router-dom';


export const LoginBtn = ({size}) => {
    const classes = `butt butt-alternate ${size} m-1`;
    
    const { loginWithPopup } = useAuth0();

    const loginPop = async () => {
        loginWithPopup().then(() => {
            <Navigate to='/planner' />;
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
    const classes = `butt butt-alternate ${size} m-1`;
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
                Logout
            </button>
                        
}

export const SignupBtn = ({size}) => {
    const classes = `butt butt-good ${size} m-1`;
    const { loginWithPopup } = useAuth0();

    const signupWithPop = () => {
        loginWithPopup(
            {
                screen_hint: 'signup'
            }
        )
    }
    return <button
            onClick={() => signupWithPop()}
            type='button'
            className={classes}
            >Signup</button>
}

