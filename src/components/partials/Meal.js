import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DELIM, OR } from '../../shared/meals';
import { useMainContext } from '../MenurRouter';

const apiUrl = process.env.REACT_APP_API_URL;

export const Meal = ({meal, showSpices}) => {
    const { state, dispatch } = useMainContext();
    const [showIngredients, setShowIngredients] = useState(false);

    const deleteMeal = async () => {
        return await fetch(`${apiUrl}app/meal/${meal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.access}`
            }
        }).then(response => {
            if(response.ok){
                console.dir(response);
                return response;
            }
        }, error => {
            console.error(error);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleClick = () => {
        setShowIngredients(!showIngredients);
    }

    const handleDeleteMeal = () => {
        deleteMeal().then((response) => {
            if(response.ok){
                toast.success("Meal deleted ok");
                dispatch({type: 'REMOVE_SAVED_MEAL', data: meal.id});
            }else{
                toast.error("Error deleting the Meal");
            }
        });
    }

    const ingredients = meal.name 
        ? 
        meal.ingredients.map((ing) => {
            return(
                <div className='mealplan-ingredients' key={ing.name}>
                    {!showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
                </div>
            )
        })
        :
        <div></div>

    return(
        <div>
        <div className='container account-meal border shadow-sm'>
            <div className='row'>
                <div className='col col-12'> 
                    <div className='mealtime-text'>
                        {meal.name ? meal.name  : 'NAME MISSING'}
                    </div>   
                <button type='button' className='btn-close meal-remove' onClick={handleDeleteMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Delete'
                >
                </button> 
                <div onClick={handleClick}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
            </div>
            </div>
        </div>
        <div>
            {showIngredients 
            ? 
            <div>
                <ul className='list-unstyled account-meal-ingredients shadow shadow-lg'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>
            }
        </div>
        </div>
    );
}