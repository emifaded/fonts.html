var mapping = {
    "q": "𝕢", "w": "𝕨", "e": "𝕖", "r": "𝕣", "t": "𝕥", "y": "𝕪", "u": "𝕦", "i": "𝕚", "o": "𝕠", "p": "𝕡",
    "a": "𝕒", "s": "𝕤", "d": "𝕕", "f": "𝕗", "g": "𝕘", "h": "𝕙", "j": "𝕛", "k": "𝕜", "l": "𝕝", "z": "𝕫",
    "x": "𝕩", "c": "𝕔", "v": "𝕧", "b": "𝕓", "n": "𝕟", "m": "𝕞",
    "Q": "ℚ", "W": "𝕎", "E": "𝔼", "R": "ℝ", "T": "𝕋", "Y": "𝕐", "U": "𝕌", "I": "𝕀", "O": "𝕆", "P": "ℙ",
    "A": "𝔸", "S": "𝕊", "D": "𝔻", "F": "𝔽", "G": "𝔾", "H": "ℍ", "J": "𝕁", "K": "𝕂", "L": "𝕃", "Z": "ℤ",
    "X": "𝕏", "C": "ℂ", "V": "𝕍", "B": "𝔹", "N": "ℕ", "M": "𝕄"
};

function simpleGetValue(key) {
    if (key in mapping) {
        var value = mapping[key];
    }
    return value;
}

function getMultipleValues(text) {
    var value = "";
    for (var i = 0; i < text.length; i++) {
        if (text[i] in mapping) {
            value += mapping[text[i]];
        } else {
            value += text[i];
        }
    }
    return value;
}
var fontedtext = getMultipleValues("fonted text");

function reverseMapping(obj) {
    var reversedMapping = {};
    Object.keys(obj).forEach(key => {
        var value = obj[key];
        reversedMapping[value] = key;
    });
    return reversedMapping;
}
var reversedmap = reverseMapping(mapping);

function revertText(text) {
    var reversedmap = reverseMapping(mapping);
    var reverted = "";
    var charcount = 0;
    while (charcount < text.length) {
        if (text[charcount] in reversedmap) {
            reverted += reversedmap[text[charcount]];
            charcount += 1;
        } else if ((charcount + 1) < text.length && (text[charcount] + text[charcount + 1]) in reversedmap) {
            reverted += reversedmap[text[charcount] + text[charcount + 1]];
            charcount += 2;
        } else {
            reverted += text[charcount];
            charcount += 1;
        }
    }
    return reverted;
}
var reversedText = revertText("𝕢𝕎𝔼ℝ𝕋𝕐𝕌𝕀𝕆ℙ𝔸𝕊𝔻𝔽𝔾ℍ𝕁𝕂𝕃ℤ𝕏ℂ𝕍𝔹ℕ𝕄");
console.log(reversedText);

// not my code
const cities = {
    'Jodhpur':'Rajasthan','Alwar':'Rajasthan','Mumbai':'Maharasthra','Ahemdabad':'Gujrat','Pune': 'Maharasthra'
};
function reverseObject(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (newObj[obj[key]]) {
            newObj[obj[key]].push(key);
        }
        else {
            newObj[obj[key]] = [key];
        }
    });
    return newObj;
};
var reversedcities = reverseObject(cities);
// these output a map where value of a key is an array