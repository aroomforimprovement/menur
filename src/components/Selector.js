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
        <div className='selector col col-5'>
        <FormGroup >
            <Label for='dishSelect' className='selector-heading'>What are you making?</Label><br/>
            <Input type='select' name='select' id='dishSelect'
                onChange={handleChange}>
                    {meals}
            </Input>
        </FormGroup>
        <FormGroup check>
            <Label check>
                <Input type="checkbox" onChange={handleCheck}/>{' '}
                Shows spices / condiments
            </Label>
      </FormGroup>
        <ul className='list-unstyled mt-2 ms-2'>
            {selectionIngredients}
        </ul>
        </div>
    );
}