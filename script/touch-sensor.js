/* eslint-disable no-shadow */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { KeyboardWorkLogic, language } from "./keyboard.js";
import { lettersEn, lettersRu } from "./main.js";

export const wrapperKeyboard = document.getElementsByClassName("wrapper-keyboard");

let element;

class Touch extends KeyboardWorkLogic {
  constructor() {
    super();
  }

  touchEvents(event) {
    if (event.type === "click") {
      if (event.target.id === "ArrowLeft" || event.target.id === "ArrowRight" || event.target.id === "ArrowUp" || event.target.id === "ArrowDown") {
        this.arrowOutput(event);
      } else if (event.target.id === "CapsLock" && event.type === "click") {
        this.addLettersTextarea(event);
        this.capsLockFunction(event);
      } else {
        this.addLettersTextarea(event);
      }
    }

    if ((event.target.id === "ShiftRight" && event.type === "mousedown") || (event.target.id === "ShiftLeft" && event.type === "mousedown")) {
      this.changeShiftElements(event);
    }
  }

  addLettersTextarea(event) {
    const targetElement = event.target;
    const textArea = document.getElementsByTagName("textarea")[0];

    if (event.target.id !== "Space" && event.target.id !== "Tab" && event.target.id !== "CapsLock" && event.target.id !== "Enter" && event.target.id !== "Delete" && event.target.id !== "Backspace" && event.target.id !== "ShiftLeft" && event.target.id !== "ShiftRight" && event.target.id !== "ControlLeft" && event.target.id !== "AltLeft" && event.target.id !== "ControlRight" && event.target.id !== "AltRight") {
      if (targetElement.classList.contains("button")) {
        targetElement.childNodes.forEach((element) => {
          if (element.nodeName !== "#text" && !element.classList.contains("hide")) {
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
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, "  ");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 2, position + 2);
    } else if (event.target.id === "Space") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, " ");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 1, position + 1);
    } else if (event.target.id === "Backspace") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position - 1, 1);
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position - 1, position - 1);
    } else if (event.target.id === "Delete") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 1);
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position, position);
    } else if (event.target.id === "Enter") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, "\n");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 1, position + 1);
    }
  }
}

const touchSensor = new Touch();

export const touchSensorEvents = touchSensor.touchEvents;

export const touchEventsBind = touchSensorEvents.bind(touchSensor);
