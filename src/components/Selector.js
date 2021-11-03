import React from 'react';
import { Form } from 'react-bootstrap';
import { DELIM, MEALS, OR } from '../shared/meals';
import { getIngredientsFromMeal } from '../utils/objUtils';
import { useMainContext } from './MenurRouter';

export const Selector = () => {
    const { state, dispatch } = useMainContext();
    //const { selection, setSelection } = useState(MEALS[0]);
    
    const mealsIncluded = state.showBasic ? state.showMine ? MEALS.concat(state.meals) :
        MEALS : state.showMine ? state.meals : [];

    const meals = mealsIncluded.map((meal, i) => {
        return(
            <option key={meal.name}>{meal.name}</option>
        );
    });

    const selectionIngredients = state.selection.ingredients.map((ing, i) => {
        const meal = {...state.selectedSuggestion};
        let classes = 'selection-ingredients ';
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
            <div key={i} className={classes}>
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond')
                    ? <div></div> 
                    : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
            </div>
        );
    });

    const handleChange = (e) => {
        MEALS.forEach((meal) => {
            if(meal.name === e.target.value){
                dispatch({type: 'CHANGE_SELECTION', data: meal});
                return;
            }
        });
        dispatch({type: 'GET_SUGGESTIONS', data: e.target.value});
    }

    const handleCheckBasic = (e) => {
        dispatch({type: 'SET_SHOW_BASIC', data: e.target.checked});
    }

    const handleCheckMine = (e) => {
        dispatch({type: 'SET_SHOW_MINE', data: e.target.checked});
    }

    const handleCheckSpices = (e) => {
        dispatch({type: 'SET_SHOW_SPICES', data: e.target.checked});
    }

    return(
        <div className='selector col col-4 shadow shadow-sm' >
            <Form.Group >
                <Form.Label className='selector-heading'>What are you making?</Form.Label><br/>
                <Form.Check inline type={"checkbox"} onChange={handleCheckBasic} label={'Basic meals'} 
                    id="checkBasic" checked={state.showBasic}/>
                <Form.Check inline type={"checkbox"} onChange={handleCheckMine} label={'My meals'} 
                    id="checkMine" checked={state.showMine}/>
                <Form.Select  id='mealSelect' className='my-2'
                    onChange={handleChange} value={state.selection.name}>
                    {meals}
                </Form.Select>
            </Form.Group>
            <Form.Check type="checkbox" onChange={handleCheckSpices} checked={state.showSpices}
                id={'showSpicesCheckbox'} label={'Shows spices / condiments'}/>
            <strong>Ingredients</strong>
            <ul className='list-unstyled mt-2 mb-1 ms-2'>
                {selectionIngredients}
            </ul>
        </div>
    );
}