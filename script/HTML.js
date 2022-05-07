const doctype = `<!DOCTYPE html>`
const baseDocumentHtml = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KeyBord</title>`;

const html = document.querySelector("html");
const head = html.querySelector("head");
const scriptHTML = "<script type = \"module\" src = \"./script/main.js\" ></script>";

const cssHTML = "<link rel=\"stylesheet\" href=\"./main.css\">";
const body = document.querySelector("body");
const div = document.createElement("div");

export const wrapper =  body.getElementsByClassName("wrapper");

const textAreaHTML = "<textarea autofocus class = \"wrapper-text-area\" name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>";



class addHTML {

 addBasicStructure = () => {
    // html.insertAdjacentHTML("beforebegin", doctype)
    html.lang = "en";
    head.insertAdjacentHTML("afterbegin", baseDocumentHtml);
    body.insertAdjacentHTML("beforeend", scriptHTML);
    head.insertAdjacentHTML("beforeend", cssHTML);
    head.querySelector("script").remove();

    body.insertAdjacentHTML("afterbegin", "<div class = 'wrapper'></div>");
};

addTextArea = () => {
 wrapper[0].insertAdjacentHTML("afterbegin", textAreaHTML);
};

addKeyBoard = () => {
    const wrapperKeyBoard = document.querySelector(".wrapper-text-area");
    console.log(wrapperKeyBoard);
    const wrapperKeyBoardHTML = "<div class=\"wrapper-keyboard\"></div>";

    wrapper[0].insertAdjacentHTML("beforeend", wrapperKeyBoardHTML);

    const wrapperKeyBoardBlock = document.querySelector(".wrapper-keyboard");  
     
    const firstRow = `
    <div class="keyboard-first-row">
    <div class="button" id = "Backquote">
        
        <span class="sign">\`\</span>
        <span class="shift-sign-en hide">~</span>
        </span >
        <span class="letter-ru hide">
            <span class="letter-ru">ё</span>
        </span>
    </div >
    <div class="button" id = "Digit1"><span class="past-number">1</span><span class="shift-sign-en hide">!</span></div>
    <div class="button" id = "Digit2"><span class="past-number">2</span><span class="shift-sign-en hide">@</span><span class="shift-sign-ru hide">"</span></div>
    <div class="button" id = "Digit3"><span class="past-number">3</span><span class="shift-sign-en hide">#</span><span class="shift-sign-ru hide">№</span></div>
    <div class="button" id = "Digit4"><span class="past-number">4</span><span class="shift-sign-en hide">$</span><span class="shift-sign-ru hide">;</span></div>
    <div class="button" id = "Digit5"><span class="past-number">5</span><span class="shift-sign-en hide">%</span></div>
    <div class="button" id = "Digit6"><span class="past-number">6</span><span class="shift-sign-en hide">^</span><span class="shift-sign-ru hide">:</span></div>
    <div class="button" id = "Digit7"><span class="past-number">7</span><span class="shift-sign-en hide">&</span><span class="shift-sign-ru hide">?</span></div>
    <div class="button" id = "Digit8"><span class="past-number">8</span><span class="shift-sign-en hide">*</span></div>
    <div class="button" id = "Digit9"><span class="past-number">9</span><span class="shift-sign-en hide">(</span></div>
    <div class="button" id = "Digit0"><span class="past-number">0</span><span class="shift-sign-en hide">)</span></div>
    <div class="button" id = "Minus"><span class="past-number">-</span><span class="shift-sign-en hide">_</span></div>
    <div class="button" id = "Equal"><span class="past-number">=</span><span class="shift-sign-en hide">+</span></div>
    <div class="button button-backspase" id = "Backspace">Backspase</div>
</div >`;

wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", firstRow );

