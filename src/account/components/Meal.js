import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../css/meal.css';
import { DELIM, OR } from '../../shared/meals';
import { useMainContext } from '../../main/MenurRouter';

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const Meal = ({meal, showSpices}) => {
    const { state, dispatch } = useMainContext();
    const [showIngredients, setShowIngredients] = useState(false);

    const deleteMeal = async () => {
        return await fetch(`${proxy}${apiUrl}app/meal/${meal.id}`, {
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
                <div className='col col-12' key={ing.name}>
                    {!showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
                </div>
            )
        })
        :
        <div></div>

    return(
        <div>
        <div className='container dummy-meal border shadow-sm m-0 p-0'>
            <div className='row meal-row m-0 px-0'>
                <div className='col col-12 p-0'> 
                    <div className='mealtime-text'>
                        {meal.name ? meal.name  : 'NAME MISSING'}
                    </div>   
                <button type='button' className='btn-close meal-remove' onClick={handleDeleteMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Delete'
                >
                </button> 
                <div onClick={handleClick} className={'expand-ingredients'}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
            </div>
            <div className='px-0 '>
            {showIngredients 
            ? 
            <div className='px-0 py-1'>
                <ul className='list-unstyled dummy-ingredients col col-12 ps-2'>
                    {ingredients}
                </ul>
            </div> 
            : <div></div>
            }
        </div>
            </div>
            
        </div>
        </div>
    );
}