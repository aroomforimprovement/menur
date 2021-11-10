import React, { useState } from 'react';
import { DummyMealPlanSlot } from './DummyMealPlanSlot';
import { Row, Col, Container } from 'react-bootstrap';
import { days, mealtimes } from '../../shared/states';


export const DummyMealPlan = ({mealplan, name}) => {

    const [ isLandscape, setIsLandscape ] = useState(true);

    const toggleOrientation = () => {
        setIsLandscape(!isLandscape);
    }

    const LandscapeRow = ({mealtime}) =>{
        const mealslots = days.map((day) => {
            return(
                <Col xs={1} className={'dummy-plan-header p-0 m-2'} key={day}>
                    <DummyMealPlanSlot mealplan={mealplan} isLandscape={isLandscape}
                        mealtime={mealtime} day={day}/>
                </Col>
            );
        });
        return(
            <Row>
                <Col xs={1} className={'dummy-plan-header px-0 m-1 pt-3 pb-1'}>{mealtime}</Col>
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
                <Col xs={1} className={'dummy-plan-header p-0 m-2'} key={day}>{day}</Col>
            );
        });
        return(
            <Container>
                <Row>
                    <Col xs={1} className={'dummy-plan-header p-0 m-1'}>*</Col>
                    {header}
                </Row>
                {rows}
            </Container>
        );
    }

    const PortraitRow = ({day}) => {
        const mealslots = mealtimes.map((mealtime) => {
            return(
                <Col className={'dummy-plan-header'} key={mealtime}>
                    <DummyMealPlanSlot 
                        mealplan={mealplan} isLandscape={isLandscape} 
                        mealtime={mealtime} day={day}/>
                </Col>
            );
        });
        return(
            <Row>
                <Col>{day}</Col>
                {mealslots}
            </Row>
        )
    }

    const PortraitPlan = () => {
        const rows = days.map((day) => {
            return(
                <PortraitRow key={day} day={day}/>
            );
        });
        const header = mealtimes.map((day) => {
            return(
                <Col className={'dummy-plan-header'} key={day}>{day}</Col>
            )
        });
        return(
            <Container>
                <Row>
                    <Col className={'dummy-plan-header p-0 m-1'}>*</Col>
                    {header}
                </Row>
                {rows}
            </Container>
        );
    }




       
    return(
        <div className={'dummy-plan'}>{/*className={`mealplan-${isLandscape ? 'ls' : 'pt'}`}>*/}
            <Row>
                <Col><h6>{name}</h6></Col>
                <Col>
                    <button onClick={toggleOrientation} 
                        className={`border shadow mt-1 ${isLandscape 
                        ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>
                            {isLandscape ? "[ || ] " : "[ = ] "}
                    </button>
                </Col>
            </Row>
            {isLandscape ? <LandscapePlan /> : <PortraitPlan />}
        </div>
    );
}