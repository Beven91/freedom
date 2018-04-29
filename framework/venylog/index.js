

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('./../../third_modules/babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('./../../third_modules/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('./../../third_modules/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _type = require('./../../third_modules/dantejs/src/type.js');

var _type2 = _interopRequireDefault(_type);

var _assign = require('./../../third_modules/babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('./../../third_modules/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../../third_modules/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _network = require('./../network/index.js');

var _network2 = _interopRequireDefault(_network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var network = new _network2.default();
//打点配置
/**
 * 名称：微信小程序打点工具
 * 日期:2017-12-29
 * 描述：基于小程序页面的图片组件发送打点日志
 */
var Options = {
  server: ''
  //属性映射
};var OriginalMapper = {
  'veny-name': 'name',
  'veny-event': 'event',
  'event': 'event',
  'name': 'name',
  'veny-param': 'param',
  'param': 'param'
};

var Venylog = function () {
  (0, _createClass3.default)(Venylog, null, [{
    key: 'config',


    /**
     * 全局配置打点信息
     * @param config 配置对象 例如: 
     * {
     *   server:'' //发送的服务端地址
     * }
     */
    value: function config(_config) {
      (0, _assign2.default)(Options, _config);
    }

    /**
     * Venylog构造函数
     * @param {Page} page 页面实例 
     * @param {String} name 打点页面名称
     */

  }]);

  function Venylog(name) {
    (0, _classCallCheck3.default)(this, Venylog);

    this.pageName = name;
  }

  /**
   * 发送一条打点日志
   * @param {Object} record
   */


  (0, _createClass3.default)(Venylog, [{
    key: 'sendBeancon',
    value: function sendBeancon(record) {
      if (record) {
        this.push(this.coloration(record));
      }
    }

    /**
     * 发送一个事件日志
     * @param {String} event 事件名称
     * @param {String} entry 附带的消息 
     */

  }, {
    key: 'sendEventBeancon',
    value: function sendEventBeancon(event, entry) {
      return this.sendBeancon({ "event": event, "param": entry });
    }

    /**
     * 发送一条映射日志，通过属性名称，映射成打点日志对象
     * @param {Object} original 原始日志属性对象
     */

  }, {
    key: 'sendOriginalBeancon',
    value: function sendOriginalBeancon(original) {
      if (_type2.default.isNnObject(original)) {
        var record = {};
        (0, _keys2.default)(original).filter(function (k) {
          return OriginalMapper[k];
        }).map(function (k) {
          return record[OriginalMapper[k]] = original[k];
        });
        this.sendBeancon(record);
      }
    }

    /**
     * 将日志推入发送队列
     * @param {String/Base64} log base64编码的日志数据
     */

  }, {
    key: 'push',
    value: function push(log) {
      var uri = Options.server + '?s=' + encodeURIComponent(log);
      network.get(uri);
    }

    /**
     * 渲染打点日志对象通用数据
     * @param {Object} record
     */

  }, {
    key: 'coloration',
    value: function coloration(record) {
      if (record) {
        var color = { page: this.pageName, "platform": "arthur" };
        var log = (0, _extends3.default)({}, record, color);
        return (0, _stringify2.default)(log);
      }
    }
  }]);
  return Venylog;
}();

exports.default = Venylog;;
//# sourceMappingURL=index.js.map