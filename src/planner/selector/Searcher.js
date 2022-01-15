import { useState } from 'react';
import './searcher.css';
import SearchField from 'react-search-field';
import { useMainContext } from '../../main/MenurRouter';
import { MEALS } from '../../shared/meals';

export const Searcher = () => {
    const {state, dispatch} = useMainContext();

    const [displayMeals, setDisplayMeals] = useState(null);
    const [searchHighlightIndex, setSearchHighlightIndex] = useState(0);
    const [showResults, setShowResults] = useState(true);
    const [mouseOver, setMouseOver] = useState(false);
    
    const mealsIncluded = state.showBasic ? state.showMine 
        ? MEALS.concat(state.meals)
        : MEALS : state.showMine ? state.meals : [];

    const setSelection = (selection) => {
        setDisplayMeals(null);
        dispatch({type: 'CHANGE_SELECTION', data: selection});
        dispatch({type: 'GET_SUGGESTIONS', data: selection.name});
    }

    const mealDisplay = displayMeals ? displayMeals.map((meal, i) => {
        const handleClick = (selection) => {
            setSelection(selection);
        }
        const handleHover = (hover, i) => {
            setSearchHighlightIndex(i);
            setMouseOver(hover);
        }
        return(   
            <option key={i} className={`search-result${i === searchHighlightIndex ? '-0' : ''}`}
                onMouseEnter={() => handleHover(true, i)}
                onMouseLeave={() => handleHover(false, 0)}
                onClick={() => handleClick(meal)} >
                    {meal.name}
            </option>
        );
    }) : <div></div>;

    const handleChanged = (v, e) => {
        const meals = v.length > 0 
            ? mealsIncluded.filter(meal => meal.name.indexOf(v) > -1)
            : null;
        setDisplayMeals(meals);
        setSearchHighlightIndex(0);
        if(!showResults){
            setShowResults(true);
        }
    }

    const handleEntered = (v, e) => {
        const selection = displayMeals[0];
        setSelection(selection, v);
    }

    const handleBlured = (v, e) => {
        if(showResults && !mouseOver){setShowResults(false)};
    }

    const handleSearchClick = (v) => {
        displayMeals ? handleEntered(v, null) : console.debug("eating handleSearchClick");
    }
    

    return(
        <div className={'searcher'}>
            <SearchField
                classNames={'col col-12 shadow shadow-sm'}
                placeholder='Search for meals...'
                onChange={handleChanged}
                onEnter={handleEntered}
                onBlur={handleBlured}
                onSearchClick={handleSearchClick}
            />
            <div hidden={!showResults} className={'col col-12 search-results'}>
                {mealDisplay}
            </div>
        </div>
    );
}