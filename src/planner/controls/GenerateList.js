import React from 'react';
import toast from 'buttoned-toaster';
import { useMainContext } from '../../main/MenurRouter';
import { ListCreator } from '../shopping/components/ListCreator';

export const GenerateList = () => {
    const {state, dispatch} = useMainContext();
    
    const handleGenList = () => {
        const generateList = () => {
            dispatch({type: 'GEN_LIST', data: {main: true, mealplan: state.mealplan}});
            toast.success("Shopping list generated");
        }

        const setIsCancelled = (id, dontshow) => {
            toast.dismiss(id);
            generateList();
        }

        window.localStorage.getItem('dontshow_GEN_LIST') 
            ? generateList()
            : toast.warn(
                { 
                    toastId: "GenerateList",
                    duration: 1661,
                    approveFunc: setIsCancelled,
                    dismissFunc: setIsCancelled,
                    message: `FYI - If you change anything in the mealplan, it won't update the shopping list.
                        You'll have to use this button again and generate a new shopping list.`,
                    approveTxt:'Cool', 
                    dismissTxt: 'OK',
                    canHide: true,
                    dontShowType: 'GEN_LIST'
                }
            );
    }

    return (
        <div>
            <div className='mt-2 mb-2'>
                <button onClick={handleGenList} 
                    className='butt butt-warn border col col-11 mx-auto shadow'>
                    <span className='fa fa-list me-2'></span>Generate shopping list<span className='fa fa-list ms-2'></span>
                </button>
            </div>
            <ListCreator />
        </div>
    )
}