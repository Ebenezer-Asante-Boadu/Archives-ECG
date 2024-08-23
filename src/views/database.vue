<template>
  <div class="flex flex-row h-screen w-[100%]">
    <div class="shadow-inner sidebar h-screen bg-[#FFFFFF] w-[15%] p-[2%] border-black border-r-4 pt-[5%]">
      <!-- Head Office -->
      <div class="text-lg font-bold mb-4 cursor-pointer"
        @click="selectHeadOffice"
        :class="{
          'bg-[#3162D4]' :main_selection === 'option1',
          'text-white': main_selection === 'option1',
          'pl-2' : main_selection === 'option1'
        }"
      >
        Head Office
      </div>
      <div v-if="main_selection === 'option1'">
        <div class="directorate ml-3 py-2 pl-3 mb-1 text-base rounded-lg cursor-pointer" 
          :class="{
            'text-[#5E83D5]': selectedDirectorate === directorate,
            'font-semibold': selectedDirectorate === directorate,
            'font-medium': selectedDirectorate !== directorate,
            'bg-[#E5EEFF]': selectedDirectorate === directorate,
            'text-gray-600': selectedDirectorate !== directorate
          }" 
          v-for="directorate in directorates" 
          :key="directorate"
          @click="selectDirectorate(directorate)"
        >
          {{ directorate }}
        </div>
      </div>

      <!-- Regions -->
      <div class="text-lg font-bold mb-4 cursor-pointer"
        @click="selectRegions"
        :class="{
          'bg-[#3162D4]' :main_selection === 'option2',
          'text-white': main_selection === 'option2',
          'pl-2' : main_selection === 'option2'
        }"
      >
        Regions
      </div>
      <div v-if="main_selection === 'option2'">
        <div class="region ml-3 py-2 pl-3 mb-1 text-base rounded-lg cursor-pointer" 
          :class="{
            'text-[#5E83D5]': selectedRegion === region,
            'font-semibold': selectedRegion === region,
            'font-medium': selectedRegion !== region,
            'bg-[#E5EEFF]': selectedRegion === region,
            'text-gray-600': selectedRegion !== region
          }" 
          v-for="region in regionals" 
          :key="region"
          @click="selectRegion(region)"
        >
          {{ region }}
        </div>
        <div v-if="selectedRegion"
          class="directorate ml-6 py-2 pl-3 mb-1 text-base rounded-lg cursor-pointer"
          :class="{
            'text-[#5E83D5]': selectedDirectorate === directorate,
            'font-semibold': selectedDirectorate === directorate,
            'font-medium': selectedDirectorate !== directorate,
            'bg-[#E5EEFF]': selectedDirectorate === directorate,
            'text-gray-600': selectedDirectorate !== directorate
          }"
          v-for="directorate in directorates"
          :key="directorate"
          @click="selectDirectorate(directorate)"
        >
          {{ directorate }}
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="h-screen w-[85%] bg-[#FBFCFD]">
      <div class="flex items-center w-[100%] justify-center h-fit">
        <div class="flex-grow-0 h-fit w-[100%]">
          <v-text-field color="primary" placeholder="Search..." hide-details single-line>
            <template v-slot:prepend-inner>
              <v-icon>mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </div>
      </div>

      <div class="flex flex-row justify-between px-[2%] py-[2%]">
        <div class="flex-grow-0 text-xl font-bold">Files Available</div>
        <button class="bg-[#3162D4] flex-grow-0 text-white text-sm py-3 px-3 rounded-lg">
          <v-icon>mdi-plus</v-icon>
          Add document
        </button>
      </div>

      <div class="p-[3%]">
        <v-data-table v-model="selected" :items="filteredItems" item-value="name" show-select></v-data-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const regionals = ["Ashanti Region", "Greater Accra Region", "Western Region", "Central Region", "Eastern Region"];
