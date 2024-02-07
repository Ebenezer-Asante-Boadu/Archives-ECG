<template>
    <div class="main flex justify-center items-center">
        <div class="containern  bg-white rounded-sm flex flex-row">
            <div class="left  w-1/4 flex flex-col items-center pt-7">
                <p class=" w-5/6">Filter messages</p>
                <label for="date" class=" w-5/6">
                    <input type="date" name="" id="date" >
                </label>

                <div class="notifications">
                    <div class="notification" v-for="n in notifications">
                        <div></div>
                        <div>{{n.paragraphs[0]}}</div>
                    </div>
                </div>
            </div>
            <div class="right  w-3/4 ">p</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const notifications = ref([
    {title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},

{title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},

{title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},

{title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},

{title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},

{title: "release of memebero", date: "15 feb", images: [], 
    paragraphs: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias, repudiandae cupiditate perspiciatis blanditiis nulla mollitia! Quos eveniet distinctio debitis nam rerum!",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi numquam ab, eligendi veniam veritatis! Odio ea pariatur, provident alias minima, cum reiciendis minus vero magnam culpa iusto cumque sapiente."
]},
])
</script>

<style scoped>
.main{
    background: linear-gradient(180deg, #633AD7 0%, #1D1B24 100%);
    height: calc(0.935 * 100vh);
}
.containern{
    width: 95%;
    height: 95%;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.1),
        /* Base shadow */
        0 3px 6px rgba(0, 0, 0, 0.1),
        /* Second layer */
        0 10px 20px rgba(0, 0, 0, 0.2),
        /* Third layer */
        0 20px 40px rgba(0, 0, 0, 0.3);
}
.left{
    border-right: 1px solid rgb(173, 173, 173);
}

label input{
    width: 100%;
    border: 1px solid black;
}
.notification{
    border: 1px solid black;
}

</style>