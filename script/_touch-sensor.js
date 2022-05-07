import { keyboardWorkLogic } from "./_keyboard.js";
import { lettersEn, lettersRu } from "./main.js";


export const wrapperKeyboard = document.getElementsByClassName("wrapper-keyboard");


let element;

class Touch extends keyboardWorkLogic {
    constructor() {
        super();
    }

    touchEvents(event) {
        if (event.type === "click") {
            this.addLettersTextarea(event);
            console.log(event);
            if (event.target.id === "ArrowLeft" || event.target.id === "ArrowRight" || event.target.id === "ArrowUp" || event.target.id === "ArrowDown") {
                this.arrowOutput(event);
            }
            if (event.target.id === "CapsLock" && event.type === "click") {
                this.capsLockFunction(event);
            }
        }

        if ((event.target.id === "ShiftRight" && event.type === "mousedown") || (event.target.id === "ShiftLeft" && event.type === "mousedown")) {
            this.changeShiftElements(event);
        }


        // this.buttonsTouchHighlighting(event);
    }
    addLettersTextarea(event) {
        let targetElement = event.target;
        const textArea = document.getElementsByTagName("textarea")[0];

        if (event.target.id != "Space" && event.target.id != "Tab" && event.target.id != "CapsLock" && event.target.id != "Enter" && event.target.id != "Delete" && event.target.id != "Backspace" && event.target.id != "ShiftLeft" && event.target.id != "ShiftRight" && event.target.id != "ControlLeft" && event.target.id != "AltLeft" && event.target.id != "ControlRight" && event.target.id != "AltRight") {

            if (targetElement.classList.contains("button")) {
                targetElement.childNodes.forEach(element => {
                    if (element.nodeName != "#text" && !element.classList.contains("hide")) {
                        if (textArea.selectionEnd < textArea.value.length) {
                            const position = textArea.selectionStart;
                            this.input = this.input.split("");
                            this.input.splice(position, 0, element.innerText);
                            this.input = this.input.join("");
                            textArea.value = this.input;
                            textArea.setSelectionRange(position + 1, position + 1);

                        } else {

                            textArea.value += element.innerText;
                            this.input = textArea.value;
                        }
                    }
                });
            }
        } else if (event.target.id === "Tab") {
            let text;
            const position = textArea.selectionStart;
            text = textArea.value.split("");
            text.splice(position, 0, "  ");
            textArea.value = text.join("");
            this.input = text.join("");
            textArea.setSelectionRange(position + 2, position + 2);

        } else if (event.target.id === "Space") {
            let text;
            const position = textArea.selectionStart;
            text = textArea.value.split("");
            text.splice(position, 0, " ");
            textArea.value = text.join("");
            this.input = text.join("");
            textArea.setSelectionRange(position + 1, position + 1);

        } else if (event.target.id === "Backspace") {
            let text;
            const position = textArea.selectionStart;
            text = textArea.value.split("");
            text.splice(position - 1, 1);
            textArea.value = text.join("");
            this.input = text.join("");
            textArea.setSelectionRange(position - 1, position - 1);

        } else if (event.target.id === "Delete") {
            let text;
            const position = textArea.selectionStart;
            text = textArea.value.split("");
            text.splice(position, 1);
            textArea.value = text.join("");
            this.input = text.join("");
            textArea.setSelectionRange(position, position);

        } else if (event.target.id === "Enter") {
            let text;
            const position = textArea.selectionStart;
            text = textArea.value.split("");
            text.splice(position, 0, "\n");
            textArea.value = text.join("");
            this.input = text.join("");
            textArea.setSelectionRange(position+1, position+1);

        }
        console.log(event.target.id);

    }

    // capsLockFunctionTouch() {
    //     if (this.capsLock === true) {
    //         lettersEn.forEach(element => {
    //             element.innerText = element.innerText.toLowerCase();
    //         });
    //         lettersRu.forEach(element => {
    //             element.innerText = element.innerText.toLowerCase();
    //         });
    //         this.capsLock = false;
    //     } else if (this.capsLock === false) {
    //         lettersEn.forEach(element => {
    //             element.innerText = element.innerText.toUpperCase();
    //         });
    //         lettersRu.forEach(element => {
    //             element.innerText = element.innerText.toUpperCase();
    //         });
    //         this.capsLock = true;

    //     }
    // }

}


const touchSensor = new Touch();

export const touchSensorEvents = touchSensor.touchEvents;

export const touchEventsBind = touchSensorEvents.bind(touchSensor);


