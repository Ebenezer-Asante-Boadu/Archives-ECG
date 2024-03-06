<template>
    <nav class="main"  :style="{backgroundColor: (darkmode)? 'var(--dark_mode)' : 'white'}">
        <div class="logo-container " :style="{color: (darkmode)? 'white':'black'}">
            <span @click="$router.go(-1)" v-if="shouldShowBackArrow" style="cursor:pointer"><v-icon size="20"  >mdi-arrow-left</v-icon></span>
            <span>ECG Archives {{darkmode}}</span>
        </div>
        <div class="middle t">
        </div>
        <div class="right ">
            <button class="minimize actions " style="cursor: pointer" @click="minimize()">
                <v-icon :color="darkmode? 'white':'black'" size="15">mdi-minus</v-icon>
            </button>
            <button class="maximize actions" @click="maximizeRestore()">
                <v-icon :color="darkmode? 'white':'black'" size="15">mdi-window-maximize</v-icon>
            </button>
            <button class="close actions" @click="closeMain()">
                <v-icon :color="darkmode? 'white':'black'" size="18">mdi-close</v-icon>
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted,  } from "vue";
import { maximizeRestore, closeMain, minimize } from "@/lib/utils";
import {useAppDetails} from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const {darkmode, shouldShowBackArrow} = storeToRefs(store);


console.log("darkmode: ", darkmode.value);
// (document as DocumentEventTarget).addEventListener('theme-change', (event) => {
//   console.log('Dark mode:', event.detail.darkMode);
// });
</script>

<style scoped>
.main {
    overflow: hidden;
    width: 100%;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 9000;
}

.middle{
    -webkit-app-region: drag;
    height: 100%;
}

.t{
    flex-grow: 1;
}
.logo-container {
    display: flex;
    column-gap: 20px;
    font-size: 15px;
    font-weight: 500;
    font-size: 14px;
    padding: 0 1%;
    align-items: center;
}

.logo {
    width: 22px;
    height: 22px;
}

.right {
    display: flex;
}

.actions {
    padding: 15px;
    cursor: pointer;
}

.actions:hover {
    cursor: pointer;
    background-color: rgb(177, 10, 10) !important;
    color: white!important;
}


</style>