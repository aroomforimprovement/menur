import React from 'react';
import { MealPlanSlot } from './MealPlanSlot';
import { Leftovers } from './Leftovers.js';
import { useMainContext } from './MenurRouter';
import { Row, Col, Container } from 'react-bootstrap';
import { days, mealtimes } from '../shared/states';

export const MealPlan = () => {

    const { state, dispatch } = useMainContext();

    const toggleOrientation = () => {
        dispatch({type: 'SET_IS_LANDSCAPE', data: !state.isLandscape})
    }

    const LandscapeRow = ({mealtime}) =>{
        const mealslots = days.map((day) => {
            return(
                <Col xs={1} className={'mealplan-header p-0 m-2'} key={day}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </Col>
            );
        });
        return(
            <Row>
                <Col xs={1} className={'mealplan-header px-0 m-1 pt-3 pb-1'}>{mealtime}</Col>
                {mealslots}
            </Row>
        )
    }

    const LandscapePlan = () => {
        const rows = mealtimes.map((mealtime) => {
            return(
                <LandscapeRow key={mealtime} mealtime={mealtime} />
            );
        });
        const header = days.map((day) => {
            return(
                <Col xs={1} className={'mealplan-header p-0 m-2'} key={day}>{day}</Col>
            );
        });
        return(
            <Container className='mealplan-container'>
                <Row>
                    <Col xs={1} className={'mealplan-header p-0 m-1'}>*</Col>
                    {header}
                </Row>
                {rows}
                <div className='leftover-col col col-12 ms-2'>
                    <h5 >Leftovers: </h5>
                    <Leftovers />
                </div>
            </Container>
        );
    }

    const PortraitRow = ({day}) => {
        const mealslots = mealtimes.map((mealtime) => {
            return(
                <Col className={'mealplan-header mt-2 mx-1'} key={mealtime}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </Col>
            );
        });
        return(
            <Row>
                <Col className='pt-3'>{day}</Col>
                {mealslots}
            </Row>
        )
    }

    const PortraitPlan = () => {
        const rows = days.map((day) => {
            return(
                <PortraitRow  key={day} day={day}/>
            );
        });
        const header = mealtimes.map((day) => {
            return(
                <Col className={'mealplan-header m-2'} key={day}>{day}</Col>
            )
        });
        return(
            <Container>
                <Row>
                    <Col className={'mealplan-header p-0 m-1'}>*</Col>
                    {header}
                </Row>
                {rows}
                <div className='leftover-col col col-12 ms-2'>
                    <h5 >Leftovers: </h5>
                    <Leftovers />
                </div>
            </Container>
        );
    }

    
    return(
        <div className={`mealplan-${state.isLandscape ? 'ls' : 'pt'}`}>
            <button onClick={toggleOrientation} className={`mt-4 py-2 px-3 border shadow ${state.isLandscape ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>{state.isLandscape ? "[ || ] " : "[ = ] "} Toggle Orientation</button>
            <div className='mt-2'>
            {
                state.isLandscape ? <LandscapePlan /> : <PortraitPlan />
            }
            </div>
        </div>
    );
}