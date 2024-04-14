<template>
    <div class="main" :style="{ backgroundColor: (darkmode) ? 'var(--dark_mode_2)' : 'white' }">
        <div class="left ">
            <p class="text-right font-extrabold text-4xl  md:text-5xl  font-mono leading-10 pt-9 mb-4"
                :class="{ 'text-white': darkmode, 'text-blue-950': !darkmode }">
                Requisition Board
            </p>
            <img src="../assets/desktop-design-outline.png" alt="">
        </div>
        <div class="right">
            <div class="container ">
                <form action="" class="form grid gap-y-5 bg-purple-100" @submit="(e) => { e.preventDefault() }">
                    <div class="grid grid-cols-2 gap-6">
                        <label for="email">
                            <span class="spans">Email:</span>
                            <input type="email" id="email" placeholder="Enter your email" class="input email-input"
                                v-model="inputs.email.value"
                                :class="!inputs.email.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>

                        <label for="description">
                            <span class="spans">Description / File title</span>
                            <input type="text" id="description" placeholder="  enter the description or file title"
                                class="input description-input" v-model="inputs.description.value"
                                :class="!inputs.description.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="staff_number">
                            <span class="spans ">Staff number / File Number</span>
                            <input type="number" id="staff_number"
                                placeholder="  enter your staff number or file number" class="input staff-input"
                                v-model="inputs.id.value"
                                :class="!inputs.id.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>

                        <label for="cell-phone">
                            <span class="spans">Cell Phone / EXT</span>
                            <input type="text" id="cell-phone" placeholder="  enter your cell phone or EXT"
                                class="input cell-phone-input" v-model="inputs.cell_phone.value"
                                :class="!inputs.cell_phone.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="requested-by">
                            <span class="spans">Requested by: {{ userDetails.name }}</span>
                            <input type="text" id="requested-by" placeholder="  enter the name of the requester"
                                class="input request-input" v-model="inputs.requested_by.value"
                                :class="!inputs.requested_by.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>

                        <label for="behalf">
                            <span class="spans">On Behalf of (If any)</span>
                            <input type="text" id="behalf" placeholder="On whose behalf is the file been requested"
                                class="input behalf-input" v-model="inputs.behalf.value"
                                :class="!inputs.behalf.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                        <label for="request-date">
                            <span class="spans">Date Requested</span>
                            <input type="date" id="date-requested" placeholder="  select the date of request"
                                class="input request-date-input" readonly v-model="inputs.date_requested.value"
                                :class="!inputs.date_requested.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>

                        <label for="designation">
                            <span class="spans">Designation</span>
                            <input type="text" id="designation" placeholder="  enter the designation"
                                class="input designation-input" v-model="inputs.designation.value"
                                :class="!inputs.designation.isValid && startValidation ? 'input-error' : 'input-success'">
                        </label>
                    </div>

                    <label for="reason">
                        <span class="spans">Reason for request</span>
                        <textarea name="" id="reason" cols="30" rows="5" class="input" v-model="inputs.reason.value"
                            :class="!inputs.reason.isValid && startValidation ? 'input-error' : 'input-success'"></textarea>
                    </label>


                    <div>
                        <button class="submit" @click="validateForm()">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";
import { useToast } from 'vuestic-ui';

const store = useAppDetails();
const { darkmode, userDetails } = storeToRefs(store);
const { init, notify, close, closeAll } = useToast();
const startValidation = ref(false)
const inputs = ref({
    email: { value: userDetails.value.email, isValid: false },
    id: { value: userDetails.value.id, isValid: false },
    requested_by: { value: userDetails.value.name, isValid: false },
    date_requested: { value: getCurrentDateString(), isValid: false },
    description: { value: "", isValid: false },
    cell_phone: { value: "", isValid: false },
    behalf: { value: "", isValid: false },
    designation: { value: "", isValid: false },
    reason: { value: "", isValid: false }
})

function getCurrentDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months are zero-based
    let day = today.getDate();

    // Add leading zero if month/day is less than 10
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
}

function validateForm() {
    const telephoneRegex = /^(\+\d{1,4})?(\d{1,})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const idRegex = /^.{4,}$/;
    const requestedByRegex = /^.{4,}$/;
    const dateRequestedRegex = /^.{4,}$/;
    const descriptionRegex = /^.{8,}$/;

    const emailValid = inputs.value.email.isValid = emailRegex.test(inputs.value.email.value);
    const cellValid = inputs.value.cell_phone.isValid = telephoneRegex.test(inputs.value.cell_phone.value);
    const idValid = inputs.value.id.isValid = idRegex.test(inputs.value.id.value);
    const requestedValid = inputs.value.requested_by.isValid = requestedByRegex.test(inputs.value.requested_by.value);
    const dateRequestedValid = inputs.value.date_requested.isValid = dateRequestedRegex.test(inputs.value.date_requested.value);
    const descriptionValid = inputs.value.description.isValid = descriptionRegex.test(inputs.value.description.value);
    const behalfValid = inputs.value.behalf.isValid = dateRequestedRegex.test(inputs.value.behalf.value);
    const reasonValid = inputs.value.reason.isValid = descriptionRegex.test(inputs.value.reason.value);
    const designationValid = inputs.value.designation.isValid = dateRequestedRegex.test(inputs.value.designation.value);

    if (emailValid && cellValid && idValid && requestedValid && dateRequestedValid && descriptionValid && behalfValid && reasonValid && designationValid) {
        console.log("yeah");
       
        // window.main.showNotification(`Your request for the file titled ${inputs.value.description.value} has been sent to the admin for approval!!!`, inputs.value.email.value);
        notify( {message:"JUST CHECKING", position:"bottom-right"});
        inputs.value.behalf.value = "";
        inputs.value.cell_phone.value = "";
        inputs.value.description.value = "";
        inputs.value.designation.value = "";
        inputs.value.reason.value = "";
        inputs.value.requested_by.value = "";
    }

    startValidation.value = true;
}
</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
    height: var(--body-height);
    overflow-y: auto;
    position: relative;
}

.left {
    width: 30%;
    height: fit-content;
    padding-top: 4%;
    padding-bottom: 4%;
    position: sticky;
    top: 0;
}

.right {
    width: 70%;
    height:100%;
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
    border: 1px solid #c6cbd6;
    border-radius: 10px;
    padding: 5px;
}

.input::placeholder {
    font-size: 13px;
    color: rgb(85, 85, 85);
    font-weight: 400;
}

button.submit {
    background-color: rgb(66, 0, 97);
    color: white;
    padding: 5px 20px;
    border-radius: 5px
}

.input-error {
    background-color: rgba(196, 23, 23, 0.144);
}

.input-success {
    background-color: rgb(238, 238, 238);
}

.spans {
    @apply text-sm text-blue-950 font-semibold indent-1.5 pb-0.5;
}</style>