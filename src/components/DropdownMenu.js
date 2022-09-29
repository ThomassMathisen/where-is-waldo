import React, { useState } from "react";
import odlaw from "../img/odlaw.png";
import waldo from "../img/waldo.png";
import whitebeard from "../img/whitebeard.png";
import "../styles/DropdownMenu.css"

export default function DropdownMenu(props) {
  const [character, setCharacter] = useState("waldo");

  function checkPosition(data, positionX, positionY, char) {
    console.log(character);
    console.log(
      "Real Y" + positionY + "Max Y" + data.maxY + "Min Y" + data.minY
    );
    if (
      positionY < data.minY ||
      positionY > data.maxY ||
      positionX > data.maxX ||
      positionX < data.minY 
    ) {
        console.log("bad")
        props.showMistake();
    } else {
      props.setFoundCharacters((prevState) => {
        const data = {...prevState, [char]: true };
        return data;
      });
      console.log("good");
    }
  }

  function characterSelection(char) {
    setCharacter(char);
    let data = props.characterPositions[char];
    console.log(data);
    checkPosition(data, props.positionX, props.positionY, char);
  }

  const style = {
    left: props.positionX,
    top: props.positionY + 100,
  };

  function optionOnClick(char) {
    characterSelection(char);
    props.setToggleDisplay(false);
  }

  return (
    <div style={style} className="dropdown-menu">
      <div className="target">+</div>
      <ul className="options">
        <h2>Select:</h2>
        <li
          onClick={() => {
            optionOnClick("waldo")
          }}
          className="menu-options"
        >
          <img
            className="meny-characters-img"
            alt="waldo-icon"
            src={waldo}
          ></img>
          <p className="menu-character-name">Waldo</p>
        </li>
        <li
          onClick={() => {
            optionOnClick("whitebeard")
          }}
          className="menu-options"
        >
          <img
            className="meny-characters-img"
            alt="whitebear-icon"
            src={whitebeard}
          ></img>
          <p className="menu-character-name">Wizard Whitebeard</p>
        </li>
        <li
          onClick={() => {
            optionOnClick("odlaw")
          }}
          className="menu-options"
        >
          <img
            className="meny-characters-img"
            alt="odlaw-icon"
            src={odlaw}
          ></img>
          <p className="menu-character-name">Odlaw</p>
        </li>
      </ul>
      <div></div>
    </div>
  );
}
