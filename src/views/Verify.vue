<template>
    <div class="submain no-select">
        <div class="main" id="main">
            <div>
                <div class="close" id="close-app">
                    <span @click="close()">
                        <v-icon size="23">mdi-window-close</v-icon>
                    </span>
                </div>
                <div class="lockl">
                    <v-icon size="23" class="lock" :color="lockColor">mdi-lock</v-icon>
                    <!-- <i class="mdi mdi-lock" id="lock"></i> -->
                </div>
                <div class="heading pl-2">
                    <div>Verify your identity with the company.</div>
                    <div id="instruction" :style="{ color: instructionColor }">{{ instructionText }}</div>
                </div>
                <div class="input mt-2" ref="company-code">
                    <input type="password" name="company-code" id="company-code" placeholder="Enter company code"
                        ref="company_code" @input="continueValidate()">
                </div>
            </div>
            <div class="footer">
                <button id="cancel" @click="close()">Cancel</button>
                <button id="verify" @click="validateCodeInput()">Verify</button>
                <!-- <button @click="$router.push('/k')">ch</button> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { close, getFingerprint, getVerifyVerification, verifyApp } from "../lib/utils";
// import { addRequest } from "@/lib/firebase";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
// const { setVerified } = store;
// const { verified } = storeToRefs(store)
const lockColor = ref("#2A3BE3")
const company_code = ref<HTMLInputElement | null>(null);
const instructionText = ref("Enter your staff ID.");
const instructionColor = ref("black");
const startValidation = ref(false);


async function validateCodeInput(inputElement: HTMLInputElement | null = company_code.value) {
    startValidation.value = true;

    if (inputElement && inputElement.value.length === 16) {
        try {
            // Reset styles and messages
            resetValidationStyles();

            const fingerprint = await getFingerprint();

            if (fingerprint && company_code.value) {
                const results = await verifyApp({
                    fingerprint: fingerprint,
                    date: "",
                    staff_id: company_code.value.value
                });

                console.log(results);

                if (results.success) { 
                    resetValidationStyles();
                    router.push("/app-auth");
                    return;
                } else {
                    console.log("Verification failed. Please try again.");
                    if(results.message === 5000){
                        handleInvalidInput(inputElement,"You've entered the wrong staff id!");
                    }else{
                        handleInvalidInput(inputElement, "You don't have authorized access!!!")
                    }
                }
            } else {
                console.log("Couldn't add fingerprint or company code");
            }
        } catch (error) {
            console.error("An error occurred during validation:", error);
        }
    } else {
        // Handle invalid input
        handleInvalidInput(inputElement);
    }
}

function resetValidationStyles() {
    lockColor.value = "#2A3BE3";
    company_code.value ? company_code.value.style.border = "1px solid #2A3BE3" : null;
    instructionText.value = "Enter your staff ID.";
    instructionColor.value = "black";
}

function handleInvalidInput(inputElement: HTMLInputElement | null, message:string="Please try again.") {
    if (inputElement) {
        lockColor.value = "red";
        inputElement.style.border = "1px solid red";
        instructionText.value = message;
        instructionColor.value = "red";
    }
}


function continueValidate() {
    if (startValidation.value) {
        validateCodeInput();
    }
}


</script>

<style scoped>
.main {
    background-color: white;
    /* background: linear-gradient(119deg, #D9D9D9 17.7%, rgba(137, 136, 176, 0.00) 96.71%); */
    width: 100vw;
    height: 100vh;
    padding: 15px 20px;
    /* border-radius: 15px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.submain {
    background-color: white;
    /* border-radius: 15px; */
    height: 100%;
    width: 100%;
}

.close {
    width: 100%;
    display: flex;
    justify-content: right;

}

.close i {
    font-size: 23px;
    cursor: pointer;
    color: rgb(61, 61, 61);
}

.lock {
    background-color: #EDE5F0;
    padding: 17px;
    border-radius: 50%;
}

.footer {
    display: flex;
    justify-content: right;
    column-gap: 5px;
    width: 100%;
    font-size: 14px;
}

.footer button:first-child {
    background-color: white;
    color: black;
    border: 1px solid rgb(116, 116, 116);
    padding: 3px 20px;
    cursor: pointer;
}

.footer button:last-child {
    background-color: rgb(0, 0, 66);
    color: white;
    border: 1px solid rgb(0, 0, 66);
    padding: 3px 30px;
    cursor: pointer;
}

.heading {
    padding: 3% 0;
    display: grid;
    row-gap: 6%;
    grid-template-columns: 100%;
}

.heading div:first-child {
    font-size: 17px;
    font-weight: 600;
}

.heading div:last-child {
    font-size: 14px;
    font-weight: 500;
    color: rgb(97, 97, 97);
}

.input #company-code {
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid rgb(190, 190, 190);
    font-size: 14px;
}

.input {
    display: flex;
    justify-content: center;
}

.input:focus {
    outline: none !important;
}</style>