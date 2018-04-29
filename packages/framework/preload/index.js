/**
 * 名称：自定义预加载组件
 * 日期：2017-12-26
 * 描述：目前仅仅是包裹了wx的相关loading函数
 */

export default class Preload {

  /**
   * 打开一个loading效果
   * @param {String} title loading文案
   */
  static showLoading(title) {
    wx.showLoading({ title, icon: 'loading' })
    return this.hideLoading.bind(this);
  }

  /**
   * 关闭loading效果
   */
  static hideLoading() {
    wx.hideLoading();
  }

  /**
   * 显示一个toast消息提示
   * @param {String} title 要显示的文案
   * @param {String} image icon图标
   * @param {String} duration 提示的延迟时间，单位毫秒，默认：1500
   * @param {Boolean} mask 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  static showToast(title, image, duration, mask) {
    wx.showToast({ title, image, duration, mask });
    return this.hideToast.bind(this);
  }

  /**
   * 关闭toast消息提示
   */
  static hideToast() {
    return wx.hideToast();
  }
}