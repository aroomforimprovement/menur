import React from 'react';
import './header.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useMainContext } from './MenurRouter';
import { Loading } from '../common/Loading';
import { LoginBtn, LogoutBtn, SignupBtn } from '../common/authBtns/AuthBtns';



export const Header = () => {
    
    const { state } = useMainContext();
    const logo = process.env.REACT_APP_URL + '/assets/site-logo.svg'


    return(
        <div className='site-header'>
            <Navbar collapseOnSelect expand='md' bg='lavender' variant='light'
                className=''>
                <Container>
                <Navbar.Brand className='mr-auto' href='/'>
                        <img src={logo}  height='40px' width='40px'
                            alt='Menur Home'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                    <Navbar.Collapse id={'responsive-navbar-nav'}>
                        <Nav className='me-auto col col-6' navbar>
                            <LinkContainer to='/planner'>
                                <Nav.Link className='nav-link m-1'>
                                    MealPlanner
                                </Nav.Link>
                            </LinkContainer>
                            {!state ? <Loading /> : state.user && state.user.isAuth 
                            ? <LinkContainer to='/account'>
                                <Nav.Link className='nav-link m-1'>
                                    Account
                                </Nav.Link> 
                              </LinkContainer>
                            : <div></div>}
                            <LinkContainer to='/help'>
                                <Nav.Link className='nav-link m-1'>
                                    Help
                                </Nav.Link> 
                            </LinkContainer>
                        </Nav>
                        <div className='col col-2 col-md-3 col-lg-4 mt-2 start'>
                            <h5 className='mb-2'>Menur</h5>
                        </div>
                        <div className={`col col-4 col-md-3 start`}>
                            {!state ? <Loading /> :
                            <Nav navbar>
                                <Navbar.Text className='nav-item'>
                                    {!state || (state && state.user && state.user.isAuth) ? null : <LoginBtn size='btn-sm mt-2' />}
                                </Navbar.Text>
                                <Navbar.Text className='nav-item'>
                                    {!state || (state && state.user && state.user.isAuth) ? <LogoutBtn size='btn-sm mt-2' /> : null}
                                </Navbar.Text>
                                <Navbar.Text className='nav-item'>
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

