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
            onDrag={handleDrag} onDrop={handleDrop} dragData={dragData}
            >
        <li key={dragData.meal.name}>
            <div className='container'>
                <div className='' onClick={handleToggle}>
                    <h5 className='suggestion-text'>
                        {dragData.meal.name}<span>{' '}</span> 
                        {showIngredients 
                            ? <span className='fa fa-angle-up'>{' '}</span> 
                            : <span className='fa fa-angle-down'>{' '}</span>
                        }
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
            <Suggestion className='suggestion' key={suggestion.name} 
                dragData={{meal: suggestion}}
                ingredients={ingredients}
                
            />
        );
    });

    return(
        <div className='col col-6 ms-4 suggestions'>
            <div >
                <h5>Suggestions</h5>
                <ul className='list-unstyled'>
                    {suggestionList}
                </ul>
            </div>
        </div>
    )
}