import { MEALS } from "./meals";


export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const mealtimes = ["Dinner", "Lunch", "Breakfast"];

export const INIT_STATE = {
    selection: MEALS[0], 
    suggestions: [],
    mealplan: {
        "Monday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Tuesday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Wednesday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Thursday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Friday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Saturday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}},
        "Sunday": { "Dinner": {}, "Lunch": {}, "Breakfast":{}}
    },
    genList: [],
    userList1: [],
    userList2: []
}
