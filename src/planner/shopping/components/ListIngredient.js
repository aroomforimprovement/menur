import React, { useCallback } from 'react';
import ReactTooltip from 'react-tooltip';
import { useMainContext } from '../../../main/MenurRouter';
import { ListDraggable } from './ListDraggable';

export const ListIngredient = ({ingredient}) => {

    const { state, dispatch } = useMainContext();

    const highlightDispatch = useCallback(dispatch, [dispatch]);

    const handleHighlightIngredient = (name) => {
        highlightDispatch({type: 'SET_HIGHLIGHTED_INGREDIENT', data: name})
    }

    const decrement = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) - 1;
        dispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const increment = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) + 1;
        dispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const remove = (ingredient) => {
        dispatch({type: 'REMOVE_FROM_LIST', data: ingredient});
    }

    return(
        <li >
            <div className='fa fa-caret-left mx-2'
                onClick={() => decrement(ingredient)}>{' '}</div>
            <ListDraggable dragData={ingredient}/>        
            <div className='fa fa-caret-right mx-2'
                onClick={() => increment(ingredient)}>{' '}</div>
            <button className={`btn btn-sm rounded rounded-circle border mx-1 py-0 mb-1 clickable
                highlight-ingredient ${state.highlightedIngredient === ingredient.name 
                ? 'highlighted' : ''}`}
                data-tip="Click to highlight meals that use this"
                onClick={() => {handleHighlightIngredient(ingredient.name)}}>
                <small>?</small>
            </button>
            <button type='button' className='btn-close meal-remove' 
                onClick={() => remove(ingredient)} 
                style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} 
                aria-label='Remove'>
            </button> 
            <ReactTooltip type='info' delayShow={500} data-effect='float'
                place='right'/>
        </li>
    );
}