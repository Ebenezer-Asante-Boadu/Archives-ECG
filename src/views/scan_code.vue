<template>
    <div id="qrcode">
<h1>scan</h1>
<img :src="u" alt="">
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const u = ref("")
import * as qrCode from 'qrcode';

const data = 'Hello, World!';
    const options = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    };

    qrCode.toDataURL(data, options, (err:any, url:any) => {
        if (err) {
            console.error(err);
            return;
        }
        u.value = url;
    })
</script>

<style scoped>
#qrcode{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>