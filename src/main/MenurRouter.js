import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { reducer } from './menurReducer';
import { INIT_STATE } from '../shared/states';
import { Header } from './Header';
import { Routes, useNavigate, Route, Navigate } from 'react-router-dom';
import { withRouter } from '../utils/routerUtils';
import Planner from '../planner/Planner';
import { Help } from '../help/Help';
import { Loading } from '../common/Loading';
import Account from '../account/Account';
import toast, { ToastRack } from 'buttoned-toaster';
import Cookies from 'cookies-js';
import { isMobile } from 'react-device-detect';
import { PlannerMobile } from '../mobile/planner/PlannerMobile';

let apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

const MainContext = createContext({...INIT_STATE});

export const useMainContext = () => {
    return useContext(MainContext);
}

const MenurRouter = () => {
    const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const mainState = { state, dispatch };
    const history = useNavigate();
    const [cookieWarning, setCookieWarning] = useState(false);

    const approveCookies = (id) => {
        Cookies.set('cookies_approved', true, {expires: 28*34*60*1000});
        dispatch({type: 'COOKIES_APPROVED', data: true});
        toast.dismiss(id)
    }
    useEffect(() => {
        if(isLoading && state.isSet){
            dispatch({type: 'UNSET'});
        }
    })

    useEffect(() => {
        if(!isLoading && !state.user){
            dispatch({
                type: 'CHECK_AUTH',
                data: {
                    isAuthenticated: isAuthenticated,
                    user: user
                }
            })
        }
    },[isLoading, state.user, isAuthenticated, user]);

    useEffect(() => {
        const setAccessToken = async () => {
            dispatch({type: 'SET_ACCESS', data: await getAccessTokenSilently()})
        }
        if(isAuthenticated && state.user && !state.user.access){
            setAccessToken(); 
        }
    },[getAccessTokenSilently, isAuthenticated, state.user]);

    useEffect(() => {
        const getAccountInfo = async (access) => {
            const body = {
                userid: state.user.userid, 
                username: state.user.username,
                email: state.user.email
            }
            
            return await fetch(`${proxy}${apiUrl}app/login`, {
                method: 'POST',
                body: JSON.stringify(body),
                mode: 'cors',
                headers: {
                    Authorization: `Bearer ${access}`,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
            }, error => {
                console.error("error fetching account info: ");
                
            }).catch(err => console.error(err))
        }
        const setInfo = async () => {
            await getAccountInfo(state.user.access)
                .then((result) => {
                    if(result){
                        result.isSet = true;
                        dispatch({
                            type: 'SET_ACCOUNT_INFO',
                            data: result
                        });
                        toast.success(
                            {
                                toastId: "AccountReady",
                                message: "Your account info is ready"
                            }
                        );
                    }else{
                        dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
                        toast.error(
                            {
                                toastId: "AccountReady",
                                message: "You are not logged in"
                            });
                    }  
            });
        }
        if(isAuthenticated && state.user && state.user.access && !state.isSet){
            setInfo();
        }else if(!isLoading && !isAuthenticated && !state.user){
            dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
        }
    },[isLoading, isAuthenticated, state.user, state.isSet]);

    useEffect(() => {
        const dismissToast = (id) => {
            toast.dismiss(id);
        }
        const setUnverifiedWarning = async () => {
            const dontShow = await toast.dontShow(`UNVERIFIED_WARNING_${state.user.userid}`);
            if(dontShow){
                return;
            }
            toast.warn(
                {
                    duration: 1661,
                    approveFunc: dismissToast,
                    message: `Thanks for signing up to Menur.
                        You'll need to verify your account to access
                        some features.
                        Check your email and follow the link to verify`,
                    dismissTxt: "OK",
                    approveTxt: "Cool",
                    toastId: "unverified",
                    canHide: true,
                    dontShowType: `UNVERIFIED_WARNING_${state.user.userid}`,
                }
            )
        }
        if(state.user && state.user.isAuth && !state.user.isVerified){
            setUnverifiedWarning();
        }
    }, [state.user])

    const cookieToast = () => {
        setCookieWarning(true);
        toast.warn({
            toastId: "CookieWarning",
            message: `By using this website, you accept the use of cookies
            to perform basic functionality.`,
            approveFunc:approveCookies,
            dismissFunc:approveCookies,
            approveTxt:'Cool',
            dismissTxt:'OK',
            duration:1661
        })
        
    }

    useEffect(() => {
        const checkCookieApproval = () => {
            if(!Cookies.get('cookies_approved')){
                cookieToast();
            }
        }
        if(!state.cookiesApproved && !cookieWarning){
            checkCookieApproval();
        }
    });

    return (
        <div>
            {state && state.isSet ? 
            <MainContext.Provider value={mainState}>
                <MainContext.Consumer>
                    {() => (
                    <div>
                        <Header />
                        <ToastRack />
                        <Routes>
                            <Route path='/planner/:id/:edit' history={history} element={state.badUrl ? <Navigate to="/planner" replace /> :isMobile ? <PlannerMobile edit={true} /> : <Planner edit={true}/>} />
                            <Route path='/planner' history={history} element={isMobile ? <PlannerMobile edit={false}/> : <Planner edit={false}/>} />
                            <Route path='/account' history={history} element={<Account />} />
                            <Route path='/help' history={history} element={<Help />} />
                            <Route path='/*' history={history} element={<Navigate to='/planner' replace />} />
                        </Routes>
                    </div>        
                    )}      
                </MainContext.Consumer>
            </MainContext.Provider>
            : <Loading message={"Getting the fork out..."} classes={'main-loader col-2 mt-5'} />}
        </div>
    )
}

export default withRouter(MenurRouter);