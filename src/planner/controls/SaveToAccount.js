import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../common/Loading';
import { getNewId } from '../../utils/objUtils';
import toast from 'buttoned-toaster';
import { useParams } from 'react-router';
import { useMainContext } from '../../main/MenurRouter';
import { Form, Modal } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const SaveToAccount = () => {
    const {state, dispatch} = useMainContext();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveFailed, setIsSaveFailed] = useState(false);
    const [mealplanName, setMealplanName] = useState(
        state.backupPlan && state.backupPlan.name && state.backupPlan.name.length > 0
        && window.location.href.toString().indexOf('/0') === window.location.href.toString().length-2
        ? `Copy of ${state.backupPlan.name}` : state.backupPlan && state.backupPlan.name ? state.backupPlan.name : undefined);

    const params = useParams();
    const mealPlanId = params.id;
    const isEdit = params.edit;
    const { user } = useAuth0();
    
    const saveDataToAccount = async () => {
        console.log("saveDataToAccount");
        if(state && state.user && state.user.access && user && user.sub){
            console.log("user is auth")
            const name = mealplanName ? mealplanName : new Date().toString();
            const id = isEdit > 0 ? mealPlanId : getNewId();
            const body = {
                userid: user.sub.replace('auth0|', ''),
                mealplan:{
                    id: id,
                    name: name,
                    mealplan: state.mealplan,
                    leftovers: state.leftovers,
                    genList: state.genList,
                    userLists: state.userLists,
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
                    toast.success(`Mealplan, ${name}, saved ok`);
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
                toast.error(`Error saving mealplan, ${name}`);
            });
        }else{
            console.log("no auth user");
        }
    }

    const handleOpenSave = () => {

        const dismiss = (id) => {
            if(state.plans.length < 10){
                dispatch({type: 'SET_SAVE_OPEN', data: false})
            }
            toast.dismiss(id);
        }
        if(state.user && state.user.isAuth && !state.user.isVerified 
            && state.plans.length >= 5){
            const num = state.plans.length;
            toast.warn({
                toastId: "MealplanLimit",
                message: "You have saved " + num + " meal plans." +
                    "You can only have 10 saved plans until you verify your account." +
                    "Check your email and follow the verfication link remove this limit.",
                approveFunc: dismiss,
                dismissFunc: dismiss,
                dismissTxt: "OK",
                approveTxt: "Cool",
            })
        }else{
            dispatch({type: 'SET_SAVE_OPEN', data: true});
        }
    }

    const handleSaveData = (e) => {
        setIsSaving(true);
        saveDataToAccount();
        e.preventDefault();
    }

    const handleNameChange = (e) => {
        setMealplanName(e.target.value);
        e.preventDefault();
    }

    const NameInput = () => {
        const inputRef = useRef(null);
        const [name, setName] = useState(
                    mealplanName 
                    ? mealplanName
                    : state.backupPlan.name 
                    ? state.backupPlan.name
                    : undefined);
        useEffect(() => {inputRef.current && inputRef.current.focus()});
        useEffect(() => {
            setName(mealplanName 
                ? mealplanName
                : state.backupPlan.name
                ? state.backupPlan.name
                : undefined);   
        }, []);
        return(
            <Form.Control
                type='text'
                id='name'
                name='name'
                autoFocus={true}
                onChange={handleNameChange} 
                ref={inputRef}
                maxLength='140'
                value={name}
                onKeyPress={(e) => {
                    if(e.code === 'Enter'){
                        handleSaveData();
                    }
                }}
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
                {state && state.user && state.user.access
                ? <button className='butt butt-standard shadow col col-11 mx-auto'
                    onClick={() => handleOpenSave()}>
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