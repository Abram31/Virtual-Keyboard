const baseDocumentHtml = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KeyBord</title>`

const html = document.querySelector('html')
const head = html.querySelector('head')
const scriptHTML = `<script type = "module" src = "./script/main.js" ></script>`

const cssHTML = `<link rel="stylesheet" href="./main.css">`
const body = document.querySelector('body')
const div = document.createElement('div')

const wrapper =  body.getElementsByClassName('wrapper')
const textAreaHTML = `<textarea class = "wrapper-text-area" name="" id="" cols="30" rows="10"></textarea>`



class addHTML {

 addBasicStructure = () => {
    html.lang = 'en'
    head.insertAdjacentHTML('afterbegin', baseDocumentHtml)
    body.insertAdjacentHTML('beforeend', scriptHTML)
    head.insertAdjacentHTML('beforeend', cssHTML)
    head.querySelector('script').remove()

    body.insertAdjacentHTML('afterbegin', `<div class = 'wrapper'></div>`)
}

addTextArea = () => {
    console.log(wrapper[0]);
 wrapper[0].insertAdjacentHTML('afterbegin', textAreaHTML)
}

addKeyBoard = () => {
    const wrapperKeyBoard = document.querySelector('.wrapper-text-area')
    console.log(wrapperKeyBoard);
    const wrapperKeyBoardHTML = `<div class="wrapper-keyboard"></div>`

    wrapper[0].insertAdjacentHTML('beforeend', wrapperKeyBoardHTML)

    const wrapperKeyBoardBlock = document.querySelector('.wrapper-keyboard')  
     
    const firstRow = `
    <div class="keyboard-first-row">
    <div class="button">
        <span class="language-en">
        <span class="bottom-font">\`\</span>
        <span class="top-font hide">~</span>
        </span >
        <span class="language-ru hide">
            <span class="bottom-font">ё</span>
            <span class="top-font">Ё</span>
        </span>
    </div >
    <div class="button"><span class="past-number">1</span><span class="shift-number hide">!</span></div>
    <div class="button"><span class="past-number">2</span><span class="shift-number hide">@</span></div>
    <div class="button"><span class="past-number">3</span><span class="shift-number hide">#</span></div>
    <div class="button"><span class="past-number">4</span><span class="shift-number hide">$</span></div>
    <div class="button"><span class="past-number">5</span><span class="shift-number hide">%</span></div>
    <div class="button"><span class="past-number">6</span><span class="shift-number hide">^</span></div>
    <div class="button"><span class="past-number">7</span><span class="shift-number hide">&</span></div>
    <div class="button"><span class="past-number">8</span><span class="shift-number hide">*</span></div>
    <div class="button"><span class="past-number">9</span><span class="shift-number hide">(</span></div>
    <div class="button"><span class="past-number">0</span><span class="shift-number hide">)</span></div>
    <div class="button"><span class="past-number">-</span><spa class="shift-number hide">_</span></div>
    <div class="button"><span class="past-number">=</span><spa class="shift-number hide">+</span></div>
    <div class="button button-backspase">Backspase</div>
</div >`

wrapperKeyBoardBlock.insertAdjacentHTML('beforeend', firstRow )

