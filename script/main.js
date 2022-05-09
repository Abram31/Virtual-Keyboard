/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import {
  addBasicStructure, addKeyBoard, addTextArea, wrapper,
} from "./HTML.js";
import {
  buttonsEventsBind, changeLettersBind, keyboardWork, language,
} from "./keyboard.js";
import { touchEventsBind, wrapperKeyboard } from "./touch-sensor.js";

window.addEventListener("unload", () => localStorage.setItem("language", language));

addBasicStructure();
addTextArea();
addKeyBoard();

export const buttons = wrapper[0].querySelectorAll(".button");

export const lettersEn = wrapper[0].querySelectorAll(".letter-en");

export const lettersRu = wrapper[0].querySelectorAll(".letter-ru");

window.onload = () => {
  wrapper[0].addEventListener("click", buttonsEventsBind);
  document.addEventListener("keydown", buttonsEventsBind);

  wrapperKeyboard[0].addEventListener("click", touchEventsBind);
  wrapperKeyboard[0].addEventListener("mousedown", touchEventsBind);

  changeLettersBind();
};
