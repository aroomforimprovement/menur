import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useMainContext } from './MenurRouter';
import { Loading } from './partials/Loading';
import { LoginBtn, LogoutBtn, SignupBtn } from './partials/AuthBtns';
import { getNewId } from '../utils/objUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export const Header = () => {
    
    const { state } = useMainContext();
    const logo = process.env.REACT_APP_URL + '/assets/site-logo.svg'


    return(
        <div className='nav-area col-12'>
            <Navbar collapseOnSelect expand='sm' bg='light' variant='light'>
                <Container>
                <Navbar.Brand className='mr-auto' href='/'>
                        <img src={logo}  height='40px' width='40px'
                            alt='Menur Home'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                    <Navbar.Collapse id={'responsive-navbar-nav'}>
                        <Nav className='me-auto col col-10 col-md-9' navbar>
                            <Nav.Link className='nav-link m-1' href='/'>
                                    MealPlanner
                            </Nav.Link>
                            {!state ? <Loading /> : state.user && state.user.isAuth 
                            ? <Nav.Link className='nav-link m-1' href='/account'>
                                    Account
                              </Nav.Link> 
                            : <div></div>}
                        </Nav>
                        <div className='header bg-light mt-2'>
                            <h5 className='mb-2'>Menur</h5>
                        </div>
                        <div className='auth-nav-wrapper'>
                            {!state ? <Loading /> :
                            <Nav className='auth-nav' navbar>
                                <Navbar.Text className='nav-item nav-i'>
                                    {!state || (state && state.user && state.user.isAuth) ? null : <LoginBtn size='btn-sm mt-2' />}
                                </Navbar.Text>
                                <Navbar.Text className='nav-item nav-i'>
                                    {!state || (state && state.user && state.user.isAuth) ? <LogoutBtn size='btn-sm mt-2' /> : null}
                                </Navbar.Text>
                                <Navbar.Text className='nav-item nav-i'>
                                    {!state || (state && state.user && state.user.isAuth) ? null : <SignupBtn size='btn-sm mt-2' />}
                                </Navbar.Text>
                            </Nav>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export const Footer = () => {
    const { state, dispatch } = useMainContext();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveFailed, setIsSaveFailed] = useState(false);

        
    const saveDataToAccount = async () => {
        if(state && state.user && state.user.isAuth){
            const body = {
                userid: state.user.userid,
                mealplan:{
                    id: getNewId(),
                    name: new Date(),
                    mealplan: state.mealplan,
                    leftovers: state.leftovers,
                    genList: state.genList,
                    userList1: state.userList1,
                    userList2: state.userList2
                }
            }
            return await fetch(`${apiUrl}app/plan`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${state.user.access}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.ok){
                    console.log(`mealplan saved ok`);
                    setIsSaving(false);
                    setIsSaveFailed(false);
                }else{
                    console.error(`response not ok`);
                }
            }, error => {
                console.error(`error saving mealplan`);
            }).catch(error => {
                console.error(error);
                setIsSaving(false);
                setIsSaveFailed(false);
            });
        }
    }

    const handleClearData = () => {
        dispatch({type: 'CLEAR_DATA', data: true});
    }

    const handleSaveData = () => {
        setIsSaving(true);
        saveDataToAccount();
    }
    return(
        <div className=''>
            <div className=''>
                <div className='row'>
                    {isSaveFailed 
                    ? <div className='border border-danger'>Error saving the mealplan :(</div>
                    : <div></div>}
                </div>
                <div className='row'>
                {isSaving ? <Loading /> : 
                    <div>
                    {state && state.user && state.user.isAuth
                    ? <button className='shadow col col-10 btn btn-sm btn-success border border-warning mx-auto my-2'
                        onClick={handleSaveData}>
                        <span className='fa fa-save me-2'></span> Save this mealplan to your account <span className='fa fa-save ms-2'></span>
                    </button> : <div></div>}
                    </div> 
                }
                </div>
            </div>
            <div className='row'>
                <button className='shadow col col-10 btn btn-sm btn-danger border border-success mx-auto my-2'
                    onClick={handleClearData}>
                    <span className='fa fa-close me-2'></span> Clear data and start again <span className='fa fa-close ms-2'></span>
                </button> 
            </div>
        </div>
    );
}