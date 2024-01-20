<template>
  <div class="main">
    <div class="slide-container" v-for="n in 20">
      <v-slide-group show-arrows >
        <v-slide-group-item v-for="n in slides" :key="n" v-slot="{ isSelected, toggle }" class="min">
            <div class="slide" :style="{backgroundImage: `url(${n})`}"></div>
        </v-slide-group-item>
      </v-slide-group>
    </div>

  </div>
</template>

<script setup lang="ts">
import { resetDefault } from '@/lib/utils';
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const slides = [slide1, slide2, slide3]
resetDefault();
</script>

<style scoped>
.main{
  background-color: white;
  display: flex;
  flex-direction: column;
  row-gap: 3%;
}
.slide {
  background-color: lightgray;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  width: calc(0.4 * 100vw);
  height: 60vh;
  background-repeat: no-repeat;
  margin-right: 10px;
  border-radius: 10px;
}
.slide-container{
  padding: 1%;
  width: 100%;
  background-color: white;
  height: fit-content;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}
.img-container {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
  width: 70%;
}
</style>