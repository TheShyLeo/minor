minor 基于express封装的框架

```
veily_base
├── app.js //初始化express，添加中间件和路由信息
├── apps   //用于存放安装的app应用
│   ├── app1 //示例app,用于演示跨app调用
│   │   └── page
│   │       └── test.js
│   └── demo  //+
│       ├── dao  //dao层，用于封装数据库操作
│       │   ├── entity //orm实体
│       │   │   └── test.js //test实体与数据库对应
│       │   └── test.js //实体对应的dao
│       ├── data //data层，用于业务处理
│       │   └── test.js
│       └── page //page层，用于接入的参数校验等预处理的简单功能
│           └── test.js
├── bin
│   ├── deploy.sh //用于部署app
│   ├── vpm.sh //app管理 （安装、删除、更新、查看 ）
│   └── www  //项目启动入口
├── build.js //打包脚本 
├── conf   //配置文件目录
│   ├── apps  //app自身应用的内部配置
│   │   └── demo  //app名称
│   │       └── global.js  //app的全局配置，以后app的配置修改统一在这个文件中修改
│   ├── global.js //全局配置，用于定义日志级别和服务名等等全局日志级别和服务名等全局配置项 
│   └── up    //外部依赖配置项
│       ├── api  //api调用（app间调用）
│       │   └── demo.js //具体app的配置
│       └── db //数据库连接配置
│           └── demo.js //具体app的配置
├── library  //公共的库
│   ├── base //基础的基类
│   │   ├── api.js  //提供了app调用的统一入口（内部app调用和跨服务的app调用）
│   │   ├── base.js //基础类，提供创建page,data,dao等实例化
│   │   ├── dao.js  //dao基类，继承base
│   │   ├── data.js //data基类，继承base
│   │   ├── inner_router.js //内部app调用的路由
│   │   └── page.js //page基类，继承base
│   ├── init.js //初始化全局变量（应用路径，基础page,data,dao类）
│   └── util //工具库
│       ├── logger.js  //日志工具类 
│       ├── shared.js       //全局共享的map，用于简单的变量共享传递
│       └── tool.js       //基础工具类，封装基本功能  
├── package.json  //应用详情信息
└── routes   //路由，用于配置路由转换。如/api/app/action 中action通过配置转换位对应的page，默认以action名称作为page名称 
    ├── apps //各app的路由配置
    │   └── demo.js  //具体app的路由配置
    └── init.js //初始化路由，动态根据请求加载对应的路由


环境部署
1.依赖
    nodejs
    pm2

2.部署
app目录运行
sh build.sh -v 0

minor根目录
sh vpm.sh install -a demo -d ${相对目录}/demo/output/demo-0.0.1.0.tar.gz
```
