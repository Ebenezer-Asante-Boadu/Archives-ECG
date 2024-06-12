<template>
    <div class="settings-main flex p-3  gap-2">
        <div class="left w-3/12 flex flex-col bg-white shadow-lg rounded-lg opacity-85">
            <div class="head h-fit flex flex-col justify-center items-center flex-grow-0 pt-2 pb-7">
                <div><v-icon size="100" color="gray">mdi-account-circle</v-icon></div>
                <div class="username text-xl font-bold">Done Williams</div>
                <div class="useremail text-md font-semi-bold text-ellipsis">derrickmensahtorkornoo@gmail.com</div>
            </div>
            <v-divider :thickness="5" color="black"></v-divider>
            <div class="body overflow-y-auto">
                <v-list lines="one" bg-color="white" >
                    <v-list-item  subtitle="username, email, profile picture"
                        title="Account" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item  subtitle="Typing..."
                        title="Notifications" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item  subtitle="Typing..."
                        title="Notifications" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item  subtitle="Typing..."
                        title="Notifications" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item  subtitle="Typing..."
                        title="Notifications" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                    <v-list-item  subtitle="Typing..."
                        title="Notifications" color="red">
                        <template v-slot:append>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-list-item>
                </v-list>
                <div class="logout-section flex justify-center items-center px-15 py-5">
                    <button class=" text-white p-1 rounded-md px-5 py-3 " style="background-color:rgb(88, 18, 90)">Logout</button>
                </div>
            </div>
        </div>
        <div class="right bg-white w-9/12 shadow-lg rounded-lg opacity-90">
            <account/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, defineAsyncComponent} from "vue";
const account = defineAsyncComponent(()=>import("../components/settings/account.vue"));
</script>

<style scoped>
.settings-main{
    background-color: rgb(88, 18, 90);
    height: var(--body-height);
}
.left{
}
</style>