import React, { useState } from 'react';
import { Form, FormLabel, Modal } from 'react-bootstrap';
import { useMainContext } from '../../../main/MenurRouter';

export const ListCreator = () => {
    const {state, dispatch} = useMainContext();

    const [name, setName] = useState(null);
    const [included, setIncluded] = useState(state.listCreator.list.map((ing, i) => {
        return true;
    }));

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCancel = () => {
        dispatch({type: 'SHOW_LIST_CREATOR',
            data: {
                list: [],
                heading: '',
                index: -2,
                showListCreator: false
            }})
        setName(null);
        setIncluded([]);
    }

    const handleCreate = (e) => {
        e.preventDefault();
        const index = state.userLists.length;
        const include = state.listCreator.list.filter((ing, i) => {
            if(included[i]){
                return ing;
            }
        });
        dispatch({
            type: 'CREATE_NEW_LIST',
            data: {
                heading: name,
                list: include,
                tag: `userList_${index}`
                
            }
        });
        setName(null);
        setIncluded([]);
    }

    const ingredients = state.listCreator.list.map((ing, i) => {
        const handleChange = (e) => {
            let inc = [...included];
            inc[i] = e.target.checked;
            setIncluded(inc);
        }
        return(
            <Form.Check key={i}
                type='checkbox'
                id={`ingCheck_${i}`}
                label={ing.name}
                onChange={handleChange}
            />
        )
    });

    
    return(
        <Modal show={state.showListCreator}>
            <Modal.Header>
                <Modal.Title>Create new list from {`${state.listCreator.heading}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body  >
                <Form onSubmit={handleCreate}>
                    <FormLabel>
                        New list name
                    </FormLabel>
                    <Form.Control type='text' placeholder='Name your new list...'
                        onChange={handleNameChange}/>
                </Form>
            </Modal.Body>
            <Modal.Body>
                <Form>
                    <Form.Label>Choose ingredients to export to the new list</Form.Label>
                    {ingredients}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className='butt butt-alternate'
                    onClick={handleCancel}>Cancel</button>
                <button className='butt butt-standard'
                    onClick={handleCreate}>Create</button>
            </Modal.Footer>
        </Modal>
    )
}