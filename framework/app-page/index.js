

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('./../../third_modules/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('./../../third_modules/babel-runtime/helpers/toConsumableArray.js');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _ownKeys = require('./../../third_modules/babel-runtime/core-js/reflect/own-keys.js');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _classCallCheck2 = require('./../../third_modules/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../../third_modules/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _venylog = require('./../venylog/index.js');

var _venylog2 = _interopRequireDefault(_venylog);

var _preload = require('./../preload/index.js');

var _preload2 = _interopRequireDefault(_preload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 名称：微信小程序页面基础类
 * 日期：2017-12-24
 * 描述：修改微信小程序Page函数定义页面方式，改为class方式，
 *      例如:  Page({ ...}) 改为  class UserPage extends Page { ...}
 *      同时提供基础行为函数等
 */

// 依赖导入>>
var blackList = ["lock", "_lock", "unlock", "_unlock", "constructor", "setData"];

var AppPage = function () {

  /**
   * 基础页面组件构造函数
   * @param {String} name 页面名称，可用作打点页面名称
   */
  function AppPage(name) {
    (0, _classCallCheck3.default)(this, AppPage);

    //定义函数锁
    Object.defineProperty(this, '__locked', { writable: false, value: [] });
    //锁定指定函数
    Object.defineProperty(this, '_lock', { writable: false, value: lockFunction });
    //解锁指定函数
    Object.defineProperty(this, '_unlock', { writable: false, value: unLockFunction });
    //注册微信小程序页面
    registerAppPage(this, this.getInitialState(), name);
  }

  /**
   * 锁定当前页面实例指定函数
   * @param {Function} handler 要锁定的函数 注意：该函数必须为当前页面类定义的函数
   * @example  this.lock(this.submit)
   */


  (0, _createClass3.default)(AppPage, [{
    key: 'lock',
    value: function lock(handler) {
      return this._lock(handler);
    }

    /**
     * 解锁指定函数
     * @param {Function} handler 要锁定的函数 注意：该函数必须为当前页面类定义的函数
     * @example  this.unlock(this.submit)
     */

  }, {
    key: 'unlock',
    value: function unlock(handler) {
      return this._unlock(handler);
    }

    /**
     * 小程序页面生命周期函数--监听页面加载
     * @param {*} options 
     */

  }, {
    key: 'onLoad',
    value: function onLoad(options) {}

    /**
     * 小程序页面生命周期函数--监听页面初次渲染完成
     */

  }, {
    key: 'onReady',
    value: function onReady() {}

    /** 
     * 小程序页面生命周期函数--监听页面显示
     */

  }, {
    key: 'onShow',
    value: function onShow() {}

    /**
     * 小程序页面生命周期函数--监听页面隐藏
     */

  }, {
    key: 'onHide',
    value: function onHide() {}

    /**
     * 小程序页面生命周期函数--监听页面卸载
     */

  }, {
    key: 'onUnload',
    value: function onUnload() {}

    /**
     * 小程序页面页面相关事件处理函数--监听用户下拉动作
     */

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {}

    /**
     * 小程序页面页面上拉触底事件的处理函数
     */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {}

    /**
     * 小程序页面用户点击右上角转发
     */

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {}

    /**
     * 小程序页面页面滚动触发事件的处理函数
     */

  }, {
    key: 'onPageScroll',
    value: function onPageScroll() {}

    /**
     * 获取页面初始数据
     */

  }, {
    key: 'getInitialState',
    value: function getInitialState() {}

    /**
     * tap事件打点
     * 仅需要元素上配置如下属性
     * <view data-veny-name="事件名称" data-veny-param="参数" ></view>
     */

  }, {
    key: 'onVenylogBeancon',
    value: function onVenylogBeancon(context) {
      var target = context.target;
      //发送打点日志
      this.venylog.sendOriginalBeancon(target.dataset);
    }

    /**
     * 发送一条打点日志
     * @param {Object} record
     */

  }, {
    key: 'sendBeancon',
    value: function sendBeancon(record) {
      this.venylog.sendOriginalBeancon(record);
    }

    /**
     * 发送一个事件日志
     * @param {String} event 事件名称
     * @param {String} entry 附带的消息 
     */

  }, {
    key: 'sendEventBeancon',
    value: function sendEventBeancon(event, entry) {
      this.venylog.sendEventBeancon(event, entry);
    }

    /**
     * 显示loading效果
     * @param {String} title 标题
     */

  }, {
    key: 'showLoading',
    value: function showLoading(title) {
      return _preload2.default.showLoading(title || '请稍后...');
    }

    /**
     * 关闭loading效果
     */

  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      return _preload2.default.hideLoading();
    }

    /**
     * 显示一个toast消息提示
     * @param {String} title 要显示的文案
     * @param {String} image icon图标
     * @param {String} duration 提示的延迟时间，单位毫秒，默认：1500
     * @param {Boolean} mask 是否显示透明蒙层，防止触摸穿透，默认：false
     */

  }, {
    key: 'showToast',
    value: function showToast(title, image, duration, mask) {
      return _preload2.default.showToast.apply(_preload2.default, arguments);
    }

    /**
     * 关闭toast消息提示
     */

  }, {
    key: 'hideToast',
    value: function hideToast() {
      return _preload2.default.hideToast();
    }

    /**
     * 关闭当前页面，跳转到应用内的某个页面。
     * @param {String} url 要跳转到的页面 例如: pages/index/index
     */

  }, {
    key: 'redirectTo',
    value: function redirectTo(url) {
      return wx.redirectTo({ url: url });
    }

    /**
     * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
     * @param {String} url 要跳转到的页面 例如: pages/index/index
     */

  }, {
    key: 'navigateTo',
    value: function navigateTo(url) {
      return wx.navigateTo({ url: url });
    }

    /**
     * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
     * @param {Number} delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
     */

  }, {
    key: 'navigateBack',
    value: function navigateBack(delta) {
      return wx.navigateBack({ delta: delta });
    }

    /**
     * 设置数据函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
     * @param {Object} data 这次要改变的数据
     * @param {Function} callback 回调函数，在修改完数据后的回调函数
     */

  }, {
    key: 'setData',
    value: function setData(data, callback) {
      //具体会被page.setData覆盖 你可以搜索下registerAppPage函数看下覆盖位置
    }
  }]);
  return AppPage;
}();

/**
 * 注册指定实例成为微信小程序页面
 */


exports.default = AppPage;
function registerAppPage(instance, data, name) {
  var reflectKeys = function reflectKeys(a) {
    return (0, _ownKeys2.default)(a);
  };
  var proto = instance.__proto__;
  var ownKeys = [].concat((0, _toConsumableArray3.default)(reflectKeys(proto.__proto__)), (0, _toConsumableArray3.default)(reflectKeys(proto)), (0, _toConsumableArray3.default)(reflectKeys(instance)));
  delete instance.data;
  //原型属性对象化
  ownKeys.filter(function (k) {
    return blackList.indexOf(k) < 0;
  }).map(function (key) {
    return adapterProperty(instance, key);
  });
  //注册小程序页面
  Page((0, _extends3.default)({}, instance, {
    data: data,
    onLoad: function onLoad() {
      instance.setData = this.setData.bind(this);
      instance.data = this.data;
      instance.__proto__.__proto__.__proto__ = this;
      //添加打点日志对象
      Object.defineProperty(instance, 'venylog', { writable: false, value: new _venylog2.default(name || this.route) });
      instance.onLoad.apply(instance, arguments);
    }
  }));
}

/**
 * 适配属性
 * @param {Object} target 目标对象 
 * @param {String} name 属性名称
 */
function adapterProperty(target, name) {
  var handler = target[name];
  if (typeof handler === 'function') {
    target[name] = adapterFunction(target, name);
  } else {
    target[name] = handler;
  }
}

/**
 * 适配函数
 * @param {Object} target 目标对象 
 * @param {String} name 属性名称
 */
function adapterFunction(target, name) {
  var handler = target[name];
  var locked = target.__locked;
  return function () {
    var nowHandler = target[name];
    if (locked.indexOf(nowHandler) > -1) {
      console.warn('\u51FD\u6570:' + name + '\u88AB\u9501\u5B9A\uFF0C\u60A8\u662F\u5426\u5FD8\u8BB0\u89E3\u9501\uFF1F \u89E3\u9501\u64CD\u4F5C:this.unlock(this.' + name + ')');
    } else {
      return handler.apply(target, arguments);
    }
  };
}

/**
 * 锁定指定函数
 */
function lockFunction(handler) {
  var locked = this.__locked;
  if (typeof handler === 'function') {
    if (locked.indexOf(handler) < 0) {
      locked.push(handler);
    }
  }
  var unlock = unLockFunction.bind(this);
  return function (response) {
    unlock(handler);
    return response;
  };
}

/**
 * 解锁指定函数
 */
function unLockFunction(handler) {
  var locked = this.__locked;
  var index = locked.indexOf(handler);
  if (typeof handler === 'function' && index >= 0) {
    //延迟300毫秒解锁，防止函数在300毫秒内可并发调用
    setTimeout(function () {
      return locked.splice(index, 1);
    }, 300);
  }
};
//# sourceMappingURL=index.js.map