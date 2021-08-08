<template>
  <div class="home">
    <h1>
      {{ $store.state.name }} {{ $store.getters.combAge }}
      {{ $store.getters.combAge2 }}
      {{ $store.getters.paramAge(1, 2) }}
      {{ $store.state.info }}
    </h1>
    <button @click="testclick">btn</button>
    <button @click="testclick2">btn2</button>
    <button @click="testclick3">btn3</button>
    <button @click="testclick4">btn4</button>
    <button @click="testclick5">axios</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ADD_AGE, ADD_AGE_BY_PAYLOAD } from "../store/mutations-types";
import { ASYNC_ADD_AGE, ASYNC_ADD_AGE_2 } from "../store/actions-types";
import { request } from "../request";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {},
  methods: {
    testclick() {
      this.$store.commit(ADD_AGE);
    },
    testclick2() {
      this.$store.commit({ type: ADD_AGE_BY_PAYLOAD, num: 1, num2: 2 });
    },
    testclick3() {
      // this.$store.info ={ address:'zhuhai'}
      this.$store.info.address = "zhuhai";
    },
    testclick4() {
      this.$store.dispatch(ASYNC_ADD_AGE_2, { name: "zs" }).then(() => {
        console.log("异步修改成功");
      });
    },
    testclick5() {
      request({ url: "/get" }).then((res) => {
        console.log(res);
      });
      // var instance = axios.create({
      //   baseURL: "http://httpbin.org",
      //   // timeout: 1000,
      //   // headers: { "X-Custom-Header": "foobar" },
      // });
      // instance({url:'/get'}).then((res) => {
      //   console.log(res);
      // });

      // //1.基本用法
      // axios({
      //   url: "http://httpbin.org/post",
      //   method: "post",
      //   // params: { delay: 1 },//用get：参数
      //   // data: { delay: 1 },//用post的参数
      // }).then((res) => {
      //   console.log(res);
      // });
      // //2.get用法
      // axios.get("http://httpbin.org/get", { params: { ID: 1 } }).then((res) => {
      //   console.log(res);
      // });
      // //3.post用法
      // axios.post("http://httpbin.org/post", { ID: 1 }).then((res) => {
      //   console.log(res);
      // });
      // //4.等待all里面所有的异步完成后调用then（下面2个then用其中一种写法就可以）
      // axios
      //   .all([
      //     axios({ url: "http://httpbin.org/get" }),
      //     axios({ url: "http://httpbin.org/get" }),
      //   ])
      //   // .then((results) => {
      //   //   console.log(results[0], results[1]);
      //   // })
      //   .then(
      //     axios.spread((res1, res2) => {
      //       console.log(res1, res2);
      //     })
      //   );
    },
  },
};
</script>
