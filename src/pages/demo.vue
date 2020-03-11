<template>
    <div class="demo-page"><v-mask :layerData="layerData" @close="closeHandle" @cancel="cancelHandle" @confirm="confirmHandle">内容区</v-mask></div>
</template>

<script>
export default {
    components: {
        vMask(resolve) {
            return require(['@/components/mask/mask.vue'], resolve);
        }
    },
    created() {
        let query = JSON.parse(JSON.stringify(this.$route.query));
        let page = parseInt(query.page);
        this.current_page = page;
    },
    mounted() {},
    data() {
        return {};
    },
    computed: {},
    watch: {
        '$route.query.page': function(newVal, oldVal) {
            // console.log(newVal)
            // console.log(oldVal)
        },
        '$route.query': function(newVal, oldVal) {
            console.log('oldVal' + oldVal.page);
            console.log('newVal' + newVal.page);
        },
        $route(to, from) {
            console.log(to.path, from.path);
            // to , from 分别表示从哪跳转到哪，都是一个对象
            // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
        }
    },
    methods: {
        // 关闭弹窗
        closeHandle() {
            console.log('点击关闭');
            this.layerData.isLayer = false;
        },
        // 确定弹窗
        confirmHandle() {
            console.log('点击确定');
        },
        // 取消弹窗
        cancelHandle() {
            console.log('点击取消');
            this.layerData.isLayer = false;
        },
        handleCurrentChange(page) {
            let query = JSON.parse(JSON.stringify(this.$route.query));
            query.page = page;
            this.$router.push({
                query: query
            });
        }
    }
};
</script>

<style></style>
