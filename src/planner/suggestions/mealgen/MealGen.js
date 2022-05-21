import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Container, Row, Col } from 'react-bootstrap';
import './mealgen.scss';
import { useMainContext } from '../../../main/MenurRouter';
import { getNewId } from '../../../utils/objUtils';
import toast from 'buttoned-toaster';
import { DEFAULT_SERVINGS } from '../../../shared/meals';
import { saveMeal } from '../../../utils/apiUtils';

export const MealGen = ({meal, edit, open}) => {
    const { state, dispatch } = useMainContext();
    const [isFormVisible, setIsFormVisible] = useState(edit);
    const [name, setName] = useState(meal && meal.name ? meal.name : '');
    const [ingredients, setIng] = useState(meal && meal.ingredients ? meal.ingredients : []);
    const [steps, setSteps] = useState(meal && meal.steps ? meal.steps : []);
    const [servings, setServings] = useState(meal && meal.servings ? meal.servings : DEFAULT_SERVINGS);
    const [hideSteps, setHideSteps] = useState(true);
    const [isViewer, setIsViewer] = useState(edit);
    
    const handleShowForm = () => {
        setIsFormVisible(!isFormVisible);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAddIngredient = (e) => {
        const nameField = document.getElementById(`ingredient_${ingredients.length}`);
        const typeField = document.getElementById(`type_${ingredients.length}`);
        const qtyField = document.getElementById(`qty_${ingredients.length}`); 
        let ingr = [...ingredients];
        const type = typeField.value
        let score = 0;
        if(type === 'fresh'){
            score = 4;
        }else if(type === 'tin'){
            score = 2;
        }else if(type === 'dry'){
            score = 3;
        }else if(type === 'cond' || type === 'spice'){
            score = 0;
        }
        let i = {name: nameField.value, type: type, qty: qtyField.value, score: score};
        if(i.name.length > 0){
            ingr.push(i);
            toast.success(`Ingredient added to new meal ${name}`);
        }
        setIng(ingr);    
    }

    const handleRemoveIngredient = (index) => {
        let ing = [...ingredients];
        ing.splice(index, 1);
        setIng(ing);
    }

    const handleAddStep = (i) => {
        console.dir(steps);
        const stepField = document.getElementById(`step_${steps.length}`);
        let savedSteps = [...steps];
        const step = stepField ? stepField.value : '';
        if(step.length > 0){
            savedSteps.push(step);
        }
        setSteps(savedSteps);
    }

    const handleRemoveStep = (index) => {
        let savedSteps = [...steps];
        savedSteps.splice(index, 1);
        setSteps(savedSteps);
    }

    const addSuggestion = (meal) => {
        dispatch({type: 'ADD_SUGGESTION', data: meal});
    }
    
    const getMealForSaving = () => {
        const id = edit && meal && meal.id ? meal.id : getNewId();
        return{
            id: id,
            name: name,
            ingredients: ingredients,
            servings: servings,
            steps: steps
        }
    }

    
    const handleAdd = (e) => {
        e.preventDefault();
        const mealToAdd = getMealForSaving();
        if(name && name !== ''){
            addSuggestion(mealToAdd);
            setName('');
            setIng([]);
            if(open !== undefined){
                open(false);
            }
        }else{
            toast.warn("Name your meal to save it");
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        const mealForSaving = getMealForSaving();
        const num = state.meals.length;
        
        const doSave = () => {
            if(name && name !== ''){
                saveMeal(mealForSaving, state.user, edit, toast).then((meal) => {
                    edit 
                    ? dispatch({type: 'UPDATE_SAVED_MEAL', data: mealForSaving})
                    : dispatch({type: 'ADD_SELECTOR_MEAL', data: mealForSaving});
                    toast.success("Meal saved ok");
                    return meal.id;
                });
                edit ? console.log() : addSuggestion(mealForSaving);
                setName('');
                setIng([]);
            }
        }

        const dismiss = (id) => {
            if(num < 10){
                doSave();
            }
            toast.dismiss(id)
        }

        if(name.toLowerCase().indexOf('leftover') > -1){
            toast.error(
                {
                    message: "Sorry, LEFTOVER is a reserved word. "+
                        "Change the name to save the meal",
                    duration: 4000,
                });
            return;
        }
        if(state.user && state.user.isAuth && !state.user.isVerified){
            if(num >= 5){
                toast.warn({
                    toastId: "MealLimit",
                    duration: 1661,
                    message: "You have saved " + num + " meals." +
                        "You can only have 10 saved meals until you verify your account." +
                        "Check your email and follow the verfication link remove this limit.",
                    approveFunc: dismiss,
                    dismissFunc: dismiss,
                    dismissTxt: "OK",
                    approveTxt: "Cool",
                })
            }else{
                doSave();
            }
        }else{
            doSave();
        }
    }
    
    const handleServingsChange = (e) => {
        setServings(e.target.value);
    }

    const IngredientField = ({ingredient, i}) => {
        
        const handleIngredientKeyDown = (e) => {
            if(e.key === 'Enter'){
                handleAddIngredient(e);
            }
        }

        return(
            <Container className='p-0'>
                <Row>
                    <Col xs={10}>
                        <InputGroup size='sm' onKeyDown={handleIngredientKeyDown} className='row'>
                            <FormControl size='sm' type='text' id={`ingredient_${i}`} placeholder='Ingredient'
                                defaultValue={ingredient && ingredient.name ? ingredient.name : ''} 
                                className='w-50'></FormControl>
                            
                            <Form.Select size='sm' type='select' id={`type_${i}`} 
                                defaultValue={ingredient && ingredient.type ? ingredient.type : 'fresh'}>
                                <option>fresh</option>
                                <option>dry</option>
                                <option>tin</option>
                                <option>spice</option>
                                <option>cond</option>
                            </Form.Select>
                            <FormControl size='sm' type='number' id={`qty_${i}`} placeholder={1}
                                defaultValue={ingredient && ingredient.qty ? ingredient.qty : 1}></FormControl>
                        </InputGroup>
                    </Col>
                    <Col xs={2}>
                        <button className='butt butt-standard-outline fa fa-plus my-1 py-2 mx-auto px-auto center'
                            style={{minWidth:'100%'}} onClick={handleAddIngredient}>{' '}
                        </button>
                    </Col>
                </Row>
            </Container>
        );
    }

    const ingredientFields = ingredients ? ingredients.map((ingredient, i) => {
        return(
            <div key={i} className='row hover-fade'>
                <p className='col col-11'>{ingredient.name} x{ingredient.qty} ({ingredient.type})</p>
                {isViewer 
                ? <div></div> 
                : <button className='btn btn-sm btn-close col col-1'
                    onClick={() => handleRemoveIngredient(i)}></button>}
            </div>
        );
    }) : <div></div>;

    let showFormClasses = ''

    const StepField = ({step, i}) => {

        const handleStepKeyDown = (e) => {
            if(e.key === 'Enter'){
                handleAddStep(i);
            }
        }

        return(
            <Container className='p-0'>
                <Row>
                    <Col xs={10}>
                        <InputGroup size='sm' onKeyDown={handleStepKeyDown} className='row'>
                            <FormControl size='sm' as={'textarea'} id={`step_${i}`} placeholder={`Step ${i+1}`}
                                defaultValue={step ? step : ''} className='w-75'></FormControl>
                        </InputGroup>
                    </Col>
                    <Col xs={2}>
                        <button className={`butt butt-standard-outline fa fa-plus my-1 py-2 mx-auto px-auto center`}
                            style={{minWidth:'100%', display:'inline'}} onClick={handleAddStep}
                        ></button>
                    </Col>
                </Row>
            </Container>
        );
    }

    const stepFields = steps ? steps.map((step, i) => {
        return(
            <div key={i} className='row hover-fade'>
                <p className='col col-11'>{`${i+1}. ${step}`}</p>
                {isViewer ? <div></div> : 
                    <button className='btn btn-sm btn-close col col-1 clickable'
                    onClick={() => handleRemoveStep(i)}></button>}
            </div>
        );
    }) : <div></div>;

    return(
        <div className='container meal-gen shadow shadow-lg p-0 mt-3 mb-3'>
            <div hidden={true} >{edit ? '' : isFormVisible ? showFormClasses = ' fa-caret-up' : showFormClasses = 'fa-caret-right'}</div>
            <div className='col col-12 meal-gen-toggle border border-1 rounded-3'>
                <div className='butt butt-standard col col-12 meal-gen-toggle-btn pt-2'
                    onClick={edit ? ()=>{} : handleShowForm} text={edit ? isViewer ? `Viewing ${meal.name}` : `Editing ${meal.name}` : `Create a new meal`}>
                        <div className={`fa fa-lg ${showFormClasses} ms-2`}>{' '}</div>
                        <h6 style={{display:'inline-block'}}className={'ms-3'}>
                            {edit ? isViewer
                            ? `Viewing ${meal.name}` 
                            :    `Editing ${meal.name}` 
                            : isFormVisible ? 
                                'Close meal creation' : 'Create a new meal'}
                            </h6>
                        
                </div>
            </div>
            <div hidden={!isFormVisible} className={isFormVisible ? 'meal-gen-in' : 'meal-gen-out'} > {/*hidden={!isFormVisible} >*/}
                <div className='container meal-gen-container'>
                    <Row>
                        <Col xs={edit ? 10 : 12}>
                            {isViewer 
                            ? <h5 className={`p-2 pt-4`}>{name}</h5>
                            : <div>
                                <Form.Label className='mb-1 mt-2'>
                                    <h6>Meal name:</h6>
                                </Form.Label>
                                <InputGroup size='sm'>
                                    <FormControl 
                                        type='text' 
                                        id='name' 
                                        placeholder='Meal name'
                                        onChange={handleNameChange} 
                                        style={name.toLowerCase().indexOf('leftover') > -1 ? {borderColor: 'red'}: {}}
                                        value={name}></FormControl>
                                </InputGroup>
                                <small style={{color:'red'}}>{name.toLowerCase().indexOf('leftover') > -1 
                                    ? "Sorry, you can't use the word 'leftover' in a meal name" : ''}</small>
                            </div>}
                        </Col>
                        {edit ? <Col xs={1}>
                            <button className={`butt butt-alternate fa fa-lg rounded rounded-circle
                                p-3 mt-3 ${isViewer ? 'fa-edit' : 'fa-eye'}`}
                                onClick={() => {setIsViewer(!isViewer)}}></button>
                        </Col> : <div></div>}
                    </Row>
                    <div className={`row mt-${isViewer ? '0' : '2'}`}>
                        <div className='col col-10'>
                            {isViewer 
                            ? <small>{`${state.defaultServings ? state.defaultServings : DEFAULT_SERVINGS} servings + ${state.defaultServings ? parseInt(servings && servings !== 'DEFAULT' ? servings : DEFAULT_SERVINGS) - parseInt(state.defaultServings) : parseInt(servings && servings !== 'DEFAULT' ? servings : DEFAULT_SERVINGS) - DEFAULT_SERVINGS} leftovers`}</small>
                            : <InputGroup size='sm' >
                                <Form.Label size='sm' htmlFor='servings' className='col col-8'>
                                    <strong>Servings:</strong>
                                </Form.Label>
                                <FormControl type='number' id='servings' defaultValue={DEFAULT_SERVINGS}
                                    onChange={handleServingsChange} size="sm"
                                    className='col col-5 ps-2 w-25'></FormControl>
                                <small>{`${state.defaultServings ? state.defaultServings : DEFAULT_SERVINGS} servings + ${state.defaultServings ? parseInt(servings && servings !== 'DEFAULT' ? servings : DEFAULT_SERVINGS) - parseInt(state.defaultServings) : parseInt(servings && servings !== 'DEFAULT' ? servings : DEFAULT_SERVINGS) - DEFAULT_SERVINGS} leftovers`}</small>
                            </InputGroup>}
                        </div>
                    </div>
                    <div>
                        <Form.Label size='sm' className='mt-2'>
                            <h6 style={{display:'inline'}} className='me-1'>Ingredients:</h6>
                            {isViewer 
                            ? <div></div>
                            : <small style={{fontSize: 'small', fontStyle:'italic'}}>Use | character to separate options, like "Fresh tomatoes|Canned tomatoes", if either will do</small>}
                        </Form.Label>
                        <div id='ingredient-slot'>
                            {ingredientFields}
                        </div>
                        {isViewer 
                        ? <div></div> 
                        : <IngredientField i={ingredients.length} />}
                    </div>    
                    <div>
                        <Form.Label size='sm' className='mt-2'>
                            <Row >
                                <Col xs={11}>
                                    <h6 style={{display:'inline'}} className='me-1'>Steps:</h6>                                
                                </Col>
                                {isViewer ? <div></div>
                                : <Col xs={1}>
                                    <button className={`butt butt-standard rounded rounded-circle
                                        fa ${ hideSteps ? 'fa-eye' : 'fa-eye-slash'}`}
                                        onClick={() => {setHideSteps(!hideSteps)}}
                                    ></button>
                                </Col>}
                            </Row>
                                {isViewer ? <div></div>
                                : <small style={{fontSize: 'small', fontStyle:'italic'}}>
                                    Optionally add some notes on the steps to make your meal
                                </small>}
                            </Form.Label>
                        {hideSteps && !isViewer
                        ? <div></div> 
                        : <div>
                            <div id='step-slot'>
                                {stepFields}
                            </div>
                            {isViewer ? <div></div> 
                            :<StepField i={steps.length} />}
                        </div>}
                    </div>
                    {isViewer ? <div></div> 
                    : <div className='row ing-row pb-3'>
                        <div className='col col-3'></div>                       
                        {edit ? <div></div> : <button className='butt butt-standard col col-12 mx-1 mt-3'
                            onClick={handleAdd}>Add meal to suggestions</button>}
                        {state && state.user && state.user.isAuth ?
                            <button className='butt butt-good col col-12 mx-1 mt-1 mb-3'
                            onClick={handleSave}>Save meal to account</button> : <div></div>
                        }
                    </div>}
                </div>
            </div>
        </div>
    );
}