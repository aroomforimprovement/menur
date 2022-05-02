import React from 'react';
import { Form } from 'react-bootstrap';
import './selector.scss';
import { DELIM, MEALS, OR } from '../../shared/meals';
import { getIngredientsFromMeal } from '../../utils/objUtils';
import { useMainContext } from '../../main/MenurRouter';
import { Searcher } from './Searcher';
import toast from 'buttoned-toaster';
import { isMobile } from 'react-device-detect';

export const Selector = ({message}) => {
    const { state, dispatch } = useMainContext();
    const mealsIncluded = state.showBasic ? state.showMine ? MEALS.concat(state.meals) :
        MEALS : state.showMine ? state.meals : [];

    const meals = mealsIncluded.map((meal, i) => {
        return(
            <option key={i}>{meal.name}</option>
        );
    });

    const selectionIngredients = state && state.selection && state.selection.ingredients 
        ? state.selection.ingredients.map((ing, i) => {
        
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
            <div key={i} className={`classes ${isMobile ? 'selection-ingredient-m' : ''}`}>
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond')
                    ? <div></div> 
                    : <li >{ing.name.replaceAll(DELIM, OR)}{isMobile ? ',': ''}</li>}
            </div>
        );
    }) : <div></div>;

    

    
    const SelectorHeader = ({message}) => {
        return(
            <Form.Label className='selector-heading'>
                <h5>{`What are you making${message ? ' ' + message : ''}?`}</h5>
            </Form.Label>
        );
    }

    

    const DataSwitcher = ({showBasic, showMine}) => {

        const handleCheckBasic = (e) => {
            dispatch({type: 'SET_SHOW_BASIC', data: e.target.checked});
            dispatch({type: 'GET_SUGGESTIONS'});
        }
    
        const handleCheckMine = (e) => {
            if(state.meals && state.meals.length > 0){
                dispatch({type: 'SET_SHOW_MINE', data: e.target.checked});
                dispatch({type: 'GET_SUGGESTIONS'});
            }else{
                toast("Create an account to add and use own meals");
            }
        }

        return(
            <div className={`${isMobile ? 'px-1' : ''}`}>
                    <Form.Check inline type={"checkbox"} onChange={handleCheckBasic} label={'Basic meals'} 
                        id="checkBasic" checked={showBasic}/>
                    <Form.Check inline type={"checkbox"} onChange={handleCheckMine} label={'My meals'} 
                        id="checkMine" checked={showMine}/>
                </div>
        );
    }

    const Ingredients = ({hideSelectorIngredients, showSpices}) => {

        const handleHideIngredients = (e) => {
            dispatch({type: 'HIDE_SELECTOR_INGREDIENTS', data: true});
        }
    
        const handleShowIngredients = (e) => {
            dispatch({type: 'HIDE_SELECTOR_INGREDIENTS', data: false});
        }

        const handleCheckSpices = (e) => {
            dispatch({type: 'SET_SHOW_SPICES', data: e.target.checked});
        }

        return(
            <div className={`${isMobile ? 'px-1' : ''}`}>
                <div style={hideSelectorIngredients ? {opacity:'0.6'} : {opacity: '1'}}>
                    <strong>Ingredients</strong>
                    <button className={`butt rounded rounded-circle float-end 
                        fa ${hideSelectorIngredients ? 'fa-eye':'fa-eye-slash'}`}
                        onClick={hideSelectorIngredients ? handleShowIngredients : handleHideIngredients}>{' '}</button>
                </div>                
                <div hidden={state.hideSelectorIngredients}>
                    <Form.Check type="checkbox" onChange={handleCheckSpices} checked={showSpices}
                        id={'showSpicesCheckbox'} label={'Shows spices / condiments'}
                        />
                    <ul className='list-unstyled mt-2 mb-1 ms-2'>
                        {selectionIngredients}
                    </ul>
                </div>
            </div>
        );
    }

    const handleChangeSelection = (e) => {
        mealsIncluded.forEach((meal) => {
            if(meal.name === e.target.value){
                dispatch({type: 'CHANGE_SELECTION', data: meal});
                return;
            }
        });
        dispatch({type: 'GET_SUGGESTIONS', data: e.target.value});
    }

    const ListSelector = ({name, meals}) => {
        return(
            <Form.Select  id='mealSelect' className='my-2'
                onChange={handleChangeSelection} value={name}>
                {meals}
            </Form.Select>
        );
    }

    return(
        <div className={`selector col col-12 ${state.isMealtimePickerClosed ? 'col-md-4' : 'col-md-8' }`} >
            <Form.Group className={`${isMobile ? 'px-1' : ''}`}>
                <SelectorHeader message={message} />
                <DataSwitcher showBasic={state.showBasic} showMine={state.showMine}/>
                <Searcher mealsIncluded={mealsIncluded}/>
                <ListSelector name={state.selection.name} meals={meals}/>
                <Ingredients hideSelectorIngredients={state.hideSelectorIngredients}
                    showSpices={state.showSpices}/>
            </Form.Group>
        </div>
    );
}