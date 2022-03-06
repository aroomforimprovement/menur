import { useEffect, useState } from 'react';
import './searcher.scss';
import ReactSearchBox from 'react-search-box';
import { useMainContext } from '../../main/MenurRouter';

export const Searcher = ({mealsIncluded}) => {
    const { dispatch } = useMainContext();

    const [displayMeals, setDisplayMeals] = useState(null);
    const [searchHighlightIndex, setSearchHighlightIndex] = useState(0);
    const [showResults, setShowResults] = useState(true);
    const [mouseOver, setMouseOver] = useState(false);
    
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

    const handleChanged = (v) => {
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

    const handleBlur = (v, e) => {
        if(showResults && !mouseOver){setShowResults(false)};
    }

    const handleSearchClick = (v) => {
        displayMeals ? handleEntered(v, null) : console.debug("eating handleSearchClick");
    }
    
    useEffect(() => {
        const checkArrows = (e) => {
            if(showResults){
                if(e.keyCode === 38){
                    setSearchHighlightIndex(searchHighlightIndex - 1);
                }else if(e.keyCode === 40){
                    setSearchHighlightIndex(searchHighlightIndex + 1);
                }else if(e.keyCode === 13){
                    displayMeals && displayMeals[searchHighlightIndex] 
                    ? setSelection(displayMeals[searchHighlightIndex]) : 
                        console.log("useEffect: no displayMeals");
                } 
            }
        }

        document.addEventListener('keydown', checkArrows, false);

        return () => {
            document.removeEventListener('keydown', checkArrows, false);
        }
    });

    return(
        <div className={`searcher `}>
            <ReactSearchBox
                classNames={'col col-12 shadow shadow-sm'}
                placeholder='Search for meals...'
                onChange={handleChanged}
                onSelect={handleEntered}
                onBlur={handleBlur}
                onSearchClick={handleSearchClick}
                
            />
            <div hidden={!showResults} className={'col col-12 search-results'}>
                {mealDisplay}
            </div>
        </div>
    );
}