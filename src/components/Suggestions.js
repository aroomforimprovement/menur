import React, { useState } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';
import { getIngredientsFromMeal } from '../utils/objUtils';
import { MealGen } from './MealGen';

export const Suggestion = ({dragData}) => {
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
    const { state, dispatch } = useMainContext();
    const [showIngredients, setShowIngredients] = useState(false);
    const handleToggle = () => {
        if(!showIngredients){
            dispatch({type: 'SET_SELECTED_SUGGESTION', data: dragData.meal});
        }else{
            dispatch({type: 'UNSET_SLECTED_SUGGESTION', data: dragData.meal});
        }
        setShowIngredients(!showIngredients);        
    }

    const handleDragStart = (e) => {
        //
    }
    const handleDrag = (e) => {
        //
    }
    const handleDragEnd = (e) => {
       //
    }
    const handleDrop = (e) => {
        if(e.dragData.meal.name.indexOf('Leftover') > -1){
            dispatch({type: 'REMOVE_LEFTOVER', data: e.dragData.meal});
        }
    }

    const ingredients = dragData.meal.ingredients.map((ing, i) => {
        const meal = {...state.selection};
        let classes = 'sugg-ingredient ';
        const mealIngredients = getIngredientsFromMeal(meal);
        outer: for(let ind = 0; ind < mealIngredients.length; ind++){
            if(ing.name.indexOf(DELIM) > -1){
                const splits = ing.name.split(DELIM);
                for(let index = 0; index < splits.length; index++){
                    if(mealIngredients[ind].name.toLowerCase() === splits[index].toLowerCase()){
                        if(!classes.indexOf('bold') > -1){
                            classes += 'bold';
                            break outer;
                        }        
                    }
                }
            }else if(mealIngredients[ind].name.toLowerCase() === ing.name.toLowerCase()){
                if(!classes.indexOf('bold') > -1){
                    classes += 'bold';
                    break;
                }
            }
        }
        
        return(
            <div className={classes} key={i}>
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
            </div>
        );
    });
    
    return(
        <div className='col col-3 sugg-container'>
            <DragDropContainer targetKey='meal' 
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} 
                onDrag={handleDrag} onDrop={handleDrop} dragData={dragData}
                >
                <li className={classes}>
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
        
        return(
            <Suggestion key={i} 
                dragData={{meal: suggestion}}
            />
        );
        
    });

    return(
        <div className='col col-7 suggestions'>
            <div >
                <div className='divider'></div>
                <h5>Suggestions</h5>
                <div className='list-unstyled'>
                    {suggestionList}
                </div>
                <div className='divider mb-1'></div>
                <MealGen />
                <div className='divider mt-1'></div>
            </div>
        </div>
    )
}