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
        highlightDispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const increment = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) + 1;
        highlightDispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const remove = (ingredient) => {
        highlightDispatch({type: 'REMOVE_FROM_LIST', data: ingredient});
    }

    return(
        <li >
            <div className='btn btn-sm fa fa-caret-left mx-1 border mb-2 pt-2'
                onClick={() => decrement(ingredient)}>{' '}</div>
            <ListDraggable dragData={ingredient}/>        
            <div className='btn btn-sm fa fa-caret-right mx-1 border mb-2 pt-2'
                onClick={() => increment(ingredient)}>{' '}</div>
                <div style={{
                        display:'inline', 
                        textAlign:'end', 
                        marginRight:'0px',
                        color:'green'
                    }} className={`highlight-ingredient`}>
            <button className={`btn btn-sm rounded rounded-circle border mx-1 py-0 mb-1 clickable
                ${state.highlightedIngredient === ingredient.name 
                ? 'highlighted' : ''}`}
                data-tip="Click to highlight meals that use this"
                onClick={() => {handleHighlightIngredient(ingredient.name)}}>
                <small>?</small>
            </button>
            </div>
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