window.onload = function() { // declare variables
    var keyboardModeBtn = document.getElementById("keyboardModeBtn");
    var textField = document.getElementById("textField");
    var modebtns = document.getElementsByClassName("modebtns")[0];
    var searchBoxSymbols = document.getElementById("searchBoxSymbols");
    var searchBoxEmoticons = document.getElementById("searchBoxEmoticons");
    // default mode
    selectMode("fontsBtn");
    // default font selected if none selected
    selectFont("normalFontBtn");
    var fontid = "normalFont";
    // when the user types in the textField
    textField.addEventListener('keypress', function(event) {
        var selectedmode = document.querySelector(".h2menubtns.selectedbtn");
        if (event.key != 'Enter' && event.key != 'Tab') {
            if (selectedmode.id === "fontsBtn") {
                fontsInputHandler(event.key);
            }
        }
    });
    // when the user inputs in the searchBox
    searchBoxSymbols.addEventListener('input', function(event) {
        searchSymbols(this.value.toLowerCase());
    });
    searchBoxEmoticons.addEventListener('input', function(event) {
        searchEmoticons(this.value.toLowerCase());
    });
    // when the user selects a mode
    modebtns.addEventListener('click', function(event) {
        var selectedmode = document.querySelector(".h2menubtns.selectedbtn");
        if (selectedmode.id === "symbolsBtn") {
            clearSearchBox(searchBoxSymbols);
            searchBoxSymbols.focus();
        }
        if (selectedmode.id === "emoticonsBtn") {
            clearSearchBox(searchBoxEmoticons);
            searchBoxEmoticons.focus();
        }
    });
    // when the user selects text and selects a font, symbol or emoticon
    var selectionbuttonsdiv = document.getElementsByClassName("selectionbuttonsdiv")[0];
    selectionbuttonsdiv.addEventListener('click', function(event) {
        var selectedmode = document.querySelector(".h2menubtns.selectedbtn")
        var typingIndexStart = textField.selectionStart;
        var typingIndexEnd = textField.selectionEnd;
        var selectedtext = textField.value.slice(typingIndexStart, typingIndexEnd);
        if (typingIndexStart != typingIndexEnd) {
            if (selectedmode.id === "fontsBtn") {
                fontsInputHandler(selectedtext);
            }
        }
        if (keyboardModeBtn.classList.contains("disabled")) {
            fontsInputHandler("");
        }
    });
    // keyboard shortcut tab in textField switch between fonts
    var tabPressed = false;
    var initialSelectionIndex; // for disabling movement of typing index while using shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            tabPressed = true;
            initialSelectionIndex = textField.selectionStart;
        }
        else if (event.key === 'ArrowLeft' && tabPressed) {
            textField.selectionStart = initialSelectionIndex;
            textField.selectionEnd = initialSelectionIndex;
            var fontIndex = getFontPosition();
            var fontButtons = document.getElementsByClassName("fontbtns");
            if (fontIndex == 0) {
                selectFont(fontButtons[fontButtons.length-1].id);
            }
            else if (fontIndex != 0) {
                selectFont(fontButtons[fontIndex-1].id);
            }
        }
        else if (event.key === 'ArrowRight' && tabPressed) {
            textField.selectionStart = initialSelectionIndex;
            textField.selectionEnd = initialSelectionIndex;
            var fontIndex = getFontPosition();
            var fontButtons = document.getElementsByClassName("fontbtns");
            if (fontIndex == fontButtons.length-1) {
                selectFont("normalFontBtn");
            }
            else if (fontIndex != fontButtons.length-1) {
                selectFont(fontButtons[fontIndex+1].id);
            }
        }
        else if (event.key === 'ArrowDown' && tabPressed) {
            selectFont("normalFontBtn");
        }
        else {
            tabPressed = false;
        }
    });
    document.addEventListener('keyup', function(event) {
        if (event.key === 'Tab') {
            tabPressed = false;
            textField.selectionStart = initialSelectionIndex;
            textField.selectionEnd = initialSelectionIndex;
        }
    });
    // keyboard shortcut tab in searchBox to focus on textField
    searchBoxSymbols.addEventListener('keydown', function(event) {
        if (event.key == 'Tab') {
            event.preventDefault();
            textField.focus();
        }
    });
    searchBoxEmoticons.addEventListener('keydown', function(event) {
        if (event.key == 'Tab') {
            event.preventDefault();
            textField.focus();
        }
    });
    // keyboard shortcut tab in textField to focus back to searchBox
    textField.addEventListener('keydown', function(event) {
        var selectedmode = document.querySelector(".h2menubtns.selectedbtn");
        if (event.key == 'Tab') {
            if (selectedmode.id === "symbolsBtn") {
                event.preventDefault();
                searchBoxSymbols.focus();
            }
            else if (selectedmode.id === "emoticonsBtn") {
                event.preventDefault();
                searchBoxEmoticons.focus();
            }
        }
    });
    // trackpad detection (works for the msot part, unless you switch between pad and mouse often)
    var isTrackpad = false;
    document.addEventListener('mousewheel', function(event) {
        detectTrackPad(event);
    });
    document.addEventListener('DOMMouseScroll', function(event) {
        detectTrackPad(event);
    });
    function detectTrackPad(event) {
        if (event.wheelDeltaY) {
            if (event.wheelDeltaY === (event.deltaY * -3)) {
                isTrackpad = true;
                }
        }
        else if (event.deltaMode === 0) {
            isTrackpad = true;
        }
        else {
            isTrackpad = false;
        }        
        //console.log("trackpad detection: "+isTrackpad);
    }
    // lets the user scroll sideways without holding shift
    var fontselectdiv = document.querySelector(".selectionbuttonsdiv#fontselectdiv");
    var symbolselectdiv = document.querySelector(".selectionbuttonsdiv#symbolselectdiv");
    var emoticonselectdiv = document.querySelector(".selectionbuttonsdiv#emoticonselectdiv");
    fontselectdiv.addEventListener("wheel", function (event) {
        if (isTrackpad == false) {
            if (event.deltaY > 0) fontselectdiv.scrollLeft += 20;
            else fontselectdiv.scrollLeft -= 20;
        }
    });
    symbolselectdiv.addEventListener("wheel", function (event) {
        if (isTrackpad == false) {
            if (event.deltaY > 0) symbolselectdiv.scrollLeft += 20;
            else symbolselectdiv.scrollLeft -= 20;
        }
    });
    emoticonselectdiv.addEventListener("wheel", function (event) {
        if (isTrackpad == false) {
            if (event.deltaY > 0) emoticons.scrollLeft += 20;
            else emoticonselectdiv.scrollLeft -= 20;
        }
    });
};

