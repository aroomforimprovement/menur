import React from 'react';
import { useMainContext } from '../../main/MenurRouter';

export const GenerateList = () => {
    const {dispatch} = useMainContext();
    
    const handleGenList = () => {
        dispatch({type: 'GEN_LIST', data:true});
    }

    return (
        <div>
            <div className='row mt-2 mb-2'>
                    <button onClick={handleGenList} 
                        className='shadow btn btn-warning border border-success col col-12'>
                        Generate shopping list (if you make changes to the meal plan, you'll have to do this again)
                    </button>
                </div>
        </div>
    )
}