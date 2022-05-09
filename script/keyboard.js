/* eslint-disable no-shadow */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import { buttons, lettersEn, lettersRu } from "./main.js";
import { wrapper } from "./HTML.js";

export let language = localStorage.language ? localStorage.getItem("language") : "en";
export let capsLock = false;

export class KeyboardWorkLogic {
  constructor(shift = false) {
    this.pressKeyboard = false;
    this.shift = shift;
    this.flagPressCtrShift = false;
    this.input = "";
    this.currentButtons = [];
  }

  textArea() {
    const textArea = document.getElementsByTagName("textarea")[0];
    this.input = textArea.value;
  }

  buttonsEvents(event) {
    this.buttonsHighlighting(event);

    if (event.code !== "Delete" && event.code !== "Backspace" && event.code !== "Enter" && event.code !== "Space") {
      event.preventDefault();
      if (event.code === "CapsLock") {
        this.capsLockFunction();
      }
      if (event.code === "ControlLeft" || event.code === "AltLeft") {
        this.changeLanguage(event);
      }
      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        this.changeShiftElements(event);
      }

      if (event.code === "ArrowLeft" || event.code === "ArrowRight" || event.code === "ArrowUp" || event.code === "ArrowDown") {
        this.arrowOutput(event);
      }
      this.textArea();
      this.addingSymbols(event);
    } else {
      this.textArea();
      this.addingSymbols(event);
      event.preventDefault();
    }
  }

  addingSymbols(event) {
    const textArea = document.getElementsByTagName("textarea")[0];
    if (event.code !== "CapsLock" && event.code !== "Tab" && event.code !== "ShiftLeft" && event.code !== "ShiftRight" && event.code !== "ControlLeft" && event.code !== "AltLeft" && event.code !== "ControlRight" && event.code !== "AltRight" && event.code !== "Delete" && event.code !== "Backspace" && event.code !== "Enter" && event.code !== "Space") {
      buttons.forEach((button) => {
        if (button.id === event.code) {
          button.childNodes.forEach((child) => {
            if (child.nodeName !== "#text" && !child.classList.contains("hide")) {
              if (textArea.selectionEnd < textArea.value.length) {
                const position = textArea.selectionStart;
                this.input = this.input.split("");
                this.input.splice(position, 0, child.innerText);
                this.input = this.input.join("");
                textArea.value = this.input;
                textArea.setSelectionRange(position + 1, position + 1);
              } else {
                this.input += child.innerText;
                textArea.value = this.input;
              }
            }
          });
        }
      });
    } else if (event.code === "Tab") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, "  ");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 2, position + 2);
    } else if (event.code === "Space") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, " ");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 1, position + 1);
    } else if (event.code === "Backspace") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position - 1, 1);
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position - 1, position - 1);
    } else if (event.code === "Delete") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 1);
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position, position);
    } else if (event.code === "Enter") {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, "\n");
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position + 1, position + 1);
    }
  }

  buttonsHighlighting(event) {
    if (event.code === "CapsLock" || event.target.id === "CapsLock") {
      const element = document.getElementById("CapsLock");
      if (element.classList.contains("animation-button-in")) {
        element.classList.remove("animation-button-in");
      } else {
        element.classList.add("animation-button-in");
      }
    } else {
      buttons.forEach((element) => {
        if (element.id === event.code) {
          element.classList.add("animation-button-in");

          const removeEventHighlihting = () => {
            element.classList.remove("animation-button-in");
            element.classList.add("animation-button-out");
            element.addEventListener("transitionend", () => {
              element.classList.remove("animation-button-out");
              event.target.removeEventListener("keyup", removeEventHighlihting);
            });
            // }
          };

          event.target.addEventListener("keyup", removeEventHighlihting);
        }
      });
    }
  }

  capsLockFunction() {
    if (capsLock === true) {
      lettersEn.forEach((element) => {
        element.innerText = element.innerText.toLowerCase();
      });
      lettersRu.forEach((element) => {
        element.innerText = element.innerText.toLowerCase();
      });
      capsLock = false;
    } else if (capsLock === false) {
      lettersEn.forEach((element) => {
        element.innerText = element.innerText.toUpperCase();
      });
      lettersRu.forEach((element) => {
        element.innerText = element.innerText.toUpperCase();
      });
      capsLock = true;
    }
  }

  changeLanguage(event = false) {
    if (event.code === "ControlLeft" && this.flagPressCtrShift !== "Alt") {
      this.flagPressCtrShift = "Ctrl";
      event.target.addEventListener("keyup", () => { this.flagPressCtrShift = false; });
    }
    if ((event.code === "AltLeft" && this.flagPressCtrShift === "Ctrl")) {
      this.flagPressCtrShift = false;
      this.changeLetters();
    }

    if (event.code === "AltLeft" && this.flagPressCtrShift !== "Ctrl") {
      this.flagPressCtrShift = "Alt";
      event.target.addEventListener("keyup", () => { this.flagPressCtrShift = false; });
    }
    if ((event.code === "ControlLeft" && this.flagPressCtrShift === "Alt")) {
      this.flagPressCtrShift = false;
      this.changeLetters();
    }
  }

  changeLetters() {
    if (language === "en") {
      buttons.forEach((element) => {
        if (element.classList.contains("button")) {
          const blockElementsRu = element.querySelectorAll(".letter-ru");
          blockElementsRu.forEach((item) => {
            item.classList.remove("hide");
          });
          const blockElementsEn = element.querySelectorAll(".letter-en");
          blockElementsEn.forEach((item) => {
            item.classList.add("hide");
          });
          const blockSigns = document.getElementById("Slash");
          blockSigns.childNodes.forEach((elem) => {
            if (elem.classList.contains("sign-ru")) {
              elem.classList.remove("hide");
            } else {
              elem.classList.add("hide");
            }
          });
        }
      });
      document.getElementById("Backquote").querySelector(".sign").classList.add("hide");
      document.getElementById("BracketLeft").firstChild.classList.add("hide");
      document.getElementById("BracketRight").firstChild.classList.add("hide");
      document.getElementById("Semicolon").firstChild.classList.add("hide");
      document.getElementById("Quote").firstChild.classList.add("hide");
      document.getElementById("Comma").firstChild.classList.add("hide");
      document.getElementById("Period").firstChild.classList.add("hide");

      language = "ru";
    } else {
      buttons.forEach((element) => {
        if (element.classList.contains("button")) {
          const blockElementsRu = element.querySelectorAll(".letter-ru");
          blockElementsRu.forEach((item) => {
            item.classList.add("hide");
          });
          const blockElementsEn = element.querySelectorAll(".letter-en");
          blockElementsEn.forEach((item) => {
            item.classList.remove("hide");
          });
          const blockSigns = document.getElementById("Slash");
          blockSigns.childNodes.forEach((elem) => {
            if (elem.classList.contains("sign")) {
              elem.classList.remove("hide");
            } else {
              elem.classList.add("hide");
            }
          });
        }
      });
      document.getElementById("Backquote").querySelector(".sign").classList.remove("hide");
      document.getElementById("BracketLeft").firstChild.classList.remove("hide");
      document.getElementById("BracketRight").firstChild.classList.remove("hide");
      document.getElementById("Semicolon").firstChild.classList.remove("hide");
      document.getElementById("Quote").firstChild.classList.remove("hide");
      document.getElementById("Comma").firstChild.classList.remove("hide");
      document.getElementById("Period").firstChild.classList.remove("hide");

      language = "en";
    }
  }

  changeLettersOnload() {
    if (language === "ru") {
      buttons.forEach((element) => {
        if (element.classList.contains("button")) {
          const blockElementsRu = element.querySelectorAll(".letter-ru");
          blockElementsRu.forEach((item) => {
            item.classList.remove("hide");
          });
          const blockElementsEn = element.querySelectorAll(".letter-en");
          blockElementsEn.forEach((item) => {
            item.classList.add("hide");
          });
        }
      });
      const blockSigns = document.getElementById("Slash");
      blockSigns.childNodes.forEach((element) => {
        if (element.classList.contains("sign-ru")) {
          element.classList.remove("hide");
        } else {
          element.classList.add("hide");
        }
      });

      document.getElementById("Backquote").querySelector(".sign").classList.add("hide");
      document.getElementById("BracketLeft").firstChild.classList.add("hide");
      document.getElementById("BracketRight").firstChild.classList.add("hide");
      document.getElementById("Semicolon").firstChild.classList.add("hide");
      document.getElementById("Quote").firstChild.classList.add("hide");
      document.getElementById("Comma").firstChild.classList.add("hide");
      document.getElementById("Period").firstChild.classList.add("hide");

      language = "ru";
    } else {
      buttons.forEach((element) => {
        if (element.classList.contains("button")) {
          const blockElementsRu = element.querySelectorAll(".letter-ru");
          blockElementsRu.forEach((item) => {
            item.classList.add("hide");
          });
          const blockElementsEn = element.querySelectorAll(".letter-en");
          blockElementsEn.forEach((item) => {
            item.classList.remove("hide");
          });
        }
      });
      const blockSigns = document.getElementById("Slash");
      blockSigns.childNodes.forEach((element) => {
        if (element.classList.contains("sign")) {
          element.classList.remove("hide");
        } else {
          element.classList.add("hide");
        }
      });
      document.getElementById("Backquote").querySelector(".sign").classList.remove("hide");
      document.getElementById("BracketLeft").firstChild.classList.remove("hide");
      document.getElementById("BracketRight").firstChild.classList.remove("hide");
      document.getElementById("Semicolon").firstChild.classList.remove("hide");
      document.getElementById("Quote").firstChild.classList.remove("hide");
      document.getElementById("Comma").firstChild.classList.remove("hide");
      document.getElementById("Period").firstChild.classList.remove("hide");
      language = "en";
    }
  }

  changeShiftElements(event) {
    if (language === "en") {
      const englishSigns = wrapper[0].querySelectorAll(".shift-sign-en");
      englishSigns.forEach((element) => {
        element.classList.remove("hide");
        element.previousElementSibling.classList.add("hide");
      });

      this.shift = true;
      lettersEn.forEach((element) => {
        if (capsLock === true) {
          element.innerText = element.innerText.toLowerCase();
        } else {
          element.innerText = element.innerText.toUpperCase();
        }
      });
      lettersRu.forEach((element) => {
        if (capsLock === true) {
          element.innerText = element.innerText.toLowerCase();
        } else {
          element.innerText = element.innerText.toUpperCase();
        }
      });

      const blockSigns = document.getElementById("Slash");
      blockSigns.childNodes.forEach((element) => {
        if (element.classList.contains("shift-sign-en")) {
          element.classList.remove("hide");
        } else {
          element.classList.add("hide");
        }
      });

      const caseDownAfterClick = (event) => {
        if (event.key === "Shift" || event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
          const englishSigns = wrapper[0].querySelectorAll(".shift-sign-en");
          englishSigns.forEach((element) => {
            element.classList.add("hide");
            element.previousElementSibling.classList.remove("hide");
          });

          this.shift = false;
          lettersEn.forEach((element) => {
            if (capsLock === true) {
              element.innerText = element.innerText.toUpperCase();
            } else {
              element.innerText = element.innerText.toLowerCase();
            }
          });
          lettersRu.forEach((element) => {
            if (capsLock === true) {
              element.innerText = element.innerText.toUpperCase();
            } else {
              element.innerText = element.innerText.toLowerCase();
            }
          });
          if (event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
            event.target.removeEventListener("mouseup", caseDownAfterClick);
          } else {
            event.target.removeEventListener("keyup", caseDownAfterClick);
          }
          blockSigns.childNodes.forEach((element) => {
            if (element.classList.contains("sign")) {
              element.classList.remove("hide");
            } else {
              element.classList.add("hide");
            }
          });
        }
      };
      if (event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
        event.target.addEventListener("mouseup", caseDownAfterClick);
      }
      event.target.addEventListener("keyup", caseDownAfterClick);
    }

    if (language === "ru") {
      const russianSigns = wrapper[0].querySelectorAll(".shift-sign-ru");
      russianSigns.forEach((element) => {
        element.classList.remove("hide");
        element.previousElementSibling.classList.add("hide");
      });
      const backslash = document.getElementById("Backslash");
      backslash.firstChild.classList.add("hide");

      const blockSigns = document.getElementById("Slash");
      blockSigns.childNodes.forEach((element) => {
        if (element.classList.contains("shift-sign-ru")) {
          element.classList.remove("hide");
        } else {
          element.classList.add("hide");
        }
      });

      const numbers = wrapper[0].querySelectorAll(".past-number");
      numbers.forEach((item) => {
        item.classList.add("hide");
        if (item.parentElement.children.length < 3) {
          const engSign = item.parentElement.querySelector(".shift-sign-en");
          engSign.classList.remove("hide");
        }
      });
      this.shift = true;
      lettersEn.forEach((element) => {
        if (capsLock === true) {
          element.innerText = element.innerText.toLowerCase();
        } else {
          element.innerText = element.innerText.toUpperCase();
        }
      });
      lettersRu.forEach((element) => {
        if (capsLock === true) {
          element.innerText = element.innerText.toLowerCase();
        } else {
          element.innerText = element.innerText.toUpperCase();
        }
      });

      const caseDownAfterClickEn = (event) => {
        if (event.key === "Shift" || event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
          const russianSigns = wrapper[0].querySelectorAll(".shift-sign-ru");
          russianSigns.forEach((element) => {
            element.classList.add("hide");
            // element.previousElementSibling.classList.remove("hide");
          });
          const backslash = document.getElementById("Backslash");
          backslash.firstChild.classList.remove("hide");

          const numbers = wrapper[0].querySelectorAll(".past-number");
          numbers.forEach((item) => {
            item.classList.remove("hide");
            if (item.parentElement.children.length < 3) {
              const engSign = item.parentElement.querySelector(".shift-sign-en");
              engSign.classList.add("hide");
            }
          });

          this.shift = false;
          lettersEn.forEach((element) => {
            if (capsLock === true) {
              element.innerText = element.innerText.toUpperCase();
            } else {
              element.innerText = element.innerText.toLowerCase();
            }
          });
          lettersRu.forEach((element) => {
            if (capsLock === true) {
              element.innerText = element.innerText.toUpperCase();
            } else {
              element.innerText = element.innerText.toLowerCase();
            }
          });
          const blockSigns = document.getElementById("Slash");
          blockSigns.childNodes.forEach((element) => {
            if (element.classList.contains("sign-ru")) {
              element.classList.remove("hide");
            } else {
              element.classList.add("hide");
            }
          });
          if (event.type === "keydown") {
            event.target.removeEventListener("keyup", caseDownAfterClickEn);
          } else if (event.type === "mousedown") {
            event.target.removeEventListener("mouseup", caseDownAfterClickEn);
          }
        }
      };
      if (event.type === "keydown") {
        event.target.addEventListener("keyup", caseDownAfterClickEn);
      } else if (event.type === "mousedown") {
        event.target.addEventListener("mouseup", caseDownAfterClickEn);
      }
    }
  }

  arrowOutput(event) {
    const textArea = document.getElementsByTagName("textarea")[0];
    const addElementsInsideRow = (string) => {
      const position = textArea.selectionStart;
      const text = textArea.value.split("");
      text.splice(position, 0, string);
      textArea.value = text.join("");
      this.input = text.join("");
      textArea.setSelectionRange(position, position);
    };

    if (event.code === "ArrowLeft" || event.target.id === "ArrowLeft") {
      const textArea = document.getElementsByTagName("textarea")[0];
      const arrow = "←";
      if (textArea.selectionEnd < textArea.value.length) {
        addElementsInsideRow(arrow);
      } else {
        textArea.value += arrow;
        this.input = textArea.value;
      }
    }
    if (event.code === "ArrowRight" || event.target.id === "ArrowRight") {
      const textArea = document.getElementsByTagName("textarea")[0];
      const arrow = "→";
      if (textArea.selectionEnd < textArea.value.length) {
        addElementsInsideRow(arrow);
      } else {
        textArea.value += arrow;
        this.input = textArea.value;
      }
    }
    if (event.code === "ArrowUp" || event.target.id === "ArrowUp") {
      const textArea = document.getElementsByTagName("textarea")[0];
      const arrow = "↑";
      if (textArea.selectionEnd < textArea.value.length) {
        addElementsInsideRow(arrow);
      } else {
        textArea.value += arrow;
        this.input = textArea.value;
      }
    }
    if (event.code === "ArrowDown" || event.target.id === "ArrowDown") {
      const textArea = document.getElementsByTagName("textarea")[0];
      const arrow = "↓";
      if (textArea.selectionEnd < textArea.value.length) {
        addElementsInsideRow(arrow);
      } else {
        textArea.value += arrow;
        this.input = textArea.value;
      }
    }
  }
}

export const keyboardWork = new KeyboardWorkLogic(localStorage.language);

const { buttonsEvents } = keyboardWork;
export const buttonsEventsBind = buttonsEvents.bind(keyboardWork);

const changeLetters = keyboardWork.changeLettersOnload;
export const changeLettersBind = changeLetters.bind(keyboardWork);

export const { buttonsHighlighting } = keyboardWork;
