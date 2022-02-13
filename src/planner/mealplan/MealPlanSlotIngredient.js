import React from 'react';
import { useMainContext } from '../../main/MenurRouter';
import { DELIM } from '../../shared/meals';

export const MealPlanSlotIngredient = ({day, mealtime, ing}) => {

    const {dispatch} = useMainContext();

    const handleRemoveIngredient = (ing, orIng) => {
        dispatch({type: 'REMOVE_MEALPLAN_ING', data: {ing: ing, orIng: orIng, day: day, mealtime: mealtime}});
    }

    const OrIngredients = ({ing}) => {
        const orIngs = ing.name.split(DELIM);
        if(Array.isArray(orIngs) && orIngs.length > 1){
            const count = orIngs.length;
            const orIngsComp = orIngs.map((orIng) => {
                return(
                    <div key={orIng} className={`col col-${12/count}`}>
                        <div className='row'>
                            <button type='button' className='btn-close ing-remove col col-1' onClick={() => {handleRemoveIngredient(ing, orIng)}}
                            style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'></button>
                            <small className='col'>{orIng}</small>
                        </div>
                    </div>
                );
            });
            return(
                <div className='row border border-warning'>
                    {orIngsComp}
                </div>
            );
        }else{
            return(
                <div className='row'>
                    <button type='button' className='btn-close ing-remove col col-1' onClick={(e) => {e.preventDefault(); handleRemoveIngredient(ing)}}
                        style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'></button>
                    <small className='col'>{ing.name}</small>
                </div>
            );
        }
        
    };

    return(
        <div className='container'>
            <OrIngredients ing={ing}/>
        </div>
    );
}