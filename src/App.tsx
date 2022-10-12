import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { RegistDialog } from "./components/RegistDialog";

interface app_state_type {
    // is_open: boolean;
}

interface RegistDialogRefType {
	openModal: void
}

const App = () => {
    
	const [boxes,setBoxes] = useState([]);
	const [is_dialog_open,setDialogOpen] = useState(true);
	const dialogRef = useRef<RegistDialogRefType>();

	// const dialogCurrent = dialogRef.current;
    const [loading,setLoading] = useState(true);

	const openDialog = () => {
		setDialogOpen(true);
	}

	const closeDialog = () => {
		setDialogOpen(false);
	}

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1000);
    })

	return (
            <div className="App">
                <header>
                    <button type="button" id="setting">
						<FontAwesomeIcon icon={["fas", "cog"]} />
                    </button>
                </header>
                <div id="circler">
                    <div className="dials">
                        <span id="dial-1">1</span>
                        <span id="dial-2">2</span>
                        <span id="dial-3">3</span>
                        <span id="dial-4">4</span>
                        <span id="dial-5">5</span>
                        <span id="dial-6">6</span>
                        <span id="dial-7">7</span>
                        <span id="dial-8">8</span>
                        <span id="dial-9">9</span>
                        <span id="dial-10">10</span>
                        <span id="dial-11">11</span>
                        <span id="dial-12">12</span>
                    </div>
                    <div className="rotates-base">
                        <div className="rotate-dial" id="rotate-dial-1">
                            <button>Sun</button>
                        </div>
                        <div className="rotate-dial" id="rotate-dial-2">
                            <button>Moon</button>
                        </div>
                    </div>
                    <div className="rotates-minute"></div>
                    <div className="rotates-hour"></div>
                </div>
                <main id="main">
                    <div id="index">
                        <div
                            className="box append-box"
                            onClick={() => openDialog()}
                        >
                            <span>追加</span>
                            <FontAwesomeIcon icon={["fas", "plus"]} />
                        </div>
                    </div>
                </main>
				{is_dialog_open &&
					<RegistDialog mode="normal" closeModal={closeDialog}/>
				}
                {loading &&
                    <div className="loader">
                        <span>Loading...</span>
                        <img src="./assets/ball-triangle.svg" alt="loading-img" />
                    </div>
                }
            </div>
	);

    
}

export default App;