const secondRow = `
<div class="keyboard-second-row">

<div class="button button-tab"><span>Tab</span></div>
<div class="button"><span class="letter-en">q</span><span class="letter-ru hide">й</span></div>
<div class="button"><span class="letter-en">w</span><span class="letter-ru hide">ц</span></div>
<div class="button"><span class="letter-en">e</span><span class="letter-ru hide">у</span></div>
<div class="button"><span class="letter-en">r</span><span class="letter-ru hide">к</span></div>
<div class="button"><span class="letter-en">t</span><span class="letter-ru hide">е</span></div>
<div class="button"><span class="letter-en">y</span><span class="letter-ru hide">н</span></div>
<div class="button"><span class="letter-en">u</span><span class="letter-ru hide">г</span></div>
<div class="button"><span class="letter-en">i</span><span class="letter-ru hide">ш</span></div>
<div class="button"><span class="letter-en">o</span><span class="letter-ru hide">щ</span></div>
<div class="button"><span class="letter-en">p</span><span class="letter-ru hide">з</span></div>
<div class="button"><span class="sign">[</span><span class="shift-sign hide">{</span><span class="letter-ru hide">х</span></div>
<div class="button"><span class="sign">]</span><span class="shift-sign hide">}</span><span class="letter-ru hide">ъ</span></div>
<div class="button"><span class="sign">\\\</span><span class="shift-sign hide">|</span><span class="shift-sign-ru hide">/</span></div>
<div class="button"><span class="delete">Del</span></div>

</div>`

    wrapperKeyBoardBlock.insertAdjacentHTML('beforeend', secondRow)

    const thirdRow = `
    <div class="keyboard-third-row">
    <div class="button button-capslock"><span>Caps Lock</span></div>
    <div class="button"><span class="letter-en">a</span><span class="letter-ru hide">ф</span></div>
    <div class="button"><span class="letter-en">s</span><span class="letter-ru hide">ы</span></div>
    <div class="button"><span class="letter-en">d</span><span class="letter-ru hide">в</span></div>
    <div class="button"><span class="letter-en">f</span><span class="letter-ru hide">а</span></div>
    <div class="button"><span class="letter-en">g</span><span class="letter-ru hide">п</span></div>
    <div class="button"><span class="letter-en">h</span><span class="letter-ru hide">р</span></div>
    <div class="button"><span class="letter-en">j</span><span class="letter-ru hide">о</span></div>
    <div class="button"><span class="letter-en">k</span><span class="letter-ru hide">л</span></div>
    <div class="button"><span class="letter-en">l</span><span class="letter-ru hide">д</span></div>
    <div class="button"><span class="sign">;</span><span class="shift-sign hide">:</span><span class="letter-ru hide">ж</span></div>
    <div class="button"><span class="sign">'</span><span class="shift-sign hide">"</span><span class="letter-ru hide">э</span></div>
    <div class="button button-enter"><span>Enter</span></div>
    
    </div>`
    wrapperKeyBoardBlock.insertAdjacentHTML('beforeend', thirdRow)

    const fourthRow = `
    <div class="keyboard-fourth-row">
 
    <div class="button button-shift"><span>Shift</span></div>
    <div class="button"><span class="letter-en">z</span><span class="letter-ru hide">я</span></div>
    <div class="button"><span class="letter-en">x</span><span class="letter-ru hide">ч</span></div>
    <div class="button"><span class="letter-en">c</span><span class="letter-ru hide">с</span></div>
    <div class="button"><span class="letter-en">v</span><span class="letter-ru hide">м</span></div>
    <div class="button"><span class="letter-en">b</span><span class="letter-ru hide">и</span></div>
    <div class="button"><span class="letter-en">n</span><span class="letter-ru hide">т</span></div>
    <div class="button"><span class="letter-en">m</span><span class="letter-ru hide">ь</span></div>
    <div class="button"><span class="sign">,</span><span class="shift-sign hide"><</span><span class="letter-ru hide">б</span></div>
    <div class="button"><span class="sign">.</span><span class="shift-sign hide">></span><span class="letter-ru hide">ю</span></div>
    <div class="button"><span class="sign">/</span><span class="shift-sign hide">?</span></div>
    <div class="button"><span class="button-arrow-up"></span></div>
    <div class="button right-shift"><span>Shift</span></div>
</div> `   

    wrapperKeyBoardBlock.insertAdjacentHTML('beforeend', fourthRow)

    const fifthRow = `
    <div class="keyboard-fifth-row">
    <div class="button button-ctrl"><span>Ctrl</span></div>
    <div class="button"><span class="button-win"></span></div>
    <div class="button button-alt"><span>Alt</span></div>
    <div class="button button-space"><span></span></div>
    <div class="button button-alt"><span>Alt</span></div>
    <div class="button"><span class="button-arrow-left"></span></div>
    <div class="button"><span class="button-arrow-down"></span></div>
    <div class="button"><span class="button-arrow-right"></span></div>
    <div class="button button-ctrl"><span>Ctrl</span></div>
</div>`

    wrapperKeyBoardBlock.insertAdjacentHTML('beforeend', fifthRow)

}
}

const innerHTML = new addHTML();
export let {addBasicStructure,addTextArea, addKeyBoard} = innerHTML;