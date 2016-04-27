
/*
 * 动态生成验证码
 * */
var codeList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
    "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
    "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var randomCode = [];
for (var j = 0; j < 4; j++) {
    randomCode.push(codeList[Math.floor(Math.random() * (62 - 0))]);
}
console.log(randomCode);