/* ▁ ▂ ▄ ▅ ▆ ▇ █ Ｍ𝐚ᶤ𝓝 ᑭя𝔬ⓖᖇค𝐌 █ ▇ ▆ ▅ ▄ ▂ ▁ */

function selectMode(id) {
    var btns = document.getElementsByClassName("h2menubtns");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("selectedbtn");
        btns[i].innerHTML = revertText(btns[i].innerHTML);
        //btns[i].innerHTML = convertText(btns[i].innerHTML, "seriffont");
    }
    var selectedbtn = document.getElementById(id);
    selectedbtn.classList.add("selectedbtn");
    selectedbtn.innerHTML = revertText(selectedbtn.innerHTML);
    selectedbtn.innerHTML = convertText(selectedbtn.innerHTML, "linesFont");
    var selectionbuttonsdiv = document.getElementsByClassName("selectionbuttonsdiv");
    for (var i = 0; i < selectionbuttonsdiv.length; i++) {
        selectionbuttonsdiv[i].classList.remove("activediv");
    }
    var mode = id.slice(0, -4);
    var selectedDiv = document.getElementById(mode + "selectdiv");
    selectedDiv.classList.add("activediv");
    textField.focus();
}

function toggleKeyboardMode() {
    var keyboardModeBtn = document.getElementById("keyboardModeBtn");
    var keyboardModeBtnText = document.getElementById("keyboardModeBtnText");
    if (keyboardModeBtn.classList.contains("disabled")) {
        keyboardModeBtn.classList.remove("disabled");
        keyboardModeBtn.innerHTML = "keyboard mode enabled";
        keyboardModeBtnText.innerHTML = "any text typed will be automatically converted to selected font.";
    }
    else {
        keyboardModeBtn.classList.add("disabled");
        keyboardModeBtn.innerHTML = "keyboard mode disabled";
        keyboardModeBtnText.innerHTML = "all text will be converted to the selected font.";
        fontsInputHandler("");
    }
    textField.focus();
}

function getFontPosition() {
    var index = 0;
    var fontButtons = document.getElementsByClassName("fontbtns");
    var selectedFontBtn = document.getElementsByClassName("selectedfontbtn")[0];
    for (var i = 0; i < fontButtons.length; i++) {
        if (fontButtons[i] == selectedFontBtn) {
            index = i;
        }
    }
    return index;
}

function copyAllText() {
    var copyAllBtn = document.getElementById("copyAllBtn");
    if (textField.value === "") {
        copyAllBtn.innerHTML = "nothing to copy";
    }
    else {
        //textField.select();
        navigator.clipboard.writeText(textField.value);
        copyAllBtn.innerHTML = "copied!";
    }
    textField.focus();
    setTimeout(initialiseCopyAllBtn, 1000);
}
function initialiseCopyAllBtn() {
    copyAllBtn.innerHTML = "copy all";
}

var prevTextfieldValue;
function clearText() {
    prevTextfieldValue = textField.value;
    textField.value = "";
    textField.focus();
    return prevTextfieldValue; // for undo purposes
}

function clearSearchBox(searchBox) {
    searchBox.value = "";
}

/* ✿.｡.:* ☆:**.♪·¯·♫ 丂𝓎ϻ𝓫Ỗ𝓁ˢ ♫·¯·♪.**:.☆*.:｡.✿ */

