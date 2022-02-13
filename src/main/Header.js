import React from 'react';
import './header.scss';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useMainContext } from './MenurRouter';
import { Loading } from '../common/Loading';
import { LoginBtn, LogoutBtn, SignupBtn } from '../common/authBtns/AuthBtns';



export const Header = () => {
    
    const { state } = useMainContext();
    const logo = process.env.REACT_APP_URL + '/assets/site-logo.svg'


    return(
        <div className='site-header'>
            <Navbar collapseOnSelect expand='md' variant='light'
                className='start'>
                <Container>
                <Navbar.Brand className='mr-auto' href='/'>
                        <img src={logo}  height='40px' width='40px'
                            alt='Menur Home'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                    <Navbar.Collapse id={'responsive-navbar-nav'}>
                        <Nav className='me-auto col col-12 col-md-6' navbar>
                            <Row className='float-start'>
                                <Col>
                                    <LinkContainer to='/planner'>
                                        <Nav.Link className='nav-link m-1'>
                                            MealPlanner
                                        </Nav.Link>
                                    </LinkContainer>
                                </Col>
                                <Col>
                                    {!state ? <Loading /> : state.user && state.user.isAuth 
                                    ? <LinkContainer to='/account'>
                                        <Nav.Link className='nav-link m-1'>
                                            Account
                                        </Nav.Link> 
                                    </LinkContainer>
                                    : <div></div>}
                                </Col>
                                <Col>
                                    <LinkContainer to='/help' >
                                        <Nav.Link className='nav-link m-1'>
                                            Help
                                        </Nav.Link> 
                                    </LinkContainer>
                                </Col>
                            </Row>
                        </Nav>
                        <Row>
                            <Col>
                                <div className='col col-2 col-md-3 col-lg-4 mt-2 float-start'>
                                    <h5 className='mb-2'>Menur</h5>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className={`col col-4 col-md-3 float-end`}>
                                {!state 
                                ? <Col><Loading /></Col> 
                                : <Col>
                                    <Nav navbar>
                                        <Row>
                                            <Col xs={5} className={`float-start`}>
                                                <Navbar.Text className='nav-item' >
                                                    {!state || (state && state.user && state.user.isAuth) ? null : <LoginBtn size='btn-sm mt-2' />}
                                                </Navbar.Text>
                                            </Col>
                                            <Col xs={12}>
                                                <Navbar.Text className='nav-item'>
                                                    {!state || (state && state.user && state.user.isAuth) ? <LogoutBtn size='btn-sm mt-2' /> : null}
                                                </Navbar.Text>
                                            </Col>
                                            <Col xs={5}>
                                                <Navbar.Text className='nav-item'>
                                                    {!state || (state && state.user && state.user.isAuth) ? null : <SignupBtn size='btn-sm mt-2' />}
                                                </Navbar.Text>
                                            </Col>
                                        </Row>
                                    </Nav>
                                </Col>
                                }
                            </div>
                            </Col>
                        </Row>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

