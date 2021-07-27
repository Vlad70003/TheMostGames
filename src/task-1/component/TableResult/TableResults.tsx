import React, { useEffect } from "react";
import "./style.css";

type propsType = {
  textList: any;
};

export function TableResults(props: propsType) {
  let textList = (str: string[]): any => {
    return <td className="td">{str}</td>;
  };

  let wordCount = (str: any): any => {
    var word = str.match(/[^\s]+/g);
    return <td className="td">{word ? word.length : 0}</td>;
  };

  let vowelCount = (str: any) => {
    let vowelLength = str.replace(/[^aeiouуеыаоэиюäöüøæ]/gi, "").length;
    return <td className="td">{vowelLength ? vowelLength : 0}</td>;
  };

  let createTr = (str: any) => {
    let returnTr = [];
    for (let i = 0; i < str.length; i++) {
      returnTr.push(
        <tr className="tr">
          {textList(str[i])}
          {wordCount(str[i])}
          {vowelCount(str[i])}
        </tr>
      );
    }
    return returnTr;
  };

  return (
    <table className="table">
      <tr className="tr">
        <th className="td">Текст</th>
        <th className="td">Количество слов</th>
        <th className="td">Количество гласных</th>
      </tr>
      {createTr(props.textList)}
    </table>
  );
}