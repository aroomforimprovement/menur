import React, { useEffect } from "react";
import '../css/plan.scss';
import { DownloadableMealPlanLandscape, DownloadableMealPlan, GetSingleShoppingList } from "../../utils/pdfUtils";
import { pdf } from "@react-pdf/renderer";
import { useMainContext } from "../../main/MenurRouter";
import { useToastRack } from 'buttoned-toaster';
import { DummyMealPlan } from "./DummyMealPlan";
import PDFMerger from "pdf-merger-js";
import { saveAs } from "file-saver";

const apiUrl = process.env.REACT_APP_API_URL;
const proxy = process.env.REACT_APP_PROXY_URL;

export const Plan = ({plan, isLandscape}) => {
    
    const {state, dispatch} = useMainContext();
    const toast = useToastRack();

    const deletePlan = async () => {
        return await fetch(`${proxy}${apiUrl}plan/${plan.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.access}`
            }
        }).then(response => {
            if(response.ok){
                return response;
            }
        }, error => {

            console.error(error);
        }).catch((error) => {
            console.error(error);
            return error;
        });
    }
    const handleDeletePlan = () => {
        const setPlanDeleted = (id) => {
            toast.dismiss(id);
            deletePlan().then((response) => {
                if(response && response.ok){
                    toast.success('Mealplan deleted ok');
                    //window.location.href = '/account';
                    dispatch({type: 'REMOVE_SAVED_PLAN', data: plan.id});
                }else{
                    toast.error('Error deleting Mealplan');
                    console.error("handleDeletePlan: response not ok");
                }
            });
        }
        const setIsCancelled = (id) => {
            toast.dismiss(id);
        }
        toast.fire({
            approveFunc: setPlanDeleted, 
            dismissFunc: setIsCancelled,
            message: 'Are you sure you want to delete this meal plan?',
            approveBtn: 'Delete', 
            dismissBtn: 'Cancel'
            }
        );
    }
    const handleOpenPlan = () => {

        const setIsEdit = (id) => {
            toast.dismiss(id);
            window.location.href = `/planner/${plan.id}/1`;
        }

        const setIsCopy = (id) => {
            toast.dismiss(id);
            window.location.href = `/planner/${plan.id}/0`;
        }

        const setIsCancelled = (id) => {
            toast.dismiss(id);
        }

        toast.fire({
            dismissFunc: setIsCancelled,
            dismissText: 'Cancel',
            moreOptions: [
                {
                    handler: setIsEdit,
                    btnText: 'Edit this one'
                },
                {
                    handler: setIsCopy,
                    btnText: 'Create a copy',
                }
            ]
        })

        
    }

    useEffect(() => {
        const download = async () => {
                const mealplanBlob = await pdf(
                    state.isLandscape 
                        ? DownloadableMealPlanLandscape({mealplan: plan.mealplan})
                        : DownloadableMealPlan({mealplan: plan.mealplan})).toBlob();
                const shoppingListBlob = await GetSingleShoppingList({list: state.genListTemp.list, heading: state.genListTemp.heading});
                const merger = new PDFMerger();
                await merger.add(mealplanBlob);
                await merger.add(shoppingListBlob);
            
                const blob = await merger.saveAsBlob();
                blob instanceof Blob
                    ? saveAs(blob, `Menur Plan - ${plan.mealplan.name ? plan.mealplan.name : Date.now()}`)
                    : console.warn("no blob");
                dispatch({type: 'SET_IS_GENERATING_LIST', 
                    data: {isGenerating: false, mealplanDownloading: null}});
            }
        if(state.isGeneratingList && state.mealplanDownloading === plan.id){
            if(state.genListTemp && state.genListTemp.list && state.genListTemp.list.length > 0){
                download();
            }
        }
    }, [state.isGeneratingList, state.genListTemp, state.isLandscape, state.mealplan, dispatch, plan.mealplan, state.mealplanDownloading, plan.id]);

    
    const handleDownload = async () => {
        const cancel = (id) => {
            toast.dismiss(id);
        }
        const downloadWithShoppingList = async (id) => {
            dispatch({type: 'SET_IS_GENERATING_LIST', data: {isGenerating: true, mealplanDownloading: plan.id}});
            dispatch({type: 'GEN_LIST', data: {main: false, mealplan: plan.mealplan}});
            toast.dismiss(id);
        }


        const downloadWithoutShoppingList = async (id) => {
            const blob = await pdf(
                state.isLandscape 
                ? DownloadableMealPlanLandscape({mealplan: state.mealplan})
                : DownloadableMealPlan({mealplan: state.mealplan})).toBlob();
            saveAs(blob, `Menur Plan - ${state.mealplan.name ? state.mealplan.name : Date.now()}`)
            toast.dismiss(id);
        }

        toast.fire(
            {   
                message:'Would you like to download this meal plan with a generated shopping list attached?',        
                dismissFunc: cancel,
                dismissTxt: 'Cancel', 
                moreOptions: [
                    {
                        handle: downloadWithShoppingList,
                        btnText: "With",
                    }, 
                    {
                        handler: downloadWithoutShoppingList,
                        btnText: "Without"
                    }
                ]
            }
        );
    }

    return(
        <div className='container m-0 p-0 col col-12'>
            <DummyMealPlan mealplan={plan.mealplan} name={plan.name} leftovers={plan.mealplan.leftovers}/>
            <div className='row plan-controls py-2 col-10 m-auto'>
                <button className='butt butt-warn shadow shadow-sm col col-2 m-auto'
                    onClick={handleDeletePlan}>
                    <span className='fa fa-lg fa-trash'></span>
                </button>
                <button className='butt butt-outline-standard open-plan shadow shadow-sm col col-2 m-auto'
                    onClick={handleOpenPlan}>
                    <span className='fa fa-lg fa-edit'></span>
                </button>
                <button className='butt butt-good open-plan shadow shadow-sm col col-2 m-auto'
                    onClick={handleDownload}>
                    <span className='fa fa-lg fa-download'></span>        
                </button>
            </div>
        </div>
    );
}