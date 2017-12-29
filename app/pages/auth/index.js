/**
 * 名称：静默授权页面
 * 日期：2017-12-26
 * 描述：用于进行登录过度，如果当前小程序已登录，则直接跳转到index页面
 */
//依赖导入>>
import { AppPage, Profile } from 'framework';

class AuthScreen extends AppPage {

    onLoad() {
        this.showLoading('登录中');
        if (!Profile.isAuthPass) {
            //初始化用户授权
            this.onAuthUser();
        } else {
            this.onAuthUserSucess();
        }
    }

    /**
     * 初始化登录
     */
    onAuthUser() {
        this.requestAuthCode()
            .then(this.requestLogin.bind(this))
            .then(this.onAuthUserSucess.bind(this))
            .catch(this.onAuthUserFail.bind(this))
    }

    /**
     * 用户登录失败
     */
    onAuthUserFail(data) {
        console.error(data);
    }

    /**
     * 用户登录成功
     */
    onAuthUserSucess(data) {
        this.hideLoading();
        this.redirectTo('/pages/index/index');
    }

    /**
     * 调用服务端接口进行登录授权
     */
    requestLogin(data) {
        return this.Services.User.login(data.code);
    }

    /**
     * 获取当前登录用户code
     */
    requestAuthCode() {
        return new Promise((resolve, reject) => wx.login({ success: resolve, fail: reject }));
    }
}

module.exports = new AuthScreen();