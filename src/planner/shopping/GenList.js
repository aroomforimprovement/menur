import React from 'react';
import './shopping.scss';
import { useMainContext } from '../../main/MenurRouter';
import { ShoppingList } from './ShoppingList';
import { isMobile } from 'react-device-detect';

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
    const copyList = async (list, heading) => {
        let copy = heading+"\n";
        list.forEach(item => {
            copy += item.name + "\tx " + item.qty + "\n";
        });
        copyToClipboard(copy)
            .then(() => console.debug('copied'))
            .catch(() => console.debug('error'));
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

    const ListTemplate = ({list, title, copyFunc}) => {

        return(
            <div className={`gen-list mt-2 border border-2 shadow shadow-sm ${isMobile ? 'col col-11' : 'col col-11 col-md-4'} mx-auto px-1`}>
                <div className='row mb-1 pt-2'>
                    <h6 className='list-heading col mt-1'>{title}</h6>
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
                        copyFunc={copyGenList}/>
                    <ListTemplate list={'userList1'} title={'User List 1'} 
                        copyFunc={copyUserList1}/>
                    <ListTemplate list={'userList2'} title={'User List 2'} 
                        copyFunc={copyUserList2}/>
                </div>
            }
        </div>
    );
}