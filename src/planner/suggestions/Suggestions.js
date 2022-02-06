import React from 'react';
import { isMobile } from 'react-device-detect';
import { useMainContext } from '../../main/MenurRouter';
import { MealGen } from './mealgen/MealGen';
import { Suggestion } from './suggestion/Suggestion';


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
        <div className={`col col-12 col-md-8 align-bottom `}>
            <MealGen className={`shadow shadow-sm mt-2 ${isMobile ? 'px-1' : ''}`} />
            <div className={`${isMobile ? 'mx-2' : ''}`}>
                {state.suggestions && state.suggestions.length > 0 
                ? <h6>Suggestions</h6> : <div></div> }
                <div className='list-unstyled'>
                    {suggestionList}
                </div>
            </div>
        </div>
    )
}