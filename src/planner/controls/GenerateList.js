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
                        className='butt butt-warn border col col-11 mx-auto shadow'>
                        <span className='fa fa-list me-2'></span>Generate shopping list<span className='fa fa-list ms-2'></span>
                    </button>
                </div>
        </div>
    )
}