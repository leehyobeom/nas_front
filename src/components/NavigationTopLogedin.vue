<template>
  <v-card  class="h-100">
    <v-layout class="h-100"> 
      <v-app-bar
        color="blue"
        prominent
        height="10px"
      >
        <v-app-bar-nav-icon class="d-flex d-md-none" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon class="d-none d-md-flex">_blank</v-icon>
        <v-toolbar-title style="cursor: pointer" class = "text-h3 font-weight-black">HD</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="d-none d-md-flex">
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            @click="$router.push(`${item.path}`)"
            >
              {{ item.title }}
          </v-btn>
          <v-btn
            flat
            @click="deleteToken()"
          >
              로그아웃
          </v-btn>
          <v-icon>_blank</v-icon>
          <v-btn
              variant="elevated"
              color="white">
              FOLDER
          </v-btn>
          <v-icon>_blank</v-icon>
          <v-btn 
          variant="elevated"
          color="white">
            UPLOAD
          </v-btn>
          <v-icon>_blank</v-icon>
          <v-icon>_blank</v-icon>
        </v-toolbar-items>
      </v-app-bar>

      <v-navigation-drawer class="h-100"
        v-model="drawer"
        location="left"
        temporary
      >
      <v-list density="compact" nav
        v-for="item in menuItems"
        :key="item.title"
        >
        <v-btn
            flat
            :to="item.path">
            <v-icon>_blank</v-icon>
            {{ item.title }}
          </v-btn>
      </v-list>
      <v-list density="compact" nav>   
        <v-btn flat>
          FOLDER
        </v-btn>
        <v-btn flat>
          UPLOAD
        </v-btn>
      </v-list>
      <v-list density="compact" nav>   
      </v-list>
      </v-navigation-drawer>
      <v-main class="mt-16">
        <v-row>
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <router-view  :userinfo = "userinfo" :admin = "isAdmin()" @callToast="callToast" />
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-main>
    </v-layout>
  </v-card>
</template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCookies } from "vue3-cookies";

  import { useToast, POSITION } from "vue-toastification";
  const { cookies } = useCookies();
  const navTop = ref(null)
  export default defineComponent({
    name: 'NavigationTop',
    mounted(){
      this.getUserInfo();
      
    },
    methods:{
      getUserInfo(){
        try {
        const token = String(cookies.get("userInfo"));
        const jsonUserinfo = JSON.parse(token.replace("j:",""))
        if(jsonUserinfo){
          this.userinfo = jsonUserinfo
        }
        } catch (error) {
          if( process.env.VUE_APP_MODE === "DEV" ){
            console.log(error) 
          }
        }
      },
      callToast(type: "success" | "info" | "warning" | "error", message:string): void{
         this.toast[type](message, {
            position: POSITION.BOTTOM_RIGHT,
            timeout: 4000,
         });
         return
      },

      isAdmin(){
        return  process.env.VUE_APP_ADMIN_EMAIL === this.userinfo.email
      },

      deleteToken(){
        cookies.remove("userInfo", "/", process.env.VUE_APP_FRONT_COOKIE_PATH);
        cookies.remove("access_token", "/", process.env.VUE_APP_FRONT_COOKIE_PATH);
        window.location.href = process.env.VUE_APP_FRONT_URL + "/"
      }
    },
    data(){
      return {
        navTop,
        toast: useToast(),
        category:{
          enumValues:[{
            name:""
          }]
        },
        drawer: false,
        userinfo: {
          "company_name":"",
          "firstName":"",
          "lastName":"",
          "email":"",
        },
        menuItems: [
            { title: '내폴더', path: '/myFolder' },
            { title: '공유폴더', path: '/sharedFolder' },
            { title: '휴지통', path: '/trashFolder'},
        ],
      }
    },
  })
  </script>
  <style>
  /* .v-main{
    background-color: gray !important;
  } */
  </style>