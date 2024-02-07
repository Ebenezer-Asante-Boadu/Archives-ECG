<template>
  <div class="main flex flex-col p-4">
    <!-- <div class="slide-container" v-for="n in 20">
      <v-slide-group show-arrows >
        <v-slide-group-item v-for="n in slides" :key="n" v-slot="{ isSelected, toggle }" class="min">
            <div class="slide" :style="{backgroundImage: `url(${n})`}"></div>
        </v-slide-group-item>
      </v-slide-group>
    </div> -->
    <div class="slide-container " v-for="n in 5">
      <swiper :slidesPerView="1.5" :spaceBetween="10" :pagination="{
        clickable: true,
      }" :autoplay="{
  delay: 2500,
  disableOnInteraction: false,
}" :navigation="false" :modules="modules" class="mySwiper ">
        <swiper-slide v-for="n in slides">
          <div class="slide bg-blue-700 flex flex-col justify-center" :style="{ backgroundImage: `url(${n})` }">
            <div class="pl-6">
              <p class="text-white text-4xl font-normal">History of ECG</p>
              <p class="text-white text-sm">Getting all you need, you will bin goto</p>
              <button style="color:white; " class="bg-indigo-900 pt-1 pb-1 pl-3 pr-3 rounded-2xl">See more</button>
            </div>
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
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);

const slides = [slide1, slide2, slide3];
resetDefault();

const modules = [Pagination, Autoplay, Navigation]
</script>

<style scoped>
.main {
  background-color: var(--dark_mode_2);
  row-gap: 4%;
}


.mySwiper {
  height: 65vh;
}

.slide {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  filter: brightness(0.85);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.slide-container {
  background-color: var(--dark_mode_2);
  height: fit-content;
  
  border-radius: 10px;
  width: 100%;
}
</style>