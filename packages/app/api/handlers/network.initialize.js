/**
 * 名称：应用程序网络层初始化
 * 日期：2017-12-26
 * 描述：初始化网络层基础url以及loading等参数
 */
import { Network, Preload } from 'framework'
import Config from 'configs';

// 全局接口数据配置
Network.config({
  baseUri: Config.API,
  loading: Preload.hideLoading.bind(Preload)
})
// 全局接口异常提示
Network.on('error', (error) => {
  console.error(error);
  wx.showToast({ title: '哎呀，网络请求异常啦，请稍候再试试...' })
});