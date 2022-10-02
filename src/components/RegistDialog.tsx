import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import '/src/scss/regist_dialog.scss';

interface regist_dialog_prop_type {
    // is_open: boolean,
    closeModal: () => void,
    mode: 'normal' | 'regist',
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
    }

    return (
        <div id="regist-dialog">
            <h2 className="normal-regist-h2">ボックス登録</h2>
            <h2 className="child-regist-h2">子登録</h2>
            <button type="button" id="close" onClick={closeModal}>
                <FontAwesomeIcon icon={["fas", "close"]} />
            </button>
            <div className="name">
                <label htmlFor="name">名称</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="link">
                <label htmlFor="link">URL</label>
                <input type="text" id="link"  value={link} onChange={(e) => setLink(e.target.value)}/>
            </div>
            <div className="key">
                <label htmlFor="key">キー</label>
                <input type="text" id="key"  value={key} onChange={(e) => setKey(e.target.value)}/>
            </div>
            <div className="mode-dir">
                <label htmlFor="mode-dir">フォルダ</label>
                <input type="checkbox" id="mode-dir"  checked={is_dir} onChange={(e) => setIsDir(e.target.checked)}/>
            </div>
            <div className="enter">
                <button type="button" id="regist" onClick={() => create()}>登録</button>
            </div>
        </div>
    );

};

export {RegistDialog}