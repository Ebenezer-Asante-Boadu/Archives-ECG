<template>
  <div class="files-main flex flex-row">
    <div class="left p-3 w-3/12 flex-grow-1 flex flex-col" style=" height: 100%" :style="{
      backgroundColor: page_mode_dark ? 'var(--light-black)' : 'rgba(207, 207, 207, 0.173)'
    }">
      <div class="top flex justify-center items-center flex-col flex-grow-1 h-2/5 ">
        <div class="flex justify-center items-center flex-col flex-grow-1 ">
          <v-icon size="100" :color="page_mode_dark?'grey':'black'">mdi-account-circle </v-icon>
          <div class="name text-xl font-bold" :class="{'text-white':page_mode_dark, 'text-black':!page_mode_dark}">Philip Martin</div>
          <div class="title text-sm" :class="{'text-gray-300':page_mode_dark, 'text-black':!page_mode_dark}">Visual Designer</div>
        </div>
        <div class="entitlement flex justify-between pl-2 pr-2 items-center flex-grow-0 mt-4" style="width: 100%; ">
          <div class="left flex-grow-0 text-base "
            :class="{ 'text-white': page_mode_dark, 'text-black': !page_mode_dark, 'font-medium': page_mode_dark, 'font-bold': !page_mode_dark }">
            Recently Uploaded</div>
          <div class="right flex-grow-0 text-sm font-bold text-violet-800">See all</div>
        </div>
        <div style="width: 100%" class="mt-3">
          <v-text-field color="red" variant="solo" placeholder="Search for recent files..." type="text" density="compact"
            prepend-inner-icon="mdi-magnify" :bg-color="page_mode_dark ? 'black' : 'rgba(207, 207, 207, 0.173)'"
            @input="filterPeopleByTitle()"
            v-model="searchModelRecent" hide-details ></v-text-field>
        </div>
      </div>

      <div class="scroller w-100  h-3/5">
        <div class="flex justify-start items-center pl-4 gap-2 mt-2" v-if="people.length == 0">
          <div class="flex-grow-0 "><v-icon color="black">mdi-database-search-outline</v-icon></div>
          <div class="info text-black">Empty results...</div>
        </div>
        <v-list lines="one" :bg-color="page_mode_dark ? 'var(--light-black)' : 'rgba(207, 207, 207, 0.173)'"
          active-color="white">
          <v-list-item v-for="(folder, index) in people" :key="index" :subtitle="folder.subtitle" :title="folder.title"
            :value="index" class="mb-4 w-100" :base-color="page_mode_dark ? 'white' : 'black'"
            :color="page_mode_dark ? 'white' : 'black'">
            <template v-slot:prepend>
              <v-avatar :color="page_mode_dark ? 'black' : 'white'">
                <v-icon>mdi-file-cloud</v-icon>
              </v-avatar>
            </template>

            <template v-slot:append>
              <div class="flex-container">
                <div class="time">5:56pm</div>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <div class="right w-9/12  flex flex-col p-6" :class="{ 'bg-white': !page_mode_dark, 'bg-black': page_mode_dark }">
      <div class="right-top flex justify-between items-center flex-grow-0">
        <div class="flex items-center w-11/12 flex-grow-0 pr-5 justify-center">
          <v-text-field color="primary" variant="outlined" placeholder="Search for files..." type="text" density="compact"
            prepend-inner-icon="mdi-magnify" bg-color="rgba(207, 207, 207, 0.173)" v-model="searchModel"
            hide-details></v-text-field>
        </div>

        <div class="button-group flex w-1/12 items-center justify-center flex-grow-0">
          <button class="border-2 p-1 rounded-s-md"
            :class="{ 'bg-violet-600': !page_mode_dark, 'bg-gray-200': page_mode_dark }"
            @click="page_mode_dark = false">
            <v-icon size="20" :color="page_mode_dark ? 'black' : 'white'">mdi-weather-sunny</v-icon>
          </button>
          <button class=" p-1 rounded-e-md" :class="{ 'bg-violet-600': page_mode_dark, 'bg-gray-200': !page_mode_dark }"
            @click="page_mode_dark = true">
            <v-icon size="20" :color="!page_mode_dark ? 'black' : 'white'">mdi-weather-night</v-icon>
          </button>
        </div>
      </div>
      <div class="right-middle pt-3 flex flex-col flex-grow">
        <div class="middle-toolbar flex items-center justify-between flex-grow-0">
          <div class="middle-toolbar-title text-xl font-bold">Files</div>
          <div class="middle-toolbar-select flex flex-grow-0">
            <v-select label="Sort by:" density="compact" :items="sort_by()" variant="outlined" hide-details
              v-model="selected_sort"></v-select>
          </div>
        </div>
        <div class="middle-body flex-grow-1 pt-5 flex">
          <!-- <codepunterTable :striped="false" :items="items" :columns="columns" :clickable="true" :sort_by="''"/> -->
          <!-- <div style=" " class=" flex-grow-1 flex"> -->
          <!-- <v-card :max-height="'100%'"> -->
          <VaDataTable :items="items" :columns="columns" :striped="false" :clickable="true" :loading="false"
            :hide-default-header="false" :footer-clone="false" :sort-by="selected_sort" :filter="searchModel"
            :filter-method="customFilteringFn" @row:click="router.push('/faker')" @row:dblclick="router.push('/faker')" :selectable="false"
            @row:contextmenu="router.push('/faker')" :allow-footer-sorting="false" :animated="true" virtual-scroller hoverable
            sorting-order="asc" sticky-header @filtered="filteredCount = $event.items.length" :style="{
              '--va-data-table-thead-background': (page_mode_dark) ? 'black' : 'white',
              '--va-data-table-grid-tr-border': '10px solid white'
            }">

            <template #cell(actions)="{ rowIndex }">
              <VaButton preset="plain" icon="edit" />
              <!-- <VaButton preset="plain" icon="delete" class="ml-3" /> -->
            </template>
          </VaDataTable>
          <!-- </v-card> -->
          <!-- </div> -->
          <!-- <table class="bg-red-500">
                          <thead>
                              <tr>
                                  <td>col 1</td>
                                  <td>col 2</td>
                              </tr>
                          </thead>
                          <tbody>
                              <tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr><tr><td>a</td><td>b</td> </tr>
                              <tr><td>a</td><td>b</td> </tr>
                          </tbody>
                      </table> -->
          <!-- </v-card> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="right-bottom flex items-center justify-end flex-grow-0">
        <button class="add-file flex-grow-0 bg-violet-600 text-white rounded text-sm pt-2 pb-2 pl-4 pr-4">
          Add File
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
  defineAsyncComponent,
} from "vue";
import type { DataTableCell, DataTableFilterMethod } from "vuestic-ui";
import codepunterTable from "@/components/codepunterTable.vue";
import { useAppDetails } from "../stores/appDetails";
import { storeToRefs } from "pinia";
import router from "@/router";

