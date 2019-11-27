<template>
	<div class="home">
		<v-header></v-header>
		<router-view></router-view>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import vHeader from "components/common/Header.vue"
	import vFooter from "components/common/Footer.vue"
	export default {
		components: {
			vHeader,
			vFooter
		},
		created() {

		},
		mounted() {

		},
		data() {
			return {
			};
		},
		computed: {},
		watch: {},
		methods: {
		}
	}
</script>

<style>
</style>
