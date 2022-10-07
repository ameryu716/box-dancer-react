import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { RegistDialog } from "./components/RegistDialog";
import { WatchEffect } from "./components/WatchEffect";
import { OptionSlide } from "./components/OptionSlide";
import { folder_box_type, link_box_type } from "./types";

interface app_state_type {
    // is_open: boolean;
}

interface RegistDialogRefType {
    openModal: void;
}

const App = () => {
    const [boxes, setBoxes] = useState<(link_box_type | folder_box_type)[]>([]);
    const [is_dialog_open, setDialogOpen] = useState(false);
    const [is_watch_enable, setWatchEnable] = useState(true);
    const [is_option_open, setOptionOpen] = useState(false);
    const [propagate_parent_key, setParentKey] = useState<null | string>("");
    // const dialogRef = useRef<RegistDialogRefType>();
    const [regist_mode, setRegistMode] = useState<"normal" | "child">("normal");

    // const dialogCurrent = dialogRef.current;

    const openDialog = () => {
        setRegistMode("normal");
        setParentKey(null);
        setDialogOpen(true);
    };

    const dialogOpenAttachParentKey = (key: string) => {
        setRegistMode("child");
        setParentKey(key);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const toggleSlide = () => {
        setOptionOpen(!is_option_open);
    };

    const createBox = (
        box: link_box_type | folder_box_type,
        is_child: boolean
    ) => {
        const name = box.name;
        const is_dir = box.is_dir;
        const key = box.key;
        console.log(key);

        if (is_dir) {
            const folder_box = box as folder_box_type;
            const childs = folder_box.childs;

            let box_class = "box directory";
            if (is_child) {
                box_class += " child";
            }

            if (childs.length > 0) {
                return (
                    <React.Fragment>
                        <div
                            className={box_class}
                            key={key}
                            id={"box-id-" + key}
                            onClick={() => folderOpenToggle(key)}
                        >
                            <button className="delete">
                                <FontAwesomeIcon icon={["fas", "trash"]} />
                            </button>
                            <FontAwesomeIcon
                                className="plus-icon"
                                icon={["fas", "circle-plus"]}
                                onClick={() => dialogOpenAttachParentKey(key)}
                            />
                            <span>{name}</span>
                        </div>
                        {childs.map((c) => {
                            return createBox(c, true);
                        })}
                    </ React.Fragment>
                );
            } else {
                return (
                    <div
                        className={box_class}
                        key={key}
                        id={"box-id-" + key}
                        onClick={() => folderOpenToggle(key)}
                    >
                        <FontAwesomeIcon
                            className="folder-icon"
                            icon={["fas", "folder"]}
                        />
                        <FontAwesomeIcon
                            className="plus-icon"
                            icon={["fas", "circle-plus"]}
                            onClick={() => dialogOpenAttachParentKey(key)}
                        />
                        <button className="delete">
                            <FontAwesomeIcon icon={["fas", "trash"]} />
                        </button>
                        <span>{name}</span>
                    </div>
                );
            }
        } else {
            const link_box = box as link_box_type;
            const link = link_box.link;

            let box_class = "box";
            if (is_child) {
                box_class += " child";
            }

            return (
                <div className={box_class} key={key} id={"box-id-" + key}>
                    <button className="delete">
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                    <a href={link} target="_blank">
                        {name}
                    </a>
                </div>
            );
        }
    };

    const folderOpenToggle = (key: string) => {
        // console.log('fot');
        // console.log(key);
        const target = boxes.find((b) => b.key === key) as folder_box_type;
        const targetFolderElement = document.getElementById(
            "box-id-" + target.key
        );
        targetFolderElement?.classList.toggle("open");
        target.childs.forEach((c) => {
            const childElementTarget = document.getElementById(
                "box-id-" + c.key
            );
            childElementTarget?.classList.toggle("visible");
        });
    };

    const fetchBoxData = () => {
        const json = localStorage.getItem("box-dancer-2022-react");
        if (json !== null) {
            setBoxes(JSON.parse(json));
        } else {
            setBoxes([]);
        }

        console.log(boxes);
    };

    useEffect(() => {
        fetchBoxData();
    }, []);

    return (
        <div className="App">
            <header>
                <button
                    type="button"
                    id="setting"
                    onClick={() => toggleSlide()}
                >
                    <FontAwesomeIcon icon={["fas", "cog"]} />
                </button>
            </header>
            {is_watch_enable && <WatchEffect />}
            <main id="main">
                <div id="index">
                    <div
                        className="box append-box"
                        onClick={() => openDialog()}
                    >
                        <span>追加</span>
                        <FontAwesomeIcon icon={["fas", "plus"]} />
                    </div>
                    {boxes.map((b) => {
                        return createBox(b, false);
                    })}
                </div>
            </main>
            {is_option_open && <OptionSlide />}
            {is_dialog_open && (
                <RegistDialog
                    mode={regist_mode}
                    closeModal={closeDialog}
                    reload={fetchBoxData}
                    parentTargetKey={propagate_parent_key}
                />
            )}
        </div>
    );
};

export default App;
