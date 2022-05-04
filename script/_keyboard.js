
import { buttons, lettersEn, lettersRu } from "./main.js";
import { wrapper } from "./_HTML.js";
// import { wrapper } from "./_HTML";


class keyboardWorkLogic {
    constructor(language = "en", shift = false, capsLock = false) {
        this.language = language;
        this.shift = shift;
        this.capsLock = capsLock;
        this.flagPressCtrShift = false;
    }

    buttonsEvents(event) {
        buttonsHighlighting(event);
        if (event.code === "CapsLock") {
            this.capsLockFunction();
        }
        if (event.code === "ControlLeft" || event.code === "ShiftLeft") {
            this.changeLanguage(event);
        }


    }
    buttonsHighlighting(event) {
        buttons.forEach(element => {
            if (element.id === event.code) {
                element.classList.add("animation-button");
                element.addEventListener("animationend", () => element.classList.remove("animation-button"));

            }

        });
    }
    capsLockFunction() {
        if (this.capsLock === true) {
            lettersEn.forEach(element => {
                element.innerText = element.innerText.toLowerCase();
            });
            lettersRu.forEach(element => {
                element.innerText = element.innerText.toLowerCase();
            });
            this.capsLock = false;
        } else {
            lettersEn.forEach(element => {
                element.innerText = element.innerText.toUpperCase();
            });
            lettersRu.forEach(element => {
                element.innerText = element.innerText.toUpperCase();
            });
            this.capsLock = true;

        }
    }
    changeLanguage(event) {
        let changeLetters = () => {
            if(this.language === "en") {
                buttons.forEach(element => {
                    if (element.classList.contains("button")) {
                        const blockElementsRu = element.querySelectorAll(".letter-ru");
                        blockElementsRu.forEach(item => {
                            item.classList.remove("hide");
                        });
                        const blockElementsEn = element.querySelectorAll(".letter-en");
                        blockElementsEn.forEach(item => {
                            item.classList.add("hide");
                        });
                    }
                });
                document.getElementById("BracketLeft").firstChild.classList.add("hide");
                document.getElementById("BracketRight").firstChild.classList.add("hide");
                document.getElementById("Semicolon").firstChild.classList.add("hide");
                document.getElementById("Quote").firstChild.classList.add("hide");
                document.getElementById("Comma").firstChild.classList.add("hide");
                document.getElementById("Period").firstChild.classList.add("hide");


                this.language = "ru";
            } else {
                buttons.forEach(element => {
                    if (element.classList.contains("button")) {
                        const blockElementsRu = element.querySelectorAll(".letter-ru");
                        blockElementsRu.forEach(item => {
                            item.classList.add("hide");
                        });
                        const blockElementsEn = element.querySelectorAll(".letter-en");
                        blockElementsEn.forEach(item => {
                            item.classList.remove("hide");
                        });
                    }
                });
                document.getElementById("BracketLeft").firstChild.classList.remove("hide");
                document.getElementById("BracketRight").firstChild.classList.remove("hide");
                document.getElementById("Semicolon").firstChild.classList.remove("hide");
                document.getElementById("Quote").firstChild.classList.remove("hide");
                document.getElementById("Comma").firstChild.classList.remove("hide");
                document.getElementById("Period").firstChild.classList.remove("hide");
                this.language = "en";
            }
        };

        if (event.code === "ControlLeft" && this.flagPressCtrShift != "Shift") {
            this.flagPressCtrShift = "Ctrl";
            event.target.addEventListener("keyup", () => this.flagPressCtrShift = false);
        }
        if ((event.code === "ShiftLeft" && this.flagPressCtrShift === "Ctrl")) {
            this.flagPressCtrShift = false;
            console.log("ctrlShift");
            changeLetters();
        }

        if (event.code === "ShiftLeft" && this.flagPressCtrShift != "Ctrl") {
            this.flagPressCtrShift = "Shift";
            event.target.addEventListener("keyup", () => this.flagPressCtrShift = false);
        }
        if ((event.code === "ControlLeft" && this.flagPressCtrShift === "Shift")) {
            this.flagPressCtrShift = false;
            changeLetters();
        }
    }

}

const keyboardWork = new keyboardWorkLogic();

const buttonsEvents = keyboardWork.buttonsEvents;
export const buttonsEventsBind = buttonsEvents.bind(keyboardWork);

export const buttonsHighlighting = keyboardWork.buttonsHighlighting;
export const capsLockFunc = keyboardWork.capsLockFunction;



