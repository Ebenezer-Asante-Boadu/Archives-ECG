// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify';
import { VIcon, VSlideGroup, VSlideGroupItem,VBtn, VSheet, VTooltip, VSwitch, VList, VListItem, VCardText, VCard, VTable,
  VAvatar, VTextField , VSelect, VDivider, VRow, VCol, VListSubheader} from 'vuetify/components';

export default createVuetify({
  components: {
    VRow,
    VCol,
    VListSubheader,
    VIcon,
    VSlideGroup,
    VSlideGroupItem,
    VBtn,
    VSheet,
    VTooltip,
    VSwitch,
    VList,
    VListItem,
    VAvatar,
    VTextField,
    VCardText,
    VCard,
    VTable,
    VSelect,
    VDivider
  }
}
)
