import React from 'react'
import './styles.css'

export default function Toggle({ toggled, onClicked }) {
    return (
        <div className={toggled ? 'toggle' : 'toggle night'} onClick={onClicked}>
            <div className="notch">
                <div className="crater"></div>
                <div className="crater"></div>
            </div>
            <div>
                <div className="shape sm"></div>
                <div className="shape smmd"></div>
                <div className="shape md"></div>
                <div className="shape lg"></div>
                <div className="halfmoon"></div>
            </div>
        </div>
    )
}