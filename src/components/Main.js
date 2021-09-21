import React, { useReducer } from 'react';
import { FormGroup, Label, Input, Dropdown } from 'reactstrap';
import { Header, Footer } from './Header';
import { DISHES } from '../shared/dishes';

export const Main = () => {

    const dishHasIngredient = (dish, ingredient) => {
        let ing = [];
        dish.ingredients.forEach((i) => {
            if(i.indexOf('|') > -1){
                i.split('|').forEach((sp) => {ing.push(sp)});
            }else{
                ing.push(i);
            }
        })
        if(ing.indexOf(ingredient) > -1){
            console.log(ingredient);
            return true;
        }else{
            console.log('X:'+ingredient);
        }
        return false;
    }

    const reducer = (state, action) => {
        switch(action.type){
            case 'CHANGE_SELECTION':{
                return ({...state, selection: action.data});
            }
            case 'GET_SUGGESTIONS':{
                console.log(action.data);
                const newSuggestions = [];
                DISHES.forEach((dish) => {
                    if(dish.name !== action.data){
                        let include = false;
                        dish.ingredients.forEach((ingr) => {
                            let arr = ingr.split('|');
                            if(arr.length > 1){
                                arr.forEach((splitIng) => {
                                    if(dishHasIngredient(state.selection, splitIng)){
                                       include = true; 
                                    }
                                });
                            }else if(dishHasIngredient(state.selection, ingr)){
                                include = true;
                            }
                            if(include && newSuggestions.indexOf(dish) < 0){
                                newSuggestions.push(dish);
                            }
                        });
                    }
                });
                return ({...state, suggestions:newSuggestions});
            }
            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer, {selection: DISHES[0], suggestions: []});

    const handleChange = (e) => {
        DISHES.forEach((dish) => {
            if(dish.name === e.target.value){
                dispatch({type: 'CHANGE_SELECTION', data: dish});
                return;
            }
        });
        dispatch({type: 'GET_SUGGESTIONS', data: e.target.value});
    }

    const dishes = DISHES.map((dish, i) => {
        
        return(
            <option key={dish.name}>{dish.name}</option>
        );
    });
const suggestionList = state.suggestions.map((suggestion, i) => {
        const ingredients = suggestion.ingredients.map((ing) => {
            return(
                <li key={ing}>{ing.replace('|', ' or ')}</li>
            );
        });

        return(
            <li key={suggestion.name}>
                <div className='mt-3'>
                    <h5>{suggestion.name}</h5>
                </div>
                <ul className='list-unstyled'>
                    {ingredients}
                </ul>
            </li>
        );
    })

    const selectionIngredients = state.selection.ingredients.map((ing, i) => {
        return(
            <li key={ing}>{ing.replace('|', ' or ')}</li>
        );
    });
    return(
        <div>
            <Header className='header'/>
            <div className='container'>
                <div className='row'>
                    <div className='selector col col-5'>
                        <FormGroup >
                            <Label for='dishSelect'>What are you making?</Label><br/>
                            <Input type='select' name='select' id='dishSelect'
                                onChange={handleChange}>
                                {dishes}
                            </Input>
                        </FormGroup>
                        <ul className='list-unstyled mt-2 ms-2'>
                            {selectionIngredients}
                        </ul>
                    </div>
                    <div className='suggestions col col-6 ms-4'>
                        <h4>Suggestions</h4>
                        <ul className='list-unstyled'>
                            {suggestionList}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer className='footer'/>
        </div>
    );
}