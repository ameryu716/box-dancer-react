import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import '/src/scss/watch_effect.scss';


const rotateSteps = [
    {
        transform: "rotate(0deg)",
    },
    {
        transform: "rotate(6deg)",
    },
    {
        transform: "rotate(12deg)",
    },
    {
        transform: "rotate(18deg)",
    },
    {
        transform: "rotate(24deg)",
    },
    {
        transform: "rotate(30deg)",
    },
    {
        transform: "rotate(36deg)",
    },
    {
        transform: "rotate(42deg)",
    },
    {
        transform: "rotate(48deg)",
    },
    {
        transform: "rotate(54deg)",
    },
    {
        transform: "rotate(60deg)",
    },
    {
        transform: "rotate(66deg)",
    },
    {
        transform: "rotate(72deg)",
    },
    {
        transform: "rotate(78deg)",
    },
    {
        transform: "rotate(84deg)",
    },
    {
        transform: "rotate(90deg)",
    },
    {
        transform: "rotate(96deg)",
    },
    {
        transform: "rotate(102deg)",
    },
    {
        transform: "rotate(108deg)",
    },
    {
        transform: "rotate(114deg)",
    },
    {
        transform: "rotate(120deg)",
    },
    {
        transform: "rotate(126deg)",
    },
    {
        transform: "rotate(132deg)",
    },
    {
        transform: "rotate(138deg)",
    },
    {
        transform: "rotate(144deg)",
    },
    {
        transform: "rotate(150deg)",
    },
    {
        transform: "rotate(156deg)",
    },
    {
        transform: "rotate(162deg)",
    },
    {
        transform: "rotate(168deg)",
    },
    {
        transform: "rotate(174deg)",
    },
    {
        transform: "rotate(180deg)",
    },
    {
        transform: "rotate(186deg)",
    },
    {
        transform: "rotate(192deg)",
    },
    {
        transform: "rotate(198deg)",
    },
    {
        transform: "rotate(204deg)",
    },
    {
        transform: "rotate(210deg)",
    },
    {
        transform: "rotate(216deg)",
    },
    {
        transform: "rotate(222deg)",
    },
    {
        transform: "rotate(228deg)",
    },
    {
        transform: "rotate(234deg)",
    },
    {
        transform: "rotate(240deg)",
    },
    {
        transform: "rotate(246deg)",
    },
    {
        transform: "rotate(252deg)",
    },
    {
        transform: "rotate(258deg)",
    },
    {
        transform: "rotate(264deg)",
    },
    {
        transform: "rotate(270deg)",
    },
    {
        transform: "rotate(276deg)",
    },
    {
        transform: "rotate(282deg)",
    },
    {
        transform: "rotate(288deg)",
    },
    {
        transform: "rotate(294deg)",
    },
    {
        transform: "rotate(300deg)",
    },
    {
        transform: "rotate(306deg)",
    },
    {
        transform: "rotate(312deg)",
    },
    {
        transform: "rotate(318deg)",
    },
    {
        transform: "rotate(324deg)",
    },
    {
        transform: "rotate(330deg)",
    },
    {
        transform: "rotate(336deg)",
    },
    {
        transform: "rotate(342deg)",
    },
    {
        transform: "rotate(348deg)",
    },
    {
        transform: "rotate(354deg)",
    },
    {
        transform: "rotate(360deg)",
    },
];

const rotateTimingMinute = {
    duration: 60 * 60 * 1000,//60分
    iterations: Infinity,
    steps: [60,'start']
}

const rotateTimingHour = {
    duration: 60 * 60 * 12 * 1000,//半日
    iterations: Infinity,
    steps: [60,'start']
}

function applyWatch(element_minute: Animation,element_hour: Animation) {
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    element_minute.currentTime = minute * 60 * 1000;
    element_hour.currentTime = hour * 60 * 60 * 1000;
}



const WatchEffect = () => {
    

    useEffect(() => {
        const minute_needle = document.getElementsByClassName('rotates-minute')[0];
        const needle_animate_minute = minute_needle.animate(rotateSteps,rotateTimingMinute);

        const hour_needle = document.getElementsByClassName('rotates-hour')[0];
        const needle_animate_hour = hour_needle.animate(rotateSteps,rotateTimingHour);
        applyWatch(needle_animate_minute,needle_animate_hour);
    }, []);

    return (
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
    )
}




export {WatchEffect}
