import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR} from '../shared/meals';
import { getIngredientsFromMeal } from '../utils/objUtils';
import { MealGen } from './MealGen';
import { Dropdown } from 'react-bootstrap';
import { ClickAddToMealPlan, InfoToggle } from './partials/SuggestionParts';

export const Suggestion = ({dragData, keyProp}) => {
    let classes = '';
    if(dragData.meal.score >= 10){
        classes = classes + ' sugg-good';
    }else if(dragData.meal.score >= 8){
        classes = classes + ' sugg-ok';
    }else if(dragData.meal.score >= 6){
        classes = classes + ' sugg-bad';
    }else{
        classes = classes + ' sugg-none';
    }
    const { state, dispatch } = useMainContext();
    const handleToggle = (isOpen) => {
        console.dir(isOpen);
        if(isOpen){
            dispatch({type: 'SET_SELECTED_SUGGESTION', data: dragData.meal});
        }else{
            dispatch({type: 'UNSET_SLECTED_SUGGESTION', data: dragData.meal});
        }
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

    const handleItemClick = (e) => {
        e.preventDefault();
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
            <div key={i}>            
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') 
                    ? null 
                    : <Dropdown.Item as='div' onClick={handleItemClick}>
                        <span className={''+classes}>
                            {ing.name.replaceAll(DELIM, OR)}
                        </span>
                    </Dropdown.Item>}
            </div>
        );
    });

    
    return(
        <div className={`sugg-container me-1 mb-1`}>
            <DragDropContainer targetKey='meal' onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd} onDrag={handleDrag} onDrop={handleDrop} 
                dragData={dragData} className={'dd-container'}>        
            <Dropdown onToggle={handleToggle} 
                className={`dropdown ${classes}`} drop={'right'} > 
                <div className={`border border-grey rounded px-3 ${classes}`}>
                    <h5 className='suggestion-text'>
                        {dragData.meal.name}                                     
                    </h5>
                </div>     
                <Dropdown.Toggle split as={InfoToggle} id={`suggDrop_${keyProp}`} className='sugg-expand ms-4'
                    size='sm'  >
                </Dropdown.Toggle>  
                <Dropdown.Menu  className='sugg-ingredients' aria-labelledby={`suggDrop_${keyProp}`}>
                    <small>{ingredients}</small>
                </Dropdown.Menu>
                <ClickAddToMealPlan keyProp={keyProp}  dragData={dragData} className='sugg-click-add'/>
            </Dropdown>
            
            </DragDropContainer>
        </div>
    );
}


export const Suggestions = () => {
    
    const { state } = useMainContext();

    const suggestionList = state.suggestions.map((suggestion, i) => {
        
        return(
            <Suggestion key={i} className='col col-sm-4 col-md-3 col-lg-2 '
                dragData={{meal: suggestion}} keyProp={i}
            />
        );
        
    });

    return(
        <div className='suggestions col col-8 shadow shadow-sm align-bottom'>
            <div >
                <h5>Suggestions</h5>
                <div className='list-unstyled'>
                    {suggestionList}
                </div>
                <MealGen className='shadow shadow-sm mt-3' />
            </div>
        </div>
    )
}