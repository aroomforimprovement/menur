import { MEALS, DELIM } from '../shared/meals';

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
    //console.log('getIngredientsFromMeal');
    //console.log(ingredientArr);
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

export const getMealsWithIngredient = (ingredient) => {
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
    //console.log("Meals with "+ingredient+":");
    //console.dir(meals);
    return meals;
}

