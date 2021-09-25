import { getIngredientsFromMeal, getMealsWithIngredient } from '../utils/objUtils';

export const reducer = (state, action) => {

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
            //console.log("ADD MEAL: " + action.data.meal.name);
            let mealplan = {...state.mealplan};
            console.log("ADD_MEAL");
            mealplan[action.data.day][action.data.mealtime] = action.data.meal;
            return ({...state, mealplan: mealplan});
        }
        case 'REMOVE_MEAL':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime] = {};
            return ({...state, mealplan: mealplan});
        }
        default:
            break;
    }
}