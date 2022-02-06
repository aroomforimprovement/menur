import React from 'react';
import { useMainContext } from '../../main/MenurRouter';

export const GenerateList = () => {
    const {dispatch} = useMainContext();
    
    const handleGenList = () => {
        dispatch({type: 'GEN_LIST', data:true});
    }

    return (
        <div>
            <div className='mt-2 mb-2'>
                    <button onClick={handleGenList} 
                        className='btn btn-warning border col col-11 mx-auto shadow'>
                        Generate shopping list
                    </button>
                </div>
        </div>
    )
}