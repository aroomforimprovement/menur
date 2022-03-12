import React from "react";
import { Dropdown } from "react-bootstrap";
import { useMainContext } from "../../../../main/MenurRouter";
import { addMealToast } from "../../../../utils/toastUtils";


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
    
    const handleMealtimePickerSelect = () => {
      addMealToast({
        showBasic: state.showBasic,
        meals: state.meals, 
        dispatch: dispatch, 
        meal: dragData.meal, 
        day: state.mealtimePickerDay, 
        mealtime: state.mealtimePickerMealtime,
        user: state.user
      });
    }

    const DropToSelectDay = ({day, keyProp, dragData}) => {
        const swallowClick = (e) => {
          e.preventDefault();
        }
          
        const handleClickMealtime = (day, mealtime) => {
            addMealToast({
              showBasic: state.showBasic,
              meals: state.meals,
              dispatch: dispatch,
              meal: dragData.meal,
              day: day,
              mealtime: mealtime,
              user: state.user
            });
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
