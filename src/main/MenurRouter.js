import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { reducer } from './menurReducer';
import { INIT_STATE } from '../shared/states';
import { Header } from './Header';
import { Switch, useHistory, Route, withRouter, Redirect } from 'react-router';
import Planner from '../planner/Planner';
import { Help } from '../help/Help';
import { Loading } from '../common/Loading';
import Account from '../account/Account';
import { Toast } from '../common/Toasts';
import toast from 'react-hot-toast';
import Cookies from 'cookies-js';


let apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

const MainContext = createContext(INIT_STATE);

export const useMainContext = () => {
    return useContext(MainContext);
}

const MenurRouter = () => {

    const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const mainState = { state, dispatch };
    const history = useHistory();
    const [cookieWarning, setCookieWarning] = useState(false);

    const MainPage = () => {return <Planner edit={false}/>}
    const ContPage = () => {return <Planner edit={true}/>}
    const AccountPage = () => {return <Account/>}
    const HelpPage = () => {return <Help />}

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
            console.dir(body);
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
                console.error("error fetching account info: " + error);
                
            }).catch(err => console.error(err))
        }
        const setInfo = async () => {
            await getAccountInfo(state.user.access)
                .then((result) => {
                    if(result){
                        console.dir(result);
                        result.isSet = true;
                        dispatch({
                            type: 'SET_ACCOUNT_INFO',
                            data: result
                        });
                        toast.success("Your account info is ready");
                    }else{
                        dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
                        toast.error("You are not logged in");
                    }  
            });
        }
        if(isAuthenticated && state.user && state.user.access && !state.isSet){
            setInfo();
        }else if(!isLoading && !isAuthenticated && !state.user){
            dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
        }
    },[isLoading, isAuthenticated, state.user, state.isSet]);

    const cookieToast = () => {
        setCookieWarning(true);
        toast((t) => (
            <div className='container'>
                <div className='row'>
                    <div className='col col-11'>
                        <span>
                            By using this website, you accept the use of cookies
                            to perform basic functionality. <br/>
                            <a href='/help' target='_blank'>Privacy Policy</a>
                        </span>
                    </div>
                    <div className='col col-1'>
                        <button className='btn  btn-sm btn-success'
                            onClick={() => approveCookies(t.id)}>OK</button>
                    </div>
                </div>
            </div>
        ), {duration: 60000000, position: 'bottom-center', style: {minWidth: 'fit-content', backgroundColor:'#ffa', textAlign: 'start'}})
        
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
                        <Toast />
                        <Switch>
                            <Route path='/planner/*' histor={history} component={ContPage} />
                            <Route path='/planner' history={history} component={MainPage} />
                            <Route path='/account' history={history} component={AccountPage} />
                            <Route path='/help' history={history} component={HelpPage} />
                            <Redirect to='/planner' history={history} />
                        </Switch>
                    </div>        
                    )}      
                </MainContext.Consumer>
            </MainContext.Provider>
            : <Loading message={"Getting the fork out..."} classes={'main-loader col-2 mt-5'} />}
        </div>
    )
}

export default withRouter(MenurRouter);