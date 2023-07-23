
<template>
  <v-container fluid>
    <v-card class="mt-10">
        <v-card-title class="text-h5 mt-10 mx-10">
          로그인
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field
                  label="이메일"
                  hide-details="auto"
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="비밀 번호"
                  hide-details="auto"
                  v-model="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn @click="login" color="blue">
                  로그인
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  </v-container>
</template>



<script lang='ts'>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  
  name: 'HomeView',
  emits: ["callToast"],

  data () {
    return {
      email:"",
      password:"",
    }
  },
  async created(){
  },
  mounted() {
  },
  watch:{
  },
  methods:{
    async login(){
      try {
        const url = process.env.VUE_APP_BACKEND_URL + "/login";
        const body = {
          username: this.email,
          password: this.password,
        }
        await axios.post(url, body, {withCredentials: true});   
        window.location.href = process.env.VUE_APP_FRONT_URL + "/myFolder";  
      } catch {
        alert("error");
      }
    }
  }
    
})
</script>

<style scoped>    
</style>
