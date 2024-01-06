<template>
    <div class="submain">
        <div class="main" id="main">
            <div >
                <div class="close" id="close-app">
                    <i class="mdi mdi-window-close"></i>
                </div>
                <div class="lock">
                    <i class="mdi mdi-lock" id="lock"></i>
                </div>
                <div class="heading">
                    <div>Verify your identity with the company.</div>
                    <div id="instruction">Enter the company code</div>
                </div>
                <div class="input">
                    <input type="password" name="company-code" id="company-code" placeholder="Enter company code">
                </div>
            </div>
            <div class="footer">
                <button id="cancel">Cancel</button>
                <button id="verify">Verify</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const lock = ref<HTMLElement|null>(null)
const company_code = ref<HTMLInputElement|null>(null);
const instruction = ref<HTMLDivElement|null>(null)

function validateCodeInput(inputElement:HTMLInputElement) {
    const lock = document.getElementById("lock");
    const instruction = document.getElementById("instruction") as HTMLElement;

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
    const codeInput = document.getElementById("company-code") as HTMLInputElement;

    if(submit && codeInput){
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
    }
    
});


</script>

<style scoped>
.main{
    background-color: white; 
    /* background: linear-gradient(119deg, #D9D9D9 17.7%, rgba(137, 136, 176, 0.00) 96.71%); */
    /* width: 100%;
    height: 100%; */
    padding: 15px 20px;
    /* border-radius: 15px; */
    display: flex;
      flex-direction: column;
      justify-content: space-between;
}
.submain{
    background-color: white;
    /* border-radius: 15px; */
    height: 100%;
    width: 100%;
}
.close{
    width: 100%;
    display: flex;
    justify-content: right;
    
}

.close i{
    font-size: 23px;
    cursor: pointer;
    color: rgb(61, 61, 61);
}
.lock i{
    font-size: 23px;
    color: #2A3BE3;
    background-color: #EDE5F0;
    padding: 5px;
    border-radius: 50%;
}

.footer{
    display: flex;
    justify-content: right;
    column-gap: 5px;
    width: 100%;
}

.footer button:first-child{
    background-color: white;
    color: black;
    border: 1px solid black;
    padding: 7px 30px;
    cursor: pointer;
}
.footer button:last-child{
    background-color: rgb(0, 0, 66);
    color: white;
    border: 1px solid rgb(0, 0, 66);
    padding: 7px 30px;
    cursor: pointer;
}

.heading{
    padding: 3% 0;
    font-family :'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    display: grid;
    row-gap: 6%;
    grid-template-columns: 100%;
}
.heading div:first-child{
    font-size: 18px;
    font-weight: 600;
}
.heading div:last-child{
    font-size: 14px;
    font-weight: 500;
    color: rgb(97, 97, 97);
}
input{
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid rgb(190, 190, 190);
}
.input{
    display: flex;
    justify-content: center;
}
.input:focus {
    outline: none!important;
}
</style>