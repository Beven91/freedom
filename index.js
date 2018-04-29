var webpack = require('webpack');
var compiler = webpack(require('./build/webpack'));

//开启运行服务
compiler.watch({}, function (err, stats) {
  if (err) {
    console.error(err.stack);
    console.error(err.details || '');
  }
  if(stats.hasErrors()){
    console.error(stats.toString(compiler.options.stats || {}))
  }else{
    console.log(stats.toString(compiler.options.stats || {}))
    console.log('服务已启动，请使用微信开发者工具附加/dist目录。');
  }
});