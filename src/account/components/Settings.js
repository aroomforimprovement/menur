import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '../../common/Loading';
import { useMainContext } from '../../main/MenurRouter';
import toast from 'react-hot-toast';

export const Settings = () => {

    const DefaultServings = () => {
        
        const {state, dispatch} = useMainContext();

        const [isUpdating, setIsUpdating] = useState(false);
        const [isEditHidden, setIsEditHidden] = useState(true);

        const apiUrl = process.env.REACT_APP_API_URL;
        let proxy = process.env.REACT_APP_PROXY_URL;

        const updateDefaultServings = async (id, update, access) => {
            return await fetch(`${proxy}${apiUrl}app/settings`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({userid: id, settings: {defaultServings: update}}),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                }
            }).then(response => {
                if(response.ok){
                    console.log("response ok");
                    console.dir(response);
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

        useEffect(() => {
            console.dir(state.user);
        }, [state.user]);
        
        return(
            <Container className='row mt-5 mb-5 default-servings-area'>
                <Row>
                    <Col xs={3} className='mt-1 default-servings-heading'>
                        <Row><h6>Default servings:</h6></Row>
                        <Row><small>Set this value to the number of people you normally cook for</small></Row>
                    </Col>
                    <Col xs={8} >
                        {isUpdating 
                        ? <Loading/>
                        : 
                            <Row>
                                <Col xs={2} hidden={!isEditHidden}
                                    className='default-servings'>
                                        <h4>{state.defaultServings}</h4>
                                </Col>
                                <Form onSubmit={handleUpdate} hidden={isEditHidden} className='col col-12'>
                                    <Form.Group >
                                        <Form.Control className='col col-7' size='sm' type='number' name='defaultServings' id='defaultServings' defaultValue={state.defaultValue} />
                                        <Button className='col col-2' size='sm' variant='secondary' onClick={handleEdit}>Cancel</Button>
                                        <Button className='col col-2'size='sm' variant='primary' type='submit' >Save</Button>
                                    </Form.Group>
                                </Form>
                            </Row>
                        }
                    </Col>
                    <div className='col fa fa-edit mt-1 edit-name'
                    onClick={handleEdit}>
                        {''}
                    </div>
                </Row>
            </Container>
        );
    }

    return(
        <div className={'container'}>
            <DefaultServings/>
        </div>
    );
}