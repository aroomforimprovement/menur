import React, { useState } from 'react';
import { Loading } from '../../common/Loading';
import { getNewId } from '../../utils/objUtils';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router';
import { useMainContext } from '../../main/MenurRouter';

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const SaveToAccount = () => {
    
    const {state, dispatch} = useMainContext();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaveFailed, setIsSaveFailed] = useState(false);
    const params = useParams();
    const mealPlanId = params.id;
    const isEdit = params.edit;
    
    const saveDataToAccount = async () => {
        if(state && state.user && state.user.isAuth){
            const name = new Date().toString();
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
            return await fetch(`${proxy}${apiUrl}app/plan`, {
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

    const handleSaveData = () => {
        setIsSaving(true);
        saveDataToAccount();
    }
    return(
        <div >
            <div >
                {isSaveFailed 
                ? <div className='border border-danger'>Error saving the mealplan :(</div>
                : <div></div>}
            </div>
            <div >
            {isSaving ? <Loading /> : 
                <div>
                {state && state.user && state.user.isAuth
                ? <button className='btn btn-primary shadow col col-11 mx-auto'
                    onClick={handleSaveData}>
                    <span className='fa fa-save me-2'></span> Save this Meal Plan to your Account <span className='fa fa-save ms-2'></span>
                </button> : <div></div>}
                </div> 
            }
            </div>
        </div>
    )

}