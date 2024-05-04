<template>
    <div class="main">
        <div class="logom" style="display:flex; justify-content:center; align-items:center; padding: 35% 15%">
            <img src="../assets/logo.jpg" style="heigh: 70%; width:70%">
        </div>
        <div class="links">
            <div class="link" v-for="link, index in links" @click="router.push(link.path); " :key="index"
                :class="router.currentRoute.value.path === link.path ? 'selected-link' : ''"
                @mouseover="link.mouseOver = true" @mouseleave="link.mouseOver = false">
                <v-tooltip :text="link.tooltip">
                    <template v-slot:activator="{ props }">
                        <button v-bind="props">
                            <v-icon class="link-name" size="22"
                                :color="(link.mouseOver || router.currentRoute.value.path === link.path )? 'rgb(70, 12, 104)' : 'white'">{{ link.icon }}</v-icon>
                        </button>
                    </template>
                </v-tooltip>
            </div>

            <!-- <div class="link" v-for="link in links">
                <v-tooltip :text="link.tooltip">
                    <template v-slot:activator="{ props }">
                        <button v-bind="props">
                            <v-icon  class="link-name" size="22" >{{link.icon}}</v-icon>
                        </button>
                    </template>
                </v-tooltip>
            </div> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from "@/router";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);

const links = ref([
    { name: "Home", icon: "mdi-home", tooltip: "Home", type: "normal", path: "/front-page", mouseOver: false },
    { name: "requests", icon: "mdi-send", tooltip: "Send a file request", type: "normal", path: "/send-request", mouseOver: false },
    { name: "notifications", icon: "mdi-bell", tooltip: "Notifications", type: "normal", path: "/notifications", mouseOver: false },
    { name: "help", icon: "mdi-help-network", tooltip: "Get help", type: "normal", path: "", mouseOver: false },
    { name: "edit", icon: "mdi-file-edit", tooltip: "Start editing a file", type: "normal", path: "/edit-file", mouseOver: false },
    { name: "settings", icon: "mdi-cog", tooltip: "Settings", type: "not-normal", path: "/scan", mouseOver: false }
])
</script>

<style scoped>
.main {
    overflow: hidden;
    height: 100%;
    width: 5%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    background-color: var(--dark_mode_2);
    position: fixed;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.logo {
    height: 35px;
    width: 35px;
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

.links {
    width: 100%;
    color: white;
    padding: 30% 7%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    height: 100%;
}

.link {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    padding: 14% 0;
    border-radius: 5px;
    margin: 0 8%;
    cursor: pointer;
    color: white;
}

.link:hover {
    background-color: white;
}

.selected-link {
    background-color: white;
    border-left: 6px solid rgb(21, 51, 185);
}

.link-name {
    flex: 100%;
    text-align: center;
    font-size: 11.5px;
}
</style>