import {  keyboardWorkLogic } from "./_keyboard.js";
import { buttons } from "./main.js";


export const wrapperKeyboard = document.getElementsByClassName("wrapper-keyboard");


let element;

class Touch extends keyboardWorkLogic {
    constructor() {
        super();
    }

    touchEvents(event) {
        console.log(event);
        this.addLettersTextarea(event);
        // this.buttonsTouchHighlighting(event);
    }
    addLettersTextarea(event) {
        console.log(event.target.id);
        let targetElement = event.target;
        const textArea = document.getElementsByTagName("textarea")[0];

        if (event.target.id != "Tab" && event.target.id != "CapsLock" && event.target.id != "Enter" && event.target.id != "Delete" && event.target.id != "Backspace" && event.target.id != "ShiftLeft" && event.target.id != "ShiftRight" && event.target.id != "ControlLeft" && event.target.id != "AltLeft" && event.target.id != "ControlRight" && event.target.id != "AltRight") {

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
                            this.input += element.innerText;
                            textArea.value = this.input;
                        }
                    }
                });
            }
        } else if (event.target.id === "Tab") {
            const position = textArea.selectionStart;
            this.input = this.input.split("");
            this.input.splice(position, 0, "  ");
            this.input = this.input.join("");
            textArea.value = this.input;
            textArea.setSelectionRange(position + 2, position + 2);

        }

    }

    // buttonsTouchHighlighting(event) {
    //     buttons.forEach(element => {
    //         if (element.id === event.target.id) {
    //             element.classList.add("animation-button-in");
    //             // element.addEventListener("animationend", () => element.classList.remove("animation-button-in"));

    //             let removeEventHighlihting = () => {
    //                 element.classList.remove("animation-button-in");
    //                 element.classList.add("animation-button-out");
    //                 element.addEventListener("transitionend", () => {
    //                     element.classList.remove("animation-button-out");
    //                     event.target.removeEventListener("keyup", removeEventHighlihting);
    //                 });
    //                 // element.removeEventListener("keyup", removeEventHighlihting);
    //             };

    //             event.target.addEventListener("keyup", removeEventHighlihting);

    //         }

    //     });
    // }

}


const touchSensor = new Touch();

export const touchSensorEvents = touchSensor.touchEvents;

export const touchEventsBind = touchSensorEvents.bind(touchSensor);


