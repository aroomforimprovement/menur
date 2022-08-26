
export const DELIM = '|';
export const OR = ' or ';
export const DEFAULT_SERVINGS = 2;

export const MEALS = [{
    "id": "1000",
    "name": "Pick a meal",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
        "name": "Pick a meal above to start or create your own",
        "type": "",
        "qty": "1",
        "score": "0"
    }]
},
{
    "id": "1001",
    "name": "Arrabiata",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Chopped tomatoes",
            "type": "tin",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Chilli",
            "type": "fresh",
            "qty": "2",
            "score": "3"
        },
        {
            "name": "Pasta",
            "type": "dry",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Olive oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },

    ],
    "steps":[
            `Heat olive oil in a frying pan.
            Add chilli and garlic.`,
            `After a minute, add canned tomatoes.`,
            `Simmer for about 10 minutes, until sauce has thickened.`,
            `Add salt to taste.`,
            `Boil to taste pasta in large saucepan of salted water.`,
            `Drain the pasta and add the tomato sauce.`
    ]
},
{
    "id": "1002",
    "name": "Burgers",
    "mealtime": "Dinner",
    "servings": "4",
    "ingredients": [{
            "name": "Mince beef",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Burger buns",
            "type": "fresh",
            "qty": "2",
            "score": "4"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "0.25",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "0.5",
            "score": "1"
        },
        {
            "name": "Tomato",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Egg",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Cumin",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Chips|Sweet potato fries",
            "type": "frozen",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Ketchup",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Lettuce",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        }
    ],
    "steps":[
        `Finely chop most of the onions.`,
        `Mix the minced beef, eggs and onions in a bowl along with salt and black pepper to taste`,
        `Ball the mixture into small fist-sized lumps, flatten into patties and lay out on grease-proof paper`,
        `Chop some slices of tomato, hoops of onion, and prepare some salad leaves. Set aside`,
        `Heat a small amount of oil in a pan and fry the beef patties on both sides for about 2 minutes.`,
        `Optionally warm the buns under a grill or on the same pan`,
        `Assemble the buns, burgers, cheese and salad to taste.`
    ]
},
{
    "id": "1003",
    "name": "Butternut Squash Soup",
    "mealtime": "Dinner",
    "servings": "5",
    "ingredients": [{
            "name": "Carrots",
            "type": "fresh",
            "qty": "2",
            "score": "4"
        },
        {
            "name": "Celery",
            "type": "fresh",
            "qty": "2",
            "score": "4"
        },
        {
            "name": "Chicken stock|Vegetable stock",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Butternut Squash",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Butter",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Cream",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Leek",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Potato",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Chilli flakes",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        }
    ],
    "steps":[]
},
{
    "id": "1004",
    "name": "Carbonara",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Pasta",
            "type": "dry",
            "qty": "0.5",
            "score": "1"
        },
        {
            "name": "Shallots",
            "type": "fresh",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Egg",
            "type": "fresh",
            "qty": "2",
            "score": "3"
        },
        {
            "name": "Pancetta|Bacon",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Oregano",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Parmesan",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Cream",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1005",
    "name": "Cauliflower Wings",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Cauliflower",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "All purpose flour",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Milk",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Water",
            "type": "other",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Garlic powder",
            "type": "spice",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Smoked paprika",
            "type": "spice",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Breadcrumbs",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "BBQ sauce",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Sriracha",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Spring onion",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Sour cream",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Blue cheese",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Mayo",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "White wine vinegar",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1006",
    "name": "Chicken Curry",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Chicken|Tofu|Quorn",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Curry Powder",
            "type": "dry",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Chilli",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Chips|Rice",
            "type": "frozen",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Balsamic vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        }
    ],
    "steps":[]
},
{
    "id": "1007",
    "name": "Chinese Curry",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Tofu|Chicken|Quorn",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Rice",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Eggs",
            "type": "fresh",
            "qty": "2",
            "score": "3"
        },
        {
            "name": "Mayflower curry sauce",
            "type": "dry",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Five spice",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic powder",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Soy sauce",
            "type": "cond",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1008",
    "name": "Fajitas",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Chicken|Quorn",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Tortilla wraps",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Fajita seasoning",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salsa",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1009",
    "name": "Fish 'n' Chips",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Fish in breadcrumbs",
            "type": "frozen",
            "qty": "1"
        },
        {
            "name": "Chips",
            "type": "frozen",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "White vinegar",
            "type": "cond",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Garlic mayo",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        }
    ],
    "steps":[]
},
{
    "id": "1010",
    "name": "Goat's Cheese Pastabake",
    "mealtime": "Dinner",
    "servings": "4",
    "ingredients": [{
            "name": "Pasta",
            "type": "dry",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Shallots",
            "type": "fresh",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Red onion",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Cream",
            "type": "fresh",
            "qty": "0.5",
            "score": "4"
        },
        {
            "name": "Goat's Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Oregano",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Parmesan",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "White wine vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        }
    ],
    "steps":[]
},
{
    "id": "1011",
    "name": "Goat's Cheese Salad",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Goat's Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Balsamic vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Oregano",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Spinach",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Apple",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Walnuts",
            "type": "dry",
            "qty": "0.5",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1012",
    "name": "Halloumi Burgers",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Halloumi",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Burger buns",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Tabasco mayo",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Lettuce",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Red onion",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Tomato",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Sweet potato fries|corn on the cob",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        }
    ],
    "steps":[]
},  {
    "id": "1013",
    "name": "Italian Chilli",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Baby potatoes",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Chopped tomatoes",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Borlotti beans",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Cumin",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Cayenne pepper",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Smoked paprika",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Parmesan",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1014",
    "name": "Lasagne",
    "mealtime": "Dinner",
    "servings": "4",
    "ingredients": [{
            "name": "Pasta sheets",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Mince beef",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Parmesan",
            "type": "fresh",
            "qty": "0.25",
            "score": "2"
        },
        {
            "name": "Balsamic vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Italian herbs",
            "type": "spice",
            "qty": "1",
            "score": "1"
        }
    ],
    "steps":[]
},
{
    "id": "1015",
    "name": "Lentils",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Red lentils",
            "type": "dry",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Chilli",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Chopped tomatoes",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Spinach",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Rice|Bread",
            "type": "dry",
            "qty": "0.25",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Balsamic vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        }
    ],
    "steps":[]
},
{
    "id": "1016",
    "name": "Lentil Shepard's Pie",
    "mealtime": "Dinner",
    "servings": "3",
    "ingredients": [{
            "name": "Potatoes",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Red lentils",
            "type": "dry",
            "qty": "0.3",
            "score": "2"
        },
        {
            "name": "Vegetable stock",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Carrots",
            "type": "fresh",
            "qty": "2",
            "score": "3"
        },
        {
            "name": "Celery",
            "type": "fresh",
            "qty": "2",
            "score": "3"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Tomato puree",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1017",
    "name": "Mince Gravy",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Mince",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Beef stock",
            "type": "dry",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Potatoes",
            "type": "fresh",
            "qty": "1",
            "score": "3"
        },
        {
            "name": "Mushy peas",
            "type": "tin",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1018",
    "name": "Omlette",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Egg",
            "type": "fresh",
            "qty": "6",
            "score": "3"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "2",
            "score": "1"
        },
        {
            "name": "Chips",
            "type": "frozen",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Beans",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        }

    ],
    "steps":[]
},
{
    "id": "1019",
    "name": "Pastabake",
    "mealtime": "Dinner",
    "servings": "4",
    "ingredients": [{
            "name": "LG sauce|Pastabake sauce",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1020",
    "name": "Pasta Pesto",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Pasta",
            "type": "dry",
            "qty": "0.5",
            "score": "1"
        },
        {
            "name": "Pesto",
            "type": "",
            "qty": "0.5",
            "score": "2"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        }
    ],
    "steps":[]
},
{
    "id": "1021",
    "name": "Pizza",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
        "name": "Pizza",
        "type": "frozen",
        "qty": "2",
        "score": "2"
    }],
    "steps":[]
},

