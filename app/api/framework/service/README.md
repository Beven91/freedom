# 接口层基类(Service)

## 简介

为了更加方便调用`m.api`接口，通过定义基础类`Service`来完成`m.api`的基础调用(签名,授权等)

`Service`类提供了`rpc`函数来发起`m.api`网关接口的请求(包括参数签名，登录态发送等)

从而使派生的子类仅关注如何组装返回接口数据即可

`Service`类继承于[`Network`](/app/framework/network)所以具备`Network`的所有特性

#### 如何派生一个子类？

> 例如下面定义`octopus`的业务接口类定义

```js

  import Service from 'framework';

  class OctopusService extends Service{
    constructor(){
      //指定当前接口的组名 这个名称为m.api的接口前缀，在使用rpc发送接口请求时会拼接至方法名前
      //例如 this.rpc('queryLandingPage') 实际请求的_mt=octopus.queryLandingPage
      super('octopus')
    }
    /**
     * 查询落地页
     * @param {String} code
     */
    queryLandingPage(query) {
      //这里通过rpc发起一个 octopus.queryLandingPage 接口请求
      return this.rpc('queryLandingPage', { query: JSON.stringify(query) });
    }
  }
  //创建一个接口实例，并且作为exports公布出去
  module.exports = new OctopusService();
```

#### 如何使用?

> 引用模块，直接调用接口函数即可

```js
  import { Octopus }  from './octopus';

  Octopus
    .queryLandingPage({count:20})
    .then((data)=>{
      //这里处理返回的数据
    })
    .catch((error)=>{
      //这里处理返回异常
    })
```

#### 关于返回结果的那点思考

> 默认在`AttachResponse`定义了一个`single`函数，用于处理返回结果 

> 默认m.api网关层返回的数据格式为:`const result = {stat:{},content:[]}`

> 通常我们需要的数据是 `result.content[0]` 如果仅关心返回的结果，则可以参考如下用例

```js
  import { Octopus }  from './octopus';

  //默认m.api网关层返回的数据格式为: {stat:{},content:[]} 
  //如果我们通常是关心数据，不关心错误的话，可以使用如下方式获取 result.content[0]的数据
  Octpus.queryLandingPage({count:20})
        //通过single 处理返回结果，仅取 response.content[0]
        .single()
        .then((data)=>{
          //此时data的值为 resposne.content[0] 默认会针对response.content做处理     
          //这里处理返回的数据
        })
        .catch((error)=>{
          //这里处理返回异常
        })
```