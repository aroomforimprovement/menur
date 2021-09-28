import { MEALS } from '../shared/meals';
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
                if(ingredient.type !== 'spice' && ingredient.type !== 'cond' &&
                    ingredient.name === mealIngredient.name){
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

    const hasLeftoverToRemove = (leftovers, day, mealtime) => {
        for(let i = 0; i < leftovers.length; i++){
            //console.log(leftovers[i].day_tag +":"+ leftovers[i].mealtime_tag);
            if(leftovers[i].day_tag === day &&
                leftovers[i].mealtime_tag === mealtime){
                    return true;
            }
        }
        return false;
    }

    const getLeftoverRemoved = (leftovers, day, mealtime) => {
        for(let i = 0; i < leftovers.length; i++){
            console.log(leftovers[i].day_tag +":"+ leftovers[i].mealtime_tag);
            if(leftovers[i].day_tag === day &&
                leftovers[i].mealtime_tag === mealtime){
                    leftovers.splice(i, 1);
                    return leftovers;
            }
        }
        return leftovers;
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
        case 'SET_SELECTED_SUGGESTION':{
            return ({...state, selectedSuggestion: action.data});
        }
        case 'UNSET_SLECTED_SUGGESTION':{
            if(state.selectedSuggestion === action.data){
                return({...state, selectedSuggestion: MEALS[0]});
            }
            return(state);
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
        case 'ADD_SUGGESTION':{
            const suggestions = [...state.suggestions];
            suggestions.push(action.data);
            return ({...state, suggestions: suggestions});
        }
        case 'MEAL_GEN':{
            let suggList = [...state.suggestions];
            suggList.push(
                {
                    "name": action.data.name, 
                    "ingredients": action.data.ingredients, 
                    "score": 0, 
                    "mealtime":action.data.mealtime
                });
            return ({...state, })
        }
        case 'ADD_MEAL':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime] = action.data.meal;
            //add extra to leftovers 
            // - tag leftovers with day and mealtime  
            const servings = parseInt(action.data.meal.servings);
            let leftovers = [...state.leftovers];
            if(servings > 2){
                for(let i = 2; i < servings; i++){
                    let leftover = {
                        "name": "Leftover " + action.data.meal.name,
                        "servings": "1",
                        "ingredients": [],
                        "score": "100",
                        "day_tag": action.data.day,
                        "mealtime_tag": action.data.mealtime
                    }
                    leftovers.push(leftover);
                }
            }
            return ({...state, mealplan: mealplan, leftovers: leftovers});
        }
        case 'REMOVE_MEAL':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime] = {};
            //search leftovers AND mealslots for leftovers with 
            // day and mealtime tags
            let leftovers = [...state.leftovers];
            while(hasLeftoverToRemove(leftovers, action.data.day, action.data.mealtime)){
                leftovers = getLeftoverRemoved(leftovers, action.data.day, action.data.mealtime);
                continue;
            }
            let leftoverMeals = [];
            for(let [key, value] of Object.entries(mealplan) ){
                //console.log(key+":"+value);
                for(let [ke, val] of Object.entries(mealplan[key])){
                    //console.log(ke+":"+val);
                    for(let [k, v] of Object.entries(mealplan[key][ke])){
                        //console.log(k+":"+v);
                        if(k === 'name' && v.indexOf('Leftover') > -1){
                            let dayFound = false;
                            let mealtimeFound = false;
                            for(let [kee, vaa] of Object.entries(mealplan[key][ke])){
                                //console.log(kee+":"+vaa);
                                if(kee === 'day_tag' && vaa === action.data.day){
                                    dayFound = vaa;
                                }
                                if(kee === 'mealtime_tag' && vaa === action.data.mealtime){
                                    mealtimeFound = vaa;
                                }
                            }
                            if(dayFound && mealtimeFound){
                                console.log(dayFound + ":" + mealtimeFound);
                                let itemToRemove = {day: dayFound, mealtime: mealtimeFound};
                                leftoverMeals.push(itemToRemove);
                            }
                        }
                    }
                }
            }
            leftoverMeals.forEach((meal) => {
                mealplan[meal.day][meal.mealtime] = {};
            });
            return ({...state, mealplan: mealplan, leftovers: leftovers});
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
            console.dir(list);
            return ({...state, [action.data.old.list]: list});
        }
        case 'REMOVE_LEFTOVER':{
            let leftovers = [...state.leftovers];
            leftovers = getItemRemoved(leftovers, action.data);
            return ({...state, leftovers: leftovers});
        }
        case 'CLEAR_DATA':{
            window.localStorage.removeItem('MENUR_STATE');
            window.location.reload();
            return INIT_STATE;
        }
        default:
            break;
    }
    
}