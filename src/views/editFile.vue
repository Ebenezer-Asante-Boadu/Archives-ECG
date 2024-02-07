<template>
    <div class="main flex flex-col">

        <div class="toolbar flex items-center justify-left gap-8 pl-10">
            <div class="wrapper flex items-center justify-center w-3/6">
                <label for="column">
                    <input type="text" id="column" class="bg-white">
                </label>
                <button class="bg-blue">New Column</button>
            </div>
            <button class="bg-green">New Row</button>
            <button class="bg-blue" @click="exportExcel(data)">Export</button>
        </div>

        <div class="data flex flex-col flex-grow">
            <div class="rown flex flex-row" v-for="n in 25" :class="n === 1? 'bg-red':''">
                <div class="columnn" v-for="ni, index in columns" >
                    <div class="input">
                        <input type="text" v-model="data[n-1][index]">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {exportExcel} from "../lib/utils";

const columns  = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Z"];
const data = ref<string[][]>(Array.from({ length: 25 }, () => columns.map(() => '')));

</script>

<style scoped>
.main{
    width: 100%;
    height: calc(0.935 * 100vh);
}
.toolbar{
    background-color: var(--app-bar-3);
    width: 100%;
    height: 7%;
}
div.input{
    border: 1px solid rgb(177, 177, 177);
    width: 80px;
}
.data{
    overflow: scroll;
}
</style>