const directorates = ["PERSONAL", "AUDIT", "LEGAL", "MD", "HR", "TESHIE"];
const main_selection = ref("option1");
const selectedRegion = ref("Head Office");
const selectedDirectorate = ref(directorates[0]);
const selected = ref([]);
const items = ref([
  // Head Office
  { name: '📄 Project Plan', location: 'Head Office', directorate: 'PERSONAL', size: '1.2 MB', type: 'Document', lastModified: '2024-07-01' },
  { name: '📊 Sales Report', location: 'Head Office', directorate: 'AUDIT', size: '2.5 MB', type: 'Spreadsheet', lastModified: '2024-07-02' },
  { name: '📑 Meeting Minutes', location: 'Head Office', directorate: 'LEGAL', size: '800 KB', type: 'Document', lastModified: '2024-07-03' },
  { name: '📷 Product Photos', location: 'Head Office', directorate: 'MD', size: '3.2 MB', type: 'Image', lastModified: '2024-07-04' },
  { name: '📈 Marketing Analysis', location: 'Head Office', directorate: 'HR', size: '1.1 MB', type: 'Document', lastModified: '2024-07-05' },
  { name: '📦 Inventory List', location: 'Head Office', directorate: 'TESHIE', size: '1.9 MB', type: 'Spreadsheet', lastModified: '2024-07-06' },

  // Ashanti Region
  { name: '📄 Project Overview', location: 'Ashanti Region', directorate: 'PERSONAL', size: '1.4 MB', type: 'Document', lastModified: '2024-07-08' },
  { name: '📊 Financial Report', location: 'Ashanti Region', directorate: 'AUDIT', size: '2.8 MB', type: 'Spreadsheet', lastModified: '2024-07-09' },
  { name: '📑 Client Notes', location: 'Ashanti Region', directorate: 'LEGAL', size: '900 KB', type: 'Document', lastModified: '2024-07-10' },
  { name: '📷 Event Photos', location: 'Ashanti Region', directorate: 'MD', size: '4.0 MB', type: 'Image', lastModified: '2024-07-11' },
  { name: '📈 Budget Forecast', location: 'Ashanti Region', directorate: 'HR', size: '1.0 MB', type: 'Document', lastModified: '2024-07-12' },
  { name: '📦 Stock Levels', location: 'Ashanti Region', directorate: 'TESHIE', size: '1.7 MB', type: 'Spreadsheet', lastModified: '2024-07-13' },

  // Greater Accra Region
  { name: '📄 Proposal Draft', location: 'Greater Accra Region', directorate: 'PERSONAL', size: '1.3 MB', type: 'Document', lastModified: '2024-07-15' },
  { name: '📊 Annual Budget', location: 'Greater Accra Region', directorate: 'AUDIT', size: '3.0 MB', type: 'Spreadsheet', lastModified: '2024-07-16' },
  { name: '📑 Action Items', location: 'Greater Accra Region', directorate: 'LEGAL', size: '1.1 MB', type: 'Document', lastModified: '2024-07-17' },
  { name: '📷 Office Photos', location: 'Greater Accra Region', directorate: 'MD', size: '3.5 MB', type: 'Image', lastModified: '2024-07-18' },
  { name: '📈 Sales Forecast', location: 'Greater Accra Region', directorate: 'HR', size: '1.2 MB', type: 'Document', lastModified: '2024-07-19' },
  { name: '📦 Product Catalog', location: 'Greater Accra Region', directorate: 'TESHIE', size: '2.1 MB', type: 'Spreadsheet', lastModified: '2024-07-20' },

  // Western Region
  { name: '📄 Project Report', location: 'Western Region', directorate: 'PERSONAL', size: '1.5 MB', type: 'Document', lastModified: '2024-07-22' },
  { name: '📊 Financial Summary', location: 'Western Region', directorate: 'AUDIT', size: '2.7 MB', type: 'Spreadsheet', lastModified: '2024-07-23' },
  { name: '📑 Training Notes', location: 'Western Region', directorate: 'LEGAL', size: '800 KB', type: 'Document', lastModified: '2024-07-24' },
  { name: '📷 Site Photos', location: 'Western Region', directorate: 'MD', size: '3.8 MB', type: 'Image', lastModified: '2024-07-25' },
  { name: '📈 Growth Analysis', location: 'Western Region', directorate: 'HR', size: '1.0 MB', type: 'Document', lastModified: '2024-07-26' },
  { name: '📦 Distribution List', location: 'Western Region', directorate: 'TESHIE', size: '2.0 MB', type: 'Spreadsheet', lastModified: '2024-07-27' },

  // Central Region
  { name: '📄 Research Paper', location: 'Central Region', directorate: 'PERSONAL', size: '1.6 MB', type: 'Document', lastModified: '2024-07-29' },
  { name: '📊 Performance Report', location: 'Central Region', directorate: 'AUDIT', size: '2.6 MB', type: 'Spreadsheet', lastModified: '2024-07-30' },
  { name: '📑 Memo', location: 'Central Region', directorate: 'LEGAL', size: '700 KB', type: 'Document', lastModified: '2024-07-31' },
  { name: '📷 Workshop Photos', location: 'Central Region', directorate: 'MD', size: '4.1 MB', type: 'Image', lastModified: '2024-08-01' },
  { name: '📈 Strategy Plan', location: 'Central Region', directorate: 'HR', size: '1.3 MB', type: 'Document', lastModified: '2024-08-02' },
  { name: '📦 Supply Chain Data', location: 'Central Region', directorate: 'TESHIE', size: '1.8 MB', type: 'Spreadsheet', lastModified: '2024-08-03' },

  // Eastern Region
  { name: '📄 Study Report', location: 'Eastern Region', directorate: 'PERSONAL', size: '1.8 MB', type: 'Document', lastModified: '2024-08-04' },
  { name: '📊 Business Overview', location: 'Eastern Region', directorate: 'AUDIT', size: '2.9 MB', type: 'Spreadsheet', lastModified: '2024-08-05' },
  { name: '📑 Company Policies', location: 'Eastern Region', directorate: 'LEGAL', size: '600 KB', type: 'Document', lastModified: '2024-08-06' },
  { name: '📷 Design Samples', location: 'Eastern Region', directorate: 'MD', size: '3.9 MB', type: 'Image', lastModified: '2024-08-07' },
  { name: '📈 Market Trends', location: 'Eastern Region', directorate: 'HR', size: '1.4 MB', type: 'Document', lastModified: '2024-08-08' },
  { name: '📦 Production Data', location: 'Eastern Region', directorate: 'TESHIE', size: '2.2 MB', type: 'Spreadsheet', lastModified: '2024-08-09' },
])

