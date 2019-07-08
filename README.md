# 使用node.js + express+ejs 开发
### 开发环境node.js + express
## [源码](git地址：http://git.zhugefang.com/afe/zhuge-fe-cloudstore.git)


## 复制项目
```
# 将项目克隆到本地
    git clone http://git.zhugefang.com/afe/zhuge-fe-cloudstore.git
# 安装项目依赖
    cnpm install

 # 或者用yarn 安装项目依赖（yarn 安装跟npm相同，但是会更快，减少版本安装错误问题）
    yarn 或者 yarn install
# 启动项目
    cnpm start
```
```
    
## 然后在浏览器中打开[http://localhost:3000/]( http://localhost:3000/) 网址就可以看到这个应用了

## 项目目录
* bin/
    + www   -------------------------项目入口文件
* config/   -------------------------配置文件
    + www   -------------------------项目入口文件
    + globalPath.js -------------------------全局配置
* controllers/   -------------------------路由配置文件夹及业务文件处理
    + listController.js    -------------------------命名规范请按照(业务名+Controller.js)
    + indexController.js  
* httphelper/   ------------------------- 接口统一调用文件夹
* models /   -------------------------接口调用
   ** list /   -------------------------模块名文件夹
       + listModel.js   -------------------------命名规范请按照(业务名+Model.js)    
* node_modules/   -------------------项目依赖文件夹，cnpm intall后生成 
* public/       
    + images/   ---------------------图片       
    + js/   -------------------------js文件 
      + base/   ------------------------公共js文件  
      + lib/   ------------------------依赖js文件   
      + pages/   ------------------------每个页面js文件  
    + stylesheets/  -----------------css文件
      + base/   ------------------------基本样式、公共样式  
      + inconfont/   ------------------------字体样式   
      + pages/   ------------------------每个页面样式 

* unti/   ------------------------- 帮助文件夹
     
* views/    -------------------------模板文件
    ** template/    -------------------------公共模板文件（比如统一头部、尾部）     
    + error.ejs
    + index.ejs
   
* app.js   --------------------------存放的Express项目中最基本的配置信息
* package.json   --------------------项目依赖文件
 *.eslintrc.js   --------------------eslint规范文件    




 ## 文件解析

 ### .eslintrc.js

 module.exports = {
     <!-- // 环境定义了预定义的全局变量。 设置你的脚本的目标运行环境， -->
    "env": {
        //环境定义了预定义的全局变量。更多在官网查看
        "browser": true,
        "commonjs": true,
        "node": true,
        "mocha": true
    },
<!-- 继承(extends)：继承基础配置中的已启用的规则  -->
    "extends": "eslint:recommended",
    // JavaScript 语言选项
    "parserOptions": {
        "ecmaFeatures": {
            <!-- // 启用 JSX -->
            "jsx": true
        },
        // ECMAScript 版本
        "ecmaVersion": 5
    },
    <!-- 规则(rules)：设定的规则及该规则对应的报错level  -->
    
<!-- /**
”off” 或 0 - 关闭规则

“warn” 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),

“error” 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出) 

*/  -->
    "rules": {
        <!-- 缩进 -->
        "indent": [
            "error",
            "tab"
        ],
      
        // 要求 return 语句要么总是指定返回的值，要么不指定
        "consistent-return":0,
        // 不允许在变量定义之前使用它们
        "no-use-before-define": 0,
        // 禁止 var 声明 与外层作用域的变量同名
         "no-shadow": 0,
         // 禁止 if 语句中有 return 之后有 else
         "no-else-return":0,
         // 禁止出现未使用过的变量
         "no-unused-vars": 0,
         // 双峰驼命名格式
         "camelcase":2,
         // 强制一行的最大长度
         "max-len":[1,200],
         // 强制函数中的变量要么一起声明要么分开声明
         "one-var": [2, {"initialized":"never"}],
         // 要求或禁止在 var 声明周围换行
         "one-var-declaration-per-line":0,
         // 禁止属性前有空白
         "no-whitespace-before-property":0,
         // 强制在 function的左括号之前使用一致的空格
         "space-before-function-paren": [2,"always"],
         // 禁止标识符中有悬空下划线_bar
         "no-underscore-dangle": [2, { allow: ["__", "_id"] }],
         // 强制在parseInt()使用基数参数
         "radix":0,
         // 要求构造函数首字母大写
         "new-cap":0,
         // 要求 IIFE 使用括号括起来
         "wrap-iife": [2, "any"],
          // 强制在关键字前后使用一致的空格 (前后腰需要)
         "key-spacing": [2, {"beforeColon":false,"afterColon":true}],
        // 强制在关键字前后使用一致的空格 (前后腰需要)
        “keyword-spacing”:2,
        // 强制使用一致的换行风格
        "linebreak-style": [
            "error",
            "windows"
        ],
         //构造函数首字母大写
        "new-cap": [
            2,
            {
                "newIsCap": true,
                "capIsNew": false
            }
        ],
        // 强制使用一致的单引号
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};       

