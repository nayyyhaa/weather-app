let toggleElement = document.querySelector(".toggle");
let content = document.querySelector(".content");

//function

toggleElement.onclick = function() {
    content.classList.toggle("dark");
}