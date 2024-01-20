<template>
    <nav class="main">
        <div class="logo-container ">
            <span>ECG Archives</span>
        </div>
        <div class="middle t"></div>
        <div class="right ">
            <button class="minimize actions " style="cursor: pointer;" @click="minimize()">
                <v-icon color="white" size="15">mdi-minus</v-icon>
            </button>
            <button class="maximize actions" @click="maximizeRestore()">
                <v-icon color="white" size="15">mdi-window-maximize</v-icon>
            </button>
            <button class="close actions" @click="close()">
                <v-icon color="white" size="18">mdi-close</v-icon>
            </button>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { maximizeRestore, close, minimize } from "@/lib/utils";

</script>

<style scoped>
.main {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: var(--app-bar-3);
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
    column-gap: 10px;
    font-size: 15px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    padding: 0 1%;
}

.logo {
    width: 22px;
    height: 22px;
    border-radius: 50%;
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
    background-color: red !important;
}</style>