import moment from 'moment'
// 日期格式化
export default (Vue)=>{
    Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(dataStr).format(pattern)
        
    })
}