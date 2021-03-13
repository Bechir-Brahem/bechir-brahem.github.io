console.log("boo");

function highlight(name) {
    var a = document.getElementById(name);
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    a.style.backgroundColor = "#" + randomColor;
}

for (var i = 0; i < 5; i++) {

    document.getElementById("l" + i).addEventListener("click", myFunction);
    document.getElementById("l" + i).addEventListener("click", myFunction);
    document.getElementById("l" + i).addEventListener("click", myFunction);
    document.getElementById("l" + i).addEventListener("click", myFunction);
    document.getElementById("l" + i).addEventListener("click", myFunction);
}

function myFunction(e) {
    console.log("hehe");
    highlight(e.target.id);
}

