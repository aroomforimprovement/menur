import React from 'react';
import { FormGroup, Label, Input,} from 'reactstrap';
import { MEALS } from '../shared/meals';
import { useMainContext } from './Main';

export const Selector = () => {
    const { state, dispatch } = useMainContext();
    //const mealArr = JSON.parse(MEALS.meals);
    const meals = MEALS.map((meal, i) => {
        //console.log("MEAL at start:");
        //console.dir(meal);
        return(
            <option key={meal.name}>{meal.name}</option>
        );
    });

    const selectionIngredients = state.selection.ingredients.map((ing, i) => {
        return(
            <li key={ing.name}>{ing.name}</li>
        );
    });

    const handleChange = (e) => {
        MEALS.forEach((meal) => {
            //console.dir(meal);
            if(meal.name === e.target.value){
                console.dir(meal);
                dispatch({type: 'CHANGE_SELECTION', data: meal});
                return;
            }
        });
        console.log("Getting suggestions");
        dispatch({type: 'GET_SUGGESTIONS', data: e.target.value});
    }

    return(
        <div className='selector col col-5'>
        <FormGroup >
            <Label for='dishSelect'>What are you making?</Label><br/>
            <Input type='select' name='select' id='dishSelect'
                onChange={handleChange}>
                    {meals}
            </Input>
        </FormGroup>
        <ul className='list-unstyled mt-2 ms-2'>
            {selectionIngredients}
        </ul>
        </div>
    );
}