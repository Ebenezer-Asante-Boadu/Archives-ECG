<template>
    <div class="main rounded-lg">
        <div class="left rounded-2xl">
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
                v-model="searchValue" hide-details single-line></v-text-field>

            <section class="pl-1 pr-1 pb-3 ">
                <div class="text-white pb-3 pl-2 pr-2">
                    Messages 
                </div>
                <div class="scroller">
                    <v-list lines="one" bg-color="rgb(88, 18, 90)" active-color="white" >
                        <v-list-item v-for="folder, index in people" :key="index"
                            :subtitle="folder.lastMessage ?? folder.email" :title="folder.name" :value="index" class="mb-4"
                            @click="handleClick(folder, index)">

                            <template v-slot:prepend>
                                <v-avatar color="grey-lighten-1" size="50">
                                    <img :src="folder.profile" alt="" v-if="folder.profile != null">
                                    <v-icon v-if="folder.profile == null">mdi-account-circle</v-icon>
                                </v-avatar>
                            </template>

                            <template v-slot:append>
                                <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                                <div class="flex-container" v-if="folder.lastMessage != null">
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
                    <v-list-item :subtitle="currentlySelectedUser?.email"
                        :title="currentlySelectedUser?.name" color="red">
                        <template v-slot:prepend>
                            <v-avatar color="grey-lighten-1">
                                <img :src="currentlySelectedUser.profile" alt="" v-if="currentlySelectedUser && currentlySelectedUser.profile != null">
                                <v-icon>mdi-account-circle</v-icon>
                            </v-avatar>
                        </template>

                        <template v-slot:append>
                            <v-icon>mdi-phone</v-icon>
                            <v-icon>mdi-video</v-icon>
                            <v-icon>mdi-information</v-icon>

                        </template>
                    </v-list-item>
                </v-list>
            </div>

            <div class="chatszone">
                <div class="message-controller " v-for="message in messages"
                    :class="{ 'justify-end': message.who == 'you', 'justify-start': message.who == 'them' }">
                    <div class="flex flex-row items-center gap-2" v-if="message.who == 'them'">
                        <v-avatar size="30">
                            <img src="../assets/account.jpg" alt="alt">
                        </v-avatar>
                        <div class="message bg-gray-200  h-fit pt-3 pb-1 px-3"
                            style="border-top-right-radius: 10px; border-bottom-left-radius:10px;  border-bottom-right-radius:10px">
                            <div class="text">{{ message.message }}</div>
                            <div class="time text-gray-600 text-sm">{{ message.time }}</div>
                        </div>
                    </div>


                    <div class="flex flex-row items-center gap-2" v-if="message.who == 'you'">
                        <div class="message nice-bg h-fit pt-3 pb-1 px-3"
                            style="border-top-left-radius: 10px; border-bottom-left-radius:10px;  border-bottom-right-radius:10px">
                            <div class="text text-white">{{ message.message }}</div>
                            <div class="time text-gray-100 text-sm">{{ message.time }}</div>
                        </div>
                        <v-avatar size="30">
                            <img src="../assets/account.jpg" alt="alt">
                        </v-avatar>
                    </div>
                </div>
            </div>

            <div class="send-options">
                <div class="text-input">
                    <v-text-field :loading="false" density="comfortable" label="Type a message..."
                        prepend-inner-icon="mdi-attachment" variant="solo-filled" class="p-3 text-sm "
                        @click:prepend-inner="callThem" bg-color="white" hide-details single-line></v-text-field>
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
import { ref, watch } from "vue";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";
import { searchUserByName } from "@/lib/firebase_chats_service";
import { type SearchedUser, type User } from "@/lib/types";

const searchValue = ref("");
const store = useAppDetails();
const { darkmode } = storeToRefs(store);
const currentlySelectedUser = ref<SearchedUser|undefined>();

const loading = ref(false);
const folders = ref([
    {
        subtitle: 'My Account',
        title: 'Recipes',
    },
]);

const people = ref<SearchedUser[]>([
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
    // {
    //     subtitle: 'Do you 2k in your account?',
    //     title: 'Tkay',
    // },
]);

let debounceTimeout: NodeJS.Timeout | null = null;

watch(searchValue, () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
        if (searchValue.value.trim() === "") {
            // Clear the people array when search value is empty
            people.value = [];
            return;
        }

        try {
            const searchedUsers = await searchUserByName(searchValue.value);
            people.value = searchedUsers.map((searchedUser: User) => ({
                ...searchedUser,
                lastMessage: null,
                lastMessageTime: null,
                unreadMessages: null
            }));

        } catch (err) {
            console.error(err);
        }
    }, 500); // Adjust the debounce delay as needed
});

const handleClick = (item: SearchedUser, index: number) => {
  console.log('Item clicked:', item);
  console.log('Item index:', index);
  currentlySelectedUser.value = item;
//   selectedItem.value = item;
};

function callThem() {
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

.send-options button.btn {
    width: 5%;
}

.chatszone {
    display: grid;
    row-gap: 1%;
    padding: 3%;
    overflow-y: auto;
}

.message-controller {
    display: flex;
}
</style>