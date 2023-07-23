
<template>
  <v-container fluid>
    shared folder
  </v-container>
</template>



<script lang='ts'>
import { defineComponent } from 'vue'
// import { useCookies } from "vue3-cookies";
// const { cookies } = useCookies();

export default defineComponent({
  
  name: 'MyFolderView',
  emits: ["callToast"],

  data () {
    return {

    }
  },
  async created(){
  },
  mounted() {
  },
  watch:{
  },
  methods:{
    
  }
    
})
</script>

<style scoped>    
</style>
