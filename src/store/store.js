/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import api from "./api"
import axios from "axios"
Vue.use(Vuex)

import moduleTodo from './todo/moduleTodo.js'
import moduleCalendar from './calendar/moduleCalendar.js'
import moduleChat from './chat/moduleChat.js'
import moduleEmail from './email/moduleEmail.js'
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'

const url = "http://127.0.0.1:2030";
var http = axios.create({
  baseURL: url
});
Vue.use(api, {
  http
});
export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        todo: moduleTodo,
        calendar: moduleCalendar,
        chat: moduleChat,
        email: moduleEmail,
        auth: moduleAuth,
        eCommerce: moduleECommerce,
    },
    strict: process.env.NODE_ENV !== 'production'
})
