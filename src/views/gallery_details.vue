<template>
    <div class="main">
        <div class="left">
            <div class="board">
                <div class="image">
                    <img src="../assets/gal1.webp" alt="">
                </div>
                <div class="title">
                    ECG - Archives History
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">h
                    <!-- <swiper :slidesPerView="1.5" :spaceBetween="10" :pagination="{
                        clickable: true,
                    }" :autoplay="{
    delay: 3500,
    disableOnInteraction: false,
}" :navigation="false" :modules="modules" class="mySwiper ">
                        <swiper-slide v-for="n in slides">
                            <img :src="n" height="100"/>
                </swiper-slide>
                </swiper> -->

        </div>
        <div class="bottom">e</div>
    </div>
</div></template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import slide5 from "../assets/gal1.webp";
import slide7 from "../assets/gal2.webp";
import slide6 from "../assets/gal3.webp";
import slide3 from "../assets/gal4.webp";
import slide1 from "../assets/gal5.webp";
import slide4 from "../assets/gal6.webp";
import slide2 from "../assets/gal7.webp";

const modules = [Pagination, Autoplay, Navigation];
const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
</script>

<style scoped>
.main {
    height: var(--body-height);
    display: grid;
    grid-template-columns: 30% 70%;
    background-color: var(--dark_mode_2);
}

.left {
    display: flex;
    justify-content: center;
    align-items: center;

}

.board {
    width: 90%;
    height: 97%;
    border-radius: 5px;
    background-color: rgba(62, 0, 138, 0.363);
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.2),
        0 20px 40px rgba(0, 0, 0, 0.3);
    display: grid;
    grid-template-rows: 50% 50%;
}

.right {
    display: grid;
    grid-template-rows: 40% 58%;
    row-gap: 2%;
    padding: 2%;
    padding-top: 1%;
    padding-left: 0;
}

.right .top,
.right .bottom {
    width: 100%;
    border-radius: 5px;
    background-color: rgba(62, 0, 138, 0.363);
}

.image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image img {
    width: 40%;
    border-radius: 10px;
    height: auto;
}

.board .title {
    color: white;
    text-align: center;
    font-size: 25px;
    font-weight: 600;
}



.mySwiper {
    height: 100px;
}


</style>