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
            return ({...state, suggestions:newSuggestions});
        }
        default:
            break;
    }
}