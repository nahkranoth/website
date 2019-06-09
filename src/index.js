import Vue from "vue/dist/vue"
import router from './router'
import App from "./App.vue"
import './styling/app.css'

Vue.config.productionTip = false;

var instance = new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});

console.log("Init!");
console.log(instance);
