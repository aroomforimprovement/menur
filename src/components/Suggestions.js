import React, { useState } from 'react';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';

const Suggestion = ({suggestion, ingredients}) => {
    const [showIngredients, setShowIngredients] = useState(false);
    const handleToggle = () => {
        setShowIngredients(!showIngredients);        
    }
    if(showIngredients){

    }
    return(
        <li key={suggestion.name} draggable>
            <div className='container'>
                <div className='mt-3' onClick={handleToggle}>
                    <h5>
                        {suggestion.name}<span>{' '}</span> 
                        {showIngredients ? "^" : ">"}
                    </h5>
                </div>
                {
                    showIngredients 
                    ? 
                    <div>
                        <ul className='list-unstyled'>
                            {ingredients}
                        </ul>
                    </div> 
                    : <div></div>}
            </div>
        </li>
    );

}
export const Suggestions = () => {
    
    const { state, dispatch } = useMainContext();
    

    const suggestionList = state.suggestions.map((suggestion, i) => {
        
        const ingredients = suggestion.ingredients.map((ing) => {
            return(
                <li key={ing.name}>{ing.name.replaceAll(DELIM, OR)}</li>
            );
        });
        
        return(
            <Suggestion key={suggestion.name} 
                suggestion={suggestion} 
                ingredients={ingredients}
            />
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