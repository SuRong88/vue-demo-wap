Vue.config.productionTip = false; // vue 在启动时生成生产提示
Vue.config.silent = false; // vue生产环境提示
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import api from "api/index";//没引入也起效 原因未知
import request from "utils/request";
import formCheck from 'utils/formCheck';
import layout from 'utils/layout';
import errorCode from 'utils/errorCode';
import formatDate from 'utils/formatDate';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import Mint from 'mint-ui';

Vue.use(VueAwesomeSwiper);
Vue.use(Mint);
Vue.use(formCheck);
Vue.use(layout);
Vue.use(errorCode);

import 'mint-ui/lib/style.min.css';
import 'swiper/dist/css/swiper.css';
import "css/reset.css";
import "css/base.less";
import "css/layout.less";

// 日期格式化 <td>{{ item.create_time | formatDate('yyyy-MM-dd') }}</td>
Vue.filter('formatDate', formatDate);
window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// 测试 移动端弹窗
import Toast from './Toast';
Vue.use(Toast);
