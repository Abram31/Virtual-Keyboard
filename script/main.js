
import { addBasicStructure, addKeyBoard, addTextArea, wrapper } from "./HTML.js";
import { buttonsEventsBind, changeLettersBind, keyboardWork} from "./keyboard.js";
import { touchEventsBind, wrapperKeyboard} from "./touch-sensor.js";

window.addEventListener("unload", () => localStorage.setItem("language", keyboardWork.language))

addBasicStructure();
addTextArea();
addKeyBoard();



export let buttons = wrapper[0].querySelectorAll(".button");

export let lettersEn = wrapper[0].querySelectorAll(".letter-en");

export let lettersRu = wrapper[0].querySelectorAll(".letter-ru");


window.onload = () => {
    wrapper[0].addEventListener("click", buttonsEventsBind);
    document.addEventListener("keydown", buttonsEventsBind);

    wrapperKeyboard[0].addEventListener("click", touchEventsBind);
    wrapperKeyboard[0].addEventListener("mousedown", touchEventsBind);


    changeLettersBind();
    
};


