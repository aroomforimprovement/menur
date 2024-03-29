import React, { useState } from 'react';
import toast from 'buttoned-toaster';
import '../css/meal.scss';
import { DELIM, OR } from '../../shared/meals';
import { useMainContext } from '../../main/MenurRouter';
import { Modal } from 'react-bootstrap';
import { MealGen } from '../../common/mealgen/MealGen';

const apiUrl = process.env.REACT_APP_API_URL;
const proxy = process.env.REACT_APP_PROXY_URL;

export const Meal = ({meal, showSpices, index}) => {
    const { state, dispatch } = useMainContext();
    const [showIngredients, setShowIngredients] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);

    const deleteMeal = async () => {
        return await fetch(`${proxy}${apiUrl}meal/${meal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.access}`
            }
        }).then(response => {
            if(response.ok){
                return response;
            }
        }, error => {
            console.error(error);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleShowIngredients = () => {
        setShowIngredients(!showIngredients);
    }

    const handleDeleteMeal = () => {
        deleteMeal().then((response) => {
            if(response.ok){
                toast.success(`Meal, ${meal.name}, deleted ok`);
                dispatch({type: 'REMOVE_SAVED_MEAL', data: meal.id});
            }else{
                toast.error(`Error deleting meeal, ${meal.name}`);
            }
        });
    }

    const handleEditMeal = () => {
        setIsEditing(true);
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
        <div className='container dummy-meal border shadow-sm m-0 p-0'
            style={{zIndex:1000-index}}>
            <div onClick={handleEditMeal} className='mealtime-click fa fa-eye'>
            </div> 
            <div className='row meal-row m-0 px-0'>
                <div className='meal-heading'>
                    {meal.name ? meal.name  : 'NAME MISSING'}
                </div>  
                
                <button type='button' className='btn-close meal-remove' onClick={handleDeleteMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Delete'>
                </button> 
                <div onClick={handleShowIngredients} className={'expand-ingredients float-start'}
                    aria-label='Show ingredients' style={{ bottom:'-2px' }}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
            </div>
            {showIngredients 
                ? 
                <div className='dummy-ingredients'
                    style={showIngredients ? {position:'absolute'} : {position:'relative'}} 
                    >
                    <ul className='list-unstyled col col-12 ps-2'>
                        {ingredients}
                    </ul>
                </div> 
                :
                <div></div>
            }
            <Modal show={isEditing || isViewing}>
                <Modal.Header className='float-end'>
                    <div className='col col-12'>
                        <button className='butt fa fa-close float-end px-2 me-0' aria-label='Close'
                            onClick={() => {setIsEditing(false); setIsViewing(false)}}></button>
                    </div>                
                </Modal.Header>
                <Modal.Body>
                    <MealGen edit={true} meal={meal} open={setIsEditing}/>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );
}