import React, { useState } from 'react';
import { Form, FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import { Loading } from '../../common/Loading';
import { useMainContext } from '../../main/MenurRouter';
import { updateDefaultServings } from '../../main/menurReducer';

export const Settings = () => {

    const DefaultServings = () => {
        
        const {state, dispatch} = useMainContext();

        const [isUpdating, setIsUpdating] = useState(false);
        const [isEditHidden, setIsEditHidden] = useState(true);

        const handleEdit = (e) => {
            setIsEditHidden(!isEditHidden);
        }
        const handleUpdate = (e) => {
            e.preventDefault();
            setIsUpdating(true);
            updateDefaultServings(state.user.userid, e.target.defaultServings.value, state.user.access)
        }
        return(
            <div className='row mt-5 mb-5 default-servings-area'>
                <div className='col col-3 mt-1'>
                    Default settings:
                </div>
                <div className='col col-8' >
                    {isUpdating 
                    ? <Loading/>
                    : <div>
                        <div hidden={!isEditHidden}
                            className='default-servings'>
                                {state.defaultServings}
                        </div>
                        <Form onSubmit={handleUpdate} hidden={isEditHidden}>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl size='sm' type='number' name='defaultServings' id='defaultServings' defaultValue={state.defaultValue} />
                                    <Button size='sm' color='secondary' onClick={handleEdit}>Cancel</Button>
                                    <Button size='sm' color='primary'>Save</Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </div>
                    }
                </div>
            </div>
        );
    }

    return(
        <div className={'container'}>
            <DefaultServings/>
        </div>
    );
}