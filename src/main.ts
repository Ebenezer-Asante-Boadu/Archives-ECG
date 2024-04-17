import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import "./assets/main.css";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

loadFonts()
const pinia = createPinia();
pinia.use((context) => {
  const storeId = context.store.$id;



  const propertiesToExclude = [""]

  const serilizer = {
    serialize: (state: any) => {
      // Exclude specific properties from the state
      const filteredState = Object.fromEntries(
        Object.entries(state).filter(([key]) => !propertiesToExclude.includes(key))
      );
      return JSON.stringify(filteredState);
    },
    deserialize: (stateString: string) => {
      return JSON.parse(stateString);
    },
  };


  const storedStateString = window.localStorage.getItem(storeId);
  const storedState = storedStateString ? serilizer.deserialize(storedStateString) : null;

  if (storedState) {
    context.store.$patch(storedState);
  }

  context.store.$subscribe((mutation, state) => {
    console.log("State changed:", state); 
    // console.log(state)
    window.localStorage.setItem(storeId, serilizer.serialize(state))
  })
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(createVuestic())
  .mount('#app')

