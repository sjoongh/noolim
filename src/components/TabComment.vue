<template>
  <div>
    <main id="app" class="pagebody">
      <nav>
        <ul class="sidenav__tabs">
          <li
            class="sidenav__tab"
            v-for="category in categories"
            v-bind:key="category.id"
            @click="selectedCategory = category"
            :class="{ 'active-tab': selectedCategory == category }"
          >
            {{ category }}
            <p class="sidenav__tab__info">
              {{ categoryCount(category).length - 1 }} Bookmarks
            </p>
          </li>
        </ul>
      </nav>
      <section class="rightsection">
        <ul>
          <li class="linkli__header">
            {{ selectedCategory }} ({{
              categoryCount(selectedCategory).length - 1
            }})
          </li>
          <li
            v-for="link in filteredLinks"
            v-bind:key="link.id"
            :class="{ current: selectedCategory == link.category }"
            class="linkli"
          >
            <p class="flexleft">{{ link.title }}</p>

            <a
              v-if="link.title != ''"
              @click="go(link.loca_no, link.title, link.content_no)"
              class="btn gobutton"
              >Go</a
            >

            <a
              v-if="link.title != ''"
              @click="deleteItem(link, link.content_no, link.title)"
              class="btn deletebutton"
              href="#"
              >Delete</a
            >
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { getBoard, getLike, deleteContent, deleteheart } from "../service";

export default {
  data() {
    return {
      links: [
        {
          title: "",
          category: "좋아요",
          loca_no: ""
        },
        {
          title: "",
          category: "고객센터",
          content_no: ""
        }
        // // {
        //   // title: "내가 쓴 댓글의 글 제목은 여기에",
        //   title: this.links.title,
        //   category: "좋아요",
        //   // url: "내가 쓴 내용은 여기에?"
        // },
      ],
      categories: [],
      selectedCategory: ""
    };
  },
  async created() {
    this.getCategories();
    this.selectedCategory = this.categories[0];
    var user_id = this.$store.state.account.user.userId;
    var test = await getBoard({ user_id });
    var test2 = await getLike({ user_id });
    for (let i = 0; i < test.data.length; i++) {
      test.data[i].category = "고객센터";
      this.links.push(test.data[i]);
    }
    console.log(this.links);
    for (let j = 0; j < test2.data.length; j++) {
      test2.data[j].category = "좋아요";
      this.links.push(test2.data[j]);
    }
  },
  computed: {
    filteredLinks() {
      return this.links.filter(link => {
        return link.category.match(this.selectedCategory);
      });
    }
  },
  methods: {
    getCategories() {
      let categoriesSet = new Set();
      console.log(categoriesSet);
      this.links.forEach(link => {
        categoriesSet.add(link.category);
      });
      this.categories = Array.from(categoriesSet);
    },
    categoryCount(category) {
      return this.links.filter(link => {
        return link.category.match(category);
      });
    },
    async deleteItem(link, content_no, title) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let index = this.links.indexOf(link);
        this.links.splice(index, 1);

        var user = this.$store.state.account.user.userId;
        if (content_no != null) {
          await deleteContent({ content_no });
        } else {
          await deleteheart({ user, title });
        }
      }
    },
    go(loca_no, title, content_no) {
      if (loca_no != null) {
        this.$router.push({
          name: "LocationDetail",
          query: {
            loca_no: loca_no,
            title: title
          }
        });
      } else if (content_no) {
        this.$router.push({
          path: `/board/free/detail/${content_no}`
        });
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
body {
  background-color: #e8e7e5;
  font-family: "Nanum Gothic", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.pagebody {
  display: flex;
  width: 100%;
  padding-right: 0;
}
a {
  text-decoration: none;
}
.btn {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9em;
  padding: 0.5em 1em;
  color: white;
  transition: all 200ms;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 2px;
  background-color: #7bc4c4;
}
.btn:hover {
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px white, 0px 0px 0px 3px #248b81;
}
.btn:active {
  background-color: #248b81;
}
/* Sidenav */
.sidenav__tabs {
  text-align: right;
  background-color: #7bc4c4;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
.sidenav__tab {
  align-self: flex-start;
  width: 100px;
  list-style-type: none;
  /*   border-bottom: 1px solid #ccc; */
  padding: 0.6em 0.4em 0.6em 0.8em;
  color: rgb(255, 255, 255);
  font-size: 1.1em;
  letter-spacing: 0;
  transition: all 300ms;
}
.sidenav__tab:hover {
  background-color: #248b81;
  cursor: pointer;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
.sidenav__tab__info {
  font-size: 0.65em;
  margin-top: 3px;
  color: rgb(255, 255, 255);
  font-style: italic;
  letter-spacing: 0;
}
.active-tab {
  background-color: #248b81;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
/* End Sidenav */
.rightsection {
  width: 100%;
  margin-left: 10px;
  background-color: white;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  border-radius: 2px;
}
.rightsection ul {
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
}
/* Styles for Link box li */
.linkli__header {
  background-color: #7bc4c4;
  color: white;
  padding: 0.7em;
  text-align: center;
  font-style: italic;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.linkli {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 1em;
  background-color: white;
}
.linkli:first-child {
  border-top: none;
}
.linkli:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.linkli__title {
  font-size: 1.2em;
  margin-bottom: 8px;
}
.linkli__url {
  font-style: italic;
  font-size: 0.8em;
  color: #777;
}
.flexleft {
  color: #333300;
  width: 100%;
  font-size: 18px;
  /* font-weight: bold; */
}
.deletebutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
.gobutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin-right: 10px;
}
/* End style for Link box li */
</style>