{
    "id": "1022",
    "name": "Quesadillas",
    "mealtime": "Dinner",
    "servings": "3",
    "ingredients": [{
            "name": "Tortilla wraps",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Chopped tomatoes",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Mixed beans",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Other beans|Chickpeas",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Cheese",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        }
    ],
    "steps":[]
},
{
    "id": "1023",
    "name": "Thai Curry",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Chicken",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Red curry paste|Green curry paste|Massaman curry paste",
            "type": "fresh",
            "qty": "0.5",
            "score": "4"
        },
        {
            "name": "Coconut Milk",
            "type": "tin",
            "qty": "1",
            "score": "4"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Chilli",
            "type": "fresh",
            "qty": "1.5",
            "score": "3"
        },
        {
            "name": "Baby Corn",
            "type": "fresh",
            "qty": "0.5",
            "score": "4"
        },
        {
            "name": "Mangetout",
            "type": "fresh",
            "qty": "0.5",
            "score": "4"
        },
        {
            "name": "Green beans",
            "type": "fresh",
            "qty": "0.5",
            "score": "4"
        },
        {
            "name": "Sweet potatoes",
            "type": "fresh",
            "qty": "1",
            "score": "4"
        }
    ],
    "steps":[]
},
{
    "id": "1024",
    "name": "Vegetarian Chilli",
    "mealtime": "Dinner",
    "servings": "DEFAULT",
    "ingredients": [{
            "name": "Chopped tomatoes",
            "type": "tin",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Kidney bean",
            "type": "tin",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Mixed beans",
            "type": "1",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Onion",
            "type": "fresh",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Garlic",
            "type": "",
            "qty": "1",
            "score": "2"
        },
        {
            "name": "Pepper",
            "type": "fresh",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Chilli",
            "type": "fresh",
            "qty": "2",
            "score": "2"
        },
        {
            "name": "Chilli flakes",
            "type": "spice",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Salt",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Black pepper",
            "type": "cond",
            "qty": "1",
            "score": "0"
        },
        {
            "name": "Rice",
            "type": "dry",
            "qty": "0.5",
            "score": "1"
        },
        {
            "name": "Oil",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Balsamic vinegar",
            "type": "cond",
            "qty": "1",
            "score": "1"
        },
        {
            "name": "Honey",
            "type": "cond",
            "qty": "1",
            "score": "1"
        }
    ],
    "steps":[]
}
]