import React, { useReducer, useContext, createContext } from 'react';
import { Header, Footer } from './Header';
import { INIT_STATE } from '../shared/states';
import { Selector } from './Selector';
import { Suggestions } from './Suggestions';
import { reducer } from '../redux/Main';
import { MealPlan } from './MealPlan';
import { GenList } from './GenList';

const MainContext = createContext(INIT_STATE);

export const useMainContext = () => {
    return useContext(MainContext);
}

export const Main = () => {

    const [state, dispatch] = useReducer(reducer, window.localStorage.getItem('MENUR_STATE') 
        ? JSON.parse(window.localStorage.getItem('MENUR_STATE')) : INIT_STATE);
    const mainState = { state, dispatch };

    return(
        <div>
            <MainContext.Provider value={mainState}>
                <MainContext.Consumer>
                    {() => (
                        <div>
                        <Header className='header'/>
                        <div className='container'>
                            <div className='row'>
                                <Selector />
                                <Suggestions />                        
                            </div>
                            <div className='row'>
                                <MealPlan />
                            </div>
                            <div className='row'>
                                <GenList className='col col-3'/>
                            </div>
                        </div>
                       <Footer className='footer'/>
                    </div>
                    )}
                </MainContext.Consumer>
                
            </MainContext.Provider>
        </div>
    );
}