import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '../../common/Loading';
import { useMainContext } from '../../main/MenurRouter';
import { useToastRack } from 'buttoned-toaster';

export const Settings = () => {
    const toast = useToastRack();
    const apiUrl = process.env.REACT_APP_API_URL;
    let proxy = process.env.REACT_APP_PROXY_URL;

    const {state, dispatch} = useMainContext();

    const DisplayName = () => {

        const [isUpdating, setIsUpdating] = useState(false);
        const [isEditHidden, setIsEditHidden] = useState(true);

        const updateDisplayName = async (id, update, access) => {
            return await fetch(`${proxy}${apiUrl}settings`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({userid: id, settings: {displayName: update}}),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                }
            }).then(response => {
                if(response.ok){
                    return true;
                }
            }, error => {
                console.error(error);
            }).catch((error) => {
                console.error(error);
            });
        }

        const handleEdit = (e) => {
            setIsEditHidden(!isEditHidden);
        }
        const handleUpdate = (e) => {
            e.preventDefault();
            setIsUpdating(true);
            updateDisplayName(state.user.userid, e.target.displayName.value, state.user.access)
                .then((result) => {
                    if(result){
                        dispatch({type: 'SET_DISPLAY_NAME', data: e.target.displayName.value});
                        setIsUpdating(false);
                        toast.success("Account name updated ok");
                    }else{
                        console.error("response not ok");
                    }
                    
                    
                }
            );
            setIsEditHidden(true);

        }
        
        return(
            <Container className='mt-5 mb-5 default-servings-area'>
                <Row>
                    <Col xs={10}  className='mt-1 default-servings-heading'>
                        <Row><h6>Account Name:</h6></Row>
                    </Col>
                    <Col xs={1} className='col fa fa-lg fa-edit mt-1 edit-setting'
                    onClick={handleEdit}>
                        {''}
                    </Col>
                    <Col xs={12} >
                        {isUpdating 
                        ? <Loading/>
                        : 
                            <Row>
                                <Col xs={2} hidden={!isEditHidden}
                                    className='default-servings'>
                                        <h4>{state.user.username}</h4>
                                </Col>
                                <Row>
                                <Form onSubmit={handleUpdate} hidden={isEditHidden} >
                                    <Row >
                                        <Col xs={6} md={8} lg={8} className='mx-0'><Form.Control size='sm' type='text' name='displayName' id='displayName' defaultValue={state.user.username} /></Col>
                                        <Col xs={3} md={2} lg={1} className='mx-0'><Button size='sm' variant='secondary' onClick={handleEdit}>Cancel</Button></Col>
                                        <Col xs={3} md={2} lg={1} className='mx-0'><Button size='sm' variant='primary' type='submit' >Save</Button></Col>
                                    </Row>
                                </Form>
                                </Row>
                            </Row>
                        }
                    </Col>
                    
                </Row>
            </Container>
        );

    }
    const DefaultServings = () => {
        
        const [isUpdating, setIsUpdating] = useState(false);
        const [isEditHidden, setIsEditHidden] = useState(true);

        const updateDefaultServings = async (id, update, access) => {
            return await fetch(`${proxy}${apiUrl}settings`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({userid: id, settings: {defaultServings: update}}),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                }
            }).then(response => {
                if(response.ok){
                    return true;
                }
            }, error => {
                console.error(error);
            }).catch((error) => {
                console.error(error);
            });
        }
        
        const handleEdit = (e) => {
            setIsEditHidden(!isEditHidden);
        }
        const handleUpdate = (e) => {
            e.preventDefault();
            setIsUpdating(true);
            updateDefaultServings(state.user.userid, e.target.defaultServings.value, state.user.access)
                .then((result) => {
                    if(result){
                        dispatch({type: 'SET_DEFAULT_SERVINGS', data: e.target.defaultServings.value});
                        setIsUpdating(false);
                        toast.success("defaultServings updated ok");
                    }else{
                        console.error("response not ok");
                    }
                    
                    
                }
            );
            setIsEditHidden(true);

        }
        
        return(
            <Container className='mt-5 mb-5 default-servings-area'>
                <Row>
                    <Col xs={10} className='mt-1 default-servings-heading'>
                        <Row><h6>Default servings:</h6></Row>
                    </Col>
                    <Col xs={1} className='col fa fa-lg fa-edit mt-1 edit-setting'
                    onClick={handleEdit}>
                        {''}
                    </Col>
                    <Col xs={10}  >
                        {isUpdating 
                        ? <Loading/>
                        : 
                            <Row>
                                <Col xs={2} hidden={!isEditHidden}
                                    className='default-servings'>
                                        <h4>{state.defaultServings}</h4>
                                </Col>
                                <Row>
                                <Form onSubmit={handleUpdate} hidden={isEditHidden} >
                                    <Row >
                                        <Col xs={6} md={4} lg={2} className='mx-0'><Form.Control size='sm' type='number' name='defaultServings' id='defaultServings' defaultValue={state.defaultServings} /></Col>
                                        <Col xs={3} md={2} lg={1} className='mx-0'><Button size='sm' variant='secondary' onClick={handleEdit}>Cancel</Button></Col>
                                        <Col xs={3} md={2} lg={1} className='mx-0'><Button size='sm' variant='primary' type='submit' >Save</Button></Col>
                                    </Row>
                                </Form>
                                </Row>
                            </Row>
                        }
                    </Col>
                    
                </Row>
                <Row><small>Set this value to the number of people you normally cook for</small></Row>
            </Container>
        );
    }

    const ResetChoices = () => {
        const resetChoices = () => {
            window.localStorage.clear();
            toast.success("Choices cleared from browser memory");
        }
        return(
            <Container className='mt-5 mb-5 default-servings-area'>
                <Row><h5>Reset choices:</h5></Row>
                <Row>
                    <Col xs={8} className='mt-2'>Push this button to clear all "don't show this again" choices you've made in the app.</Col>
                    <Col xs={3} className='float-end'>
                        <button className='butt butt-warn fa fa-lg fa-check-circle border shadow p-4'
                            onClick={resetChoices}></button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return(
        <div>
            <DisplayName/>
            <DefaultServings/>
            <ResetChoices />
        </div>
    );
}