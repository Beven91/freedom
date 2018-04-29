

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('./../../third_modules/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../../third_modules/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 名称：当前登录用户信息上下文
 * 日期: 2017-12-26
 * 描述：用于存储提供登录态信息
 */

//内部context
var context = {};

var Profile = function () {
  function Profile() {
    (0, _classCallCheck3.default)(this, Profile);
  }

  (0, _createClass3.default)(Profile, null, [{
    key: "token",


    /**
     * 获取当前用户登录token
     */
    get: function get() {
      return context.token;
    }

    /**
     * 设置当前登录用户token
     */
    ,
    set: function set(value) {
      context.token = value;
    }

    /**
     * 获取登录态cookie
     */

  }, {
    key: "cookie",
    get: function get() {
      return "token=" + this.token + ";";
    }

    /**
     * 判断当前用户是否已登录
     */

  }, {
    key: "isAuthPass",
    get: function get() {
      return !!this.token;
    }
  }]);
  return Profile;
}();

exports.default = Profile;;
//# sourceMappingURL=index.js.map