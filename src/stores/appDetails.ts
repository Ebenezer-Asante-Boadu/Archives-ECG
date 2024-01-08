import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppDetails = defineStore('app-main', () => {
  const verified = ref(false);

  function setVerified(state:boolean){
    verified.value = state;
  }

  return {
    verified,
    setVerified
  }
})
