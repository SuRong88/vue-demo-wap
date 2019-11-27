import Vue from "vue";
import VueRouter from "vue-router";
import Home from "pages/Home.vue";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
const routes = [{
		path: '/',
		redirect: '/index'
	},
	{
		name: 'Index',
		path: '/index',
		meta: {
			title: '首页'
		},
		component: resolve => require(['pages/Index.vue'], resolve)
	}, {
		path: "/",
		name: "Home",
		component: resolve => require(['@/pages/Home.vue'], resolve),
		children: []
	},
	{
		name: 'error',
		path: '/404',
		meta: {
			title: '404'
		},
		component: resolve => require(['pages/404.vue'], resolve)
	},
	{
		path: '*',
		redirect: '/404'
	}
];
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title || '清扬会务'
	next()
});
router.afterEach((to, from) => {
	window.scrollTo(0, 0)
});
export default router;
