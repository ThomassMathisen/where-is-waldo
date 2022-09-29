import React from "react";
import GetUsername from "./GetUsername";
import img from "../img/beach-waldo.png";
import "../styles/Image.css";
import DropdownMenu from "./DropdownMenu";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs} from "firebase/firestore";
import popupImg from "../img/background-waldo.png";
import odlaw from "../img/odlaw.png";
import waldo from "../img/waldo.png";
import whitebeard from "../img/whitebeard.png";

export default function Image(props) {
    const [mousePosition, setMousePosition] = useState({});
    const [toggleDisplay, setToggleDisplay] = useState(false);
    const [foundCharacters, setFoundCharacters] = useState({
        waldo: false,
        whitebeard: false,
        odlaw: false
    });
    const [characterPositions, setCharacterPositions] = useState({});
    const [mistakeDisplay, setMistakeDisplay] = useState(false);

    useEffect(() => {
        const data = {};
        const getCharacterPositions = async () => {
            const querySnapshot = await getDocs(
                collection(db, "position-characters")
            );
            querySnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });
        };
        setCharacterPositions(data);

        getCharacterPositions();
    }, []);

    useEffect(() => {
        function areAllTrue() {
            const areTrue = Object.values(foundCharacters).every((value) => value);
            if (areTrue) {
                setFoundCharacters({
                    waldo: false,
                    whitebeard: false,
                    odlaw: false
                });
                props.setWonGame(true);
            }
        }
        areAllTrue();
    }, [foundCharacters]);

    function getMousePosition(e) {
        setMousePosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        });
        setToggleDisplay((prevState) => !prevState);
    }

    function showMistake() {
        setMistakeDisplay(true);
        setTimeout(setMistakeToFalse, 2000);
    }

    function setMistakeToFalse() {
        setMistakeDisplay(false);
    }

    return(
        <div>
          {mistakeDisplay && <div className="mistake-container">Try Again...</div>}
            {!props.startGame && (
              <div className="start-game-container">
                <div className="start-game-popup">
                  <div className="start-game-popup-text">
                    <h2>Let's find Waldo and his friends!</h2>
                    <p>Tag Waldo, Wizard Whitebeard and Odlaw as fast as you can!</p>
                    <p>Look through the image to find the correct characters</p>
                    <p>Click on them and choose the right name</p>
                    <p>Move fast, you are being timed!</p>
                    <button
                      className="start-game-popup-button"
                      onClick={() => props.setStartGame(true)}
                    >
                      Start Game
                    </button>
                  </div>
                  <img className="start-game-popup-img" src={popupImg} alt=""></img>
                </div>
              </div>
            )}
            {props.wonGame && (
              <GetUsername
                setDisplayLeaderboard={props.setDisplayLeaderboard}
                counter={props.counter}
              />
            )}

            <img
              className="waldo-image"
              onClick={getMousePosition}
              src={img}
              alt="waldo-on-the-beach"
            ></img>
            {foundCharacters.waldo && (
              <div className="found-character-waldo">
                <img alt="waldo-found-icon" src={waldo}></img>
              </div>
            )}
            {foundCharacters.whitebeard && (
              <div className="found-character-whitebeard">
                <img alt="whitebeard-found-icon" src={whitebeard}></img>
              </div>
            )}
            {foundCharacters.waldo && (
              <div className="found-character-odlaw">
                <img alt="odlaw-found-icon" src={odlaw}></img>
              </div>
            )}

            {toggleDisplay && (
              <DropdownMenu
                showMistake={showMistake}
                setToggleDisplay={setToggleDisplay}
                characterPositions={characterPositions}
                setFoundCharacters={setFoundCharacters}
                position={mousePosition}
            />
            )}
        </div>
    );
}