const store = useAppDetails();
const { darkmode } = storeToRefs(store);
const page_mode_dark = ref(darkmode.value);

const people_original = ref([
  {
    subtitle: "Nov 6, 2006 at 3:30pm",
    title: "prepaids.xls",
  },
  {
    subtitle: "Nov 7, 2006 at 4:00pm",
    title: "engagements.xls",
  },
  {
    subtitle: "Nov 8, 2006 at 3:45pm",
    title: "tasks.xlsx",
  },
  {
    subtitle: "Nov 9, 2006 at 2:30pm",
    title: "reports.docx",
  },
  {
    subtitle: "Nov 10, 2006 at 3:15pm",
    title: "projects.pptx",
  },
  {
    subtitle: "Nov 11, 2006 at 4:20pm",
    title: "summaries.pdf",
  },
  {
    subtitle: "Nov 12, 2006 at 3:00pm",
    title: "surveys.xls",
  },
  {
    subtitle: "Nov 13, 2006 at 3:40pm",
    title: "analysis.xlsx",
  },
  {
    subtitle: "Nov 14, 2006 at 2:50pm",
    title: "budgets.xls",
  },
  {
    subtitle: "Nov 15, 2006 at 3:35pm",
    title: "plans.pptx",
  },
  {
    subtitle: "Nov 16, 2006 at 3:25pm",
    title: "presentations.pptx",
  },
]);


const people = ref([...people_original.value]);

