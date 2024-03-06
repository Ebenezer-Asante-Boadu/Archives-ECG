<template>
    <div class="main flex justify-center items-center">
        <div class="containern  rounded-sm flex flex-row">
            <div class="left  w-1/4 flex flex-col items-center pt-7">
                <p class=" w-5/6">Filter messages</p>
                <label for="date" class=" w-5/6">
                    <input type="date" name="" id="date" >
                </label>

                <div class="notifications grid grid-flow-row gap-3">
                    <div class="notification bg-white rounded-lg" v-for="n in notifications">
                        <div class="top">
                            <div class="title"> release</div>
                            <div class="date">
                                {{ n.date }}
                            </div>
                        </div>
                        
                        <div class="truncaten body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus ullam saepe hic dolores, temporibus ea dolor alias!  </div>
                    </div>
                </div>
            </div>
            <div class="right  w-3/4 ">
                <div class="detail-pane">
                    release of GPT 4
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const notifications = ref([
    {title: "release", date: "15 feb", images: [], 
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
    background: rgb(241, 241, 241);
    height: var(--body-height);
}
.containern{
    width: 95%;
    height: 95%;
   /* box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.1),
        0 10px 20px rgba(0, 0, 0, 0.2),
        0 20px 40px rgba(0, 0, 0, 0.3);*/
}
.left{
    border-right: 1px solid rgb(173, 173, 173);
}

.right{
    overflow-y: auto;
}
label input{
    width: 100%;
    border: 1px solid black;
}
.notification{
    padding: 10px;
    box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.1);
}
.notification:hover{
    background-color: rgb(25, 2, 78)!important;
    color: white!important;
    cursor: pointer;
}
.notifications{
    overflow-y: auto;
}
.notification .top{
    display: flex;
    justify-content: space-between;
}
.notification .top .date{
    color: rgb(55, 2, 141);
    font-size: 13px;
    font-weight: 600;
}

.notification .top .title{
    font-size: 16px;
}

.notification .body{
    font-size: 13.5px;
}
.truncate {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        overflow: hidden !important;
        width: 100%;
    }

    .right .detail-image{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .right .detail-image img{
        width: 80%;
        height: 400px;
    }
</style>