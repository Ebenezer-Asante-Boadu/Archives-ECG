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

  // const serilizer = {
  //   serialize : JSON.stringify,
  //   deserialize : JSON.parse
  // };


  const propertiesToExclude = ["user",
    "userProfileFirebase",
    "sizeLimit",
    "baseUrl",
    "userphone",
    "categories",
    "categoryIcons",
    "categoryIconsObject"]
  // "user", "userphone", "isUserAuthenticated", "userDetail"];

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


// const itemsToClear = [
//   'app-main',
//   "dark_mode"
//   // `userManagement${import.meta.env.VITE_STORE_REACH}`,
//   // `orderHistory${import.meta.env.VITE_STORE_REACH}`,
//   // `categoryStorea${import.meta.env.VITE_STORE_REACH}`,
//   // `CartManagement${import.meta.env.VITE_STORE_REACH}`
// ];

// // Get all keys from localStorage
// const allKeys = Object.keys(localStorage);

// // Iterate through all keys
// allKeys.forEach((key) => {
//   // Check if the key is not in the itemsToClear array and does not start with "amplitude"
//   if (!itemsToClear.includes(key) && !key.startsWith("amplitude")) {
//     // Check if the key starts with "CartManagement"
//     if (key.startsWith("CartManagement")) {
//       // Retrieve the data associated with the key
//       const cartManagementData = localStorage.getItem(key);

//       // Store the data in the new CartManagement version
//       const newKey = `CartManagement${import.meta.env.VITE_STORE_REACH}`;
//       localStorage.setItem(newKey, cartManagementData || "");
//     }

//     // Remove the item from localStorage
//     localStorage.removeItem(key);
//   }
// });