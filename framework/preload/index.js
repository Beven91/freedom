

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('./../../third_modules/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../../third_modules/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 名称：自定义预加载组件
 * 日期：2017-12-26
 * 描述：目前仅仅是包裹了wx的相关loading函数
 */

var Preload = function () {
  function Preload() {
    (0, _classCallCheck3.default)(this, Preload);
  }

  (0, _createClass3.default)(Preload, null, [{
    key: 'showLoading',


    /**
     * 打开一个loading效果
     * @param {String} title loading文案
     */
    value: function showLoading(title) {
      wx.showLoading({ title: title, icon: 'loading' });
      return this.hideLoading.bind(this);
    }

    /**
     * 关闭loading效果
     */

  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      wx.hideLoading();
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
      wx.showToast({ title: title, image: image, duration: duration, mask: mask });
      return this.hideToast.bind(this);
    }

    /**
     * 关闭toast消息提示
     */

  }, {
    key: 'hideToast',
    value: function hideToast() {
      return wx.hideToast();
    }
  }]);
  return Preload;
}();

exports.default = Preload;;
//# sourceMappingURL=index.js.map