// Methods to select head office and regions
const selectHeadOffice = () => {
  main_selection.value = 'option1';
  selectedRegion.value = "Head Office";
  selectedDirectorate.value = directorates[0]; // Default selection for head office
};

// Methods to select regions
const selectRegions = () => {
  main_selection.value = 'option2';
  selectedRegion.value = regionals[0]; // Default region selection
  selectedDirectorate.value = directorates[0]; // Default directorate selection
};

// Methods to select a region and directorate
const selectRegion = (region: string) => {
  selectedRegion.value = region;
  selectedDirectorate.value = directorates[0]; // Default directorate for the region
};

const selectDirectorate = (directorate: string) => {
  selectedDirectorate.value = directorate;
};

// Computed property to filter items based on selected region or directorate
const filteredItems = computed(() => {
  // Filter items based on location and directorate
  let filtered = items.value.filter(
    item =>
      item.location === selectedRegion.value &&
      item.directorate === selectedDirectorate.value
  );

  // Ensure at least 5 items are displayed
  while (filtered.length < 5) {
    filtered = filtered.concat(
      items.value.filter(item => item.location === selectedRegion.value).slice(0, 5 - filtered.length)
    );
  }

  return filtered;
});
</script>

<style scoped>
/* Add any specific styles you need here */
</style>
