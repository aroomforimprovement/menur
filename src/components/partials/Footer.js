import React, { useState } from 'react';
import { useMainContext } from '../MenurRouter';
import { Loading } from './Loading';
import { getNewId } from '../../utils/objUtils';
import { toast } from 'react-hot-toast';

const apiUrl = process.env.REACT_APP_API_URL;

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
                    //dispatch({type: 'ADD_SAVED_PLAN', data: body})
                    toast.success("Mealplan saved ok");
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