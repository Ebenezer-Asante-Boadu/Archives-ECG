<template>
    <div class="main no-select">
        <div class="left p-3">
            <div class="left-head">
                {{ getGreeting() }}
            </div>
            <div class="instruction mt-8">
                <pre>Have you forgotten your password?</pre>
                <pre>Then request a new password!</pre>
            </div>
            <button class="reset mt-5" @click="show_reset = true">Request password reset</button>
        </div>
        <div class="right">
            <div class="toolbar">
                <span @click="minimize()">
                    <v-icon size="20">mdi-minus</v-icon>
                </span>
                <span @click="closeMain()">
                    <v-icon size="20">mdi-window-close</v-icon>
                </span>
            </div>
            <div class="body pt-6">
                <div class="logo-container pt-2 pb-2">
                    <img src="../assets/logo.jpg" alt="" class="logo">
                </div>
                <div class="heading pt-6 text-2xl font-bold">{{ show_reset ? "Reset your password" : "Sign In" }}</div>
                <div class="sub_instruction text-xs mt-3" v-if="show_reset" style="width:100%">Enter your email address below to reset.</div>

                <!-- <div class="subheading">{{instruction}}</div> -->

                <div class="form gap-2" 
                :class="{ 'pt-10' : !show_reset, 'pt-7' : show_reset }">
                    <div class="input">
                        <div class="text-sm pl-2">Email:</div>
                        <v-text-field color="primary" variant="underlined" placeholder="Enter your email" type="email"
                            :rules="[rules.required, rules.email]" density="compact"
                            v-model="inputs.email.value"></v-text-field>
                    </div>

                    <div class="input" v-if="!show_reset">
                        <div class="text-sm pl-2">Password:</div>
                        <v-text-field color="primary" variant="underlined" placeholder="Enter your password"
                            :rules="[rules.required, rules.password]"
                            :append-inner-icon="inputs.password.show ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="inputs.password.show = !inputs.password.show"
                            :type="inputs.password.show ? 'text' : 'password'" density="compact"
                            v-model="inputs.password.value"></v-text-field>
                    </div>

                    <button class="submit mt-3" @click="LogIn()" :disabled="!inputs.password.valid">{{ button_text
                        }}</button>
                </div>

                <div class="error-message text-red-600 text-sm font-bold mt-2" style="width:100%"
                    v-if="showErrorMessage">{{ instruction }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { minimize, closeMain, getUserDetails, setAuthenticated } from "../lib/utils";
import { _signInWithEmailPassword } from "@/lib/firebase";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useAppDetails } from "@/stores/appDetails";

const store = useAppDetails();
const { setAuthentication, setEmail } = store;
const { authenticated } = storeToRefs(store)
const instruction = ref("Enter your credentials to sign in");
const inputs = ref({
    email: { value: "", valid: false, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    password: { value: "", valid: false, show: false }
});
const showErrorMessage = ref(false);
const button_text = ref("Sign in"); 
const show_reset = ref(false);

const rules = {
    // Defining a validation rule named 'required'
    required: (value: any) => !!value || 'Please fill in the field!',
    email: (value: any) => {
        inputs.value.email.valid = inputs.value.email.pattern.test(value);
        return inputs.value.email.pattern.test(value) || "Invalid email format"
    },
    password: (value: any) => {
        inputs.value.password.valid = value.length > 8;
        return value.length > 8 || "Invalid password format"
    }
}
async function LogIn() {
    setEmail(inputs.value.email.value);
    const res = await signUser();
}

function processCallback(m: string) {
    // alert(m);
    // console.log("ahh");
    instruction.value = m;
    button_text.value = m == "Signing in..." ? m : "Sign in";
}

async function signUser() {
    button_text.value = "Signing in...";
    try {
        const user = await getUserDetails();

        if (!user) {
            setAuthentication(false);
            processCallback("Unauthorized appp usage!");
            showErrorMessage.value = true;
            return null;
        }

        const sign = await _signInWithEmailPassword(inputs.value.email.value, inputs.value.password.value, user.staff_id, processCallback);

        if (!sign.success) {
            showErrorMessage.value = true;
            setAuthentication(false)
            return null;
        }

        // console.log(sign.success);
        setAuthentication(true)
        router.push("/front-page");
    } catch (err) {
        alert(9);
        setAuthentication(false);
        processCallback("Unauthorized appp usage!");
        showErrorMessage.value = true;
        return null;
    }
}


function getGreeting(): string {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting: string;

    if (currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return greeting;
}
// _signInWithEmailPassword(emailModel.value, passModel.value, )
// .then(()=>{})
</script>

<style scoped>
/*#home-container{
    -webkit-app-region:drag;
}*/
.main {
    height: 100vh;
    display: grid;
    grid-template-columns: 50% 50%;
}

.left {
    background: linear-gradient(66deg, #090532 37.32%, #2414E2 131.6%);
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.left .left-head {
    color: white;
    font-size: 35px;
    font-weight: 500;
    text-align: center;
    font-family: "Roboto", sans-serif;

}

.left .instruction * {
    font-size: 15px;
    color: white;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
}

.left .reset {
    color: white;
    border: 1px solid white;
    border-radius: 25px;
    font-size: 13px;
    padding: 8px 14px;
}

.left .reset {
    color: black;
    border: 1px solid white;
    background-color: white;
    border-radius: 25px;
    font-size: 13px;
    padding: 8px 14px;
    font-weight: 500;
    font-family: "News_Cycle", sans-serif;
}

.right {
    background-color: white;
}

.toolbar {
    display: flex;
    justify-content: right;
    column-gap: 1%;
    padding: 1%;
    width: 100%;
}

.toolbar span {
    cursor: pointer;
}

.body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0% 7.5%;
}

.body .heading {
    text-align: left;
    width: 100%;
    /*color: #120a68;*/
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    height: 70px;
    height: 70px;
}

.body .subheading {
    text-align: left;
    font-size: 15px;
    font-weight: 400;
}

.form {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    width: 100%
}

.form .input {
    width: 100%;
}

/*.form .input:focus {
    border-bottom: 2px solid #120a68 !important;
}

label {
    width: 100%;
    color: #120a68;
    font-weight: 500;
}

.input-error {
    background-color: rgba(196, 23, 23, 0.144);
}

.input-success {
    background-color: rgb(238, 238, 238);
}

.input input {
    width: 100%;
}

.input input::placeholder {
    font-size: 14px;
    padding-left: 0px;
}*/

.form button {
    background: linear-gradient(66deg, #090532 37.32%, #2414E2 131.6%);
    color: white;
    padding: 8px 35px;
    border-radius: 0px;
    font-size: 15px;
    width: 100%;
}
</style>