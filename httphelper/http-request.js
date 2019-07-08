/**
 * Created by 田立强 on 2017/12/18.
 */
var zlib = require('zlib');
var request = require('request');
var staticPath = require('../config/config');

// 默认POST请求。
// 若其他请求，需要传type参数。如：GET PUT DELETE ...
// 请求默认打上了请求和相应数据log，其他调用的地方可以不用再次打重复log。
// options为请求参数 可以设header lixiaoyan1 2018年8月14日修改
//apiUrl 为指定url。默认是 bctApi
function httpRequest (url,data,callback,options,apiUrl,type,isBodyData) {
    callback =callback ? callback : function (err, result) {};
    type = type ? type :'POST';

    apiUrl = staticPath[apiUrl] ? staticPath[apiUrl]:staticPath['apiPrefix'];
    // options为请求参数 可以设header lixiaoyan1 2018年8月14日修改
    var curOptions = {
        url: apiUrl + url,
        method: type,
        json: true,
        headers: {
            'content-type': 'application/json',
            // 'accept-encoding': 'gzip',
        },
        timeout: 10000,// 10秒超时限时
        encoding: null
    };
 
    if (options){     
      for (var key in options ){
          console.log(key);
        curOptions[key] = options[key];
      }
    } 
  // options为请求参数 可以设header lixiaoyan1 2018年8月14日修改
    if (!isBodyData){
        curOptions.form = data;
    } else {
        curOptions.body = data;
    }
    
    console.log('curOptions', curOptions);

    request(curOptions, function (error, response, body) {
        if (error){
            callback(error);
        } else {
            // console.log('响应结果信息：',response.body.code,response.body.message);
            var errObj;
            if (response.statusCode ===200){
                if (response.headers['content-encoding'] && response.headers['content-encoding'] ==='gzip'){
                    zlib.unzip(body, function (err, buffer) {
                        if (err){
                            callback(err);
                        } else {
                            body = eval('('+buffer.toString()+')');

                            // 处理第三方接口错误 路由层处理时判断下code 若是2 则根据需要整理数据结构。
                            if (body && body.code && body.code ==='third_part_service_exception'){
                                body.code =2;
                                body.message ='服务出错，请稍后重试!';
                            }
                            callback(null,body);
                        }
                    });
                } else {
                    // 处理第三方接口错误 路由层处理时判断下code 若是2 则根据需要整理数据结构。
                    if (body && body.code && body.code ==='third_part_service_exception'){
                        body.code = 2;
                        body.message ='服务出错，请稍后重试!';
                    }
                    callback(null,body);
                }
            } else if (response.statusCode ===403 ){
                if (body.code ==='session_key_null'){
                    errObj = new Error('会话不存在');
                    errObj.status = 401;
                } else if (body.code ==='auth_user_token_invalid'){
                    errObj = new Error('登录超时');
                    errObj.status = 402;
                } else if (body.code ==='auth_user_no_permission'){
                    errObj = new Error('没有权限');
                    errObj.status = 403;
                }
                callback(errObj);
            } else if (response.statusCode === 500){
                errObj = new Error('Server Error !');
                errObj.status = 500;
                callback(errObj);
            } else {
                errObj = new Error('Not Found');
                errObj.status = 500;
                callback(errObj);
            }
        }
    });
}

module.exports = {
    httpRequest: httpRequest
};
