import React, { useState } from "react";
import "./style.css";
import { TableResults } from "../TableResult/TableResults";
const url = "https://tmgwebtest.azurewebsites.net/api/textstrings";

export function MainComponent() {
  let [identifier, setIdentifier] = useState("");
  let [textList, setTextList] = useState<string[]>([]);

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
    setTextList((textList = []));
    for (let i = 0; i < arr.length; i++) {
      fetch(`${url}/${arr[i]}`, {
        headers: {
          "TMG-Api-Key": "0J/RgNC40LLQtdGC0LjQutC4IQ=="
        }
      })
        .then((resolve) => resolve.json())
        .then(
          (data) => setTextList((list) => [...list, data.text]),
          (error) => console.log("error")
        );
    }
  };

  return (
    <div className="first-task">
      <form action="" className="form" onSubmit={getString}>
        <label htmlFor="input">Идентификаторы строк: </label>
        <input
          type="string"
          name="input"
          className="input"
          value={identifier}
          onChange={changeInput}
          onKeyDown={keyDown}
        />
        <input type="submit" value="Подсчитать" />
      </form>
      <TableResults textList={textList} />
    </div>
  );
}