/**
 * 名称：小程序日志打点初始化
 * 日期：2017-12-29
 * 描述：初始化日志打点的上报服务器，上报机制控制等
 */
import { Venylog } from 'framework'
import Config from 'configs';

//全局配置
Venylog.config({
  //上报服务器地址
  server: Config.VENYLOG
})