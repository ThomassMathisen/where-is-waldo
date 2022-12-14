import React from "react";
import { Timer } from "./Timer";
import "../styles/Header.css";
import logo from "../img/waldo-logo.png";
import odlaw from "../img/odlaw.png";
import waldo from "../img/waldo.png";
import whitebeard from "../img/whitebeard.png";

export default function Header(props) {
    return(
        <header className="header">
            <img alt="logo" className="header-logo" src={logo}></img>
            <div className="header-characters">
                <span className="header-characters-info">
                    <img
                    className="header-characters-img"
                    alt="waldo-icon"
                    src={waldo}
                    ></img>
                    <p className="header-character-name">Waldo</p>
                </span>
                <span className="header-characters-info">
                    <img
                    className="header-characters-img"
                    alt="whitebeard-icon"
                    src={whitebeard}
                    ></img>
                    <p className="header-character-name">Wizard Whitebeard</p>
                </span>
                <span className="header-characters-info">
                    <img
                    className="header-characters-img"
                    alt="odlaw-icon"
                    src={odlaw}
                    ></img>
                    <p className="header-character-name">Odlaw</p>
                </span>
            </div>

            <div className="timer-and-button-container">
                {!props.displayLeaderboard && (
                  <button
                    onClick={() =>
                    props.setDisplayLeaderboard((prevState) => !prevState)
                    }
                >
                  Leaderboard
                </button>
                )}
                {props.displayLeaderboard && (
                    <button
                    onClick={() => {
                        props.setDisplayLeaderboard((prevState) => !prevState);
                        props.setWonGame(false);
                        props.setCounter(0);
                        props.setStartGame(false);
                    }}
                >
                  Go back
                </button>
                )}
                {props.startGame && !props.wonGame && (
                  <Timer
                    counter={props.counter}
                    setCounter={props.setCounter}
                    startGame={props.startGame}
                  />
                )}
            </div>
        </header>
    );
}