<template>
    <div class="account_main flex flex-col p-12">
        <div >
            <div class="section_title nice-color text-xl font-bold flex-grow-0 mb-3">
                Account settings
            </div>

            <button class=" text-white p-1 rounded-md px-5 py-2 " style="background-color:rgb(88, 18, 90)">Update</button>
        </div>
        <div class="body flex flex-col flex-grow pt-5 overflow-y-auto">
            <div class="flex flex-col h-fit flex-grow-0 items-center justify-center">
                <div>
                    <v-icon size="130" color="gray" v-if="image == null">mdi-account-circle</v-icon>
                    <!-- <v-avatar icon="mdi-account-circle" size="130" v-if="image == null"></v-avatar> -->
                    <v-avatar :image="image" size="130" v-if="image != null"></v-avatar>
                </div>
                
                <div class="logout-section flex justify-center items-center px-15 py-4">
                    <button class=" text-white p-1 rounded-md px-5 py-3 " style="background-color:rgb(88, 18, 90)" @click="openDialog()">Change Image</button>
                </div>
            </div>

            <div class="username flex flex-row items-center justify-center h-fit flex-grow-0 gap-10">
                <span class="detail flex-grow-0 w-2/12">Username</span>
                <v-text-field bg-color="white"  :model-value="inputs.username.value" :rules="[rules.required]"></v-text-field>
            </div>

            <div class="useremail flex flex-row items-center justify-center h-fit flex-grow-0 gap-10">
                <span class="detail  flex-grow-0 w-2/12">Email</span>
                <v-text-field bg-color="white" :model-value="inputs.email.value" :rules="[rules.required, rules.email]" ></v-text-field>
            </div>

            <div class="useremail flex flex-row items-center justify-center h-fit flex-grow-0 gap-10">
                <span class="detail  flex-grow-0 w-2/12">Gender</span>
                <v-select  :items="['Male', 'Female']" variant="underlined" v-model="inputs.gender.value" :rules="[rules.required, rules.gender]"></v-select>
            </div>

            <div class="status flex flex-row items-center justify-center h-fit flex-grow-0 gap-10">
                <span class="detail  flex-grow-0 w-2/12">Status</span>
                <v-text-field bg-color="white" :model-value="inputs.status.value" :rules="[rules.required, rules.status]"></v-text-field>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const image = ref<string|null>(null);
    const inputs = ref({
    email: { value: "", valid: false, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    username: { value: "", valid: false,  },
    gender: {value:"Male", valid: false},
    status: {value: "Admin", valid:false}
});

async function openDialog(){
    const res = await window.main.openFileDialog();
    image.value = res? `data:image/jpg;base64,${res.base64Data}`: null;
    console.log(image.value);
}

const rules = {
    // Defining a validation rule named 'required'
    required: (value: any) => !!value || 'Please fill in the field!',
    email: (value: any) => {
        inputs.value.email.valid = inputs.value.email.pattern.test(value);
        return inputs.value.email.pattern.test(value) || "Invalid email format"
    },
    gender: (value: string) => {
        inputs.value.gender.valid = value.toLowerCase() == "male" || value.toLowerCase() == "female";
        return inputs.value.gender.valid || "Gender must be a 'Male' or 'Female'";
    },
    status: (value: string) => {
        inputs.value.status.valid = value.toLowerCase() == "admin" || value.toLowerCase() == "normal";
        return inputs.value.status.valid || "Status must be an Admin or normal";
    }
}

</script>

<style scoped>
.account_main {
    height: var(--body-height);
}
</style>