// SYMBOLS MAP
var symbols = {
    // hearts
    "♥": ["heart","blackheart","black heart","love"],
    "♡": ["heart","whiteheart","white heart","love"],
    "❤︎︎": ["heart","blackheart","black heart","love"],
    "❣︎": ["heart","blackheart","black heart","love"],
    // stars and sparkles
    "✧": ["sparkle","white sparkle","spark"],
    "✦": ["sparkle","black sparkle","spark"],
    "★": ["star"],
    "☆": ["star","starw"],
    "⋆": ["star"],
    "⭑": ["star","stars"],
    "⭒": ["star","stars","starw","starws"],
    "✶": ["star"],
    "𓇼": ["star"],
    // weather
    "☀": ["sun"],
    "🌣": ["sun"],
    "☼": ["sun"],
    "☾": ["moon"],
    "☽": ["moon"],
    // nature
    "✿": ["flower"],
    "❀": ["flower"],
    "ʚϊɞ": ["butterfly"],
    // animals
    "𓃠": ["cat"],
    // music
    "♫": ["music"],
    "♬": ["music2","music"],
    "♩": ["note","music"],
    "♪": ["quaver","music"],
    "♭": ["flat","music"],
    "♮": ["natural","music"],
    "♯": ["sharp","music"],
    "𝄞": ["treble","music"],
    "𝄢": ["bass","music"],
    // transport
    "✈": ["plane"],
    // shapes and checkboxes
    "•": ["bullet","circle"],
    "°": ["degree","circle"],
    "◉": ["circlefilled","circle","foodpip","food pip"],
    "◯": ["circlew","whitecircle","circlewhite","circle","foodpip","food pip"],
    "⨂": ["circlex","karma10"],
    "☐": ["square","box","checkbox"],
    "☑": ["checkedbox","checked box","tick","check","checkbox","box"],
    "☒": ["checkedbox","checked box","x","cross","checkbox","box"],
    // misc
    "ඞ": ["sus","mongoose"],
    "𓂸": ["d"],
    "𓂺": ["d2","d"]
}
// SYMBOLS SEARCH
function searchSymbols(input) {
    var keys = Object.keys(symbols);
    var foundSymbols = new Set();
    keys.forEach(key => {
        var values = symbols[key];
        var firstValue = values[0];
        values.forEach(value => {
            if (firstValue === input) {
                foundSymbols.add(key);
            } 
            else if (value == input) {
                foundSymbols.add(key);
            }
            /*
            else if (value.includes(input)) {
                foundSymbols.add(key);
            }
            */
        });
    });
    createSymbolsBtn(Array.from(foundSymbols));
    return Array.from(foundSymbols);
}
// ADD FOUND SYMBOLS TO SELECTON DIV
function createSymbolsBtn(array) {
    var symbolselectdiv = document.getElementById("symbolselectdiv");
    if (array.length > 0) {
        removeSymbolBtns();
    }
    for (var i = 0; i < array.length; i++) {
        var btn = document.createElement("button");
        btn.classList.add("selectionbtn");
        btn.classList.add("symbolbtns");
        btn.innerHTML = array[i];
        btn.onclick = function() {
            clickSymbol(this);
        };
        symbolselectdiv.appendChild(btn);
    }
}
// ADD ALL SYMBOLS TO SELECTION DIV
function createAllSymbolsBtns() {
    var keys = Object.keys(symbols);
    createSymbolsBtn(keys);
}
// REMOVE ALL BUTTONS PREVIOUSLY IN THE DIV
function removeSymbolBtns() {
    var symbolselectdiv = document.getElementById("symbolselectdiv");
    var btns = document.querySelectorAll(".selectionbtn.symbolbtns");
    for (var i = 1; i < btns.length; i++) {
        symbolselectdiv.removeChild(btns[i]);
    }
}
// CLICK BUTTON INPUT SYMBOL
function clickSymbol(btn) {
    var symbol = btn.innerHTML;
    // determine text value
    var currentvalue = textField.value;
    var typingIndexStart = textField.selectionStart;
    var typingIndexEnd = textField.selectionEnd;
    var selectedtext = textField.value.slice(typingIndexStart, typingIndexEnd);
    var behindtext = currentvalue.substring(0,typingIndexStart);
    var infronttext = currentvalue.substring(typingIndexStart);
    if (typingIndexStart != typingIndexEnd) {
        infronttext = infronttext.slice(selectedtext.length);
    }
    // update value
    textField.value = behindtext + symbol + infronttext;
    // update selectionStart
    textField.selectionStart = typingIndexStart + symbol.length;
    textField.selectionEnd = typingIndexStart + symbol.length;
    // focus
    textField.focus();
}

/* ¤¸¸.•¸„.-•~(っ◔◡◔)っ €𝕄𝐎𝕋ί𝓒σŇ𝔰 o((>ω< ))o~•-.„¸•.¸¸¤ */

// EMOTICONS MAP
var emoticons = {
    // KAOMOJI
    "◕‿◕": ["cuteface","cute face","happy","smile","cute","kaomoji"],
    "●ω●": ["owo","kaomoji"],
    "ಥ﹏ಥ": ["cry","sad","kaomoji"],
    // NON KAOMOJI
    // artists
    "【=◈︿◈=】": ["porter"],
    "(⎌ℕ⎌)": ["nurture","porter"],
    "ILLΞ𓅛IㄩM": ["illenium"],
    // rain world
    "ʕ●.●ʔ": ["slugcat","rainworld","rain world"],
    "ʕ❍.❍ʔ": ["slugcat","rainworld","rain world"],
    "ʕx.xʔ": ["dead","slugcat","rainworld","rain world"],
    // discord
    "【✓ 𝙱𝙾𝚃】": ["discordbot","discord bot","bot"],
}
// SEARCH EMOTICONS
function searchEmoticons(input) {
    var keys = Object.keys(emoticons);
    var foundEmoticons = new Set();
    keys.forEach(key => {
        var values = emoticons[key];
        var firstValue = values[0];
        values.forEach(value => {
            if (firstValue === input) {
                foundEmoticons.add(key);
            } 
            else if (value == input) {
                foundEmoticons.add(key);
            }
            /*
            else if (value.includes(input)) {
                foundEmoticons.add(key);
            }
            */
        });
    });
    createEmoticonsBtn(Array.from(foundEmoticons));
    return Array.from(foundEmoticons);
}
// ADD FOUND EMOTICONS TO SELECTON DIV
function createEmoticonsBtn(array) {
    var emoticonselectdiv = document.getElementById("emoticonselectdiv");
    if (array.length > 0) {
        removeEmoticonBtns();
    }
    for (var i = 0; i < array.length; i++) {
        var btn = document.createElement("button");
        btn.classList.add("selectionbtn");
        btn.classList.add("emoticonbtns");
        btn.innerHTML = array[i];
        btn.onclick = function() {
            clickEmoticon(this);
        };
        emoticonselectdiv.appendChild(btn);
    }
}
// ADD ALL EMOTICONS TO SELECTION DIV
function createAllEmoticonsBtns() {
    var keys = Object.keys(emoticons);
    createEmoticonsBtn(keys);
}
// REMOVE ALL BUTTONS PREVIOUSLY IN THE DIV
function removeEmoticonBtns() {
    var emoticonselectdiv = document.getElementById("emoticonselectdiv");
    var btns = document.querySelectorAll(".selectionbtn.emoticonbtns");
    for (var i = 1; i < btns.length; i++) {
        emoticonselectdiv.removeChild(btns[i]);
    }
}
// CLICK BUTTON INPUT EMOTICON
function clickEmoticon(btn) {
    var emoticon = btn.innerHTML;
    // determine text value
    var currentvalue = textField.value;
    var typingIndexStart = textField.selectionStart;
    var typingIndexEnd = textField.selectionEnd;
    var selectedtext = textField.value.slice(typingIndexStart, typingIndexEnd);
    var behindtext = currentvalue.substring(0,typingIndexStart);
    var infronttext = currentvalue.substring(typingIndexStart);
    if (typingIndexStart != typingIndexEnd) {
        infronttext = infronttext.slice(selectedtext.length);
    }
    // update value
    textField.value = behindtext + emoticon + infronttext;
    // update selectionStart
    textField.selectionStart = typingIndexStart + emoticon.length;
    textField.selectionEnd = typingIndexStart + emoticon.length;
    // focus
    textField.focus();
}

