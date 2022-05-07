import { DEFAULT_SERVINGS, MEALS } from '../shared/meals';
import { days, mealtimes, getClearedMealplan } from '../shared/states';
import { saveMeal } from '../utils/apiUtils';
import { getIngredientsFromMeal, getMealsWithIngredient, getNewId } from '../utils/objUtils';


export const reducer = (state, action) => {
    const noop = () => {return};

    const getIngredientsFromMealPlan = (mealplan) => {
        if(!mealplan){
            return [{"name": "Add some meals to the week to start generating a list", "qty": ":)"}];
        }
        let ingArr = [];
        days.forEach((day) => {
            mealtimes.forEach((mealtime) => {
                const meal = mealplan[day] && mealplan[day][mealtime] 
                    ? mealplan[day][mealtime] : {};
                
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
            if(leftovers[i].day_tag === day &&
                leftovers[i].mealtime_tag === mealtime){
                    return true;
            }
        }
        return false;
    }

    const getLeftoverRemoved = (leftovers, day, mealtime) => {
        for(let i = 0; i < leftovers.length; i++){
            if(leftovers[i].day_tag === day &&
                leftovers[i].mealtime_tag === mealtime){
                    leftovers.splice(i, 1);
                    return leftovers;
            }
        }
        return leftovers;
    }

    switch(action.type){
        case 'COOKIES_APPROVED':{
            return({...state, cookiesApproved: action.data});
        }
        case 'SET_SHOW_SPICES':{
            return({...state, showSpices: action.data});
        }
        case 'SET_SHOW_BASIC':{
            return({...state, showBasic: action.data});
        }
        case 'SET_SHOW_MINE':{
            return({...state, showMine: action.data});
        }
        case 'CHANGE_SELECTION':{
            return ({...state, selection: action.data});
        }
        case 'SET_SELECTED_SUGGESTION':{
            return ({...state, selectedSuggestion: action.data});
        }
        case 'UNSET_SELECTED_SUGGESTION':{
            if(state.selectedSuggestion === action.data){
                return({...state, selectedSuggestion: MEALS[0]});
            }
            return(state);
        }
        case 'HIDE_SELECTOR_INGREDIENTS':{
            return({...state, hideSelectorIngredients: action.data})
        }
        case 'SET_HIGHLIGHTED_INGREDIENT':{
            return({...state, highlightedIngredient: action.data});
        }
        case 'GET_SUGGESTIONS':{
            if(state.selection.name === 'Pick a meal'){
                return({...state, suggestions:[]});
            }
            const newSuggestions = [];
            let allMeals = [];
            if(state.showBasic){
                allMeals = MEALS;
            }
            if(state.meals && state.showMine){
                allMeals = allMeals.concat(state.meals);
            }
            getIngredientsFromMeal(state.selection).forEach((ingredient) => {
                const suggestions = getMealsWithIngredient(allMeals, ingredient.name);
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
            const sampleSuggestions = rankedSuggestions.slice(0, 10);
            return ({...state, suggestions:sampleSuggestions});
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
            return ({...state, });
        }
        case 'OPEN_ADD_MEAL':{
            return({...state});
        }
        case 'ADD_MEAL':{
            let mealplan = {...state.mealplan};
            let meal = {...action.data.meal};
            const id = meal.id ? meal.id : getNewId();
            meal.id = id;
            mealplan[action.data.day][action.data.mealtime] = meal; 
            const servings = parseInt(meal.servings === 'DEFAULT' ? state.defaultServings : meal.servings);
            const defaultServings = state.defaultServings ? state.defaultServings : DEFAULT_SERVINGS;
            let leftovers = [...state.leftovers];
            if(servings > defaultServings){
                const name = meal.name.indexOf("Leftover") > -1 
                    ? meal.name : `Leftover ${meal.name}` 
                let leftover = {
                    "name": name,
                    "servings": servings - defaultServings,
                    "ingredients": [],
                    "score": "100",
                    "day_tag": action.data.day,
                    "mealtime_tag": action.data.mealtime
                }
                leftovers.push(leftover);
            }
            if(action.data.save){ 
                saveMeal(meal, state.user, false);
            }
            return ({...state, 
                mealplan: mealplan, leftovers: leftovers, 
                isPickerClosed: true, isMealtimePickerClosed: true});
        }
        case 'UPDATE_SAVED_MEAL':{
            let meals = [...state.meals];
            for(let i = 0; i < meals.length; i++){
                if(meals[i].id === action.data.id){
                    meals[i] = action.data;
                }
            }
            return({...state, meals: meals});
        }
        case 'NAME':{
            return({...state, mealplanName: action.data});
        }
        case 'SET_SAVE_OPEN':{
            return({...state, isSaveOpen: action.data});
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
            // eslint-disable-next-line no-unused-vars
            for(let [key, value] of Object.entries(mealplan) ){
                // eslint-disable-next-line no-unused-vars
                for(let [ke, val] of Object.entries(mealplan[key])){
                    for(let [k, v] of Object.entries(mealplan[key][ke])){
                        if(k === 'name' && v.indexOf('Leftover') > -1){
                            let dayFound = false;
                            let mealtimeFound = false;
                            for(let [kee, vaa] of Object.entries(mealplan[key][ke])){
                                if(kee === 'day_tag' && vaa === action.data.day){
                                    dayFound = vaa;
                                }
                                if(kee === 'mealtime_tag' && vaa === action.data.mealtime){
                                    mealtimeFound = vaa;
                                }
                            }
                            if(dayFound && mealtimeFound){
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
        case 'SET_MEALPLAN_INGS_OPEN':{
            let mealplan = {...state.mealplan};
            mealplan[action.data.day][action.data.mealtime].showIngredients = action.data.showIngredients;
            return({...state, mealplan: mealplan})
        }
        case 'REMOVE_MEALPLAN_ING':{
            let mealplan = {...state.mealplan};
            let meal = {...mealplan[action.data.day][action.data.mealtime]};
            let ingredients = [...meal.ingredients];
            
            for(let i = 0; i < ingredients.length; i++){
                if(ingredients[i].name === action.data.ing.name){
                    if(ingredients[i].name.indexOf('|') > 0){
                        const ingredientName = ingredients[i].name.replace(action.data.orIng, '')
                            .replace('||', '').replace(/^\|/, '').replace(/\|$/, '');
                        ingredients[i].name = ingredientName;
                    }else{
                        ingredients = getItemRemoved(ingredients, action.data.ing);
                    }
                }
            }
            meal.ingredients = ingredients;
            mealplan[action.data.day][action.data.mealtime] = meal;

            return({...state, mealplan: mealplan});
        }
        case 'GEN_LIST':{
            const list = getIngredientsFromMealPlan(action.data.mealplan);
            const genList = {
                list: list,
                heading: "MENUR Generated Shopping List",
                index: -1
            }
            return ({...state, genList: action.data.main ? genList : [],
                genListTemp: action.data.main ? [] : genList, 
                userLists: []});
        }
        case 'SET_IS_GENERATING_LIST':{
            return({...state, 
                isGeneratingList: action.data.isGenerating, 
                mealplanDownloading: action.data.mealplanDownloading
            });
        }
        case 'CREATE_NEW_LIST':{
            let userLists = [...state.userLists];
            let inputList = [...state.listCreator.list];
            let outputList = [...action.data.list];
            let genList = {...state.genList};
            let inputTag = inputList[0] 
            ? `${inputList[0].list}` 
            : `userList_${userLists.length-1}`;
            const outputTag = action.data.tag;
            let newList = [];
            outputList.forEach((ing) => {
                inputList = getItemRemoved(inputList, ing);
                let newIng = {...ing};
                newIng.list = outputTag;
                newList.push(newIng);
            });
            inputTag === 'genList'
            ? genList.list = inputList
            : userLists[state.listCreator.index].list = inputList;

            const listToPush = {
                list: newList,
                heading: action.data.heading && action.data.heading.length > 0
                    ? action.data.heading : `Shopping list ${userLists.length+2}`,
                index: userLists.length
            }
            userLists.push(listToPush);
            
            return({...state,
                genList: inputTag === 'genList' 
                    ? genList 
                    : {...state.genList}, 
                userLists: userLists, 
                showListCreator: false,
                listCreator: {
                    list: [],
                    heading: '',
                    index: -1
                }
            });
        }
        case 'ADD_TO_LIST':{
            let list = [];
            let index = -1;
            const tag = action.data.list;
            const ingredient = action.data;
            if(tag === 'genList'){
                list = [...state.genList.list];
            }else{
                index = parseInt(tag.replace('userList_', ''));
                list = [...state.userLists[index].list];
            }
            list.push(ingredient);
            if(tag === 'genList'){
                return({...state, 
                    genList: {
                        list: list,
                        heading: state.genList.heading
                    }
                });
            }else{
                const lists = [...state.userLists];
                const newList = {
                    list: list,
                    heading: state.userLists[index].heading,
                    index: index
                }
                lists[index] = newList;
                return({...state, userLists: lists});
            }
        }
        case 'REMOVE_FROM_LIST':{
            let list = [];
            let index = -1;
            const tag = action.data.list;
            if(tag === 'genList'){
                list = [...state.genList.list];
            }else{
                index = parseInt(tag.replace('userList_', ''));
                list = [...state.userLists[index].list];
            }
            list = getItemRemoved(list, action.data);
            if(tag === 'genList'){
                return({...state, genList: {list: list, heading: state.genList.heading}});
            }else{
                const lists = [...state.userLists];
                const newList = {
                    heading: state.userLists[index].heading,
                    list: list,
                    index: index
                }
                lists[index] = newList;
                return({...state, userLists: lists});
            }
        }
        case 'UPDATE_ON_LIST':{
            let listObj = {...state[action.data.old.list]};
            listObj.list = getItemQtyChanged(listObj.list, action.data.old, action.data.update);
            return ({...state, [action.data.old.list]: listObj});
        }
        case 'REMOVE_LEFTOVER':{
            let leftovers = [...state.leftovers];
            leftovers = getItemRemoved(leftovers, action.data);
            return ({...state, leftovers: leftovers});
        }
        case 'CLEAR_DATA':{
            const clearedPlan = getClearedMealplan();
            return {...state, mealplan: clearedPlan};
        }
        case 'DOWNLOAD_MEALPLAN':{
            return ({...state, download: action.data});
        }
        case 'SET_IS_LANDSCAPE':{
            return({...state, isLandscape: action.data});
        }
        case 'CHECK_AUTH':{
            let storedUser = {isAuth: false};
            if(action.data.isAuthenticated){
                const user = action.data.user;
                const userid = user.sub.replace('auth0|', '');
                const verified = user.email_verified;
                storedUser = {
                    userid: userid, 
                    email: user.email, 
                    username: user.nickname, 
                    isAuth: true, 
                    access: user.access,
                    isVerified: verified,
                }
            }
            return({...state, user: storedUser});
        }
        case 'SET_ACCESS':{
            let user = {};
            if(state.user){
                user = {...state.user};
            }
            user.access = action.data;
            return({...state, user: user});
        }
        case 'SET_ACCOUNT_INFO':{
            return ({...state, meals: action.data.meals, plans: action.data.plans, defaultServings: action.data.defaultServings,
                user: {...state.user, username: action.data.username}, isSet: action.data.isSet});
        }
        case 'UNSET':{
            return({...state, isSet: false})
        }
        case 'SET_SPLAT':{
            const plans = [...state.plans];
            const plan = plans.find(p => {
                return p.id === action.data;
            })
            return({...state, mealplan: plan.mealplan, leftovers: plan.leftovers,
                genList: plan.genList, userLists: plan.userLists, splatSet: true,
                backupPlan: {...plan}});
        }
        case 'ADD_SELECTOR_MEAL':{
            const meals = [...state.meals];
            meals.push(action.data);
            return({...state, meals: meals});
        }
        case 'REMOVE_SAVED_PLAN':{
            const plans = [...state.plans];
            const newPlans = plans.filter((p) => {
                return p.id !== action.data;
            });
            return({...state, plans: newPlans});
        }
        case 'ADD_SAVED_PLAN':{
            const newPlans = [...state.plans];
            let index = -1;
            let backup = -1;
            for(let i = 0; i < newPlans.length; i++){
                if(newPlans[i].id === action.data.mealplan.id){
                    index = i;
                }
                if(state.backupPlan !== undefined){
                    if(newPlans[i].id === state.backupPlan.id){
                        backup = i;
                    }
                }
            }
            if(index > -1){
                newPlans[index] = action.data.mealplan;
            }else{
                newPlans.push(action.data.mealplan);
            }
            if(backup > -1){
                newPlans[backup] = {...state.backup};
            }
            return({...state, plans: newPlans});
        }
        case 'REMOVE_SAVED_MEAL':{
            const meals = [...state.meals];
            const newMeals = meals.filter((m) => {
                return m.id !== action.data;
            })
            return({...state, meals: newMeals});
        }
        case 'SET_HIDE_PLANS':{
            return({...state, hidePlans: action.data});
        }
        case 'SET_HIDE_MEALS':{
            return({...state, hideMeals: action.data});
        }
        case 'SET_HIDE_SETTINGS':{
            return({...state, hideSettings: action.data});
        }
        case 'SET_DEFAULT_SERVINGS':{
            return({...state, defaultServings: action.data});
        }
        case 'SET_DISPLAY_NAME':{
            return({...state, user: {...state.user, username: action.data}});
        }
        case 'SET_MEALPLAN_CLOSED':{
            return({...state, isMealPlanClosed: action.data});
        }
        case 'SET_PICKER_CLOSED':{
            return({...state, isPickerClosed: action.data.isPickerClosed, pickerMeal: action.data.pickerMeal});
        }
        case 'SET_MEALTIME_PICKER_CLOSED':{
            return({
                    ...state, 
                    isMealtimePickerClosed: action.data.isMealtimePickerClosed,
                    mealtimePickerDay: action.data.mealtimePickerDay,
                    mealtimePickerMealtime: action.data.mealtimePickerMealtime
                });
        }
        case 'SHOW_LIST_CREATOR':{
            return({...state, 
                showListCreator: action.data.showListCreator,
                listCreator: {
                    list: action.data.list,
                    heading: action.data.heading,
                    index: action.data.index
                }
            })
        }
        default:{
            console.error("Reached default case - menurReducer.js");
            return state;
        }
    }
    
}