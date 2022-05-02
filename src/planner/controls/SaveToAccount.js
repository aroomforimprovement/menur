import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../common/Loading';
import { getNewId } from '../../utils/objUtils';
import toast from 'buttoned-toaster';
import { useParams } from 'react-router';
import { useMainContext } from '../../main/MenurRouter';
import { Form, Modal } from 'react-bootstrap';

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const SaveToAccount = () => {
    const {state, dispatch} = useMainContext();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveFailed, setIsSaveFailed] = useState(false);
    const [mealplanName, setMealplanName] = useState(
        state.backupPlan && state.backupPlan.name 
        && window.location.href.toString().indexOf('/0') === window.location.href.toString().length-2
        ? `Copy of ${state.backupPlan.name}` : state.backupPlan && state.backupPlan.name ? state.backupPlan.name : undefined);

    const params = useParams();
    const mealPlanId = params.id;
    const isEdit = params.edit;
    
    const saveDataToAccount = async () => {
        if(state && state.user && state.user.isAuth){
            const name = mealplanName ? mealplanName : new Date().toString();
            const id = isEdit > 0 ? mealPlanId : getNewId();
            const body = {
                userid: state.user.userid,
                mealplan:{
                    id: id,
                    name: name,
                    mealplan: state.mealplan,
                    leftovers: state.leftovers,
                    genList: state.genList,
                    userList1: state.userList1,
                    userList2: state.userList2
                }
            }
            return await fetch(`${proxy}${apiUrl}plan`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${state.user.access}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.ok){
                    setIsSaving(false);
                    setIsSaveFailed(false);
                    dispatch(
                        {
                            type: 'ADD_SAVED_PLAN', 
                            data: 
                                {
                                    mealplan: body.mealplan,
                                    reset: mealPlanId
                                }
                        }
                    );
                    toast.success("Mealplan saved ok");
                    window.location.href = `/planner/${body.mealplan.id}/1`;
                }else{
                    console.error(`response not ok`);
                }
            }, error => {
                console.error(`error saving mealplan`);
            }).catch(error => {
                console.error(error);
                setIsSaving(false);
                setIsSaveFailed(false);
                toast.error("Error saving mealplan");
            });
        }
    }

    const handleSaveData = (e) => {
        setIsSaving(true);
        saveDataToAccount();
        e.preventDefault();
    }

    const handleNameChange = (e) => {
        //dispatch({type: 'NAME', data: e.target.value});
        setMealplanName(e.target.value);
        e.preventDefault();
    }

    const NameInput = () => {
        const inputRef = useRef();
        useEffect(() => {inputRef.current && inputRef.current.focus()});
        return(
            <Form.Control type='text' id='name' name='name' autoFocus={true}
                onChange={handleNameChange} 
                ref={inputRef}
                value={mealplanName ? mealplanName : undefined}
                />
        );
    }
    return(
        <div className='mt-1 mb-2'>
            <div >
                {isSaveFailed 
                ? <div className='border border-danger'>Error saving the mealplan :(</div>
                : <div></div>}
            </div>
            <div >
            {isSaving ? <Loading /> : 
                <div>
                {state && state.user && state.user.isAuth
                ? <button className='butt butt-standard shadow col col-11 mx-auto'
                    onClick={() => dispatch({type: 'SET_SAVE_OPEN', data: true})}>
                    <span className='fa fa-save me-2'></span> Save this Meal Plan to your Account <span className='fa fa-save ms-2'></span>
                </button> : <div></div>}
                </div> 
            }
            </div>
            <Modal show={state.isSaveOpen} >
                <Modal.Header>
                    Save this meal plan to your account
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label htmlFor="name">Name your meal plan</Form.Label>
                        <NameInput />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button className='butt butt-alternate' onClick={() => dispatch({type: 'SET_SAVE_OPEN', data: false})}>Cancel</button>
                    <button className='butt butt-standard' onClick={handleSaveData}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}