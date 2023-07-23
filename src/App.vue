<template>
  <v-app>
    <v-main>
      <NavigationTop v-if="!isLogin"></NavigationTop>
      <NavigationTopLogedin v-if="isLogin"></NavigationTopLogedin>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationTop from './components/NavigationTop.vue';
import NavigationTopLogedin from './components/NavigationTopLogedin.vue';

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
  name: 'App',
  components: {
    NavigationTop,
    NavigationTopLogedin
  },
  mounted(){
    const token = cookies.get("access_token");
    if (token) {
      this.isLogin = true;
    }else{
      this.$router.push("/");
    }
  },
  data(){
    return {
      isLogin: false,
    }
  },
})
</script>
<style>
</style>