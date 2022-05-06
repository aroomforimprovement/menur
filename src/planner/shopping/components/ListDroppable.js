import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from "../../../main/MenurRouter";
import { ListIngredient } from "./ListIngredient";

export const ListDroppable = ({ list, tag }) => {
    
    const { dispatch } = useMainContext();
    
    const handleDrop = async (e) => {
        await dispatch({type: 'REMOVE_FROM_LIST', data: e.dragData});
        e.dragData.list = tag;
        dispatch({type: 'ADD_TO_LIST', data: e.dragData});
    }
    
    const ingredients = list ? list.map((ingredient, i) => {
        return <ListIngredient key={i} ingredient={ingredient} />
    }) : <></>;

    return(
        <DropTarget targetKey='list' 
                onHit={handleDrop}>
            <div className='user-list' >
                <ul className='list-unstyled'>{ingredients}</ul>
            </div>
        </DropTarget>
    );
}