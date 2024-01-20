<template>
  <div class="main">
    <!-- <div class="slide-container" v-for="n in 20">
      <v-slide-group show-arrows >
        <v-slide-group-item v-for="n in slides" :key="n" v-slot="{ isSelected, toggle }" class="min">
            <div class="slide" :style="{backgroundImage: `url(${n})`}"></div>
        </v-slide-group-item>
      </v-slide-group>
    </div> -->
    <div class="slide-container" v-for="n in 20">
      <swiper 
      :slidesPerView="2.5" 
      :spaceBetween="10" 
      :pagination="{
        clickable: true,
      }" 
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :navigation="false"
      :modules="modules" class="mySwiper">
        <swiper-slide v-for="n in slides">
          <div :style="{ backgroundImage: `url(${n})` }" class="slide">
            <button style="background-color:black; color:white">See more</button>
          </div>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import { resetDefault } from '@/lib/utils';
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const slides = [slide1, slide2, slide3];
resetDefault();

const modules = [Pagination, Autoplay, Navigation]
</script>

<style scoped>
.main {
  background-color: white;
  display: flex;
  flex-direction: column;
  row-gap: 3%;
}

.mySwiper {
  height: 45vh;
  width: 100%;
}

.slide {
  background-color: lightgray;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  background-repeat: no-repeat;
}

.slide-container {
  padding: 1%;
  width: 100%;
  background-color: white;
  height: fit-content;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}
</style>