/**
 * 名称：打包全局配置信息
 * 日期：2017-12-18
 * 描述：提供webpack的entry配置，以及目标目录等配置
 */
const path = require('path');
const fse = require('fs-extra');

module.exports = {
  //源代码代码目录
  src: path.resolve('app'),
  //目标目录
  dist: path.resolve('dist'),
  //babel配置
  babelRc: fse.readJSONSync(path.resolve('.babelrc')),
  //图片压缩配置
  minOptions: {
    gifsicle: {
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    mozjpeg: {
      progressive: true,
      quality: 65
    }
  }
}