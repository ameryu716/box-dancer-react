import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { RegistDialog } from "./components/RegistDialog";
import { WatchEffect } from "./components/WatchEffect";
import {OptionSlide} from "./components/OptionSlide";
import { folder_box_type, link_box_type } from "./types";

interface app_state_type {
    // is_open: boolean;
}

interface RegistDialogRefType {
	openModal: void
}

const App = () => {
    
	const [boxes,setBoxes] = useState<(link_box_type|folder_box_type)[]>([]);
	const [is_dialog_open,setDialogOpen] = useState(false);
	const [is_watch_enable,setWatchEnable] = useState(true);
	const [is_option_open,setOptionOpen] = useState(false);
	// const dialogRef = useRef<RegistDialogRefType>();

	// const dialogCurrent = dialogRef.current;

	const openDialog = () => {
		setDialogOpen(true);
	}

	const closeDialog = () => {
		setDialogOpen(false);
	}

    const toggleSlide = () => {
        setOptionOpen(!is_option_open);
    }

    const createBox = (box:link_box_type|folder_box_type,is_child:boolean) => {

        const name = box.name;
        const is_dir = box.is_dir;
        const key = box.key;
        if(is_dir){
            const folder_box = box as folder_box_type;
            const childs = folder_box.childs;
            if(childs.length>0){
                const childsElement = childs.map(c => {
                    return createBox(c,true);
                });
                
                return (
                    <template>
                        <div className="box directory child" key={key} onClick={() => folderOpenToggle(key)}>
                            <button className="delete">
                                <FontAwesomeIcon icon={["fas", "trash"]} />
                            </button>
                            <span>{name}</span>
                        </div>
                        {childsElement}
                    </template>
                );
            }else{
                return (
                    <div className="box directory" key={key} onClick={() => folderOpenToggle(key)}>
                        <FontAwesomeIcon className="folder-icon" icon={["fas", "folder"]} />
                        <button className="delete">
                            <FontAwesomeIcon icon={["fas", "trash"]} />
                        </button>
                        <span>{name}</span>
                    </div>
                );
            }
            
        }else{
            const link_box = box as link_box_type;
            const link = link_box.link;

            let box_class = "box";
            if(is_child){
                box_class += ' child';
            }

            return (
                <div className={box_class} key={key}>
                    <button className="delete">
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                    <a href={link} target="_blank">{name}</a>
                </div>
            );
        }
    }

    const folderOpenToggle = (key:string) => {
        // console.log('fot');
        console.log(key);
        const target = boxes.find(b => b.key === target);
    }

    const fetchBoxData = () => {
        const json = localStorage.getItem("box-dancer-2022-react");
        if (json !== null) {
            setBoxes(JSON.parse(json));
        } else {
            setBoxes([]);
        }

        console.log(boxes);
        
    }

    useEffect(()=>{
        fetchBoxData();
    },[])

	return (
        <div className="App">
            <header>
                <button type="button" id="setting" onClick={()=>toggleSlide()}>
                    <FontAwesomeIcon icon={["fas", "cog"]}/>
                </button>
            </header>
            {is_watch_enable &&
                <WatchEffect />
            }
            <main id="main">
                
                <div id="index">
                    <div
                        className="box append-box"
                        onClick={() => openDialog()}
                    >
                        <span>追加</span>
                        <FontAwesomeIcon icon={["fas", "plus"]} />
                    </div>
                    {boxes.map(b => {
                        return createBox(b,false);
                    })}
                </div>
            </main>
            {is_option_open &&
                <OptionSlide/>
            }
            {is_dialog_open &&
                <RegistDialog mode="normal" closeModal={closeDialog} reload={fetchBoxData} parentTarget={null}/>
            }
        </div>
	);

    
}

export default App;