const secondRow = `
<div class="keyboard-second-row">

<div class="button button-tab" id = "Tab"><span>Tab</span></div>
<div class="button" id = "KeyQ"><span class="letter-en">q</span><span class="letter-ru hide">й</span></div>
<div class="button" id = "KeyW"><span class="letter-en">w</span><span class="letter-ru hide">ц</span></div>
<div class="button" id = "KeyE"><span class="letter-en">e</span><span class="letter-ru hide">у</span></div>
<div class="button" id = "KeyR"><span class="letter-en">r</span><span class="letter-ru hide">к</span></div>
<div class="button" id = "KeyT"><span class="letter-en">t</span><span class="letter-ru hide">е</span></div>
<div class="button" id = "KeyY"><span class="letter-en">y</span><span class="letter-ru hide">н</span></div>
<div class="button" id = "KeyU"><span class="letter-en">u</span><span class="letter-ru hide">г</span></div>
<div class="button" id = "KeyI"><span class="letter-en">i</span><span class="letter-ru hide">ш</span></div>
<div class="button" id = "KeyO"><span class="letter-en">o</span><span class="letter-ru hide">щ</span></div>
<div class="button" id = "KeyP"><span class="letter-en">p</span><span class="letter-ru hide">з</span></div>
<div class="button" id = "BracketLeft"><span class="sign">[</span><span class="shift-sign-en hide">{</span><span class="letter-ru hide">х</span></div>
<div class="button" id = "BracketRight"><span class="sign">]</span><span class="shift-sign-en hide">}</span><span class="letter-ru hide">ъ</span></div>
<div class="button" id = "Backslash"><span class="sign">\\\</span><span class="shift-sign-en hide">|</span><span class="shift-sign-ru hide">/</span></div>
<div class="button" id = "Delete"><span class="delete">Del</span></div>

</div>`;

    wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", secondRow);

    const thirdRow = `
    <div class="keyboard-third-row">
    <div class="button button-capslock" id = "CapsLock"><span>Caps Lock</span></div>
    <div class="button" id = "KeyA"><span class="letter-en">a</span><span class="letter-ru hide">ф</span></div>
    <div class="button" id = "KeyS"><span class="letter-en">s</span><span class="letter-ru hide">ы</span></div>
    <div class="button" id = "KeyD"><span class="letter-en">d</span><span class="letter-ru hide">в</span></div>
    <div class="button" id = "KeyF"><span class="letter-en">f</span><span class="letter-ru hide">а</span></div>
    <div class="button" id = "KeyG"><span class="letter-en">g</span><span class="letter-ru hide">п</span></div>
    <div class="button" id = "KeyH"><span class="letter-en">h</span><span class="letter-ru hide">р</span></div>
    <div class="button" id = "KeyJ"><span class="letter-en">j</span><span class="letter-ru hide">о</span></div>
    <div class="button" id = "KeyK"><span class="letter-en">k</span><span class="letter-ru hide">л</span></div>
    <div class="button" id = "KeyL"><span class="letter-en">l</span><span class="letter-ru hide">д</span></div>
    <div class="button" id = "Semicolon"><span class="sign">;</span><span class="shift-sign-en hide">:</span><span class="letter-ru hide">ж</span></div>
    <div class="button" id = "Quote"><span class="sign">'</span><span class="shift-sign-en hide">"</span><span class="letter-ru hide">э</span></div>
    <div class="button button-enter" id = "Enter"><span>Enter</span></div>
    
    </div>`;
    wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", thirdRow);

    const fourthRow = `
    <div class="keyboard-fourth-row">
 
    <div class="button button-shift" id = "ShiftLeft"><span>Shift</span></div>
    <div class="button" id = "KeyZ"><span class="letter-en">z</span><span class="letter-ru hide">я</span></div>
    <div class="button" id = "KeyX"><span class="letter-en">x</span><span class="letter-ru hide">ч</span></div>
    <div class="button" id = "KeyC"><span class="letter-en">c</span><span class="letter-ru hide">с</span></div>
    <div class="button" id = "KeyV"><span class="letter-en">v</span><span class="letter-ru hide">м</span></div>
    <div class="button" id = "KeyB"><span class="letter-en">b</span><span class="letter-ru hide">и</span></div>
    <div class="button" id = "KeyN"><span class="letter-en">n</span><span class="letter-ru hide">т</span></div>
    <div class="button" id = "KeyM"><span class="letter-en">m</span><span class="letter-ru hide">ь</span></div>
    <div class="button" id ="Comma"><span class="sign">,</span><span class="shift-sign-en hide"><</span><span class="letter-ru hide">б</span></div>
    <div class="button" id ="Period"><span class="sign">.</span><span class="shift-sign-en hide">></span><span class="letter-ru hide">ю</span></div>
    <div class="button" id ="Slash"><span class="sign">/</span><span class="shift-sign-en hide">?</span></div>
    <div class="button" id = "ArrowUp"><span class="button-arrow-up"></span></div>
    <div class="button right-shift" id = "ShiftRight"><span>Shift</span></div>
</div> `;   

    wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", fourthRow);

    const fifthRow = `
    <div class="keyboard-fifth-row">
    <div class="button button-ctrl" id ="ControlLeft" ><span>Ctrl</span></div>
    <div class="button" id = "MetaLeft"><span class="button-win"></span></div>
    <div class="button button-alt" id = "AltLeft"><span>Alt</span></div>
    <div class="button button-space" id = "Space"><span></span></div>
    <div class="button button-alt" id = "AltRight"><span>Alt</span></div>
    <div class="button" id = "ArrowLeft"><span class="button-arrow-left"></span></div>
    <div class="button" id = "ArrowDown"><span class="button-arrow-down"></span></div>
    <div class="button" id = "ArrowRight"><span class="button-arrow-right"></span></div>
    <div class="button button-ctrl" id = "ControlRight"><span>Ctrl</span></div>
</div>`;

    wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", fifthRow);

    const changeLang =`
    <div class = "change-language"> Клавиатура создана в операционной системе Windows </div>
    <div class = "change-language">Смена языка осуществляется комбинацией клавиш Ctrl + Alt</div>`;

    wrapperKeyBoardBlock.insertAdjacentHTML("beforeend", changeLang);

};

}

const innerHTML = new addHTML();
export let {addBasicStructure,addTextArea, addKeyBoard} = innerHTML;

