<template>
    <div class="main">
        <div class="left">
            <div class="left-head">
                Good Afternoon
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
                <div class="subheading">Enter your credentials to sign in</div>

                <div class="form pt-10">
                    <div class="input">
                        <v-icon color="gray" size="17">mdi-email</v-icon>
                        <input type="text" placeholder="Enter email">
                    </div>
                    <div class="input">
                        <v-icon color="gray" size="17">mdi-lock</v-icon>
                        <input type="password" placeholder="Enter password">
                    </div>

                    <button class="submit mt-3">Sign in</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {minimize, closeMain} from "../lib/utils"
</script>

<style scoped>
/*#home-container{
    -webkit-app-region:drag;
}*/
.main{
    height: 100vh;
    display: grid;
    grid-template-columns: 35% 65%;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
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
    border-radius: 50%;
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
    background-color: rgb(224, 224, 224);
    padding: 8px 0;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
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