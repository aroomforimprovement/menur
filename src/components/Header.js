import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useMainContext } from './MenurRouter';
import { Loading } from './partials/Loading';
import { LoginBtn, LogoutBtn, SignupBtn } from './partials/AuthBtns';

export const Header = () => {
    const { state } = useMainContext();
    const logo = process.env.REACT_APP_URL + '/assets/site-logo.svg'

    useEffect(() => {

    },[state]);
    return(
        <div className='nav-area col-12'>
            <Navbar collapseOnSelect expand='md' bg='light' variant='light'>
                <Container>
                <Navbar.Brand className='mr-auto' href='/'>
                        <img src={logo}  height='40px' width='40px'
                            alt='Menur Home'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                    <Navbar.Collapse id={'responsive-navbar-nav'}>
                        <Nav className='me-auto col col-10 col-md-9' navbar>
                            <Nav.Link className='nav-link m-1' to='/'>
                                    MealPlanner
                            </Nav.Link>
                            {!state ? <Loading /> : state.user && state.user.isAuth 
                            ? <Nav.Link className='nav-link m-1' to={`/account`}>
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
    const { dispatch } = useMainContext();

    const handleClearData = () => {
        dispatch({type: 'CLEAR_DATA', data: true});
    }
    return(
        <div className='shadow shadow-lg'>
            <div className='row'>
                <div className='shadow clear'>
                    <button className='col col-10 btn btn-sm btn-danger border border-success mb-3 mt-4'
                        onClick={handleClearData}>Clear data and start again</button>
                </div>
            </div>
        </div>
    );
}