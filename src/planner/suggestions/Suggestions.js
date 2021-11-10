import React from 'react';
import { useMainContext } from '../../main/MenurRouter';
import { MealGen } from './mealgen/MealGen';
import { Suggestion } from './Suggestion';


export const Suggestions = () => {
    
    const { state } = useMainContext();

    const suggestionList = state.suggestions.map((suggestion, i) => {
        
        return(
            <Suggestion key={i} className='col col-sm-4 col-md-3 col-lg-2'
                dragData={{meal: suggestion}} keyProp={i}
            />
        );
        
    });

    return(
        <div className='suggestions col col-12 col-md-8 align-bottom'>
            <MealGen className='shadow shadow-sm mt-3' />
            <div >
                <h5>Suggestions</h5>
                <div className='list-unstyled'>
                    {suggestionList}
                </div>
            </div>
        </div>
    )
}