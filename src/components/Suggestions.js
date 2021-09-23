import React, { useState } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';

const Suggestion = ({dragData, ingredients}) => {
    const [showIngredients, setShowIngredients] = useState(false);
    const handleToggle = () => {
        setShowIngredients(!showIngredients);        
    }
    const handleDragStart = (e) => {
        //e.dataTransfer.setData('drag-item', JSON.stringify(dragData));
        //e.dataTransfer.effectAllowed = 'move';
    }
    const handleDrag = (e) => {
        //
    }
    const handleDragEnd = (e) => {
        console.log('drag end');
    }
    const handleDrop = (e) => {

    }

    return(
        <DragDropContainer targetKey='meal' 
            onDragStart={handleDragStart} onDragEnd={handleDragEnd} 
            onDrag={handleDrag} onDrop={handleDrop} dragData={dragData}>
        <li key={dragData.meal.name}>
            <div className='container'>
                <div className='mt-3' onClick={handleToggle}>
                    <h5>
                        {dragData.meal.name}<span>{' '}</span> 
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
        </DragDropContainer>
    );

}
export const Suggestions = () => {
    
    const { state } = useMainContext();
    

    const suggestionList = state.suggestions.map((suggestion, i) => {
        
        const ingredients = suggestion.ingredients.map((ing) => {
            return(
                <li key={ing.name}>{ing.name.replaceAll(DELIM, OR)}</li>
            );
        });
        
        return(
            <Suggestion key={suggestion.name} 
                dragData={{meal: suggestion}}
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