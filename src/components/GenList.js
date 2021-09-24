import React from 'react';
import { DELIM, OR } from '../shared/meals';
import { days, mealtimes } from '../shared/states';
import { useMainContext } from './Main';


export const GenList = () => {

    const { state } = useMainContext();
    const noop = () => {return};
    const getIngredients = () => {
        if(!state.mealplan){
            return [{"name": "Add some meals to the week to start generating a list", "qty": ":)"}];
        }
        let ingArr = [];
        days.forEach((day) => {
            mealtimes.forEach((mealtime) => {
                //console.dir(state.mealplan);
                const meal = state.mealplan[day] && state.mealplan[day][mealtime] 
                    ? state.mealplan[day][mealtime] : {};
                
                meal.ingredients ? meal.ingredients.forEach((ingredient) => {
                    if(ingredient.type !== 'spice' && ingredient.type !== 'cond'){
                        ingArr.push(ingredient);
                    }
                }) : noop();
            });
        });    
        let ingNames = {};
        ingArr.forEach((i) => {
            ingNames[i.name] = ingNames[i.name] ? ingNames[i.name] + parseInt(i.qty) : parseInt(i.qty);
        });
        let ingredients = [];
        for(let key of Object.keys(ingNames) ){
            ingredients.push({"name": key, "qty": ingNames[key]});
        }
        console.dir(ingredients);
        return ingredients;
    }
    const ingredientList = getIngredients();
    const ingredients = ingredientList.map((ingredient, i) => {
        return(
            <div key={ingredient.name} >
                <li >{ingredient.name.replace(DELIM, OR)} x {ingredient.qty}</li>
            </div>
        );
    });
    
    return(
        <div className='container'>
            <div className='row'>
                <div className='col col-5'>
                <h6>Generated Shopping List</h6>
                <ul className='list-unstyled'>{ingredients}</ul>
                </div>
            </div>
        </div>
    );
}