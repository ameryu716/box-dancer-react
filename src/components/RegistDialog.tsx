import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import '/src/scss/regist_dialog.scss';

interface regist_dialog_prop_type {
    // is_open: boolean,
    closeModal: () => void,
    reload: () => void,
    mode: 'normal' | 'child',
    parentTarget: string | null,
}

interface regist_dialog_state_type {
    // is_open: boolean,
    name: string,
    link: string,
    key: string,
    is_dir: boolean,
}


const RegistDialog = (props:regist_dialog_prop_type) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [key, setKey] = useState('');
    const [is_dir,setIsDir] = useState(false);

    const closeModal = () => {
        props.closeModal();
    }

    const afterOpenModal = () => {

    }

    const create = () => {
        console.log(props.mode);
        console.log('を作成する');

        const json = localStorage.getItem("box-dancer-2022-react");
        let json_data = [];
        if (json !== null) {
            json_data = JSON.parse(json);
        }

        json_data.push({
            name: name,
            link: link,
            key: key,
            is_dir: false,
        });
    
        const regist_json = JSON.stringify(json_data);
    
        localStorage.setItem("box-dancer-2022-react", regist_json);
        props.reload();
    }

    const createFolder = () => {
        console.log(props.mode);
        console.log('を作成する');

        const json = localStorage.getItem("box-dancer-2022-react");
        let json_data = [];
        if (json !== null) {
            json_data = JSON.parse(json);
        }

        json_data.push({
            name: name,
            key: key,
            is_dir: true,
            childs: [],
        });
    
        const regist_json = JSON.stringify(json_data);
    
        localStorage.setItem("box-dancer-2022-react", regist_json);
        props.reload();
    }

    return (
        <div id="regist-dialog">
            {!is_dir &&
                <h2 className="normal-regist-h2">ボックス登録</h2>            
            }
            {is_dir &&
                <h2 className="folder-regist-h2">フォルダー登録</h2>        
            }
            
            <button type="button" id="close" onClick={closeModal}>
                <FontAwesomeIcon icon={["fas", "close"]} />
            </button>
            {props.mode === 'child' && 
                <div className="parent-target">
                    <span>親登録対象</span> 
                    <span>{props.parentTarget}</span>
                </div>
            }
            <div className="name">
                <label htmlFor="name">名称</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {!is_dir &&
                <div className="link">
                <label htmlFor="link">URL</label>
                <input type="text" id="link"  value={link} onChange={(e) => setLink(e.target.value)}/>
            </div>
            }
            
            <div className="key">
                <label htmlFor="key">キー</label>
                <input type="text" id="key"  value={key} onChange={(e) => setKey(e.target.value)}/>
            </div>
            <div className="mode-dir">
                <label htmlFor="mode-dir">フォルダ</label>
                <input type="checkbox" id="mode-dir"  checked={is_dir} onChange={(e) => setIsDir(e.target.checked)}/>
            </div>
            <div className="enter">
                {is_dir &&
                <button type="button" className="regist-folder-btn" onClick={() => createFolder()}>登録</button>
                }
                {!is_dir && 
                <button type="button" className="regist-link-btn" onClick={() => create()}>登録</button>
                }
            </div>
        </div>
    );

};

export {RegistDialog}