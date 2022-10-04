import { useEffect, useLayoutEffect, useState } from "react";
import '/src/scss/option_slide.scss';

// interface option_slide_props_type {
//     is_open: boolean
// }

const OptionSlide = ()=> {

    const [jsonImportText,setJsonImportText] = useState('');

    const jsonImport = () =>{

        const value = jsonImportText;
        if(value !== null && value.length > 0){
            localStorage.setItem("box-dancer-2022",value);
            reload();
    
        }else{
            alert('登録がありません');
        }
        
    }
    
    const jsonExport = ()=>{
        const json = localStorage.getItem("box-dancer-2022");
        if(json !== null){
            const blob = new Blob([json], { type: 'text/plain' });
            const aTag = document.createElement('a');
            aTag.href = URL.createObjectURL(blob);
            aTag.target = '_blank';
            aTag.download = 'box-dancer-composition.json';
            aTag.click();
            URL.revokeObjectURL(aTag.href);
        }else{
            alert('登録がありません');
        }
    }
    
    const jsonDelete = ()=>{
        if(!confirm('ページ上の全てのデータを削除します。本当によろしいですか？')) return;
        localStorage.removeItem('box-dancer-2022');
        reload();
    }

    // const [classtext,setClassText] = useState('');

    

    // useLayoutEffect(() => {
    //     if(props.is_open){
    //         setClassText("visible");
    //     }else{
    //         setClassText('');
    //     }
    //   }, []);
    

    return (
        <aside id="setting-area" className="visible">
            <h2>設定</h2>
            <div className="json-import">
                <label htmlFor="json-import-text">JSON インポート</label>
                <textarea id="json-import-text" value={jsonImportText} onChange={(e) => setJsonImportText(e.target.value)} ></textarea>
                <button type="button" id="json-import" onClick={()=>jsonImport}>確定</button>
            </div>
            <div className="json-export">
                <button type="button" id="json-export" onClick={()=>jsonExport}>
                    JSON エクスポート
                </button>
            </div>
            <div className="setting-delete">
                <button type="button" id="setting-delete" onClick={()=>jsonDelete}>設定削除</button>
            </div>
        </aside>
    )
}

export {OptionSlide}