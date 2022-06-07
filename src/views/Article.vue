<script setup>
import ArticleHeader from "@/components/ArticleHeader.vue";
import { ref, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const article = ref({});
const comment = ref({});
const slug = ref("");

onMounted(() => {
  slug.value = route.query.slug;

  axios
    .get(`https://api.realworld.io/api/articles/${slug.value}`)
    .then((response) => {
      article.value = response.data.article;
      console.log("Data", response.data.article);
    })
    .catch((e) => {
      console.log(e);
    });

  axios
    .get(`https://api.realworld.io/api/articles/${slug.value}/comments`)
    .then((response) => {
      comment.value = response.data.comments;
      console.log("Comments....", response.data.comments);
      console.log(".....", comment.value);
    })
    .catch((e) => {
      console.log(e);
    });
});


const router = useRouter();

const author_name = (arg) => {
  console.log("Author Name", arg);
  router.push({
    name: "profile",
    query: { arg },
  });
  // console.log("Hello World");
};


</script>

<template>
  <ArticleHeader />
  <div class="article-content">
    <!-- <div v-if="posts && posts.length"> -->
    <p>
      {{ article.body }}
      <!-- {{ $route.query.slug }} -->
    </p>
    <hr />
    <div class="container">
      <div class="article-info">
        <a class="img-link" href="#"><img src="../assets/demo-avatar.png" /></a>
        <div class="info">
          <p class="author" @click="author_name(article.author.username)">
            {{ article.author }}
          </p>
          <p>Create at {{ article.createdAt }}</p>
        </div>
        <button class="btn-follow">Follow</button>
        <button class="btn-post">
          Favorite Post {{ article.favoritesCount }}
        </button>
      </div>
    </div>
    <div class="article-container">
      <p>
        <a href="#">Sign in</a> or <a href="#">sign up</a> to add comments on
        this article.
      </p>
      <div class="message-box" v-for="com of comment" :key="com">
        <div class="message">
          {{ com.body }}
        </div>
        <div class="message-footer">
          <div class="article-info">
            <a class="img-link" href="#"
              ><img src="../assets/demo-avatar.png"
            /></a>
            <div class="info">
              <a href="#">{{ com.author.username }}</a>
              <p>{{ com.createdAt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.article-content {
  width: 1150px;
  margin: 0 auto;
}
.article-content p {
  font-size: 18px;
  margin: 25px 0 35px 0;
}
.container {
  width: 50%;
  margin: 25px auto;
}
.article-container {
  width: 70%;
  margin: 0 auto;
}
.article-container a {
  color: #5cb85c;
}
.article-container a:hover {
  color: #3d8b3d;
  text-decoration: underline;
  background: transparent;
}
.article-info {
  display: flex;
  align-items: center;
}
.img-link {
  display: flex;
  margin-right: 5px;
}
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
.author {
  color: #5cb85c;
}
.info a:hover {
  background: transparent;
  text-decoration: underline;
}
.info p {
  font-size: 13px;
  color: #bbb;
  margin: 0;
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
.message-box {
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-bottom: 15px;
}
.message {
  padding: 15px;
}
.message-footer {
  background: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  padding: 15px;
}
.message-footer .info a {
  margin-right: 5px;
}
.message-footer .info {
  display: inherit;
}
.message-footer .img-link img {
  height: 20px;
  width: 20px;
}
</style>
