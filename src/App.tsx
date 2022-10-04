import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { RegistDialog } from "./components/RegistDialog";
import { WatchEffect } from "./components/WatchEffect";
import {OptionSlide} from "./components/OptionSlide";

interface app_state_type {
    // is_open: boolean;
}

interface RegistDialogRefType {
	openModal: void
}

interface BoxType {
    name: string,
    link: string,
    key: string,
    childs?: Array<BoxType>,
}

const App = () => {
    
	const [boxes,setBoxes] = useState<BoxType[]>([]);
	const [is_dialog_open,setDialogOpen] = useState(true);
	const [is_watch_enable,setWatchEnable] = useState(true);
	const [is_option_open,setOptionOpen] = useState(false);
	const dialogRef = useRef<RegistDialogRefType>();

	const dialogCurrent = dialogRef.current;

	const openDialog = () => {
		setDialogOpen(true);
	}

	const closeDialog = () => {
		setDialogOpen(false);
	}

    const toggleSlide = () => {
        setOptionOpen(!is_option_open);
    }

    const createBox = (box:BoxType,is_child:boolean) => {
        const name = box.name;
        const link = box.link;
        const boxKey = box.key;
        const childs = box.childs;

        if(childs && childs.length > 0){
            const childsElement = childs.map(c => {
                return createBox(c,true);
            }).join();

            let box_class = "box directory";
            if(is_child){
                box_class += ' child';
            }

            return (
                <template>
                    <div className={box_class} onClick={() => folderOpenToggle(boxKey)}>
                        <button className="delete">
                            <FontAwesomeIcon icon={["fas", "trash"]} />
                        </button>
                        <span>{name}</span>
                    </div>
                    {childsElement}
                </template>
            );
        }else{

            let box_class = "box";
            if(is_child){
                box_class += ' child';
            }

            return (
                <div className={box_class}>
                    <button className="delete">
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                    <a href={link} target="_blank">{name}</a>
                </div>
            );
        }
    }

    const folderOpenToggle = (key:string) => {
        console.log('fot');
        console.log(key);
    }

    const fetchBoxData = () => {
        const json = localStorage.getItem("box-dancer-2022");
        if (json !== null) {
            setBoxes(JSON.parse(json));
        } else {
             setBoxes([]);
        }
    }
    // fetchBoxData();

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
                    }).join()}
                </div>
            </main>
            {is_option_open &&
                <OptionSlide/>
            }
            {is_dialog_open &&
                <RegistDialog mode="normal" closeModal={closeDialog}/>
            }
        </div>
	);

    
}

export default App;
