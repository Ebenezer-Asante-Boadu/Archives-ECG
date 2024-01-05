// import { app } from "../firebase.js";

function setHeight() {
    const element = document.getElementById("main");
    if (element) {
        element.style.height = `${window.innerHeight - 45}px`;
        element.style.maxHeight = `${window.innerHeight - 45}px`;
    }
}

function validateCodeInput(inputElement) {
    const lock = document.getElementById("lock");
    const instruction = document.getElementById("instruction");

    if (inputElement.value.length === 16) {
        inputElement.setCustomValidity("");
        if(lock){
            lock.style.color = "#2A3BE3";
            inputElement.style.border = "1px solid #2A3BE3";
            instruction.innerText = "Enter the company code.";
            instruction.style.color = "black";
        }
        // Optionally, perform additional actions for successful validation
    } else {  
        if(lock){
            lock.style.color = "red";
            inputElement.style.border = "1px solid red";
            instruction.innerText = "Please try again.";
            instruction.style.color = "red"
        }
        inputElement.setCustomValidity("Please enter a valid input");
    }
    inputElement.reportValidity();
}

document.addEventListener("DOMContentLoaded", () => {
    const submit = document.getElementById("verify");
    const codeInput = document.getElementById("company-code");

    submit.addEventListener("click", ()=>{
        // if (submit && codeInput) {
        //     submit.addEventListener("click", () => {
                validateCodeInput(codeInput);
            // });
    
            codeInput.addEventListener("input", () => {
                validateCodeInput(codeInput);
            });
        // }
    })
    
});

window.addEventListener("load", () => {
    setHeight();
});

window.addEventListener("resize", () => {
    setHeight();
});

console.log(app)

// https://tonaton.com/a_4bdrm-house-in-dzorwulu-gulf-course-for-sale-7qbfjMgsiB0WelOIqyZDOwfd.html
// https://tonaton.com/a_4bdrm-house-in-east-legon-for-sale-dJTCJKDlSrlUIkZJZvWsuVke.html
// https://tonaton.com/a_furnished-5bdrm-mansion-in-e-a-properties-us-embassy-area-for-sale-ASmUfU92mTT4nRklD3RmU9CY.html
