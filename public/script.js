
function toggleInput() {
    const isRandom = document.getElementById("randomToggle").checked;
    inputBox.disabled = isRandom;
}


function updatePlaceholder() {
    const selected = factTypeSelect.value;

    if (selected === "date") {
        inputBox.placeholder = "Enter a date (DD/MM)";
            inputBox.value = inputBox.value.slice(0,5);
    } else if (selected === "year") {
        inputBox.placeholder = "Enter a year (e.g. 1995)";
        inputBox.value = inputBox.value.slice(0,4);
    } else {
        inputBox.placeholder = "Enter your number";
    }
}

function updateMaxLength() {

    console.log(factTypeSelect.value)
    switch (factTypeSelect.value){
        case "date": inputBox.maxLength = 5; // DD/MM
        case "year": inputBox.maxLength = 4;
        case "math":
        case "trivia":
        case "any":
            inputBox.maxLength = 8;
            break;
    }
}

//////////////////////////////////////////////////////////////


const factTypeSelect = document.getElementById("factType");
const inputBox = document.getElementById("inputBox");
const factBox = document.getElementsByClassName("fact-text")[0];

factTypeSelect.addEventListener("change", updatePlaceholder);
factTypeSelect.addEventListener("change", updateMaxLength);


document.querySelector('form').addEventListener('submit', () => {
    const input = document.getElementById('inputBox').value;
    localStorage.setItem('savedNum', input);

    const type = factTypeSelect.value;
    localStorage.setItem('savedType', type);

    const randomCheck = document.getElementById("randomToggle").checked;
    localStorage.setItem("savedCheck", randomCheck);


});

window.addEventListener('DOMContentLoaded', () => {
    const savedNum = localStorage.getItem('savedNum');
    const savedType = localStorage.getItem('savedType');
    const savedCheck = localStorage.getItem('savedCheck');
    if (document.getElementById("number-demo").innerHTML === "....") {
        factBox.classList.add("flash-div").remove("flash-div");
        if (savedNum){inputBox.value = savedNum;}
    }
    if (savedType) {
        factTypeSelect.value = savedType;
    }
    if (savedCheck) {
        if (savedCheck==="true"){
            document.getElementById("randomToggle").checked = true;
            inputBox.disabled = true;
        } else {
            inputBox.disabled = false;
        }
    }

    updatePlaceholder();
    updateMaxLength();
    toggleInput();
});


