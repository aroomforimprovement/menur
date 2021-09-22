import React from 'react';
import { useMainContext } from './Main';

export const Suggestions = () => {
    
    const { state, dispatch } = useMainContext();


    const suggestionList = state.suggestions.map((suggestion, i) => {
        const ingredients = suggestion.ingredients.map((ing) => {
            return(
                <li key={ing.name}>{ing.name}</li>
            );
        });

        return(
            <li key={suggestion.name}>
                <div className='mt-3'>
                    <h5>{suggestion.name}</h5>
                </div>
                <ul className='list-unstyled'>
                    {ingredients}
                </ul>
            </li>
        );
    });

    return(
        <div className='suggestions col col-6 ms-4'>
            <h4>Suggestions</h4>
            <ul className='list-unstyled'>
                {suggestionList}
            </ul>
        </div>
    )
}