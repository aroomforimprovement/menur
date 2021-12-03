import React from 'react';
import { useMainContext } from '../../main/MenurRouter';
import { DELIM, OR } from '../../shared/meals';

export const MealPlanSlotIngredient = ({ing}) => {

    //const [state, dispatch] = useMainContext();

    const handleRemoveIngredient = () => {
        console.error("not implemented");
    }

    const OrIngredients = ({ing}) => {
        console.dir(ing);
        if(Array.isArray(ing.name.split(DELIM))){
            return ing.name.split(DELIM).map((orIng) => {
                return(
                    <div key={orIng}>
                        <button type='button' className='btn-close ing-remove' onClick={handleRemoveIngredient}
                            style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'></button>
                        <small>{orIng}</small>
                    </div>
                );
            });
        }else{
            return(
                <div >
                    <button type='button' className='btn-close ing-remove' onClick={handleRemoveIngredient}
                        style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'></button>
                    <small>{ing.name}</small>
                </div>
            );
        }
        
    };

    return(
        <div>
            <OrIngredients ing={ing}/>
        </div>
    );
}