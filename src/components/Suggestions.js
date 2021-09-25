import React, { useState } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';
import { getIngredientsFromMeal, getMealsWithIngredient,  } from '../utils/objUtils';

const Suggestion = ({dragData, ingredients}) => {
    console.log("SCORE:");
    console.dir(dragData.meal.score);
    let classes = 'suggestion';
    if(dragData.meal.score >= 16){
        classes = classes + ' sugg-good';
    }else if(dragData.meal.score >= 12){
        classes = classes + ' sugg-ok';
    }else if(dragData.meal.score >= 8){
        classes = classes + ' sugg-bad';
    }else{
        classes = classes + ' sugg-none';
    }
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
       // e.target.style.color = 'grey';
    }
    
    return(
        <div className='col col-2 m-1 sugg-container'>
            <DragDropContainer targetKey='meal' 
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} 
                onDrag={handleDrag} onDrop={handleDrop} dragData={dragData}
                >
                <li key={dragData.meal.name} className={classes}>
                    <div className='' onClick={handleToggle}>
                        <h5 className='suggestion-text'>
                            {dragData.meal.name} 
                            <div className='sugg-expand'>{showIngredients 
                                ? <span className='fa fa-angle-up'>{' '}</span> 
                                : <span className='fa fa-angle-down'>{' '}</span>
                            }</div>
                        </h5>
                    </div>
                        {
                        showIngredients 
                        ? 
                        <div>
                            <ul className='list-unstyled sugg-ingredients'>
                                <small>{ingredients}</small>
                            </ul>
                        </div> 
                        : <div></div>}
                </li>
            </DragDropContainer>
        </div>
    );

}


export const Suggestions = () => {
    
    const { state } = useMainContext();

    const suggestionList = state.suggestions.map((suggestion, i) => {
        
        const ingredients = suggestion.ingredients.map((ing) => {
            const meal = {...state.selection};
            let classes = 'sugg-ingredient ';
            const mealIngredients = getIngredientsFromMeal(meal);
            mealIngredients.forEach((mealIngredient) => {
                if(ing.name.indexOf(DELIM) > -1){
                    ing.name.split(DELIM).forEach((split) => {
                        if(mealIngredient.name.toLowerCase() === split.toLowerCase()){
                            //console.log(mealIngredient.name + '===' + split);
                            if(!classes.indexOf('bold') > -1){
                                classes += 'bold';
                            }        
                        }else{
                            //console.log(mealIngredient.name + '=/=' + split);
                        }
                    });
                }else if(mealIngredient.name.toLowerCase() === ing.name.toLowerCase()){
                    //console.log(mealIngredient.name + '===' + ing.name);
                    if(!classes.indexOf('bold') > -1){
                        classes += 'bold';
                    }
                }else{
                   // console.log(mealIngredient.name + '=/=' + ing.name);
                }
            });
            
            return(
                <div className={classes} key={ing.name}>
                    {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
                </div>
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
        <div className='col col-6 ms-2 suggestions'>
            <div >
                <h5>Suggestions</h5>
                <div className='list-unstyled'>
                    {suggestionList}
                </div>
            </div>
        </div>
    )
}