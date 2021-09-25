import React, { useState } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';
import { getIngredientsFromMeal } from '../utils/objUtils';

const Suggestion = ({dragData}) => {
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

    const ingredients = dragData.meal.ingredients.map((ing) => {
        const meal = {...state.selection};
        let classes = 'sugg-ingredient ';
        const mealIngredients = getIngredientsFromMeal(meal);
        outer: for(let ind = 0; ind < mealIngredients.length; ind++){
            if(ing.name.indexOf(DELIM) > -1){
                const splits = ing.name.split(DELIM);
                for(let index = 0; index < splits.length; index++){
                    if(mealIngredients[ind].name.toLowerCase() === splits[index].toLowerCase()){
                        console.log("ing: "+ing.name);
                        console.log(mealIngredients[ind].name + '===' + splits[index]);
                        if(!classes.indexOf('bold') > -1){
                            console.log("setting class to bold");
                            classes += 'bold';
                            break outer;
                        }        
                    }
                }
            }else if(mealIngredients[ind].name.toLowerCase() === ing.name.toLowerCase()){
                //console.log(mealIngredient.name + '===' + ing.name);
                if(!classes.indexOf('bold') > -1){
                    classes += 'bold';
                    break;
                }
            }
        }
        
        return(
            <div className={classes} key={ing.name}>
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
        
        return(
            <Suggestion key={suggestion.name} 
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
                <div className='divider'></div>
            </div>
        </div>
    )
}