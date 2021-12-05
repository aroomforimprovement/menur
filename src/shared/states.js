import { MEALS } from "./meals";


export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const mealtimes = ["Dinner", "Lunch", "Breakfast"];

export const INIT_STATE = {
    selection: MEALS[0], 
    suggestions: [],
    selectedSuggestion: MEALS[0],
    hightlightedIngredient: '',
    mealplan: {
        "Monday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Tuesday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Wednesday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Thursday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Friday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Saturday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Sunday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}}
    },
    leftovers: [],
    genList: [],
    userList1: [],
    userList2: [],
    isLandscape: true,
    showSpices: false,
    showBasic: true,
    showMine: false,
    meals: [],
    plans: [],
    hideMeals: true,
    hidePlans: true,
    cookiesApproved: false,
}
