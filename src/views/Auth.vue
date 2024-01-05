<template>
    <div class="main">
        <div class="left">
            <div class="icon">
                <v-icon>mdi-delete-forever</v-icon>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup lang="ts">
console.log(67)
</script>

<style scoped>
.main{
    background-color: white;
    width: 100vw;
    display: flex;
}
.left{
    width: 40%;
}
.right{
    background-image: url(../assets/ecg.png);
    background-repeat: no-repeat;
    height: 100vh;
    background-size: cover;
    width: 60%;
}
</style>