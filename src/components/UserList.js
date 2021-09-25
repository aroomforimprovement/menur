import React from "react";
import { DropTarget } from 'react-drag-drop-container';


export const UserList = () => {
    
    const handleDragEnter = () => {

    }
    const handleDragLeave = () => {

    }
    const handleDrop = () => {

    }

    return(
        <DropTarget targetKey='list' 
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                onHit={handleDrop}>
                <div>nothing yet</div>
        </DropTarget>
    );
}