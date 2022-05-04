
import { addBasicStructure, addKeyBoard, addTextArea, wrapper } from "./_HTML.js";
import { buttonsEventsBind} from "./_keyboard.js";



addBasicStructure();
addTextArea();
addKeyBoard();


export let buttons = wrapper[0].querySelectorAll(".button");

export let lettersEn = wrapper[0].querySelectorAll(".letter-en");

export let lettersRu = wrapper[0].querySelectorAll(".letter-ru");


window.onload = () => {
    wrapper[0].addEventListener("click", buttonsEventsBind);
    wrapper[0].addEventListener("keydown", buttonsEventsBind);

};


