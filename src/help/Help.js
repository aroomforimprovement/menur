import React, {useState} from 'react';
import './help.scss';
import { PrivacyPolicy } from './PrivacyPolicy';

export const Help = () => {

    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    
    const handleTogglePrivacy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy)
    }
    
    return(
        <div className='help-page container'>
            <div className='row'>
                <div className='col col-12 col-md-6 m-0'>
                    <div className='p-5 jum'>
                        <div className='p-5 jim'>
                            <h3>What is Menur?</h3>
                            <p>Menur is a household utility created to simplify the process 
                                of planning your meals for the week and making sure you have
                                everything you need to make those meals while cutting down on waste.
                            </p>
                        </div>
                        <div className='p-5'>
                            <h3>Sounds useful, is it free?</h3>
                            <p>The app is a hobby project and is free to use.
                            </p>
                        </div>
                        <div className='p-5 jim'>
                            <h3>Awesome, but I need an account?</h3>
                            <p>You can use the app without an account as long as you are
                                happy to only eat meals from the limited selection in the
                                Basic Meals we've provided or creating new meals every time
                                you want to plan your week.
                            </p>
                            <p>With a free account, you can create and save meals as well
                                as saving your meal plans to re-use or edit later.
                            </p>
                        </div>
                        <div className='p-5'>
                            <h3>Ok, so what are you doing with my data?</h3>
                            <p>When you create an account, you authorise it via <a href='https://auth0.com' alt='auth0' target='_blank' rel='noreferrer'>auth0</a>, the industry
                                standard in authentication. The Menur app saves your email address and name in order to 
                                ensure no duplicate accounts. Otherwise, the only data we store 
                                is the data you create - your meals and meal plans.
                            </p>
                            <p>We have no plans to do anything else with any data you submit. 
                                You can review the full Privacy Policy below.
                            </p>
                        </div>
                        <div className='p-5 jim'>
                            <h3>And what about cookies? I've heard of cookies.</h3>
                            <p>Cookies are small files stored in your browser that facilitate certain
                                website functionality. Menur uses these types of files to record 
                                some choices you make to make the site work the way you want to, 
                                like whether you have acknowledged that it's ok for the app to use cookies.
                                We'll probably need to add more in the future but we'll let you know about that.
                                </p><p>Auth0 stores a cookie to let it know whether you are logged into the app.
                                </p><p>Menur does NOT use cookies or any other method to track your activity on
                                the site or anywhere on the internet.
                            </p>
                        </div>
                        <div className='p-5'>
                            <h3>This all sounds great!</h3>
                            <p>Yeah, it's pretty sweet.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col col-12 col-md-6 m-0'>
                    <div className='p-5 jum'>
                        <h3>How do I use this app?</h3>
                        <ul className='list-unstyled'>
                            <div className='p-5'>
                                <li>
                                    <h5>1. Select a meal from the dropdown list:</h5>
                                    <img className='col col-12' src='/assets/help/help_001.png' alt='Select a meal'/>
                                </li>
                            </div>
                            <div className='p-5 jim'>
                                <li>
                                    <h5>2. The app will suggest meals with similar ingredients</h5>
                                    <img className='col col-12' src='/assets/help/help_002.png' alt='Meal suggestions'/>
                                </li>
                            </div>
                            <div className='p-5'>
                                <li>
                                    <h5>3. Drag the meal or use the controls to add it to your meal plan</h5>
                                    <img className='col col-12' src='/assets/help/help_003.png' alt='Drag meal to meal plan'/>
                                </li>
                            </div>
                            <div className='p-5 jim'>
                                <li>
                                    <h5>4. If the meal has more than 2 servings, some leftovers will be created, and
                                        these can be dropped into the meal plan too.
                                    </h5>
                                    <img className='col col-12' src='/assets/help/help_004.png' alt='Select a meal'/>
                                </li>
                            </div>
                            <div className='p-5'>
                                <li>
                                    <h5>5. When you're done with the meal plan, you can download a pdf of the plan and
                                        generate a shopping list of everything you need for the week.
                                        You can drag the list items into separate lists, adjust the quantities and copy 
                                        the contents.
                                    </h5>
                                    <img className='col col-12' src='/assets/help/help_005.png' alt='Select a meal'/>
                                </li>
                            </div>
                            <div className='p-5 jim'>
                                <li>
                                    <h5>There are other features, click around and see what's possible.
                                        You'll probably want to add your own meals - try the button above the
                                        Suggestions list to get started with that:
                                    </h5>
                                    <img className='col col-12' src='/assets/help/help_006.png' alt='Select a meal'/>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='jum '>
                <div className='privacy-btn col col-12'>
                <button onClick={handleTogglePrivacy}
                    className='btn btn-info col col-11 m-auto privacy-btn'>{showPrivacyPolicy ? 'Hide' : 'Show'} Privacy Policy</button>
                </div>
                <div hidden={!showPrivacyPolicy}>
                    <PrivacyPolicy />
                    
                </div>
            </div>
        </div>
    );
}