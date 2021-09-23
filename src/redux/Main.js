import { MEALS, DELIM } from '../shared/meals';


export const reducer = (state, action) => {

    const getIngredientsFromMeal = (meal) => {
        let ingredientArr = [];
        meal.ingredients.forEach((ingredient) => {
            if(ingredient.name.indexOf(DELIM) > -1){
                ingredient.name.split(DELIM).forEach((sp) => {
                    let newIngredient = {...ingredient};
                    newIngredient.name = sp;
                    ingredientArr.push(newIngredient);
                });
            }else{
                ingredientArr.push(ingredient);
            }
        });
        return ingredientArr;
    }

    const mealHasIngredient = (meal, ingredientName) => {
        let ingredientsFromMeal = getIngredientsFromMeal(meal);
        for(let i = 0; i < ingredientsFromMeal.length; i++){
            if(ingredientsFromMeal[i].name === ingredientName){
                return true;
            }
        }
        return false;
    }

    const getMealsWithIngredient = (ingredient) => {
        let meals = [];
        MEALS.forEach((meal) => {
            let hasIngredient = false;
            if(mealHasIngredient(meal, ingredient)){
                hasIngredient = true;
            }
            if(hasIngredient){
                if(meals.indexOf(meal) < 0){
                    meals.push(meal);
                }
            }
        });
        console.log("Meals with "+ingredient+":");
        console.dir(meals);
        return meals;
    }

    const getSuggestionScore = (meal, suggestion) => {
        let score = 0;
        const mealIngredients = getIngredientsFromMeal(meal);
        const suggIngredients = getIngredientsFromMeal(suggestion);
        suggIngredients.forEach((ingredient) => {
            mealIngredients.forEach((mealIngredient) => {
                if(ingredient.name === mealIngredient.name){
                    if(ingredient.type === 'fresh'){
                        score += 2;
                    }else{
                        score += 1;
                    }
                }
            });
        });
        console.log(suggestion.name + " " + score);
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
        case 'CHANGE_SELECTION':{
            return ({...state, selection: action.data});
        }
        case 'GET_SUGGESTIONS':{
            console.log(action.data);
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
            console.log("ADD MEAL: " + action.data.meal.name);
            return ({...state, 
                mealplan: {...state[action.data.day],
                    [action.data.mealtime] : action.data.meal}
             });
        }
        case 'REMOVE_MEAL':{
            return ({...state, 
                mealplan: {...state[action.data.day],
                    [action.data.mealtime] : {}}
             });
        }
        default:
            break;
    }
}