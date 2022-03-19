import React from 'react';
import { toast } from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle } from "../../common/Toasts/Toasts";
import { useMainContext } from '../../main/MenurRouter';
import { dontShowAgain } from '../../utils/userUtils';

export const GenerateList = () => {
    const {state, dispatch} = useMainContext();

    const handleGenList = () => {
        const generateList = () => {
            dispatch({type: 'GEN_LIST', data: {main: true, mealplan: state.mealplan}});
            toast.success("Shopping list generated");
        }

        const setIsCancelled = (id, dontshow) => {
            toast.dismiss(id);
            dontshow ? dontShowAgain('GEN_LIST') : console.clear();
            generateList();
        }

        window.localStorage.getItem('dontshow_GEN_LIST') 
            ? generateList()
            : toast((t) => (
                <ToastConfirm t={t} approve={setIsCancelled} dismiss={setIsCancelled}
                    message={`FYI - If you change anything in the mealplan, it won't update the shopping list.
                        You'll have to use this button again and generate a new shopping list.`}
                    approveBtn={'Cool'} dismissBtn={'OK'} canHide={true} />
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