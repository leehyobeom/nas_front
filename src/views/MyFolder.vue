
<template>
  <v-container fluid>
    Path: {{ currentPath }}
  <v-row>
    <v-col cols="3" v-if="currentPath !== '/'"  @click="moveParentFolder()">
      <v-card rounded color="white">
          <v-responsive aspect-ratio="1">
            <v-card-title>
              ..
            </v-card-title>
            <v-card-text class="text-center white--text">
            </v-card-text>
            <v-card-actions class="justify-center white--text">
              Folder
            </v-card-actions>
          </v-responsive>
      </v-card>
    </v-col>
    <v-col cols="3" v-for="item in folderList" :key="item" @click="moveSubFolder(item)">
      <v-card rounded color="white">
          <v-responsive aspect-ratio="1">
            <v-card-title>
              {{ item }}
            </v-card-title>
            <v-card-text class="text-center white--text">
            </v-card-text>
            <v-card-actions class="justify-center white--text">
              Folder
            </v-card-actions>
          </v-responsive>
      </v-card>
    </v-col>
    <v-col cols="3" v-for="item in fileList" :key="item">
      <v-card rounded color="white">
          <v-responsive aspect-ratio="1">
            <v-card-title>
              {{ item }}
            </v-card-title>
            <v-card-text class="text-center white--text">
            </v-card-text>
            <v-card-actions class="justify-center white--text">
              File
            </v-card-actions>
          </v-responsive>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import axios from 'axios'
import { isArray } from '@apollo/client/cache/inmemory/helpers';
export default defineComponent({
  
  name: 'MyFolderView',
  emits: ["callToast"],
  props: {
    userinfo: {
        type: Object,
        default: () => {
          return {
            "email":"",
            "firstName":"",
            "lastName":"",
            "company_name":"",
          };
        },
   },
  },
  data () {
    return {
      currentPath: "/",
      fileList: [""],
      folderList: [""],
    }
  },
  async created(){
  },
  mounted() {
    this.getFilse();
  },
  watch:{
  },
  methods:{
    async moveParentFolder(){
      const pathArr = this.currentPath.split("/");
      pathArr.pop();
      pathArr.pop();
      this.currentPath = pathArr.join("/") + "/";
      await this.getFilse();
    },
    async moveSubFolder(path: string){
      this.currentPath = this.currentPath + path;
      await this.getFilse();
    },
    async getFilse(){
      try {
        const url = `${process.env.VUE_APP_BACKEND_URL}/file?path=${this.userinfo.email}${this.currentPath}`;
        const result = await axios.get(url);
        this.fileList = [];
        this.folderList = [];
        if(isArray(result.data)){
          result.data.forEach(element => {
              const str = element.Key.replace(`${this.userinfo.email}${this.currentPath}`, "")
              const num = (str.match(/\//g) || []).length
              const lastStr = element.Key.slice(-1);
              if(num === 1 && lastStr === "/"){
                this.folderList.push(str);
              }
              if(num === 0 && lastStr !== "/"){
                this.fileList = [str];
              }
            }
          );
        }
      } catch {
        alert("error");
      }
    }
  }
    
})
</script>

<style scoped>    


</style>
