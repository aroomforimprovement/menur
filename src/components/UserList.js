import React from "react";
import { DropTarget } from 'react-drag-drop-container';
import { ListItem } from "./ListItem";
import { useMainContext } from "./Main";


export const UserList = ({list}) => {
    const { state, dispatch } = useMainContext();

    const handleDragEnter = () => {
        console.log("enter");
    }
    const handleDragLeave = () => {

    }
    const handleDrop = async (e) => {
        await dispatch({
            type: 'REMOVE_FROM_'+e.dragData.list, 
            data: e.dragData
        });
        e.dragData.list = list;
        console.log("dragData");
        console.dir(e.dragData);
        dispatch({type: 'ADD_TO_'+list, data: e.dragData});
    }

    const ingredients = state[list].map((ingredient, i) => {
        return(
            state[list].length > 0
                ? 
                <li key={ingredient.name}>
                    <ListItem dragData={ingredient}/>
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