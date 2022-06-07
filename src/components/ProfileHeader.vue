<script setup>
import { ref, onMounted } from "@vue/runtime-core";
// import { useRoute } from "vue-router";
import axios from "axios";

// const route = useRoute();
const article = ref({});

// const slug = ref("");

onMounted(() => {
  // slug.value = route.query.slug;
  axios
    .get(`https://api.realworld.io/api/articles?author=Gerome`)
    .then((response) => {
      article.value = response.data.articles;
      // console.log("Author", response.data);
      console.log("Author..", response.data.articles);
      // console.log("123132321132",article.value);
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<template>
  <div class="banner">
    <div class="article-info" v-for="post of posts" :key="post">
      <!-- <div class="article-info"> -->
      <a class="img-link" href="#"><img src="../assets/demo-avatar.png" /></a>
      <!-- <p>{{ art.author.image }}</p> -->
      <!-- <p class="author-name">{{ article }}</p> -->


      
    </div>
  </div>





</template>

<style scoped>
.banner {
  background: #f3f3f3;
  color: black;
  padding: 30px 0;
  text-align: center;
}
/* .banner-content {
  width: 1150px;
  margin: 0 auto;
} */
h1 {
  font-weight: 500;
  font-size: 3.6rem;
  top: -10px;
}
/* .article-info {
  display: flex;
  align-items: center;
} */
/* .img-link {
  display: flex;
  margin-right: 5px;
} */
.img-link:hover {
  background: transparent;
}
.img-link img {
  border-radius: 50%;
}
.info {
  margin-right: 20px;
  line-height: 16px;
}
.info a {
  color: white;
}
.info a:hover {
  background: transparent;
  text-decoration: underline;
}
.info p {
  font-size: 13px;
  color: #bbb;
}
.btn-follow {
  background: transparent;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 3px;
  margin-right: 15px;
  padding: 5px 10px;
}
.btn-follow:hover {
  background: #ccc;
  color: white;
}
.btn-post:hover {
  background: #5cb85c;
  color: white;
}
.btn-post {
  background: transparent;
  border: 1px solid #5cb85c;
  color: #5cb85c;
  border-radius: 3px;
  padding: 5px 10px;
}
</style>
