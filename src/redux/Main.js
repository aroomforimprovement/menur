import { INIT_STATE, days, mealtimes } from '../shared/states';
import { getIngredientsFromMeal, getMealsWithIngredient } from '../utils/objUtils';

export const reducer = (state, action) => {
    const noop = () => {return};
    const getIngredientsFromMealPlan = () => {
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
            ingredients.push({"name": key, "qty": ingNames[key], "list": "genList"});
        }
        //console.dir(ingredients);
        return ingredients;
    }

    const getSuggestionScore = (meal, suggestion) => {
        let score = 0;
        const mealIngredients = getIngredientsFromMeal(meal);
        const suggIngredients = getIngredientsFromMeal(suggestion);
        suggIngredients.forEach((ingredient) => {
            mealIngredients.forEach((mealIngredient) => {
                if(ingredient.name === mealIngredient.name){
                    score += parseInt(ingredient.score);
                }
            });
        });
        //console.log(suggestion.name + " " + score);
        return score;
    }   

    const getRankedSuggestions = (meal, suggestions) => {
        suggestions.forEach((suggestion) => {
            const score = getSuggestionScore(meal, suggestion);
            suggestion.score = score;
        });
        suggestions.sort((a, b) => {
            return b.score - a.score;
        });
        return suggestions;
    }

    const getItemRemoved = (arr, item) => {
        const i = arr.indexOf(item);
        if(i > -1){
            arr.splice(i, 1);
        }
        return arr;
    }
    const getItemQtyChanged = (arr, old, update) => {
        const i = arr.indexOf(old);
        if(i > -1){
            arr[i] = update;
        }
        return arr;
    }

    //console.log("|"+action.type+":"+action.data+"|");
    //console.dir(action.data);
    switch(action.type){
        case 'SET_SHOW_SPICES':{
            return({...state, showSpices: action.data})
        }
        case 'CHANGE_SELECTION':{
            return ({...state, selection: action.data});
        }
        case 'GET_SUGGESTIONS':{
            //console.log(action.data);
            const newSuggestions = [];
            getIngredientsFromMeal(state.selection).forEach((ingredient) => {
                const suggestions = getMealsWithIngredient(ingredient.name);
                suggestions.forEach((suggestion) => {
                    let exists = false;
                    newSuggestions.forEach((existing) => {
                        if(existing.name === suggestion.name){
                            exists = true;
                        }
                    });
                    if(!exists){
                        newSuggestions.push(suggestion);
                    }
                });
            });
            const rankedSuggestions = getRankedSuggestions(state.selection, newSuggestions);
            return ({...state, suggestions:rankedSuggestions});
        }
        case 'ADD_MEAL':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime] = action.data.meal;
            return ({...state, mealplan: mealplan});
        }
        case 'REMOVE_MEAL':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime] = {};
            return ({...state, mealplan: mealplan});
        }
        case 'GEN_LIST':{
            const genList = getIngredientsFromMealPlan();
            return ({...state, genList: genList, userList1: [], userList2: []});
        }
        case 'ADD_TO_LIST':{
            let list = [...state[action.data.list]];
            list.push(action.data);
            return ({...state, [action.data.list]: list});
        }
        case 'REMOVE_FROM_LIST':{
            let list = [...state[action.data.list]];
            list = getItemRemoved(list, action.data);
            return ({...state, [action.data.list] : list})
        }
        case 'UPDATE_ON_LIST':{
            let list = [...state[action.data.old.list]];
            list = getItemQtyChanged(list, action.data.old, action.data.update);
            return ({...state, list});
        }
        case 'CLEAR_DATA':{
            window.localStorage.removeItem('MENUR_STATE');
            return INIT_STATE;
        }
        default:
            break;
    }
}