<script setup lang="ts">
import { watchEffect, defineAsyncComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';
import { useAppDetails } from './stores/appDetails';
import { storeToRefs } from 'pinia';

const navbar = defineAsyncComponent(()=>import("./components/navbar.vue"))
const store = useAppDetails();
const {authenticated} = storeToRefs(store);
const isNormalState = ref(false)

const sidebar = defineAsyncComponent(()=>import("./components/sidebar.vue"))
watchEffect(()=>{
  isNormalState.value = (router.currentRoute.value.name as string) !== 'home' && (router.currentRoute.value.name as string) !== 'app-auth';
  if(router.currentRoute.value.meta.requiresAuth && !authenticated.value){
    alert(authenticated.value)
    router.push("/app-auth")
  }
})
</script>
<template>
  
  <div class="main">
    <div class="sidebar"  :style="{width: isNormalState? '4.5%':'0'}">
      <sidebar v-if="isNormalState"/>
    </div>
    <div class="router-view" :style="{width: isNormalState? '95.5%':'100%'}">
      <navbar v-if="isNormalState"/>
      <div class="custom-scrollj">
        <router-view v-slot="{ Component }">
          <transition name="slide-left">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main{
  height: 100vh;
  overflow: scroll;
  display: flex;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}


.main::-webkit-scrollbar{
  display: none;
}
</style>
