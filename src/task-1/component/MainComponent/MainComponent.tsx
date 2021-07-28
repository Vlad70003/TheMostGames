import React, { useState } from "react";
import "./style.css";
import { TableResults } from "../TableResult/TableResults";
const url = "https://tmgwebtest.azurewebsites.net/api/textstrings";

export function MainComponent() {
  let [identifier, setIdentifier] = useState("");
  let [textList, setTextList] = useState<string[]>([]);
  let [errors, setErrors] = useState<string[]>([]);

  let changeInput = (event: React.ChangeEvent <HTMLInputElement> ) => {
    let keyText = event.target.value;
    setIdentifier((identifier = keyText));
  };

  let keyDown = (event: React.KeyboardEvent <HTMLInputElement> ) => {
    let key = event.key;
    const isNumber =
      (key >= "0" && key <= "9") || key === "," || key === "Backspace";
    if (!isNumber) {
      event.preventDefault();
    }
  };

  let getString = (e: any) => {
    e.preventDefault();
    let arr = [...new Set(identifier.split(","))];
    setErrors((errors = []));
    setTextList((textList = []));
    for (let i = 0; i < arr.length; i++) {
      fetch(`${url}/${arr[i]}`, {
        headers: {
          "TMG-Api-Key": "0J/RgNC40LLQtdGC0LjQutC4IQ=="
        }
      })
        .then((resolve) => resolve.json())
        .then(
          (data) => { setTextList((list) => [...list, data.text])},
          (error) => {
            setErrors((error) => [...error, arr[i]]);

          }
        );
    }
    setIdentifier(identifier = '');
  };

  return (
    <div className="main-component">
      <div className="main-content__wrapper">
      <form action="" className="form" onSubmit={getString}>
        <div className="form__wrapper">
        <label className="form__prec" htmlFor="input">identifiers strings: </label>
        <input
          type="string"
          name="input"
          className="form__input"
          value={identifier}
          onChange={changeInput}
          onKeyDown={keyDown}
          placeholder = "Enter the strings"
        />
        <input className="form__button" type="submit" value="Сalculate" />
        </div>
      </form>
      <TableResults textList={textList} errors={errors}/>
      </div>
    </div>
  );
}