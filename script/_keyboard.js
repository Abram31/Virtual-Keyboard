
import { buttons, lettersEn, lettersRu } from "./main.js";
import { wrapper } from "./_HTML.js";
// import { wrapper } from "./_HTML";

export class keyboardWorkLogic {
    constructor(language = "en", shift = false, capsLock = false) {
        this.language = language;
        this.pressKeyboard = false;
        this.shift = shift;
        this.capsLock = capsLock;
        this.flagPressCtrShift = false;

        this.input = "";
    }

    
    textArea() {
        const textArea = document.getElementsByTagName("textarea")[0];
        this.input = textArea.value;
        

    }

    buttonsEvents(event) {
        buttonsHighlighting(event);
        
        if (event.code != "Delete" && event.code != "Backspace" && event.code != "Enter" && event.code != "Space") {
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
            console.log("stabdart!");
            console.log(event.code);
            this.textArea();
            // this.addingSymbols(event);

        }
        
        
                    
    

    }

    addingSymbols (event) {
        const textArea = document.getElementsByTagName("textarea")[0];
        console.log(textArea);
        if (event.code != "CapsLock" && event.code != "Tab" && event.code != "ShiftLeft" && event.code != "ShiftRight" && event.code != "ControlLeft" && event.code != "AltLeft" && event.code != "ControlRight" && event.code != "AltRight") {
            buttons.forEach(button => {
                if (button.id === event.code) {
                    button.childNodes.forEach(child => {
                        if (child.nodeName != "#text" && !child.classList.contains("hide")) {
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
                        // console.log(child.nodeName);
                        // console.log(child.nodeName == "#text");

                    });
                }
            });
        } else if (event.code === "Tab") {
            const position = textArea.selectionStart;
            this.input = this.input.split("");
            this.input.splice(position, 0, "  ");
            this.input = this.input.join("");
            textArea.value = this.input;
            textArea.setSelectionRange(position + 2, position + 2);

        }
        
    }
    buttonsHighlighting(event) {
        buttons.forEach(element => {
            if (element.id === event.code) {
                element.classList.add("animation-button-in");
                // element.addEventListener("animationend", () => element.classList.remove("animation-button-in"));

                let removeEventHighlihting = () => {
                    element.classList.remove("animation-button-in");
                    element.classList.add("animation-button-out");
                    element.addEventListener("transitionend", () => {
                        element.classList.remove("animation-button-out");
                        event.target.removeEventListener("keyup", removeEventHighlihting);
                    });
                    // element.removeEventListener("keyup", removeEventHighlihting);
                };

                event.target.addEventListener("keyup", removeEventHighlihting);

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
        } else if (this.capsLock === false) {
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
            if (this.language === "en") {
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
                document.getElementById("Backquote").querySelector(".sign").classList.add("hide");
                // document.getElementById("Backquote").querySelector(".shift-sign-en").classList.add("hide");
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
                document.getElementById("Backquote").querySelector(".sign").classList.remove("hide");
                document.getElementById("BracketLeft").firstChild.classList.remove("hide");
                document.getElementById("BracketRight").firstChild.classList.remove("hide");
                document.getElementById("Semicolon").firstChild.classList.remove("hide");
                document.getElementById("Quote").firstChild.classList.remove("hide");
                document.getElementById("Comma").firstChild.classList.remove("hide");
                document.getElementById("Period").firstChild.classList.remove("hide");
                this.language = "en";
            }
        };

        if (event.code === "ControlLeft" && this.flagPressCtrShift != "Alt") {
            this.flagPressCtrShift = "Ctrl";
            event.target.addEventListener("keyup", () => this.flagPressCtrShift = false);
        }
        if ((event.code === "AltLeft" && this.flagPressCtrShift === "Ctrl")) {
            this.flagPressCtrShift = false;
            console.log("altlShift");
            changeLetters();
        }

        if (event.code === "AltLeft" && this.flagPressCtrShift != "Ctrl") {
            this.flagPressCtrShift = "Alt";
            event.target.addEventListener("keyup", () => this.flagPressCtrShift = false);
        }
        if ((event.code === "ControlLeft" && this.flagPressCtrShift === "Alt")) {
            this.flagPressCtrShift = false;
            changeLetters();
        }
    }

    changeShiftElements(event) {

        if (this.language === "en") {

            const englishSigns = wrapper[0].querySelectorAll(".shift-sign-en");
            englishSigns.forEach(element => {
                element.classList.remove("hide");
                element.previousElementSibling.classList.add("hide");
            });

            this.shift = true;
            lettersEn.forEach(element => {
                if(this.capsLock === true) {
                    element.innerText = element.innerText.toLowerCase();
                } else {
                    element.innerText = element.innerText.toUpperCase();
                }
            });
            lettersRu.forEach(element => {
                if (this.capsLock === true) {
                    element.innerText = element.innerText.toLowerCase();

                } else {
                    element.innerText = element.innerText.toUpperCase();
                }
            });



            let caseDownAfterClick = (event) => {
                if (event.key === "Shift" || event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
                    const englishSigns = wrapper[0].querySelectorAll(".shift-sign-en");
                    englishSigns.forEach(element => {
                        element.classList.add("hide");
                        element.previousElementSibling.classList.remove("hide");
                    });

                    this.shift = false;
                    lettersEn.forEach(element => {
                        if (this.capsLock === true) {
                            element.innerText = element.innerText.toUpperCase();

                        } else {
                            element.innerText = element.innerText.toLowerCase();
                        }
                    });
                    lettersRu.forEach(element => {
                        if(this.capsLock === true) {
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
                }
            };
            if (event.target.id === "ShiftRight" || event.target.id === "ShiftLeft") {
                event.target.addEventListener("mouseup", caseDownAfterClick);

            }
            event.target.addEventListener("keyup", caseDownAfterClick);
        }


        if (this.language === "ru") {
            const russianSigns = wrapper[0].querySelectorAll(".shift-sign-ru");
            russianSigns.forEach(element => {
                element.classList.remove("hide");
                element.previousElementSibling.classList.add("hide");
            });
            const backslash = document.getElementById("Backslash");
            backslash.firstChild.classList.add("hide");



            const numbers = wrapper[0].querySelectorAll(".past-number");
            numbers.forEach(item => {
                item.classList.add("hide");
                console.log(item.parentElement.children.length);
                if (item.parentElement.children.length < 3) {
                    const engSign = item.parentElement.querySelector(".shift-sign-en");
                    engSign.classList.remove("hide");

                }
            });
            this.shift = true;
            lettersEn.forEach(element => {
                if (this.capsLock === true) {
                    element.innerText = element.innerText.toLowerCase();

                } else {
                    element.innerText = element.innerText.toUpperCase();
                }
            });
            lettersRu.forEach(element => {
                if (this.capsLock === true) {
                    element.innerText = element.innerText.toLowerCase();

                } else {
                    element.innerText = element.innerText.toUpperCase();
                }
            });

            let caseDownAfterClickEn = (event) => {
                if (event.key === "Shift") {
                    const russianSigns = wrapper[0].querySelectorAll(".shift-sign-ru");
                    russianSigns.forEach(element => {
                        element.classList.add("hide");
                        // element.previousElementSibling.classList.remove("hide");
                    });
                    const backslash = document.getElementById("Backslash");
                    backslash.firstChild.classList.remove("hide");

                    const numbers = wrapper[0].querySelectorAll(".past-number");
                    numbers.forEach(item => {
                        item.classList.remove("hide");
                        console.log(item.parentElement.children.length);
                        if (item.parentElement.children.length < 3) {
                            const engSign = item.parentElement.querySelector(".shift-sign-en");
                            engSign.classList.add("hide");

                        }
                    });

                    this.shift = false;
                    lettersEn.forEach(element => {
                        if (this.capsLock === true) {
                            element.innerText = element.innerText.toUpperCase();
                        } else {
                            element.innerText = element.innerText.toLowerCase();
                        }
                    });
                    lettersRu.forEach(element => {
                        if (this.capsLock === true) {
                            element.innerText = element.innerText.toUpperCase();

                        } else {
                            element.innerText = element.innerText.toLowerCase();
                        }
                    });
                    console.log("keyUp");
                    event.target.removeEventListener("keyup", caseDownAfterClickEn);
                }
            };
            event.target.addEventListener("keyup", caseDownAfterClickEn);
        }

    }

    arrowOutput(event) {
        const textArea = document.getElementsByTagName("textarea")[0];
        if (event.code === "ArrowLeft" || event.target.id === "ArrowLeft") {
            this.input += "←";
            textArea.value = this.input;
        }
        if (event.code === "ArrowRight" || event.target.id === "ArrowRight") {
            this.input += "→";
            textArea.value = this.input;
        }
        if (event.code === "ArrowUp" || event.target.id === "ArrowUp") {
            this.input += "↑";
            textArea.value = this.input;
        }
        if (event.code === "ArrowDown" || event.target.id === "ArrowDown") {
            this.input += "↓";
            textArea.value = this.input;
        }
    }

}

export const keyboardWork = new keyboardWorkLogic();

const buttonsEvents = keyboardWork.buttonsEvents;
export const buttonsEventsBind = buttonsEvents.bind(keyboardWork);

export const buttonsHighlighting = keyboardWork.buttonsHighlighting;



