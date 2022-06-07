<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";

const form = ref({
    user: {
    username: "",
    email: "",
    password: "",
  },
});
const submit = () => {
  axios
    .post(`https://api.realworld.io/api/users`, {
      user: {
        username: form.value.user.username,
        email: form.value.user.email,
        password: form.value.user.password,
      },
    })
    .then((response) => {
      console.log("Form Data", response.data.user);
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<template>
  <div class="content">
    <h1>Sign up</h1>
    <p class="center-text">
      <RouterLink to="/signin">Have an account?</RouterLink>
    </p>
    <div class="form-content">
      <form>
        <div class="form-field">
          <input type="text" v-model="form.user.username" placeholder="Your Name" />
        </div>
        <div class="form-field">
          <input type="text" v-model="form.user.email" placeholder="Email" />
        </div>
        <div class="form-field">
          <input
            type="password"
            v-model="form.user.password"
            placeholder="Password"
          />
        </div>
        <div class="form-field">
          <button @click.prevent="submit()">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 1280px;
  margin: 0 auto;
  text-align: center;
}
.center-text a {
  color: #5cb85c;
}
/* .content form {
  display: inline-grid;
  width: 50%;
} */
.content form input {
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 5px;
  border-color: rgba(0, 0, 0, 0.1);
  font-size: 1.25rem;
  width: 100%;
}
.form-field {
  width: 50%;
  margin: 0 auto;
}
.form-field:nth-child(4) {
  text-align: right;
}
.form-field button {
  padding: 15px 25px;
  background-color: #5cb85c;
  color: white;
  font-size: 20px;
  border: transparent;
  border-radius: 4px;
}
</style>
