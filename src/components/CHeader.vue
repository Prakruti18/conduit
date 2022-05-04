<script setup></script>

<template>
  <div class="header">
    <RouterLink to="/">conduit</RouterLink>
    <ul>
      <!-- <li>Home</li> -->
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/signup">Sign up</RouterLink></li>
      <li><RouterLink to="/signin">Sign in</RouterLink></li>
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
