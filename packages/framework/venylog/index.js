/**
 * 名称：微信小程序打点工具
 * 日期:2017-12-29
 * 描述：基于小程序页面的图片组件发送打点日志
 */
import Network from '../network';
import { Type } from 'dantejs';

const network = new Network();
//打点配置
const Options = {
  server: ''
}
//属性映射
const OriginalMapper = {
  'veny-name':'name',
  'veny-event':'event',
  'event':'event',
  'name':'name',
  'veny-param':'param',
  'param':'param'
}

export default class Venylog {

  /**
   * 全局配置打点信息
   * @param config 配置对象 例如: 
   * {
   *   server:'' //发送的服务端地址
   * }
   */
  static config(config) {
    Object.assign(Options, config);
  }

  /**
   * Venylog构造函数
   * @param {Page} page 页面实例 
   * @param {String} name 打点页面名称
   */
  constructor(name) {
    this.pageName = name;
  }

  /**
   * 发送一条打点日志
   * @param {Object} record
   */
  sendBeancon(record) {
    if (record) {
      this.push(this.coloration(record));
    }
  }

  /**
   * 发送一个事件日志
   * @param {String} event 事件名称
   * @param {String} entry 附带的消息 
   */
  sendEventBeancon(event, entry) {
    return this.sendBeancon({ "event": event, "param": entry })
  }

  /**
   * 发送一条映射日志，通过属性名称，映射成打点日志对象
   * @param {Object} original 原始日志属性对象
   */
  sendOriginalBeancon(original) {
    if (Type.isNnObject(original)) {
      const record = {};
      Object
        .keys(original)
        .filter((k) => OriginalMapper[k])
        .map((k) => record[OriginalMapper[k]] = original[k]);
      this.sendBeancon(record);
    }
  }

  /**
   * 将日志推入发送队列
   * @param {String/Base64} log base64编码的日志数据
   */
  push(log) {
    const uri = Options.server + '?s=' + encodeURIComponent(log);
    network.get(uri);
  }

  /**
   * 渲染打点日志对象通用数据
   * @param {Object} record
   */
  coloration(record) {
    if (record) {
      const color = { page: this.pageName, "platform": "arthur" }
      const log = { ...record, ...color };
      return JSON.stringify(log);
    }
  }
}