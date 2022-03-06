import { isMobile } from "react-device-detect";
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
    hideSettings: true,
    hideMeals: true,
    hidePlans: true,
    cookiesApproved: false,
    defaultServings: 2,
    isMealPlanClosed: true,
    isPickerClosed: true,
    pickerMeal: undefined,
    isMealtimePickerClosed: true,
    mealtimePickerDay: '',
    mealtimePickerMealtime: '',
    isSaveOpen: false,
    hideSelectorIngredients: isMobile ? true : false
}
