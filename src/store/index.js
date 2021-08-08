import { createStore } from 'vuex'
//导入mutations下面的常量方法名
import * as mutationsTypes from './mutations-types'
//导入actions下面的常量方法名
import * as actionsTypes from './actions-types'

export default createStore({
  state: { //调用 $store.state.属性
    name: '张三',
    age: 18,
    info: {}
  },
  //同步的操作修改的方法放这里
  mutations: {
    //0：开发时建议使用常量定义方法名
    //0.1：this.$store.commit(ADD_AGE) //提交常量要导入：import {ADD_AGE} from '../store/mutations-types'
    //0.2：下面的2和3都可以改成常量的方式定义方法名
    [mutationsTypes.ADD_AGE](state) { //当前定义等于1里面的定义
      state.age++
    },
    //1：$store.commit("方法名") 
    // addAge(state) {
    //   state.age++
    // },
    //2: $store.commit("方法名","num的参数")
    addAgeByParams(state, num) {
      state.age += num
    },
    //3：this.$store.commit({ type: "addAgeByPayload", num: 1, num2: 2 })
    addAgeByPayload(state, payload) { //这里payLoad等于commit对象：{ type: "addAgeByPayload", num: 1, num2: 2 }
      state.age += payload.num
    }
  },
  //异步的操作修改的方法放这里：常量在actions-types.js里面定义
  actions: {
    //1：$store.dispatch(ASYNC_ADD_AGE, { name: "zs" })
    [actionsTypes.ASYNC_ADD_AGE](context, payload) { //这里payLoad等于外面传过来的参数：{ name: "zs" }
      setTimeout(() => { //模拟异步
        context.commit(mutationsTypes.ADD_AGE) //调用mutations方法更新
      }, 1000);
    },
    //2：异步修改完后通知外面修改完了
    //调用：$store.dispatch(ASYNC_ADD_AGE, { name: "zs" }).then(() => { console.log("异步修改成功"); })
    [actionsTypes.ASYNC_ADD_AGE_2](context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => { //模拟异步
          context.commit(mutationsTypes.ADD_AGE) //调用mutations方法更新
          resolve()
        }, 2000);
      })
    }
  },
  //这个属性类似于computed
  getters: { //调用 $store.getters.方法 
    combAge(state) { //基础
      return state.age + '岁'
    },
    combAge2(state, getters) { //调用另一个getters
      return '我今年' + getters.combAge
    },
    paramAge(state) { //带参数调用：$store.getters.paramAge(1,2)
      //这里返回一个函数就可以带参数了
      return (p1, p2) => state.age + p1 + p2
    }
  },
  //定义模块
  modules: {
    admin:{ //定义admin模块：模块下面的vuex方法
      state:{name:'李四'}, //$store.state.admin.属性
      //mutations，actions，getters都会先找主参数里面的方法名，如果找不到就找模块下面的
      mutations:{}, //$store.commit('方法名')
      actions:{}, //$store.dispatch('方法名')
      getters:{} //$store.getters.方法(state,getters,rootState) //rootState获取根目录的state
    }
  }
})
