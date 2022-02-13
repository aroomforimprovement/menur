import React from 'react';
import { toast } from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle } from "../../common/Toasts";
import { useMainContext } from '../../main/MenurRouter';

export const GenerateList = () => {
    const {dispatch} = useMainContext();

    const handleGenList = () => {
        const setIsCancelled = (id) => {
            toast.dismiss(id);
            dispatch({type: 'GEN_LIST', data:true});
            toast.success("Shopping list generated");
        }
        toast((t) => (
            <ToastConfirm t={t} approve={setIsCancelled} dismiss={setIsCancelled}
                message={`FYI - If you change anything in the mealplan, it won't update the shopping list.
                    You'll have to use this button again and generate a new shopping list.`}
                approveBtn={'OK'} dismissBtn={'Cool'}  />
        ), toastConfirmStyle());
    }

    return (
        <div>
            <div className='mt-2 mb-2'>
                    <button onClick={handleGenList} 
                        className='butt butt-warn border col col-11 mx-auto shadow'>
                        <span className='fa fa-list me-2'></span>Generate shopping list<span className='fa fa-list ms-2'></span>
                    </button>
                </div>
        </div>
    )
}