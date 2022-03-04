import React from 'react';
import './shopping.scss';
import { useMainContext } from '../../main/MenurRouter';
import { ShoppingList } from './ShoppingList';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle, ToastOptions } from '../../common/Toasts';

export const GenList = () => {

    const { state } = useMainContext();
    function copyToClipboard(textToCopy) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            return navigator.clipboard.writeText(textToCopy);
        } else {
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // here the magic happens
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }
    const getListText = (list, heading) => {
        let text = heading+"\n";
        list.forEach(item => {
            text += item.name + "\tx " + item.qty + "\n";
        });
        return text;
    }
    const copyList = async (list, heading) => {
        let copy = getListText(list, heading);
        copyToClipboard(copy)
            .then(() => {
                toast.success(`${heading} copied to clipboard`);    
                console.debug('copied')
            })
            .catch((err) => console.debug('error'));
    }
    const copyGenList = () => {
        copyList([...state.genList], "GENERATED LIST");
    }
    const copyUserList1 = () => {
        copyList([...state.userList1], "LIST 1");
    }
    const copyUserList2 = () => {
        copyList([...state.userList2], "LIST 2");
    }
    const downloadList = async (list, heading) => {
        let listText = getListText(list, heading);
        const setIsCancelled = (id) => {
            toast.dismiss(id);
        }
        const text = () => {
            console.log("text");
        }
        const pdf = () => {
            console.log("pdf");
        }

        toast((t) => (
            <ToastOptions t={t} dismiss={setIsCancelled}
                options={[text, pdf]} optionBtns={["Text", "PDF"]}
                message={`Would you like download this list as a text file or a pdf?`}
                dismissBtn={'Cancel'} /> 
        ), toastConfirmStyle());
    }

    const ListTemplate = ({list, title, copyFunc, downloadFunc}) => {

        return(
            <div className={`gen-list mt-2 border border-2 shadow shadow-sm ${isMobile ? 'col col-11' : 'col col-11 col-md-4'} mx-auto px-1`}>
                <div className='row mb-1 pt-2'>
                    <h6 className='list-heading col mt-1'>{title}</h6>
                    <div className='col col-1 col-md-2 col-lg-1 me-4'>
                        <button className='btn btn-sm btn-outline-info copy-btn mb-2 bg-light'
                            onClick={downloadFunc}>
                            <span className='fa fa-download fa-xs'>{' '}</span>
                        </button>
                    </div>
                    <div className='col col-1 col-md-2 col-lg-1 me-4'>
                        <button className='btn btn-sm btn-outline-info copy-btn mb-2 bg-light'
                            onClick={copyFunc}>
                            <span className='fa fa-copy fa-xs'>{' '}</span>
                        </button>
                    </div>
                </div>
                <ShoppingList  list={list} />
            </div>
        );
    }

    return(
        <div style={{display:'inline-block'}} className='col col-12'>
            
            {isMobile 
            ?  <div>
                    <ListTemplate list={'genList'} title='Shopping list' 
                        copyFunc={copyGenList}/>
                </div>
            :
                <div>
                    <ListTemplate list={'genList'} title='Generated List' 
                        copyFunc={() => copyList([...state.genList], "GENERATED LIST")} downloadFunc={() => downloadList([...state.genList], "GENERATED LIST")}/>
                    <ListTemplate list={'userList1'} title={'User List 1'} 
                        copyFunc={copyUserList1}/>
                    <ListTemplate list={'userList2'} title={'User List 2'} 
                        copyFunc={copyUserList2}/>
                </div>
            }
        </div>
    );
}