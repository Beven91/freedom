/**
 * 名称：当前登录用户信息上下文
 * 日期: 2017-12-26
 * 描述：用于存储提供登录态信息
 */

//内部context
const context = {
};

export default class Profile {

  /**
   * 获取当前用户登录token
   */
  static get token() {
    return context.token;
  }

  /**
   * 设置当前登录用户token
   */
  static set token(value) {
    context.token = value;
  }

  /**
   * 获取登录态cookie
   */
  static get cookie() {
    return `token=${this.token};`;
  }

  /**
   * 判断当前用户是否已登录
   */
  static get isAuthPass() {
    return !!this.token;
  }
}