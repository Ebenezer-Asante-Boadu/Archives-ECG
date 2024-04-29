<template>
    <div class=" main-verify grid grid-flow-row p-5 no-select">
        <div class=" header grid grid-flow-row pb-5">
            <div class="section1 flex flex-row justify-between items-center pb-5">
                <div class="left-section flex flex-row w-10/12 justify-start items-center gap-2">
                    <div class="flex-grow-0 flex justify-start">
                        <v-avatar color="rgb(212, 212, 241)" size="25">
                            <v-icon size="15" class="lock" :color="verification.verified? 'rgb(0, 0, 66)' : 'red'">mdi-lock</v-icon>
                        </v-avatar>
                    </div>
                    <div class="details flex-grow-0 text-base font-bold">
                        Verify your identity
                    </div>
                </div>
                <div class="right-section w-2/12 flex justify-end">
                    <!-- <v-avatar> -->
                    <span class="flex-grow-0 " style="cursor:pointer" @click="close()">
                        <v-icon size="23">mdi-window-close</v-icon>
                    </span>
                    <!-- </v-avatar> -->
                </div>
            </div>
            <div class="section2 flex text-xs"
                :class="{ 'text-black': verification.verified, 'text-red-600': !verification.verified, 'font-bold': !verification.verified, 'text-sm': !verification.verified }">
                {{ verification.verified ? verification.default_message : verification.error_message }}
            </div>
        </div>
        <div class="body pt-6">
            <div class="mb-5">
                <div class="text-xs mb-3 pl-2">ID Number:</div>
                <v-text-field placeholder="Enter your company ID Number" variant="outlined" density="compact" type="text"
                    append-inner-icon="mdi-email" :rules="[rules.required, rules.Length]" v-model="verification.input"
                    :base-color="isFocused ? 'rgb(0, 0, 66)' : 'grey'" @update:focused="(value) => isFocused = value">
                </v-text-field>
            </div>
            <button class="verify" :disabled="!isIDValid" @click="startVerification()">{{ verify_button_text }}</button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { close, getFingerprint, getVerifyVerification, verifyApp } from "../lib/utils";
import { ref } from "vue";
import router from "@/router";

const isFocused = ref(false);
const number_pattern = /^\d+$/;
const isIDValid = ref(false);
const verify_button_text = ref("Verify identity");
const verification = ref({
    verified: true,
    error_message: "hello",
    input: "",
    default_message: "Enter your company ID number to verify yourself"
});

const rules = {
    // Defining a validation rule named 'required'
    required: (value: any) => !!value || 'Please fill in the field!',
    Length: (value: any) => {
        isIDValid.value = (value.length == 16 && number_pattern.test(value));
        return (value.length == 16 && number_pattern.test(value)) || "Invalid ID Number"
    },
}

async function startVerification() {
    verify_button_text.value = "Verifying identity...";
    const fingerprint = await getFingerprint();

    if (fingerprint) {
        const results = await verifyApp({
            fingerprint: fingerprint,
            date: "",
            staff_id: verification.value.input
        });

        // console.log(results);

        if (results.success) {
            verification.value.verified = true;
            verify_button_text.value = "Verify identity";
            router.push("/app-auth");
            return;
        } else {
            verification.value.verified = false;
            verify_button_text.value = "Verify identity";
            // console.log("Verification failed. Please try again.");
            if (results.message === 5000) {
                verification.value.error_message = "You've entered the wrong staff id!";
            } else {
                verification.value.error_message = "You don't have authorized access!!!";
            }
        }
    } else {
        verification.value.verified = false;
        verify_button_text.value = "Verify identity";
        verification.value.error_message = "Couldn't add fingerprint or ID Number";
    }
}
</script>

<style scoped>
.main-verify {
    background-color: white;
    width: 100vw;
    height: 100vh;
}

.main-verify * {
    font-family: "Roboto", sans-serif;
}

.header {
    height: fit-content;
    width: 100%;
    border-bottom: 1px solid rgb(163, 163, 163);
}

button.verify {
    background-color: rgb(0, 0, 66);
    width: 100%;
    color: white;
    border-radius: 5px;
    padding: 9px;
    font-size: 13px;
}
</style>