import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './suggestion.css';
import { useMainContext } from '../../../main/MenurRouter';
import { DragDropContainer } from 'react-drag-drop-container';
import { DELIM, OR} from '../../../shared/meals';
import { getIngredientsFromMeal } from '../../../utils/objUtils';

export const PlusToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='border rounded-circle custom-toggle plus-toggle'
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <small>{'+'}</small>
      {children}
    </div>
));

export const InfoToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='border rounded-circle custom-toggle info-toggle'
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <small>{'i'}</small>
      {children}
    </div>
));


export const DropToSelectDay = ({day, keyProp, dragData}) => {

    const {dispatch} = useMainContext();

    const swallowClick = (e) => {
        e.preventDefault();
    }
    
    const handleClickMealtime = (dragData, mealtime) => {
            dragData.day = day;
            dragData.mealtime = mealtime;
            dispatch({type: 'ADD_MEAL', data: dragData});
    }

    return(<li onClick={swallowClick}>
        <Dropdown drop={'right'} as={'div'} 
            id={`${day}${keyProp}`} 
            onClick={swallowClick}
            >
            <Dropdown.Toggle as={'div'} className={`sugg-click-add-day`}>
                <small>{day}</small>        
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby={`${day}${keyProp}`}>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Dinner")}>
                    <small>Dinner</small>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Lunch")}>
                    <small>Lunch</small>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Breakfast")}>
                    <small>Breakfast</small>
                </Dropdown.Item >
            </Dropdown.Menu>
        </Dropdown>
    </li>)
}

export const dropSelectDays = (keyProp, dragData) => {
    const swallowClick = (e) => {e.preventDefault()}
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const lists = days.map((day) => {
        return(
            <div key={`${day}${keyProp}`} onClick={swallowClick}>
                <DropToSelectDay day={day} keyProp={keyProp} dragData={dragData}/>
            </div>
        );
    });
    return lists;
}


export const ClickAddToMealPlan = ({keyProp, dragData}) => {
    const days = dropSelectDays(keyProp, dragData);
    return(
        <Dropdown drop={'left'} >           
            <Dropdown.Toggle
                as={PlusToggle} 
                id={`suggDrop_${keyProp}_days`} 
                size='sm' >
            </Dropdown.Toggle>  
            <Dropdown.Menu  className='sugg-drop'>
                {days}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export const ClickToExpandMeal = ({ingredients, keyProp, dragData}) => {
    const {state, dispatch} = useMainContext();
    const handleToggle = (isOpen) => {
        console.dir(isOpen);
        if(isOpen){
            dispatch({type: 'SET_SELECTED_SUGGESTION', data: dragData.meal});
        }else{
            dispatch({type: 'UNSET_SELECTED_SUGGESTION', data: dragData.meal});
        }
    }
    return(
    <Dropdown onToggle={handleToggle} 
        drop={'right'} show={state.selectedSuggestion.name === dragData.meal.name}>
        <Dropdown.Toggle 
            as={InfoToggle} 
            id={`suggDrop_${keyProp}`}
            size='sm'  >
        </Dropdown.Toggle>  
        <Dropdown.Menu  className='sugg-drop'>
            {ingredients}
        </Dropdown.Menu>
    </Dropdown>
    )
}

export const Suggestion = ({dragData, keyProp}) => {
    let classes = '';
    if(dragData.meal.score >= 10){
        classes = classes + ' sugg-good';
    }else if(dragData.meal.score >= 8){
        classes = classes + ' sugg-ok';
    }else if(dragData.meal.score >= 6){
        classes = classes + ' sugg-bad';
    }else{
        classes = classes + ' sugg-none';
    }
    const { state, dispatch } = useMainContext();
    
    const handleDrop = (e) => {
        if(e.dragData.meal.name.indexOf('Leftover') > -1){
            dispatch({type: 'REMOVE_LEFTOVER', data: e.dragData.meal});
        }
    }

    const handleItemClick = (e) => {
        e.preventDefault();
    }

    const ingredients = dragData.meal.ingredients.map((ing, i) => {
        const meal = {...state.selection};
        let classes = 'sugg-ingredient ';
        const mealIngredients = getIngredientsFromMeal(meal);
        outer: for(let ind = 0; ind < mealIngredients.length; ind++){
            if(ing.name.indexOf(DELIM) > -1){
                const splits = ing.name.split(DELIM);
                for(let index = 0; index < splits.length; index++){
                    if(mealIngredients[ind].name.toLowerCase() === splits[index].toLowerCase()){
                        if(!classes.indexOf('bold') > -1){
                            classes += 'bold';
                            break outer;
                        }        
                    }
                }
            }else if(mealIngredients[ind].name.toLowerCase() === ing.name.toLowerCase()){
                if(!classes.indexOf('bold') > -1){
                    classes += 'bold';
                    break;
                }
            }
        }
        
        return(
            <div key={i}>            
                {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') 
                    ? null 
                    : <Dropdown.Item as='div' onClick={handleItemClick}>
                        <span className={''+classes}>
                            {ing.name.replaceAll(DELIM, OR)}
                        </span>
                    </Dropdown.Item>}
            </div>
        );
    });

    
    return(
        <div className={`sugg-container me-1 mb-1`}>
            <DragDropContainer targetKey='meal' onDrop={handleDrop} 
                dragData={dragData} className={'dd-container'}>         
                    <div className={`border rounded rounded-pill shadow shadow-sm px-4 ${classes}`}>
                        <h5 className='suggestion-text'>
                            {dragData.meal.name}                                     
                        </h5>
                    </div>    
                    <ClickAddToMealPlan keyProp={keyProp}  dragData={dragData} className='sugg-click-add'/> 
                    <ClickToExpandMeal keyProp={keyProp} ingredients={ingredients} dragData={dragData} className='sugg-expand'/>
            </DragDropContainer>
        </div>
    );
}
