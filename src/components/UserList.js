import React from "react";
import { DropTarget } from 'react-drag-drop-container';
import { ListItem } from "./ListItem";
import { useMainContext } from "./Main";


export const UserList = ({list}) => {
    const { state, dispatch } = useMainContext();

    const handleDragEnter = () => {
        //console.log("enter");
    }
    const handleDragLeave = () => {

    }
    const handleDrop = async (e) => {
        await dispatch({type: 'REMOVE_FROM_LIST', data: e.dragData});
        e.dragData.list = list;
        dispatch({type: 'ADD_TO_LIST', data: e.dragData});
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
    const remove = (i) => {
        dispatch({type: 'REMOVE_FROM_LIST', data: i});
    }

    const ingredients = state[list].map((ingredient, i) => {
        return(
            state[list].length > 0
                ? 
                <li key={ingredient.name}>
                    <div className='fa fa-caret-left me-1'
                        onClick={() => decrement(ingredient)}>{' '}</div>
                    <ListItem dragData={ingredient}/>
                    <div className='fa fa-caret-right ms-1'
                        onClick={() => increment(ingredient)}>{' '}</div>
                    <div className='fa list-remove'
                        onClick={() => remove(ingredient)}>x
                    </div>
                </li>
                : <div></div>
        );
    });

    return(
        
        <DropTarget targetKey='list' 
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                onHit={handleDrop}>
            <div className='user-list' >
                <ul className='list-unstyled'>{ingredients}</ul>
            </div>
        </DropTarget>
    );
}