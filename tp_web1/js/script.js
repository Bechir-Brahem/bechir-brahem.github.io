// function to invert colors so text color can be visible 
function invertHex(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}


function highlight(name) {
    var a = document.getElementById(name);
    //generates a random hex
    var randomBgColor ="#"+ Math.floor(Math.random() * 16777215).toString(16);
    var inverseColor=invertHex(randomBgColor);

    console.log(randomBgColor,inverseColor)

    a.style.backgroundColor = randomBgColor;
    a.style.color=inverseColor;
}
// add event handlers
for (var i = 0; i < 5; i++) {
    document.getElementById("l" + i).addEventListener("click", myFunction);
}

function myFunction(e) {
    highlight(e.target.id);
}