/* .•°¤*(¯`★´¯)*¤° Ŧόᑎ𝓉ѕ 𝔾ⓔＮέŘΔ𝓉ⓞᖇ °¤*(¯´★`¯)*¤°•. */

function fontsInputHandler(input) {
    var selectedFontBtn = document.querySelector(".fontbtns.selectedfontbtn");
    var fontid = selectedFontBtn.id.slice(0, -3);
    // determine text value
    var currentvalue = textField.value;
    var typingIndexStart = textField.selectionStart;
    var typingIndexEnd = textField.selectionEnd;
    var selectedtext = textField.value.slice(typingIndexStart, typingIndexEnd);
    var behindtext = currentvalue.substring(0,typingIndexStart);
    var infronttext = currentvalue.substring(typingIndexStart);
    if (typingIndexStart != typingIndexEnd) {
        infronttext = infronttext.slice(selectedtext.length);
    }
    // if keyboard mode is disabled 
    if (keyboardModeBtn.classList.contains("disabled")) {
        if (fontid != "normalFont") {
            var reverted = revertText(input);
            var revertedb = revertText(behindtext);
            var revertedf = revertText(infronttext);
            var converted = convertText(reverted, fontid);
            var convertedb = convertText(revertedb, fontid);
            var convertedf = convertText(revertedf, fontid);
            // prevent the key being entered
            event.preventDefault();
            // update value
            textField.value = convertedb + converted + convertedf;
            // update selectionStart
            textField.selectionStart = typingIndexStart + converted.length;
            textField.selectionEnd = typingIndexStart + converted.length;
        }
        else if (fontid === "normalFont") {
            var reverted = revertText(input);
            var revertedb = revertText(behindtext);
            var revertedf = revertText(infronttext);
            // prevent the key being entered
            event.preventDefault();
            // update value
            textField.value = revertedb + reverted + revertedf;
            // update selectionStart
            textField.selectionStart = typingIndexStart + reverted.length;
            textField.selectionEnd = typingIndexStart + reverted.length;
        }
    }
    else if (fontid != "normalFont") {
        var reverted = revertText(input);
        var converted = convertText(reverted, fontid);
        // prevent the key being entered
        event.preventDefault();
        // update value
        textField.value = behindtext + converted + infronttext;
        // update selectionStart
        textField.selectionStart = typingIndexStart + converted.length;
        textField.selectionEnd = typingIndexStart + converted.length;
    }
    else if (fontid === "normalFont") {
        var reverted = revertText(input);
        // prevent the key being entered
        event.preventDefault();
        // update value
        textField.value = behindtext + reverted + infronttext;
        // update selectionStart
        textField.selectionStart = typingIndexStart + reverted.length;
        textField.selectionEnd = typingIndexStart + reverted.length;
    }
}
// FONTS SELECTING
function selectFont(id) {
    var fontButtons = document.getElementsByClassName("fontbtns");
    for (var i = 0; i < fontButtons.length; i++) {
        fontButtons[i].classList.remove("selectedfontbtn");
    }
    var selectedFontBtn = document.getElementById(id);
    selectedFontBtn.classList.add("selectedfontbtn");
    textField.focus();
}
// FONT CONVERSION
var fonts = {
    typefont: {
        "q": "𝚚", "w": "𝚠", "e": "𝚎", "r": "𝚛", "t": "𝚝", "y": "𝚢", "u": "𝚞", "i": "𝚒", "o": "𝚘", "p": "𝚙",
        "a": "𝚊", "s": "𝚜", "d": "𝚍", "f": "𝚏", "g": "𝚐", "h": "𝚑", "j": "𝚓", "k": "𝚔", "l": "𝚕", "z": "𝚣",
        "x": "𝚡", "c": "𝚌", "v": "𝚟", "b": "𝚋", "n": "𝚗", "m": "𝚖",
        "Q": "𝚀", "W": "𝚆", "E": "𝙴", "R": "𝚁", "T": "𝚃", "Y": "𝚈", "U": "𝚄", "I": "𝙸", "O": "𝙾", "P": "𝙿",
        "A": "𝙰", "S": "𝚂", "D": "𝙳", "F": "𝙵", "G": "𝙶", "H": "𝙷", "J": "𝙹", "K": "𝙺", "L": "𝙻", "Z": "𝚉",
        "X": "𝚇", "C": "𝙲", "V": "𝚅", "B": "𝙱", "N": "𝙽", "M": "𝙼",
        "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺", "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿", "0": "𝟶"
    },
    linesfont: {
        "q": "𝕢", "w": "𝕨", "e": "𝕖", "r": "𝕣", "t": "𝕥", "y": "𝕪", "u": "𝕦", "i": "𝕚", "o": "𝕠", "p": "𝕡",
        "a": "𝕒", "s": "𝕤", "d": "𝕕", "f": "𝕗", "g": "𝕘", "h": "𝕙", "j": "𝕛", "k": "𝕜", "l": "𝕝", "z": "𝕫",
        "x": "𝕩", "c": "𝕔", "v": "𝕧", "b": "𝕓", "n": "𝕟", "m": "𝕞",
        "Q": "ℚ", "W": "𝕎", "E": "𝔼", "R": "ℝ", "T": "𝕋", "Y": "𝕐", "U": "𝕌", "I": "𝕀", "O": "𝕆", "P": "ℙ",
        "A": "𝔸", "S": "𝕊", "D": "𝔻", "F": "𝔽", "G": "𝔾", "H": "ℍ", "J": "𝕁", "K": "𝕂", "L": "𝕃", "Z": "ℤ",
        "X": "𝕏", "C": "ℂ", "V": "𝕍", "B": "𝔹", "N": "ℕ", "M": "𝕄",
        "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡", "0": "𝟘"
    },
    scriptfont: {
        "q":"𝓆","w":"𝓌","e":"𝑒","r":"𝓇","t":"𝓉","y":"𝓎","u":"𝓊","i":"𝒾","o":"𝑜","p":"𝓅","a":"𝒶","s":"𝓈","d":"𝒹","f":"𝒻","g":"𝑔","h":"𝒽","j":"𝒿","k":"𝓀","l":"𝓁","z":"𝓏","x":"𝓍","c":"𝒸","v":"𝓋","b":"𝒷","n":"𝓃","m":"𝓂",
        "Q":"𝒬","W":"𝒲","E":"𝐸","R":"𝑅","T":"𝒯","Y":"𝒴","U":"𝒰","I":"𝐼","O":"𝒪","P":"𝒫","A":"𝒜","S":"𝒮","D":"𝒟","F":"𝐹","G":"𝒢","H":"𝐻","J":"𝒥","K":"𝒦","L":"𝐿","Z":"𝒵","X":"𝒳","C":"𝒞","V":"𝒱","B":"𝐵","N":"𝒩","M":"𝑀"
    },
    scriptfontbold: {
        "q":"𝓺","w":"𝔀","e":"𝓮","r":"𝓻","t":"𝓽","y":"𝔂","u":"𝓾","i":"𝓲","o":"𝓸","p":"𝓹","a":"𝓪","s":"𝓼","d":"𝓭","f":"𝓯","g":"𝓰","h":"𝓱","j":"𝓳","k":"𝓴","l":"𝓵","z":"𝔃","x":"𝔁","c":"𝓬","v":"𝓿","b":"𝓫","n":"𝓷","m":"𝓶",
        "Q":"𝓠","W":"𝓦","E":"𝓔","R":"𝓡","T":"𝓣","Y":"𝓨","U":"𝓤","I":"𝓘","O":"𝓞","P":"𝓟","A":"𝓐","S":"𝓢","D":"𝓓","F":"𝓕","G":"𝓖","H":"𝓗","J":"𝓙","K":"𝓚","L":"𝓛","Z":"𝓩","X":"𝓧","C":"𝓒","V":"𝓥","B":"𝓑","N":"𝓝","M":"𝓜"
    },
    seriffont: {
        "q":"𝐪","w":"𝐰","e":"𝐞","r":"𝐫","t":"𝐭","y":"𝐲","u":"𝐮","i":"𝐢","o":"𝐨","p":"𝐩","a":"𝐚","s":"𝐬","d":"𝐝","f":"𝐟","g":"𝐠","h":"𝐡","j":"𝐣","k":"𝐤","l":"𝐥","z":"𝐳","x":"𝐱","c":"𝐜","v":"𝐯","b":"𝐛","n":"𝐧","m":"𝐦",
        "Q":"𝐐","W":"𝐖","E":"𝐄","R":"𝐑","T":"𝐓","Y":"𝐘","U":"𝐔","I":"𝐈","O":"𝐎","P":"𝐏","A":"𝐀","S":"𝐒","D":"𝐃","F":"𝐅","G":"𝐆","H":"𝐇","J":"𝐉","K":"𝐊","L":"𝐋","Z":"𝐙","X":"𝐗","C":"𝐂","V":"𝐕","B":"𝐁","N":"𝐍","M":"𝐌",
        "1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","0":"𝟎"
    },
    seriffontitalic: {
        "q":"𝑞","w":"𝑤","e":"𝑒","r":"𝑟","t":"𝑡","y":"𝑦","u":"𝑢","i":"𝑖","o":"𝑜","p":"𝑝","a":"𝑎","s":"𝑠","d":"𝑑","f":"𝑓","g":"𝑔","h":"ℎ","j":"𝑗","k":"𝑘","l":"𝑙","z":"𝑧","x":"𝑥","c":"𝑐","v":"𝑣","b":"𝑏","n":"𝑛","m":"𝑚",
        "Q":"𝑄","W":"𝑊","E":"𝐸","R":"𝑅","T":"𝑇","Y":"𝑌","U":"𝑈","I":"𝐼","O":"𝑂","P":"𝑃","A":"𝐴","S":"𝑆","D":"𝐷","F":"𝐹","G":"𝐺","H":"𝐻","J":"𝐽","K":"𝐾","L":"𝐿","Z":"𝑍","X":"𝑋","C":"𝐶","V":"𝑉","B":"𝐵","N":"𝑁","M":"𝑀"
    },
    seriffontitalicbold: {
        "q":"𝒒","w":"𝒘","e":"𝒆","r":"𝒓","t":"𝒕","y":"𝒚","u":"𝒖","i":"𝒊","o":"𝒐","p":"𝒑","a":"𝒂","s":"𝒔","d":"𝒅","f":"𝒇","g":"𝒈","h":"𝒉","j":"𝒋","k":"𝒌","l":"𝒍","z":"𝒛","x":"𝒙","c":"𝒄","v":"𝒗","b":"𝒃","n":"𝒏","m":"𝒎",
        "Q":"𝑸","W":"𝑾","E":"𝑬","R":"𝑹","T":"𝑻","Y":"𝒀","U":"𝑼","I":"𝑰","O":"𝑶","P":"𝑷","A":"𝑨","S":"𝑺","D":"𝑫","F":"𝑭","G":"𝑮","H":"𝑯","J":"𝑱","K":"𝑲","L":"𝑳","Z":"𝒁","X":"𝑿","C":"𝑪","V":"𝑽","B":"𝑩","N":"𝑵","M":"𝑴"
    },
    sansfont: {
        "q":"𝗊","w":"𝗐","e":"𝖾","r":"𝗋","t":"𝗍","y":"𝗒","u":"𝗎","i":"𝗂","o":"𝗈","p":"𝗉","a":"𝖺","s":"𝗌","d":"𝖽","f":"𝖿","g":"𝗀","h":"𝗁","j":"𝗃","k":"𝗄","l":"𝗅","z":"𝗓","x":"𝗑","c":"𝖼","v":"𝗏","b":"𝖻","n":"𝗇","m":"𝗆",
        "Q":"𝖰","W":"𝖶","E":"𝖤","R":"𝖱","T":"𝖳","Y":"𝖸","U":"𝖴","I":"𝖨","O":"𝖮","P":"𝖯","A":"𝖠","S":"𝖲","D":"𝖣","F":"𝖥","G":"𝖦","H":"𝖧","J":"𝖩","K":"𝖪","L":"𝖫","Z":"𝖹","X":"𝖷","C":"𝖢","V":"𝖵","B":"𝖡","N":"𝖭","M":"𝖬",
        "1":"𝟣","2":"𝟤","3":"𝟥","4":"𝟦","5":"𝟧","6":"𝟨","7":"𝟩","8":"𝟪","9":"𝟫","0":"𝟢"
    },
    sansfontbold: {
        "q":"𝗾","w":"𝘄","e":"𝗲","r":"𝗿","t":"𝘁","y":"𝘆","u":"𝘂","i":"𝗶","o":"𝗼","p":"𝗽","a":"𝗮","s":"𝘀","d":"𝗱","f":"𝗳","g":"𝗴","h":"𝗵","j":"𝗷","k":"𝗸","l":"𝗹","z":"𝘇","x":"𝘅","c":"𝗰","v":"𝘃","b":"𝗯","n":"𝗻","m":"𝗺",
        "Q":"𝗤","W":"𝗪","E":"𝗘","R":"𝗥","T":"𝗧","Y":"𝗬","U":"𝗨","I":"𝗜","O":"𝗢","P":"𝗣","A":"𝗔","S":"𝗦","D":"𝗗","F":"𝗙","G":"𝗚","H":"𝗛","J":"𝗝","K":"𝗞","L":"𝗟","Z":"𝗭","X":"𝗫","C":"𝗖","V":"𝗩","B":"𝗕","N":"𝗡","M":"𝗠",
        "1":"𝟭","2":"𝟮","3":"𝟯","4":"𝟰","5":"𝟱","6":"𝟲","7":"𝟳","8":"𝟴","9":"𝟵","0":"𝟬"
    },
    sansfontitalic: {
        "q":"𝘲","w":"𝘸","e":"𝘦","r":"𝘳","t":"𝘵","y":"𝘺","u":"𝘶","i":"𝘪","o":"𝘰","p":"𝘱","a":"𝘢","s":"𝘴","d":"𝘥","f":"𝘧","g":"𝘨","h":"𝘩","j":"𝘫","k":"𝘬","l":"𝘭","z":"𝘻","x":"𝘹","c":"𝘤","v":"𝘷","b":"𝘣","n":"𝘯","m":"𝘮",
        "Q":"𝘘","W":"𝘞","E":"𝘌","R":"𝘙","T":"𝘛","Y":"𝘠","U":"𝘜","I":"𝘐","O":"𝘖","P":"𝘗","A":"𝘈","S":"𝘚","D":"𝘋","F":"𝘍","G":"𝘎","H":"𝘏","J":"𝘑","K":"𝘒","L":"𝘓","Z":"𝘡","X":"𝘟","C":"𝘊","V":"𝘝","B":"𝘉","N":"𝘕","M":"𝘔"
    },
    sansfontitalicbold: {
        "q":"𝙦","w":"𝙬","e":"𝙚","r":"𝙧","t":"𝙩","y":"𝙮","u":"𝙪","i":"𝙞","o":"𝙤","p":"𝙥","a":"𝙖","s":"𝙨","d":"𝙙","f":"𝙛","g":"𝙜","h":"𝙝","j":"𝙟","k":"𝙠","l":"𝙡","z":"𝙯","x":"𝙭","c":"𝙘","v":"𝙫","b":"𝙗","n":"𝙣","m":"𝙢",
        "Q":"𝙌","W":"𝙒","E":"𝙀","R":"𝙍","T":"𝙏","Y":"𝙔","U":"𝙐","I":"𝙄","O":"𝙊","P":"𝙋","A":"𝘼","S":"𝙎","D":"𝘿","F":"𝙁","G":"𝙂","H":"𝙃","J":"𝙅","K":"𝙆","L":"𝙇","Z":"𝙕","X":"𝙓","C":"𝘾","V":"𝙑","B":"𝘽","N":"𝙉","M":"𝙈"
    },
    gothicfont: {
        "q":"𝔮","w":"𝔴","e":"𝔢","r":"𝔯","t":"𝔱","y":"𝔶","u":"𝔲","i":"𝔦","o":"𝔬","p":"𝔭","a":"𝔞","s":"𝔰","d":"𝔡","f":"𝔣","g":"𝔤","h":"𝔥","j":"𝔧","k":"𝔨","l":"𝔩","z":"𝔷","x":"𝔵","c":"𝔠","v":"𝔳","b":"𝔟","n":"𝔫","m":"𝔪",
        "Q":"𝔔","W":"𝔚","E":"𝔈","R":"ℜ","T":"𝔗","Y":"𝔜","U":"𝔘","I":"ℑ","O":"𝔒","P":"𝔓","A":"𝔄","S":"𝔖","D":"𝔇","F":"𝔉","G":"𝔊","H":"ℌ","J":"𝔍","K":"𝔎","L":"𝔏","Z":"ℨ","X":"𝔛","C":"ℭ","V":"𝔙","B":"𝔅","N":"𝔑","M":"𝔐"
    },
    gothicfontbold: {
        "q":"𝖖","w":"𝖜","e":"𝖊","r":"𝖗","t":"𝖙","y":"𝖞","u":"𝖚","i":"𝖎","o":"𝖔","p":"𝖕","a":"𝖆","s":"𝖘","d":"𝖉","f":"𝖋","g":"𝖌","h":"𝖍","j":"𝖏","k":"𝖐","l":"𝖑","z":"𝖟","x":"𝖝","c":"𝖈","v":"𝖛","b":"𝖇","n":"𝖓","m":"𝖒",
        "Q":"𝕼","W":"𝖂","E":"𝕰","R":"𝕽","T":"𝕿","Y":"𝖄","U":"𝖀","I":"𝕴","O":"𝕺","P":"𝕻","A":"𝕬","S":"𝕾","D":"𝕯","F":"𝕱","G":"𝕲","H":"𝕳","J":"𝕵","K":"𝕶","L":"𝕷","Z":"𝖅","X":"𝖃","C":"𝕮","V":"𝖁","B":"𝕭","N":"𝕹","M":"𝕸"
    },
    circlefont: {
        "q":"Ⓠ","w":"Ⓦ","e":"Ⓔ","r":"Ⓡ","t":"Ⓣ","y":"Ⓨ","u":"Ⓤ","i":"Ⓘ","o":"Ⓞ","p":"Ⓟ","a":"Ⓐ","s":"Ⓢ","d":"Ⓓ","f":"Ⓕ","g":"Ⓖ","h":"Ⓗ","j":"Ⓙ","k":"Ⓚ","l":"Ⓛ","z":"Ⓩ","x":"Ⓧ","c":"Ⓒ","v":"Ⓥ","b":"Ⓑ","n":"Ⓝ","m":"Ⓜ",
        "Q":"Ⓠ","W":"Ⓦ","E":"Ⓔ","R":"Ⓡ","T":"Ⓣ","Y":"Ⓨ","U":"Ⓤ","I":"Ⓘ","O":"Ⓞ","P":"Ⓟ","A":"Ⓐ","S":"Ⓢ","D":"Ⓓ","F":"Ⓕ","G":"Ⓖ","H":"Ⓗ","J":"Ⓙ","K":"Ⓚ","L":"Ⓛ","Z":"Ⓩ","X":"Ⓧ","C":"Ⓒ","V":"Ⓥ","B":"Ⓑ","N":"Ⓝ","M":"Ⓜ"
    },
    circlefilledfont: {
        "q":"🅠","w":"🅦","e":"🅔","r":"🅡","t":"🅣","y":"🅨","u":"🅤","i":"🅘","o":"🅞","p":"🅟","a":"🅐","s":"🅢","d":"🅓","f":"🅕","g":"🅖","h":"🅗","j":"🅙","k":"🅚","l":"🅛","z":"🅩","x":"🅧","c":"🅒","v":"🅥","b":"🅑","n":"🅝","m":"🅜",
        "Q":"🅠","W":"🅦","E":"🅔","R":"🅡","T":"🅣","Y":"🅨","U":"🅤","I":"🅘","O":"🅞","P":"🅟","A":"🅐","S":"🅢","D":"🅓","F":"🅕","G":"🅖","H":"🅗","J":"🅙","K":"🅚","L":"🅛","Z":"🅩","X":"🅧","C":"🅒","V":"🅥","B":"🅑","N":"🅝","M":"🅜"
    },
    squarefont: {
        "q":"🅀","w":"🅆","e":"🄴","r":"🅁","t":"🅃","y":"🅈","u":"🅄","i":"🄸","o":"🄾","p":"🄿","a":"🄰","s":"🅂","d":"🄳","f":"🄵","g":"🄶","h":"🄷","j":"🄹","k":"🄺","l":"🄻","z":"🅉","x":"🅇","c":"🄲","v":"🅅","b":"🄱","n":"🄽","m":"🄼",
        "Q":"🅀","W":"🅆","E":"🄴","R":"🅁","T":"🅃","Y":"🅈","U":"🅄","I":"🄸","O":"🄾","P":"🄿","A":"🄰","S":"🅂","D":"🄳","F":"🄵","G":"🄶","H":"🄷","J":"🄹","K":"🄺","L":"🄻","Z":"🅉","X":"🅇","C":"🄲","V":"🅅","B":"🄱","N":"🄽","M":"🄼"
    },
    squarefilledfont: {
        "q":"🆀","w":"🆆","e":"🅴","r":"🆁","t":"🆃","y":"🆈","u":"🆄","i":"🅸","o":"🅾","p":"🅿","a":"🅰","s":"🆂","d":"🅳","f":"🅵","g":"🅶","h":"🅷","j":"🅹","k":"🅺","l":"🅻","z":"🆉","x":"🆇","c":"🅲","v":"🆅","b":"🅱","n":"🅽","m":"🅼",
        "Q":"🆀","W":"🆆","E":"🅴","R":"🆁","T":"🆃","Y":"🆈","U":"🆄","I":"🅸","O":"🅾","P":"🅿","A":"🅰","S":"🆂","D":"🅳","F":"🅵","G":"🅶","H":"🅷","J":"🅹","K":"🅺","L":"🅻","Z":"🆉","X":"🆇","C":"🅲","V":"🆅","B":"🅱","N":"🅽","M":"🅼"
    },
    tinyfont: {
        "q":"ᵠ","w":"ʷ","e":"ᵉ","r":"ʳ","t":"ᵗ","y":"ʸ","u":"ᵘ","i":"ⁱ","o":"ᵒ","p":"ᵖ","a":"ᵃ","s":"ˢ","d":"ᵈ","f":"ᶠ","g":"ᵍ","h":"ʰ","j":"ʲ","k":"ᵏ","l":"ˡ","z":"ᶻ","x":"ˣ","c":"ᶜ","v":"ᵛ","b":"ᵇ","n":"ⁿ","m":"ᵐ",
        "Q":"ᵠ","W":"ʷ","E":"ᵉ","R":"ʳ","T":"ᵗ","Y":"ʸ","U":"ᵘ","I":"ⁱ","O":"ᵒ","P":"ᵖ","A":"ᵃ","S":"ˢ","D":"ᵈ","F":"ᶠ","G":"ᵍ","H":"ʰ","J":"ʲ","K":"ᵏ","L":"ˡ","Z":"ᶻ","X":"ˣ","C":"ᶜ","V":"ᵛ","B":"ᵇ","N":"ⁿ","M":"ᵐ",
        "1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","0":"⁰",
        "-":"⁻","(":"⁽",")":"⁾"
    }
};
function convertText(text, fontName) {
    var font = fonts[fontName.toLowerCase()];
    var converted = "";
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char in font) {
            converted += font[char];
        } else {
            converted += char;
        }
    }
    return converted;
}
function reverseFontMap(fontName) {
    var reversedfontmap = {};
    Object.keys(fontName).forEach(key => {
        var value = fontName[key];
        reversedfontmap[value] = key;
    });
    return reversedfontmap;
}
function revertText(text) {
    var reverted = "";
    var charcount = 0;
    while (charcount < text.length) {
        var foundMatch = false;
        for (var fontName in fonts) {
            var reversedfontmap = reverseFontMap(fonts[fontName]);
            if (text[charcount] in reversedfontmap) {
                reverted += reversedfontmap[text[charcount]];
                charcount += 1;
                foundMatch = true;
                break;
            } 
            else if (charcount + 1 < text.length && (text[charcount] + text[charcount + 1]) in reversedfontmap) {
                reverted += reversedfontmap[text[charcount] + text[charcount + 1]];
                charcount += 2;
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
            reverted += text[charcount];
            charcount += 1;
        }
    }
    return reverted;
}

/* ˜”*°•.˜”*°• Ⓐς𝒸ẸⓢⓈเᗷ𝐈𝕝Ｉтү •°*”˜.•°*”˜ */

// RESPONSIVITY FOR DEVICE TYPE
window.addEventListener("resize", checkDevice);
checkDevice();

function checkDevice() {
    var isMobile = false;
    // determines touch support
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        isMobile = true;
    }
    if (isMobile) {
        // this site is solely for pc devices
        // throw error??
    } 
    else if (isMobile == false) {
        checkResolution();
        return;
    }
}
var docSize = Number(1);
function checkResolution() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (width > 1300 && height > 900) {
        scaleUpContent(1.1);
        docSize = 1.1;
    }
}
function scaleUpContent(scaleFactor) {
    var allContent = document.querySelector('*');
    allContent.style.zoom = scaleFactor;
}
// toggled via on-site buttons
function resizeContent(scale) {
    if (scale === "decrease") {
        scaleUpContent(docSize - 0.1);
        docSize -= 0.1;
    }
    if (scale === "increase") {
        scaleUpContent(docSize + 0.1);
        docSize += 0.1;
    }
    if (scale === "reset") {
        checkResolution();
    }
}