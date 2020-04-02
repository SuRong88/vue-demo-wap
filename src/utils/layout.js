import md5 from 'md5'; // 若需要md5密码
import moment from 'moment'; // 若需要处理日期
import {
    Toast,
    Indicator,
    MessageBox
} from 'mint-ui';
export default {
    install: function(Vue) {
        // 错误提示
        Vue.prototype.errorToast = function(msg, duration = 2000) {
            if (msg) {
                Toast({
                    message: msg,
                    duration: duration
                });
            }
        };
        
        // 成功提示
        Vue.prototype.successToast = function(msg, duration = 2000) {
            if (msg) {
                Toast({
                    message: msg,
                    duration: duration
                });
            }
        };
        
        // 弹窗
        Vue.prototype.wDialog = function(title, msg, showCancel, cancelText, confirmText, cb_yes, cb_no) {
            MessageBox({
                title: title,
                message: msg,
                showCancelButton: showCancel,
                cancelButtonText: cancelText,
                confirmButtonText: confirmText,
                closeOnClickModal: false
            }).then(function(Promise) {
                if (Promise == 'confirm') {
                    cb_yes && cb_yes();
                } else {
                    cb_no && cb_no();
                }
            });
        };
        
        // 显示loading
        Vue.prototype.loading = function(text = '') {
            Indicator.open({
                text: text,
                spinnerType: 'fading-circle'
            });
        };
        
        // 隐藏loading
        Vue.prototype.loadEnd = function() {
            Indicator.close();
        };
        
        // input失去焦点(垂直滚动1px的距离然后再滚回来回来的位置)
        Vue.prototype.wInputBlur = function() {
            let currentPosition = '';
            let distance = 1;
            setTimeout(function() {
                currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                currentPosition -= distance;
                window.scrollTo(0, currentPosition);
                currentPosition += distance;
                window.scrollTo(0, currentPosition);
            }, 100);
        };
        
        // 在mounted生命周期中调用，专门在不会新增输入框的页面使用
        Vue.prototype.inputBlur = function() {
            for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
                document.getElementsByTagName('input')[i].addEventListener('blur', this.wInputBlur);
            }
            for (var i = 0; i < document.getElementsByTagName('textarea').length; i++) {
                document.getElementsByTagName('textarea')[i].addEventListener('blur', this.wInputBlur);
            }
        };
        
        // 指定滚动条位置
        Vue.prototype.wSetScroll = function(left, top) {
            window.scrollTo(left, top);
        };
        
        // 修改title
        Vue.prototype.changeTitle = function(text) {
            // 判断浏览器
            let userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('alipay') > 0) {
                ap.setNavigationBar({
                    title: text,
                    reset: true
                });
            } else {
                document.title = text;
            }
        };
        
        // 关闭页面
        Vue.prototype.closeWin = function() {
            // 判断浏览器
            let userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('alipay') > 0) {
                AlipayJSBridge.call('closeWebview');
                return false;
            }
            if (Vue.prototype.isWeixin()) {
                WeixinJSBridge.call('closeWindow');
                return false;
            }
            window.close();
        };
        
        // 判断是否微信浏览器
        Vue.prototype.isWeixin = function() {
            let ua = navigator.userAgent.toLowerCase();
            let res = ua.indexOf('micromessenger') != -1;
            return res;
        };
        
        // md5加密
        Vue.prototype.md5 = function(text) {
            return md5(text);
        };
        
        // 日期格式化
        Vue.prototype.format = function(time, pattern = 'YYYY-MM-DD HH:mm:ss') {
            return moment(time).format(pattern);
        };
        
        // textarea格式转换
        Vue.prototype.textFormat = function(str) {
            if (str) {
                return str.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
            } else {
                return '';
            }

        };

        // 获取富文本编辑器纯文字
        Vue.prototype.getEditorText = function(html) {
            if (!html) {
                return "";
            }
            html = html.replace(/(\n)/g, "");
            html = html.replace(/(\t)/g, "");
            html = html.replace(/(\r)/g, "");
            html = html.replace(/<\/?[^>]*>/g, "");
            // html = html.replace(/\s*/g, "");
            return html;

        };

        // 判断页面是否滚动到底部
        Vue.prototype.scrollBottom = function(cb) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight == scrollHeight) {
                cb && cb();
            }
        };
    }
};
