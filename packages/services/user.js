/**
 * 用户相关api
 */
import { Service } from 'framework';

class UserService extends Service {

  constructor() {
    super('user');
  }

  /**
   * 登录接口
   * @param {String} code 
   */
  login(code) {
    return this.post('login', { code });
  }
}

module.exports = new UserService();