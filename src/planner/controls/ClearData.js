import React from 'react';
import toast from 'buttoned-toaster';
import { useMainContext } from '../../main/MenurRouter';

export const ClearData = () => {
    const { state, dispatch} = useMainContext();

    const handleClearData = async () => {
        const setIsCancelled = (id) => {
            toast.dismiss(id);
        }
        const setDataCleared = async (id) => {
            if(id) toast.dismiss(id);
            dispatch({type: 'CLEAR_DATA', data: true});
            toast.success("You're ready to start fresh!");
        }
        await toast.dontShow(`CLEAR_PLANNER_DATA_${state.user ? state.user.userid : ''}`) ?
        setDataCleared() :
        toast.error(
            { 
                approveFunc: setDataCleared, 
                dismissFunc: setIsCancelled,
                message: 'Are you sure you want to clear all changes from this screen and start again?',
                approveBtn: 'Clear data',
                dismissBtn: 'Cancel',
                canHide: true,
                dontShowType: `CLEAR_PLANNER_DATA_${state.user ? state.user.userid : ''}`
            }
        );
    }

    return(
        <div >
            <button className='col col-11 butt butt-bad mx-auto my-2 shadow'
                onClick={handleClearData}>
                <span className='fa fa-close me-2'></span> Clear data and start again <span className='fa fa-close ms-2'></span>
            </button> 
        </div>
    );

}