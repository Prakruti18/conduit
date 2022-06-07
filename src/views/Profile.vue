<script setup>
import ProfileHeader from "@/components/ProfileHeader.vue";
import { ref, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import axios from "axios";
const article = ref({});
onMounted(() => {
  // slug.value = route.query.slug;
  axios
    .get(`https://api.realworld.io/api/articles?author=Gerome`)
    .then((response) => {
      article.value = response.data.articles;
      // console.log("Author", response.data);
      console.log("Author..", response.data.articles);
      // console.log(article.value);
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
  // console.log("Hello World");
};


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
  <ProfileHeader />

  <div class="article-container">
    <div class="tabs">
      <div class="tab">
        <input type="radio" id="tab-1" name="tab-group-1" checked />
        <label for="tab-1">Articles</label>

        <div class="content">
          <div class="container" v-if="article && article.length">
            <div class="article-feed">
              <div class="article-preview" v-for="art of article" :key="art">
                <div class="article-info">
                  <a class="img-link" href="#"
                    ><img src="../assets/demo-avatar.png"
                  /></a>
                  <div class="info">
                    <p class="author" @click="author_name(art.author.username)">
                      {{ art.author.username }}
                    </p>
                    <p>{{ art.createdAt }}</p>
                  </div>
                  <button class="btn-count">{{ art.favoritesCount }}</button>
                </div>
                <div @click="message(art.slug)" class="post">
                  <h3 class="post-title">{{ art.title }}</h3>
                  <p class="post-desc">{{ art.description }}</p>
                  <span href="#">Read more... </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab">
        <input type="radio" id="tab-2" name="tab-group-1" />
        <label for="tab-2">Favorited</label>

        <div class="content">
          <div class="container">
            <div class="article-feed">No articles are here...yet.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 950px;

  /* display: flex; */
}
.article-feed {
  width: 100%;
  margin-right: 20px;
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
h1 {
  font-weight: 500;
  font-size: 3.6rem;
  top: -10px;
}

h3 {
  font-size: 1.6rem;
}
.article-container {
  display: flex;
  width: 950px;
  margin: 0 auto;
}
.tabs {
  /* width: 100%; */
  position: relative;
  color: #666666;
  /* min-height: 188px; */
  clear: both;
  font-family: futura;
  font-size: 17px;
  margin: 50px 0;
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
  left: 1px;
}
.tab [type="radio"] {
  display: none;
}
.content {
  position: absolute;
  top: 39px;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #fcfafd;
  border-radius: 15px;
  background: #ffffff;
  /* z-index: 0; */
  width: 950px;
}
[type="radio"]:checked ~ label {
  border-bottom: 2px solid #5cb85c;
  color: #5cb85c;
  z-index: 2;
}
[type="radio"]:checked ~ label ~ .content {
  z-index: 1;
}
[type="radio"]:checked ~ label ~ .article-feed {
  /* z-index: 1; */
  display: none;
}
</style>