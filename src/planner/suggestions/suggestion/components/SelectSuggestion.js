import React from "react";
import { Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { ToastConfirm, toastConfirmStyle } from "../../../../common/Toasts";
import { useMainContext } from "../../../../main/MenurRouter";


export const SelectSuggestion = ({keyProp, dragData}) => {
    const {state, dispatch} = useMainContext();

    const PlusToggle = React.forwardRef(({ children, onClick }, ref) => (
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

    const addMealFromSuggestion = (day, mealtime) => {
        dragData.day = day;
        dragData.mealtime = mealtime;
        const addMeal = (t) => {
          toast.dismiss(t);
          dispatch({type: 'ADD_MEAL', data: dragData});
        }

        const addAndSaveMeal = (t) => {
          toast.dismiss(t);        
          dispatch({type: 'ADD_MEAL', data: dragData});
          //saveMealToAccount
        }

        const hasMeal = (meal) => {
          if(state.meals && meal.id){
            for(let i = 0; i < state.meals.length; i++){
              if(state.meals[i].id && state.meal.id === meal.id){
                return true;
              }
            }
          }
          return false;
        }
            
        state.showBasic && state.meals 
          && !window.localStorage.getItem(`dontshow_SAVE_MEAL`) && !hasMeal(dragData.meal)
        ? toast((t) => (
            <ToastConfirm t={t} approve={addAndSaveMeal} approveBtn={'Save to account'}
              dismiss={addMeal} dismissBtn={`Don't save`}
              message={`Would you like to save this meal to your account so you can customize it later?`}
            />
            ), toastConfirmStyle())
            : addMeal(); 
    }
    
    const handleMealtimePickerSelect = () => {
      addMealFromSuggestion(state.mealtimePickerDay, state.mealtimePickerMealtime);
    }

    const DropToSelectDay = ({day, keyProp, dragData}) => {
        const swallowClick = (e) => {
          e.preventDefault();
        }
          
        const handleClickMealtime = (day, mealtime) => {
            addMealFromSuggestion(day, mealtime);
        }

          return(
            <li onClick={swallowClick}>
                <Dropdown drop={'right'} as={'div'} 
                    id={`${day}${keyProp}`} 
                    onClick={swallowClick}
                    >
                    <Dropdown.Toggle as={'div'} className={`sugg-click-add-day`}>
                        <small>{day}</small>        
                    </Dropdown.Toggle>
                    <Dropdown.Menu aria-labelledby={`${day}${keyProp}`}>
                        <Dropdown.Item onClick={() => handleClickMealtime(day, "Dinner")}>
                            <small>Dinner</small>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleClickMealtime(day, "Lunch")}>
                            <small>Lunch</small>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleClickMealtime(day, "Breakfast")}>
                            <small>Breakfast</small>
                        </Dropdown.Item >
                    </Dropdown.Menu>
                </Dropdown>
            </li>
          )
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"].map((day) =>{
      const swallowClick = (e) => {e.preventDefault()}
      return(
        <div key={`${day}${keyProp}`} onClick={swallowClick}>
            <DropToSelectDay day={day} keyProp={keyProp} dragData={dragData}/>
        </div>
    );
  });
  

  return(
      <Dropdown drop={'left'} className='sugg-drop' >           
          <Dropdown.Toggle
              as={PlusToggle} 
              id={`suggDrop_${keyProp}_days`} 
              size='sm' >
          </Dropdown.Toggle>  
          {state.isMealtimePickerClosed 
              ?
              <Dropdown.Menu  >
                  {days}
              </Dropdown.Menu>
              :
              <Dropdown.Menu>
                  <Dropdown.Item onClick={handleMealtimePickerSelect}>
                      <span>{`Add to plan for ${state.mealtimePickerMealtime} 
                          on ${state.mealtimePickerDay}`}</span>
                  </Dropdown.Item>
              </Dropdown.Menu>
          }
      </Dropdown>
  );
}
