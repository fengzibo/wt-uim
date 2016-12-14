﻿var ajaxDataController = function () {

    //打印ajax错误日志
    function printLog(result, url, params, response) {
        console.error('AJAX 请求异常 - %s\n错误信息：\n%c%s\n%c请求链接：%s\n%c请求参数：%c%s\n%c返回数据：%c%s',
            'color:red;',
            result,
            'color:#333;',
            'color:blue',
            url,
            'color:#333;',
            'color:green',
            JSON.stringify(params),
            'color:#333;',
            'color:#643A3A',
            response)
    }

    function dataHandle(url, params, callback, async, method) {

        if (!method) {
            throw 'method 参数未设置'
        }

        if ((typeof params) === 'function') {
            callback = params
            params = null
        }

        params = params || {};
        params = $.extend({ date: new Date().getTime().toString() }, params);
        async = async == null ? true : async;

        var ERROR_PROCESS_MODE = 0;

        if (typeof (params.ERROR_PROCESS_MODE) != "undefined") {
            if (params.ERROR_PROCESS_MODE==1) {
                ERROR_PROCESS_MODE = 1;
                try {
                    delete params.ERROR_PROCESS_MODE;
                } catch (e) {

                }
               
            }
        } 



        $.ajax({
            async: async,
            url: url,
            dataType: 'json',
            data: params,
            type: method,
            success: function (result, textStatus, xhr) {
                if (result.success === false) {
                    printLog(result, url, params, xhr.responseText)
                }
                switch (result.status) {
                    case 200:
                        callback(result);
                        break;
                    default:
                        callback(result);
                        break;
                }

            },
            error: function (xhr, textStatus, error) {

                if (window.parent) {
                    window.parent.common.layer.fail("系统出现异常，请稍候再试");
                } else {
                    common.layer.fail("系统出现异常，请稍候再试");
                }
                printLog(xhr.status, textStatus + ' - ' + error, url, params, xhr.responseText);
            }
        });
    }

    return {
        post: function (url, params, callback, async) {
            dataHandle(url, params, callback, async, 'post');
        },
        /* 'put': function (url, params, callback, async) {
             dataHandle(url, params, callback, async, 'put');
         },
         'del': function (url, params, callback, async) {
             dataHandle(url, params, callback, async, 'delete');
         },*/
        get: function (url, params, callback, async) {
            dataHandle(url, params, callback, async, 'get');
        }
    };
};