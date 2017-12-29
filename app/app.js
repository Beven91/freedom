/**
 * 名称：微信小程序应用启动入口
 * 日期：2017-12-18
 * 描述：用于初始化应用全局配置，以及全局事件监听等
 */

App({
    globalData: {
    },
    onLaunch: function () {
        //网络层初始化
        require('./api/handlers/network.initialize');
        //日志打点初始化
        require('./api/handlers/venylog.initialize');
    },
    onError(e) {
        console.error(e);
    }
});
