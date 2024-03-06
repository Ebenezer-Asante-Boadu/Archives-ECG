<template>
    <div class="main no-select">
        <div class="left">
            <div class="left-head">
                {{getGreeting()}}
            </div>
            <div class="instruction mt-8">
                Have you forgotten your password? Then request a new password!
            </div>
            <button class="reset mt-5">Request password reset</button>
        </div>
        <div class="right">
            <div class="toolbar">
                <span @click="minimize()">
                    <v-icon size="20">mdi-minus</v-icon>
                </span>
                <span @click="closeMain()">
                    <v-icon size="20" >mdi-window-close</v-icon>
                </span>
            </div>
            <div class="body pt-6">
                <div class="heading pt-6">Sign in to ECG-ARCHIVES</div>
                <div class="logo-container pt-2 pb-2">
                    <img src="../assets/logo.jpg" alt="" class="logo">
                </div>
                <div class="subheading">{{instruction}}</div>

                <div class="form pt-10">
                    <div class="input" :class="!valids.email && startValidation ? 'input-error':'input-success'">
                        <v-icon :color="!valids.email && startValidation ? 'red':'black'" size="17">mdi-email</v-icon>
                        <input type="text" placeholder="Enter email" v-model="emailModel">
                    </div>
                    <div class="input"  :class="!valids.pass && startValidation ? 'input-error':'input-success'">
                        <v-icon :color="!valids.pass && startValidation ? 'red':'black'" size="17">mdi-lock</v-icon>
                        <input type="password" placeholder="Enter password" v-model="passModel">
                    </div>

                    <button class="submit mt-3" @click="validateForm()">Sign in</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {minimize, closeMain, getUserDetails, setAuthenticated} from "../lib/utils";
import { _signInWithEmailPassword } from "@/lib/firebase";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useAppDetails } from "@/stores/appDetails";

const store =  useAppDetails();
const {setAuthentication, setEmail} = store;
const {authenticated} = storeToRefs(store)
const instruction = ref("Enter your credentials to sign in");
const emailModel =  ref("");
const passModel = ref("");
const valids = ref({email:false, pass:false});
const startValidation = ref(false);

async function validateForm(){
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    startValidation.value = true;
    valids.value.email = !emailPattern.test(emailModel.value) ? false : true;
    valids.value.pass = passModel.value.length < 8 ? false : true;

    if(valids.value.email && valids.value.pass){
        setEmail(emailModel.value);
        const res = await signUser();
    }
}

function processCallback(m:string){
    instruction.value = m;
}

async function signUser(){
    try{
        const user = await getUserDetails();

        if(!user){
            setAuthentication(false);
            return null;
        }
        
        const sign = await _signInWithEmailPassword(emailModel.value, passModel.value, user.staff_id, processCallback);

        if(!sign.success){
            setAuthentication(false)
            return null;
        }

        setAuthentication(true)
        router.push("/front-page");
    }catch(err){
        setAuthentication(false)
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
.main{
    height: 100vh;
    display: grid;
    grid-template-columns: 35% 65%;
    
}
.left{
    background: linear-gradient(66deg, #090532 37.32%, #2414E2 131.6%);
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.left .left-head{
    color: white;
    font-size: 27px;
    font-weight: 600;
    text-align: center;
}
.left .instruction{
    font-size: 15px;
    color: white;
    text-align: center;
}
.left .reset{
    color: white;
    border: 1px solid white;
    border-radius: 25px;
    font-size: 13px;
    padding: 8px 14px;
}

.left .reset{
    color: black;
    border: 1px solid white;
    background-color: white;
    border-radius: 25px;
    font-size: 13px;
    padding: 8px 14px;
    font-weight: 500;
}

.right{
    background-color: white;
}
.toolbar{
    display: flex;
    justify-content: right;
    column-gap: 1%;
    padding: 1% ;
    width: 100%;
}
.toolbar span{
    cursor: pointer;
}
.body .heading{
    text-align: center;
    font-size: 25px;
    font-weight: 600;
}
.logo-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo{
    height: 70px;
    height: 70px;
}
.body .subheading{
    text-align: center;
    font-size: 15px;
    font-weight: 400;
}

.form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
}

.form .input{
    padding: 8px 0;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
}
.input-error{
    background-color: rgba(196, 23, 23, 0.144);
}
.input-success{
    background-color: rgb(238, 238, 238);
}
.input input{
    width: 85%;
}
.input input::placeholder{
    font-size: 14px;
    padding-left: 8px;
}
.form button{
    background: linear-gradient(66deg, #090532 37.32%, #2414E2 131.6%);
    color: white;
    padding: 8px 35px;
    border-radius: 20px;
    font-size: 15px;
}
</style>