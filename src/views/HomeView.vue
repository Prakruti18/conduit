<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

import axios from "axios";

// import { ref, computed, watch, onBeforeMount, onMounted } from "@vue/composition-api";

const posts = ref([]);
const popular_tags = ref([]);
onMounted(() => {
  axios
    .get(`https://api.realworld.io/api/articles`)
    .then((response) => {
      posts.value = response.data.articles;
      console.log("123123123", response.data);
    })
    .catch((e) => {
      console.log(e);
    });

  axios
    .get(`https://api.realworld.io/api/tags`)
    .then((response) => {
      popular_tags.value = response.data.tags;
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

const router = useRouter();

const message = (arg) => {
  console.log("Slug Name", arg);
  router.push({
    name: "article",
    query: { slug: arg },
  });
  console.log("Hello World");
};

// const items = ref(["This", "is"]);
// const add = () => {
//   if (todo.value) {
//     items.value.push(todo.value);
//     todo.value = "";
//   }
// };
</script>

<template>
  <div class="wrapper">
    <div class="greetings">
      <h1>conduit</h1>
      <h3>A place to share your knowledge.</h3>
    </div>
  </div>

  <div class="article-container">
    <div class="tabs">
      <div class="tab">
        <input type="radio" id="tab-1" name="tab-group-1" checked />
        <label for="tab-1">Global Feed</label>

        <div class="content">
          <!-- <div> -->
          <div class="container" v-if="posts && posts.length">
            <div class="article-feed">
              <div class="article-preview" v-for="post of posts" :key="post">
                <div class="article-info">
                  <a class="img-link" href="#"
                    ><img src="../assets/demo-avatar.png"
                  /></a>
                  <div class="info">
                    <!-- <a href="#">{{ post.author.username }}</a> -->
                    <p class="author" @click="message(post.slug)">
                      {{ post.author.username }}
                    </p>
                    <p>{{ post.createdAt }}</p>
                  </div>
                  <button class="btn-count">{{ post.favoritesCount }}</button>
                </div>
                <div @click="message(post.slug)" class="post">
                  <h3 class="post-title">{{ post.title }}</h3>
                  <p class="post-desc">{{ post.description }}</p>
                  <span href="#">Read more... </span>

                  <p class="btn-tag" v-for="tag of post.tagList" :key="tag">
                    {{ tag }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="tag-data">
        <h4>Popular Tags</h4>
        <p class="popular-tags" v-for="pop_tag of popular_tags" :key="pop_tag">
          <a href="#">{{ pop_tag }}</a>
        </p>
      </div>

      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1150px;
  /* margin: 25px auto; */
  display: flex;
}
.article-feed {
  width: 80%;
  margin-right: 20px;
}
.sidebar {
  width: 20%;
  border-radius: 4px;
  margin: 100px 0;
}
.popular-tags {
  display: inline-block;
}
.tag-data h4 {
  font-size: 16px;
}
.popular-tags a {
  background: #818a91;
  color: white;
  border-radius: 10px;
  font-size: 13px;
  padding: 2px 5px 3px 5px;
  margin-right: 5px;
}
.tag-data {
  background: #f3f3f3;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
}
.article-preview {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 25px 0;
}
.article-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
.info a {
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
.btn-count {
  background: transparent;
  border: 1px solid #5cb85c;
  color: #5cb85c;
  border-radius: 3px;
  margin-right: 15px;
  padding: 5px 10px;
  margin-left: auto;
}
.btn-count:hover {
  background: #5cb85c;
  color: white;
}
.author {
  cursor: pointer;
  color: #5cb85c !important;
  font-size: 16px !important;
}
.post {
  color: inherit !important;
  cursor: pointer;
}
.post:hover {
  background: transparent;
}
.post span {
  color: #bbb;
  font-size: 13px;
}
.post-title {
  font-size: 28px;
}
.post-desc {
  color: #999;
  font-size: 16px;
  margin-bottom: 15px;
}
.btn-tag {
  float: right;
  border: 1px solid #ddd;
  color: #aaa;
  background: transparent;
  border-radius: 10px;
  margin-left: 5px;
  font-size: 13px;
  padding: 0 5px;
}

.wrapper {
  background: #5cb85c;
  color: white;
  padding: 30px 0;
}

h1 {
  font-weight: 500;
  font-size: 3.6rem;
  top: -10px;
}

h3 {
  font-size: 1.6rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.article-container {
  display: flex;
  width: 1150px;
  margin: 0 auto;
}
.tabs {
  width: 80%;
  position: relative;
  color: #666666;
  min-height: 188px;
  /* width: 410px; */
  clear: both;
  font-family: futura;
  font-size: 17px;
  margin: 100px 16px 100px 0;
}
.tab {
  float: left;
}
.tab label {
  padding: 10px 15px;
  color: #d0bdd9;
  line-height: 40px;
  margin-left: -1px;
  position: relative;
  /* font-weight: bold; */
  left: 1px;
}
.tab [type="radio"] {
  display: none;
}
.content {
  /* position: absolute; */
  /* top: 28px; */
  left: 0;
  right: 0;
  bottom: 0;
  /* padding: 20px; */
  border: 1px solid #fcfafd;
  border-radius: 15px;
  background: #ffffff;
}
[type="radio"]:checked ~ label {
  border-bottom: 2px solid #5cb85c;
  color: #5cb85c;
  z-index: 2;
}
[type="radio"]:checked ~ label ~ .content {
  /* z-index: 1; */
}
</style>
