# 微信小程序Page扩展类

## 简介

默认小程序官方定义页面通过字面量方式定义例如 `Page({ onLoad:...})`

为了方便对页面扩展，通过`class`机制定义`Page`可使用继承机制带来的很多便利

所以定义了`AppPage`类，我们可以通过继承`AppPage`来替代官方的字面量定义方式

###### AppPage提供了哪些属性与函数？

具备小程序页面的所有`事件`&`属性`&`方法`

外提供了一些开发时常用的一些`辅助函数`与`属性` 

具体如下:

### `Services`属性

指向[`services接口层`](/app/api/services)模块的引用 可以在页面中快速访问到已定义的业务接口实例

例如：`this.Services.User` `this.Services.Octopus`等等，具体参照如下用例：

```js
  class Index extends AppPage{
      onLoad(){
        this.Service.User
          .login(username,password)
          .then((data)=>{

          })
      }
  }

  //创建一个小程序页面
  module.export  = new Index();
```

### 常用的UI函数与路由函数

- `showLoading` 显示一个loading效果

- `hideLoading` 隐藏loading效果

- `showToast` 显示一个浮层消息

- `hideToast` 隐藏显示的浮层消息

- `redirectTo` 关闭当前页面，跳转到应用内的某个页面。

- `navigateTo` 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。

- `navigateBack` 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。

```js
  class Index extends AppPage{
      onClick(){
          this.showLoading('加载中...')
          this.hideLoading();
          this.showToast('登录成功');
          this.hideToast();
          this.redirectTo('/pages/user/home');
          this.navigateTo('/pages/user/home');
          this.navigateBack(-1);
      }
  }
  //创建一个小程序页面
  module.export  = new Index();
```

### 关于并发锁

`AppPage`类还提供了`lock`与`unlock`函数 用于锁定页面实例函数与解锁页面实例函数

###### 哪种场景会使用到这两个函数？

例如：在用户注册页面，用户填写好信息后，一不小心连击了按钮数次，那么在不做任何控制的情况下，会发出数个注册请求

如果在后端逻辑没有控制的请求情况下，很可能会注册了好几个用户

如果使用`AppPage`定义的`lock`来锁定，能很友好的解决这个问题

具体解决方式请继续阅读

##### 锁定函数

可以在页面实例方法中调用`this.lock(this.xx)`来锁定具体的函数 请看如下用例:

```js
  class Index extends AppPage{
      onTap(){
        //这里默认连续调用submit两次
        this.submit();
        this.submit();
        //通过lock后的输出结果如下:
        //Console:  submiting
        //Warn :    submit函数被锁定
        //submit函数仅被调用一次
      }
      submit(){
        //调用lock锁住submit函数
        this.lock(this.submit);
        console.log('submiting');
      }
  }
```

##### 解锁函数

可以在页面实例方法中调用`this.unlock(this.xx)`来解锁具体的函数

或者使用`this.lock(this.xx)`返回的`unlock`函数来解锁

注意:`this.unlock`解锁不是同步的，默认会延迟`300`(延迟时间可以修改,在`framework/page/index.js`修改)毫秒后执行实际解锁操作

请看如下用例:

```js
  class Index extends AppPage{
      submit(){
        const unlock = this.lock(this.submit);
        //调用unlock进行解锁
        unlock();
        //或者调用this.unlock进行解锁
        this.unlock(this.submit);
      }
  }
```

##### 友好的结合异步接口

```js
  class Index extends AppPage{
    submit(){
      //调用登录接口
      this.Services.User
        .login()
        //complete 不管成功还是失败都会触发
        //通过this.lock(this.submit) 来锁定submit函数  
        //通过this.lock(this.submit) 返回的unlock绑定到complete(unlock) 来设置在接口完毕后自动解锁函数
        .complete(this.lock(this.submit))
        .then(()=>{
          //...
        })
    }
  }
  //创建一个小程序页面
  module.export  = new Index();
```

### 关于页面日志打点

`AppPage`提供了以下三种日志打点机制

#### 通过调用`this.sendBeancon` 发送一条打点日志

```js
  class Index extends AppPage{
    submit(){
      this.sendBeancon({name:'click_submit',param:'id=1,age=20'})
    }
  }
```

#### 通过调用`this.sendEventBeancon` 发送一条事件打点日志

```js
  class Index extends AppPage{
    submit(){
      this.sendEventBeancon('click_submit','id=1,age=20'})
    }
  }
```

#### 通过调用在wxml元素上标记发送一条点击日志

```xml
  <view data-veny-name="click_submit" data-veny-param="id={{id}}">提交</view>
```
