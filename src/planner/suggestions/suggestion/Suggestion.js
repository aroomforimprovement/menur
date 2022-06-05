import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './suggestion.scss';
import { useMainContext } from '../../../main/MenurRouter';
import { DragDropContainer } from 'react-drag-drop-container';
import { DELIM, OR} from '../../../shared/meals';
import { getIngredientsFromMeal } from '../../../utils/objUtils';
import { SelectSuggestion } from './components/SelectSuggestion';
import { ExpandSuggestion } from './components/ExpandSuggestion';


export const Suggestion = ({dragData, keyProp}) => {
    let classes = dragData.meal.score >= 10 
        ? ' sugg-good' 
        : dragData.meal.score >= 8
        ? ' sugg-ok'
        : dragData.meal.score >= 6
        ? ' sugg-bad'
        : ' sugg-none';

    const { state, dispatch } = useMainContext();
    
    const handleDragStart = (e) => {
    
    }
    
    const handleDragEnd = (e) => {
        dispatch({type: 'UNSET_SELECTED_SUGGESTION', data: dragData.meal});
    }

    //const [leftoverTaken, setLeftoverTaken] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        if(e.dragData.meal.name.indexOf('Leftover') > -1){
            //setLeftoverTaken(true)
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
            <div className='sugg-ing' key={i}>            
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') 
                    ? null 
                    : <Dropdown.Item onClick={handleItemClick}>
                        <span className={''+classes}>
                            {ing.name.replaceAll(DELIM, OR)}
                        </span>
                    </Dropdown.Item>}
            </div>
        );
    });

    return(
        <DragDropContainer targetKey='meal' onDrop={handleDrop} 
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            dragData={dragData}> 
            <div className='me-1 mb-1'>
            <div className={`border rounded rounded-pill shadow shadow-sm px-4 ${classes}`}>
                <h5 className='suggestion-text'>
                    {dragData.meal.name}                                     
                </h5>
            </div>    
            <SelectSuggestion keyProp={keyProp}  dragData={dragData} className='sugg-click-add'/> 
            {dragData.meal.name.indexOf('Leftover') > -1 
                ? <div></div>
                : <ExpandSuggestion keyProp={keyProp} ingredients={ingredients} 
                    dragData={dragData} className='sugg-expand' /> 
            }
            </div>
        </DragDropContainer>
    );
}
