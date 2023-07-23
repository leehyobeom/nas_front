import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Join from "@/views/Join.vue";
import Login from "@/views/Login.vue";
import SharedFolder from "@/views/SharedFolder.vue";
import TrashFolder from "@/views/TrashFolder.vue";
import MyFolder from "@/views/MyFolder.vue";

const routes = [
  {
    path: "/trashFolder",
    name: "TrashFolder",
    component: TrashFolder,
  },
  {
    path: "/sharedFolder",
    name: "SharedFolder",
    component: SharedFolder,
  },
  {
    path: "/myFolder",
    name: "MyFolder",
    component: MyFolder,
  },
  {
    path: "/join",
    name: "Join",
    component: Join,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;