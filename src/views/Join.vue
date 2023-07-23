
<template>
  <v-container fluid>
    <v-card class="mt-10">
        <v-card-title class="text-h5 mt-10 mx-10">
          회원 가입
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="성"
                  hide-details="auto"
                  v-model="lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="이름"
                  hide-details="auto"
                  v-model="firstName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="이메일"
                  hide-details="auto"
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="비밀 번호"
                  hide-details="auto"
                  v-model="password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="소속 회사"
                  hide-details="auto"
                  v-model="company"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn @click="join" color="blue">
                  가입
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  </v-container>
</template>



<script lang='ts'>
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  
  name: 'HomeView',
  emits: ["callToast"],

  data () {
    return {
      lastName:"",
      firstName:"",
      email:"",
      password:"",
      company:"",
    }
  },
  async created(){
  },
  mounted() {
  },
  watch:{
  },
  methods:{
    async join(){
      try {
        const url = process.env.VUE_APP_BACKEND_URL + "/join";
        console.log(url);
        const body = {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password,
          company: this.company,
        }
        await axios.post(url, body);      
        this.$router.push("/login");
      } catch {
        alert("error");
      }
    }
  }
    
})
</script>

<style scoped>    
</style>
