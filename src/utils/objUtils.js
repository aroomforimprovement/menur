import { DELIM } from '../shared/meals';
import { v4 as uuidv4 } from 'uuid';


export const getNewId = () => {
    return uuidv4();
}

export const getIngredientsFromMeal = (meal) => {
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

export const mealHasIngredient = (meal, ingredientName) => {
    let ingredientsFromMeal = getIngredientsFromMeal(meal);
    for(let i = 0; i < ingredientsFromMeal.length; i++){
        if(ingredientsFromMeal[i].name === ingredientName){
            return true;
        }
    }
    return false;
}

export const getMealsWithIngredient = (allMeals, ingredient) => {
    let meals = [];
    allMeals.forEach((meal) => {
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
    return meals;
}

