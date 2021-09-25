import React from 'react';
import { FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { DELIM, MEALS, OR } from '../shared/meals';
import { useMainContext } from './Main';

export const Selector = () => {
    const { state, dispatch } = useMainContext();
    const meals = MEALS.map((meal, i) => {
        return(
            <option key={meal.name}>{meal.name}</option>
        );
    });

    const selectionIngredients = state.selection.ingredients.map((ing, i) => {
        return(
            <div key={ing.name}>
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond')
                    ? <div></div> 
                    : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
            </div>
        );
    });

    const handleChange = (e) => {
        MEALS.forEach((meal) => {
            //console.dir(meal);
            if(meal.name === e.target.value){
                dispatch({type: 'CHANGE_SELECTION', data: meal});
                return;
            }
        });
        dispatch({type: 'GET_SUGGESTIONS', data: e.target.value});
    }

    const handleCheck = (e) => {
        dispatch({type: 'SET_SHOW_SPICES', data: e.target.checked})
    }

    return(
        <div className='selector col col-4'>
        <div className='divider mb-3'></div>
        <FormGroup >
            <Label for='dishSelect' className='selector-heading'>What are you making?</Label><br/>
            <Input type='select' name='select' id='dishSelect'
                onChange={handleChange}>
                    {meals}
            </Input>
        </FormGroup>
        <div className='divider mt-3'></div>
        <FormGroup className='mt-3' check>
            <Label check>
                <Input type="checkbox" onChange={handleCheck}/>{' '}
                Shows spices / condiments
            </Label>
      </FormGroup>
        <div className='divider mt-3 mb-2'></div>
        <strong>Ingredients</strong>
        <ul className='list-unstyled mt-2 mb-1 ms-2'>
            {selectionIngredients}
        </ul>
        <div className='divider'></div>
        </div>
    );
}