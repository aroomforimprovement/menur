import React, {createContext, useContext, useEffect, useReducer} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { reducer } from '../redux/Main';
import { INIT_STATE } from '../shared/states';
import { Header, Footer } from './Header';
import { Switch, useHistory, Route, withRouter, Redirect } from 'react-router';
import { Main } from './Main';
import { Loading } from './partials/Loading';

const apiUrl = process.env.REACT_APP_API_URL;

const MainContext = createContext(INIT_STATE);

export const useMainContext = () => {
    return useContext(MainContext);
}

const MenurRouter = () => {

    const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const mainState = { state, dispatch };
    const history = useHistory();

    const MainPage = () => {return <Main/>}

    

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
            return await fetch(`${apiUrl}app/login`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${access}`,
                    'Content-Type': 'application/json'
                }   
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
                        result.isSet = true;
                        dispatch({
                            type: 'SET_ACCOUNT_INFO',
                            data: result
                        });
                    }else{
                        dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
                    }
                    
                    
            });
        }
        if(isAuthenticated && state.user && state.user.access && !state.isSet){
            setInfo();
        }else if(!isLoading && !isAuthenticated && !state.user){
            dispatch({type: 'SET_ACCOUNT_INFO', data: {isSet: true}});
        }
    },[isLoading, isAuthenticated, state.user, state.isSet])

    return (
        <div>
            <MainContext.Provider value={mainState}>
                <MainContext.Consumer>
                    {() => (
                        <div>
                            {state ? 
                            <div>
                            <Header />
                                <Switch>
                                    <Route path='/' history={history} component={MainPage} />
                                    <Redirect to='/' history={history} />
                                </Switch>
                            <Footer className='footer'/>
                            </div>
                            : <Loading />}
                        </div>
                    )}
                </MainContext.Consumer>
            </MainContext.Provider>
        </div>
    )
}

export default withRouter(MenurRouter);