const items = ref([
  {
    Name: "status_code.xls",
    Size: "5 MB",
    Uploaded: "Nov 6, 2023 at 12:10",
    Member: "Kojo Bill Gates"
  },
  {
    Name: "report.docx",
    Size: "10 MB",
    Uploaded: "Dec 12, 2023 at 09:30",
    Member: "Alice Johnson"
  },
  {
    Name: "presentation.pptx",
    Size: "8 MB",
    Uploaded: "Jan 15, 2024 at 14:45",
    Member: "John Smith"
  },
  {
    Name: "data.csv",
    Size: "3 MB",
    Uploaded: "Feb 22, 2024 at 17:20",
    Member: "Emma Brown"
  },
  {
    Name: "plan.pdf",
    Size: "2 MB",
    Uploaded: "Mar 30, 2024 at 10:00",
    Member: "Michael White"
  },
  {
    Name: "project.zip",
    Size: "15 MB",
    Uploaded: "Apr 8, 2024 at 08:55",
    Member: "Sophia Green"
  },
  {
    Name: "presentation.pdf",
    Size: "7 MB",
    Uploaded: "May 5, 2024 at 11:25",
    Member: "David Lee"
  },
  {
    Name: "task_list.xlsx",
    Size: "6 MB",
    Uploaded: "Jun 12, 2024 at 13:40",
    Member: "Olivia Taylor"
  },
  {
    Name: "survey_results.xls",
    Size: "4 MB",
    Uploaded: "Jul 18, 2024 at 16:15",
    Member: "Ethan Martinez"
  },
  {
    Name: "budget.xls",
    Size: "9 MB",
    Uploaded: "Aug 25, 2024 at 09:50",
    Member: "Ava Anderson"
  },
  {
    Name: "analysis.docx",
    Size: "12 MB",
    Uploaded: "Sep 3, 2024 at 14:30",
    Member: "Noah Wilson"
  },
  {
    Name: "proposal.pptx",
    Size: "11 MB",
    Uploaded: "Oct 11, 2024 at 10:20",
    Member: "Isabella Clark"
  },
  {
    Name: "summary.pdf",
    Size: "6 MB",
    Uploaded: "Nov 16, 2024 at 12:05",
    Member: "Liam Baker"
  },
  {
    Name: "task_report.xlsx",
    Size: "7 MB",
    Uploaded: "Dec 20, 2024 at 15:00",
    Member: "Mia Gonzalez"
  },
]);

const columns = ref([
  // { key: "id", sortable: true },
  { key: "Name", sortable: true },
  { key: "Size", sortable: true },
  { key: "Uploaded", sortable: true },
  { key: "Member", sortable: true },
  { key: "actions" },
]);

const sort_by = () =>
  columns.value.map(({ key, sortable }) => sortable && key).filter(Boolean);
const selected_sort = ref(sort_by()[0] || "");
const searchModel = ref("");
const searchModelRecent = ref("");
const filteredCount = ref(items.value.length);
const filterByFields = ref(sort_by());

const customFilteringFn = (source: any, cellData: DataTableCell) => {
  if (!searchModel.value) {
    return true;
  }

  if (filterByFields.value.length >= 1) {
    const searchInCurrentRow = filterByFields.value.some(
      (field) => cellData.column.key === field
    );
    if (!searchInCurrentRow) return false;
  }

  const filterRegex = new RegExp(searchModel.value, "i");

  return filterRegex.test(source);
};

function handleClick(event: any) {
  //   rowEventType = event.event.type;
  //   rowId = event.item.id;
  // alert(9)
  router.push("/faker")
}

function filterPeopleByTitle() {
  const searchTerm = searchModelRecent.value.toLowerCase(); // Assuming searchModelRecent is a ref

  if (!searchTerm.trim()) {
    // If search term is empty, reset people array with original data
    people.value = [...people_original.value];
    return;
  }

  const filteredPeople = people_original.value.filter(person => {
    return person.title.toLowerCase().includes(searchTerm);
  });

  if (filteredPeople.length === 0) {
    // If no matches found, make people array empty
    people.value = [];
    return;
  }

  // Rearrange the array based on the number of matches
  filteredPeople.sort((a, b) => {
    const aMatches = (a.title.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length;
    const bMatches = (b.title.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length;
    return bMatches - aMatches; // Sort in descending order of matches
  });

  // Update people array with filtered and rearranged array
  people.value = filteredPeople;
}

</script>

<style scoped>
.files-main {
  background-color: white;
  height: var(--body-height);
}

div.right {
  height: 100%;
}

.right-top,
.right-bottom {
  height: 10%;
}

.right-middle {
  height: 80%;
  max-height: 80%;
}

.fav-color {
  background-color: rgb(0, 0, 66);
}

.w-100 {
  width: 100%;
}

.scroller {
  overflow: auto;
}
</style>