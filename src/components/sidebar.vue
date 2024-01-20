<template>
    <div class="main">
        <div class="logom" style="display:flex; justify-content:center; align-items:center; padding: 25% 0">
            <img src="../assets/logo.jpg"  style="border-radius:50%; heigh: 80%; width:80%">
        </div>
        <div class="links">
            <div class="link" v-for="link in links">
                <v-icon  class="link-name" size="22">{{link.icon}}</v-icon>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = ref([
    {name:"Home", icon: "mdi-home-outline"}, 
    {name: "requests", icon: "mdi-send-outline"},
    {name:"notifications", icon:"mdi-bell"},
    {name:"help", icon:"mdi-help-network"},
    {name:"edit", icon:"mdi-file-edit"},
    {name:"settings", icon:"mdi-cog"}
    ])
</script>

<style scoped>
.main {
    height: 100%;
    width: 4.5%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    background-color: var(--app-bar-3)!important;
    /*background-color: white;*/
    position: fixed;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.logo {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.logo-container {
    color: white;
    display: flex;
    justify-content: left;
    align-items: center;
    height: fit-content;
    column-gap: 5%;
    width: 100%;
}

.links{
    width: 100%;
    color: white;
    padding: 30% 0;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.link{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    padding: 14% 0;
    border-radius: 10px;
    margin: 0 8%;
    cursor: pointer;
    color: white;
}
.link:hover{
    background-color: rgb(40, 14, 102);
}
.link-name{
    flex: 100%;
    text-align: center;
    font-size: 11.5px;
}
</style>