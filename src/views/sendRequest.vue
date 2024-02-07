<template>
    <div class="main" :style="{backgroundColor: (darkmode)? 'var(--dark_mode_2)' : 'white'}">
        <div class="left ">
            <p class="text-right font-extrabold text-4xl  md:text-5xl  font-mono leading-10 pt-9 mb-4" 
            :class="{  'text-white' : darkmode, 'text-blue-950': !darkmode }">
                Requisition Board
            </p>
            <img src="../assets/desktop-design-outline.png" alt="">
        </div>
        <div class="right">
            <div class="container ">
                <form action="" class="form grid gap-y-5 bg-purple-100">
                    <div class="grid grid-cols-2 gap-6">
                        <label for="email">
                            <span class="spans">Email:</span>
                            <input type="email" id="email" placeholder="Enter your email" class="input email-input">
                        </label>

                        <label for="description">
                            <span class="spans">Description / File title</span>
                            <input type="text" id="description" placeholder="Please enter the description or file title"
                                class="input description-input">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="staff_number">
                            <span class="spans ">Staff number / File Number</span>
                            <input type="number" id="staff_number"
                                placeholder="Please enter your staff number or file number" class="input staff-input">
                        </label>

                        <label for="cell-phone">
                            <span class="spans">Cell Phone / EXT</span>
                            <input type="text" id="cell-phone" placeholder="Please enter your cell phone or EXT"
                                class="input cell-phone-input">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="requested-by">
                            <span class="spans">Requested by:</span>
                            <input type="text" id="requested-by" placeholder="Please enter the name of the requester"
                                class="input request-input">
                        </label>

                        <label for="behalf">
                            <span class="spans">On Behalf of (If any)</span>
                            <input type="text" id="behalf" placeholder="On whose behalf is the file been requested"
                                class="input behalf-input">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="request-date">
                            <span class="spans">Date Requested</span>
                            <input type="date" id="date-requested" placeholder="Please select the date of request"
                                class="input request-date-input">
                        </label>

                        <label for="designation">
                            <span class="spans">Designation</span>
                            <input type="text" id="designation" placeholder="Please enter the designation"
                                class="input designation-input">
                        </label>
                    </div>

                    <label for="reason">
                        <span class="spans">Reason for request</span>
                        <textarea name="" id="reason" cols="30" rows="5" class="input"></textarea>
                    </label>

                    <v-switch label='SIGNATURE (TICK "YES" TO VERIFY SIGNATURE)' color="blue"></v-switch>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);
</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
}

.left {
    width: 30%;
    height: fit-content;
    padding-top: 4%;
    padding-bottom: 4%;
}

.right {
    width: 70%;
    height: fit-content;
    display: grid;
    justify-content: center;
    grid-template-columns: 90%;
    align-items: center;
    padding-top: 4%;
    padding-bottom: 4%;
}

.form {
    padding: 10px;
    border-radius: 15px;
    padding: 5%;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.1),
        /* Base shadow */
        0 3px 6px rgba(0, 0, 0, 0.1),
        /* Second layer */
        0 10px 20px rgba(0, 0, 0, 0.2),
        /* Third layer */
        0 20px 40px rgba(0, 0, 0, 0.3);
}

label {
    display: flex;
    flex-direction: column;
}

.input {
    padding: 5px;
    background-color: #F1F5FF;
    border: 1px solid #c6cbd6;
    border-radius: 10px;
    padding: 5px;
}

.input::placeholder {
    font-size: 13px;
    color: rgb(85, 85, 85);
    font-weight: 400;
}


.spans {
    @apply text-sm text-blue-950 font-semibold indent-1.5 pb-0.5;
}</style>