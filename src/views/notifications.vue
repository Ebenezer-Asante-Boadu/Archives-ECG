<template>
    <div class="main">
        <div class="left " >
            <v-list lines="one" bg-color="rgb(88, 18, 90)" class="border-b-2 border-blue-950">
                <v-list-item v-for="folder in folders" :key="folder.title" :subtitle="folder.subtitle"
                    :title="folder.title" color="red">
                    <template v-slot:prepend>
                        <v-avatar color="grey-lighten-1">
                            <img src="../assets/account.jpg" alt="">
                        </v-avatar>
                    </template>

                    <template v-slot:append>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </template>
                </v-list-item>
            </v-list>

            <v-text-field :loading="false" density="compact" label="Search or start a new chat"
                prepend-inner-icon="mdi-magnify" variant="solo-filled" class="p-3 text-sm" bg-color="rgb(22, 4, 44)"
                hide-details single-line></v-text-field>

            <section class="pl-1 pr-1 pb-3 " >
                <div class="text-white pb-3 pl-2 pr-2">
                    Messages {{ darkmode }}
                </div>
                <div class="scroller">
                    <v-list lines="one" bg-color="rgb(88, 18, 90)" active-color="white">
                        <v-list-item v-for="folder, index in people" :key="index" :subtitle="folder.subtitle"
                            :title="folder.title" :value="index" class="mb-4">

                            <template v-slot:prepend>
                                <v-avatar color="grey-lighten-1">
                                    <img src="../assets/account.jpg" alt="">
                                </v-avatar>
                            </template>

                            <template v-slot:append>
                                <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                                <div class="flex-container">
                                    <div class="time">5:56pm</div>
                                    <v-avatar color="green" size="18">
                                        <span style="font-size:13px">5</span>
                                    </v-avatar>
                                </div>
                            </template>
                        </v-list-item>
                    </v-list>
                </div>
            </section>
        </div>
        <div class="right">
            <div class="toolbar">
                <v-list lines="one" bg-color="white" class="border-b-2 border-blue-950">
                    <v-list-item v-for="folder in folders" :key="folder.title" subtitle="Typing..."
                        :title="folder.title" color="red">
                        <template v-slot:prepend>
                            <v-avatar color="grey-lighten-1">
                                <img src="../assets/account.jpg" alt="">
                            </v-avatar>
                        </template>

                        <template v-slot:append>
                            <v-icon>mdi-dots-vertical</v-icon>

                        </template>
                    </v-list-item>
                </v-list>
            </div>

            <div class="chatszone">
                <div class="message-controller " v-for="message in messages"  
                :class="{'justify-end' : message.who == 'you', 'justify-start': message.who=='them'}">
                    <div class="message bg-orange-500"  >
                        <div class="text">{{ message.message }}</div>
                        <div class="time">{{message.time}}</div>
                    </div>
                </div>
            </div>

            <div class="send-options">
                <div class="text-input">
                    <v-text-field :loading="false" density="comfortable" label="Type a message..."
                        prepend-inner-icon="mdi-attachment" variant="solo-filled" class="p-3 text-sm "
                        @click:prepend-inner="callThem"
                        bg-color="white"  hide-details single-line></v-text-field>
                </div>

                <v-btn class="btn" color="white" rounded="xl" density="default" size="large" elevation="5">
                    <v-icon size='18'>mdi-microphone-outline</v-icon>
                </v-btn>

                <v-btn class="btn" color="white" rounded="xl" density="default" size="large" elevation="5">
                    <v-icon size="18">mdi-send</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);

const loading = ref(false);
const folders = ref([
    {
        subtitle: 'My Account',
        title: 'Recipes',
    },
]);

const people = ref([
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
    {
        subtitle: 'Do you 2k in your account?',
        title: 'Tkay',
    },
]);

function callThem(){
    alert("called oh");
}

const messages = ref([
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "them"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "them"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "them"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    },
    {
        type: "text",
        time: "5:12pm",
        message: "how are you?",
        who: "you"
    }
])
</script>

<style scoped>
.main {
    background-color: rgb(88, 18, 90);
    height: var(--body-height);
    display: flex;
    padding: 0;
    padding-left: 10px;
}

.left {
    width: 26%;
    height: 100%;
    background-color: rgb(88, 18, 90);
    /*rgba(64, 46, 88, 1)*/
}

.right {
    width: 74%;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    background-color: white;
}

.scroller {
    height: 30%
}

.time {
    font-size: 12px;
    opacity: 0.7;
}

.flex-container {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    justify-content: center;
    align-items: center
}

.send-options {
    display: flex;
    align-items: center;
    background-color: white;
    column-gap: 1%;
}

.send-options .text-input {
    width: 88%;
}
.send-options button.btn{
    width: 5%;
}

.chatszone{
    display: grid;
    row-gap: 1%;
    padding: 3%;
    overflow-y: auto;
}
.message{
    width: fit-content
}
.message-controller{
    display: flex;
}

</style>