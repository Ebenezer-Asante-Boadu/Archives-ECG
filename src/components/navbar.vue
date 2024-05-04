<template>
    <nav class="nav-main flex items-center justify-between" >
        <div class="logo-container flex items-center flex-grow-0" :style="{color: (darkmode)? 'white':'black'}">
            <span @click="$router.go(-1)" v-if="shouldShowBackArrow" style="cursor:pointer"><v-icon size="20"  >mdi-arrow-left</v-icon></span>
            <!-- <span>ECG Archives </span> -->
            <div class="flex items-center text-white gap-4">
                <v-switch label="AutoSave" hide-details color="purple-accent-4"></v-switch>
                <button>
                    <v-icon>mdi-download</v-icon>
                </button>
                <button><v-icon>mdi-undo</v-icon></button>
                <button><v-icon>mdi-redo</v-icon></button>
            </div>
        </div>
        <div class="middle t flex-grow flex justify-center items-center text-white">
            Book1 - Excel
        </div>
        <div class="right flex-grow-0">
            <button class="minimize actions " style="cursor: pointer" @click="minimize()">
                <v-icon :color="darkmode? 'white':'white'" size="15">mdi-minus</v-icon>
            </button>
            <button class="maximize actions" @click="maximizeRestore()">
                <v-icon :color="darkmode? 'white':'white'" size="15">mdi-window-maximize</v-icon>
            </button>
            <button class="close actions" @click="closeMain()">
                <v-icon :color="darkmode? 'white':'white'" size="18">mdi-close</v-icon>
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
.nav-main {
    overflow: hidden;
    width: 100%;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 9000;
    background-color: var(--dark_mode_2);
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