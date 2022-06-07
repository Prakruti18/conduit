<script setup>
import { ref, onMounted, computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import axios from "axios";
import getAllVar from "../demo";

const u_data = ref([]);
const router = useRouter();

onMounted(() => {
  axios
    .get(`https://api.realworld.io/api/user`, {
      headers: {
        Authorization:
          "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWtydXRpQGFzaHV0ZWMuY29tIiwidXNlcm5hbWUiOiJQcmFrcnV0aSBQYXRlbCIsImlhdCI6MTY1MzYzOTg3NSwiZXhwIjoxNjU4ODIzODc1fQ.oHVg4A6LpJpuAGTg-oSIYFqpmMUI_OGgRFyqbm327aY",
      },
    })
    .then((response) => {
      u_data.value = response.data.user;
      // console.log("User Data", response.data);
      console.log("User Data", response.data.user);
    })
    .catch((e) => {
      console.log(e);
    });
});

const logout = () => {
  router.push({
    name: "home",
  });
  getAllVar.loggedIn = false;
  console.log("Logout...", getAllVar.loggedIn);
};
</script>

<template>
  <div class="header">
    <RouterLink to="/">conduit</RouterLink>
    <ul>
      <!-- <li>Home</li> -->
      <li><RouterLink to="/">Home</RouterLink></li>
      <template v-if="getAllVar.loggedIn">
        <li><RouterLink to="/">Create Post</RouterLink></li>
        <li><RouterLink to="/">Settings</RouterLink></li>
        <li>
          <RouterLink to="/">{{ u_data.username }}</RouterLink>
        </li>
        <li @click="logout()">Logout</li>
      </template>
      <template v-if="!getAllVar.loggedIn">
        <li>
          <RouterLink to="/signup">Sign up</RouterLink>
        </li>
        <li>
          <RouterLink to="/signin">Sign in</RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<style>
.header {
  width: 1150px;
  margin: 0 auto;
  line-height: 1.5;
  padding: 15px 0;
}
.header a {
  color: #5cb85c;
  font-size: 25px;
}
.header ul li a {
  color: rgba(0, 0, 0, 0.3);
  font-size: 17px;
}
.header ul li a:hover {
  color: rgba(0, 0, 0, 0.6);
  background: none;
}
.header ul li a:active {
  color: rgba(0, 0, 0, 0.8);
}
</style>
