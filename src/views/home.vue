<template>
  <div class="main flex flex-col p-4">
    <!-- <div class="slide-container" v-for="n in 20">
      <v-slide-group show-arrows >
        <v-slide-group-item v-for="n in slides" :key="n" v-slot="{ isSelected, toggle }" class="min">
            <div class="slide" :style="{backgroundImage: `url(${n})`}"></div>
        </v-slide-group-item>
      </v-slide-group>
    </div> -->
    <div class="slide-container ">
      <swiper :slidesPerView="1.5" :spaceBetween="15" :pagination="{
        clickable: true,
      }" :autoplay="{
  delay: 3500,
  disableOnInteraction: false,
}" :navigation="false" :modules="modules" class="mySwiper ">
        <swiper-slide v-for="n in slides">
          <div class="slide  flex flex-col justify-center" :style="{ backgroundImage: `url(${n})` }">
            <!-- <img :src="n" alt="" class="slide"> -->
            <div class="pl-6 popup">
              <p class="text-white text-4xl font-semibold">History of ECG</p>
              <p class="text-white text-sm font-normal">Getting all you need, you will bin goto</p>
              <button style="color:white; " class="bg-indigo-900  pl-3 pr-3  see-more" @click="$router.push('/gallery-details')">
                <v-icon>mdi-chevron-right</v-icon>
                See more</button>
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
import slide5 from "../assets/gal1.webp";
import slide7 from "../assets/gal2.webp";
import slide6 from "../assets/gal3.webp";
import slide3 from "../assets/gal4.webp";
import slide1 from "../assets/gal5.webp";
import slide4 from "../assets/gal6.webp";
import slide2 from "../assets/gal7.webp";

import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);

const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
resetDefault();

const modules = [Pagination, Autoplay, Navigation];

function getNeeded(num:number){
  if(num === 1){
    return slides.slice(0,3);
  }else if(num === 2){
    return slides.slice(3, 6)
  }
  return slides.slice(6, 9);
}
</script>

<style scoped>
.main {
  background-color: var(--dark_mode_2);
  row-gap: 2%;
  height: var(--body-height);
  overflow-y: scroll;
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
}
.slide::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0, 0, 0, 0.548);*/
  background: linear-gradient(to right, rgba(0, 0, 0, 0.648) 50%, rgba(0, 0, 0, 0) 100%);
  }

.slide-container {
  background-color: var(--dark_mode_2);
  height: fit-content;
  
  border-radius: 10px;
  width: 100%;
}
.popup{
 /* background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));  Adjust the gradient to your liking */
  z-index: 1; /* Ensure the shine is above the image */
  display: grid;
  row-gap: 20px;
  position: relative;
  z-index: 5;
}

button.see-more{
  width: 15%;
  border-radius: 5px;
  padding: 3px 0;
  font-size: 14px;
  box-shadow: 
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.2),
        0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>