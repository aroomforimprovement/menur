import React from 'react';
import { DELIM, OR } from '../shared/meals';
import { days, mealtimes } from '../shared/states';
import { ListItem } from './ListItem';
import { useMainContext } from './Main';
import { UserList } from './UserList';

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
            ingNames[i.name] = ingNames[i.name] ? ingNames[i.name] + parseFloat(i.qty) : parseFloat(i.qty);
        });
        let ingredients = [];
        for(let key of Object.keys(ingNames) ){
            ingredients.push({"name": key, "qty": ingNames[key]});
        }
        //console.dir(ingredients);
        return ingredients;
    }
    const ingredientList = getIngredients();
    const ingredients = ingredientList.map((ingredient, i) => {
        return(
            <ListItem dragData={ingredient}/>
        );
    });

    
    return(
        <div className='row'>
        <div className='gen-list col-4 mt-2'>
            <div>
                <h6 >Generated Shopping List</h6>
                <ul className='list-unstyled'>{ingredients}</ul>
            </div>
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 >List 1</h6>
            <UserList />
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 >List 2</h6>
            <ul className='list-unstyled'>Placeholder</ul>
        </div>
        <div className='divider mb-3'></div>
        </div>
    );
}