
// 去掉所有的空白，is_global参数写g，str为原要去空白的字符串
String.prototype.trimAll = function(str,is_global){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
        result = result.replace(/\s/g,"");
    return result;
};
// 字符串截取   (超过指定长度用...代替)
String.prototype.cutSubstr=function(length){
    if(this.length > length){
        return this.substring(0,length)+"...";
    }else if(this == 'null'){
        return '';
    }else{
        return this;
    }
};
// 去掉字符两端的空白字符
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
// 去掉字符右端的空白字符
String.prototype.rightTrim = function () {
    return this.replace(/([\\s]*$)/g, "");
};
// 去掉字符左端的的空白字符
String.prototype.leftTrim = function () {
    return this.replace(/(^[\\s]*)/g, "");
};
// 判断字符串是否以指定的字符串结束
String.prototype.endsWith = function (str) {
    return this.substr(this.length - str.length) == str;
};
// 判断字符串是否以指定的字符串开始
String.prototype.startsWith = function (str) {
    return this.substr(0, str.length) == str;
};


Date.prototype.format = function (fmt) {
    /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
     Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

$.fn.extend({
    /**
     * 日期控件
     * @param {String} [event] 绑定事件
     * @param {Object} [options] 日期控件参数
     *  {
     *      dateFmt:"yyyy-MM-dd HH:mm:ss",  //日期时间格式化
     *      maxDate: "#F{$dp.$D('date1')",  //最大选取时间
     *      minDate: "#F{$dp.$D('date2')",  //最小选取时间
     *      isShowWeek:false,               //是否显示周
     *      isShowClear:true,               //是否显示清空按钮
     *      isShowToday:true,               //是否显示今天按钮
     *      readOnly:true,                  //是否只读
     *      ......
     *   }
     */
    datePicker: function (event, options) {
        if (event == null) {
            event = "click";
        }
        $(this).bind(event, function () {
            if (options == null) {
                WdatePicker()
            } else {
                WdatePicker(options);
            }
        });
        return $(this);
    },
    //分页
    paginationAsync: function (pageIndex, pageSize, totalCount, callback) {
        $(this).removeClass("pagination").addClass("pagination").pagination(totalCount,
            {
                current_page: pageIndex <= 0 ? 1 : pageIndex,
                items_per_page: pageSize,
                num_edge_entries: 2,
                num_display_entries: 5,
                prev_text: "上一页",
                next_text: "下一页",
                callback: callback,
                link_to: "javascript:void(0);"
            });
        return $(this);
    },
    validate: function (event, displayName, rules, errorMessagePlace) {
        if (typeof (event) === "undefined" || event == null) {
            var isV = true;
            if (typeof ($(this).attr("data-validated")) !== "undefined") {
                $(this).trigger($(this).attr("data-event"),true);
                if ($(this).attr("data-validated") != "true") {
                    {
                        isV = false;
                    }
                }
            } else {

                for (var i = 0; i < $(this).find("[data-validated]").length; i++) {
                    $(this).find("[data-validated]").eq(i).trigger($(this).find("[data-validated]").eq(i).attr("data-event"),true);
                }
                if ($(this).find("[data-validated='false']").length > 0) {
                    isV = false;
                }
                //alert($(this).find("[data-validated='false']").length + "," + isV);
            }
            return isV;
        }

        var regularClass = {
            username: /^[a-zA-Z][a-zA-Z0-9_-]{5,11}$/,//6-12位字符，同时包含字母和数字 ,原来的--->^[a-zA-Z0-9_-]{6,12}$
            password: /^[^\s]{6,16}$/,//原来的：/^[^\s]{6,16}$/
            email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            mobilephone: /^1[3|4|5|7|8][0-9]{9}$/,
            verifycode: /^[a-zA-Z0-9]{4}$/,
            identityCard:/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
            //精确到小数点后2位的正数  验证钱
            decimalPrice: /^(([1-9][\d]{0,7})(\.[\d]{1,2})?)|(0\.)(([1-9][0-9]?)|([0-9][1-9]))$/,
            idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            nickname: /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/,
            qq: /^[1-9][0-9]{4,14}$/,
            positiveNumber:/^(\+|-)?\d+$/  //正整数
        };

        var rule = {
            required: { required: true, errorMessage: "" },//必填
            hanzi:  {min: 2,max: 4,type:"1",errorMessage:""},
            maxLength: { maxLength: 0, errorMessage: "" },//最大长度
            minLength: { minLength: 0, errorMessage: "" },//最小长度
            maxValue: { maxValue: 0, errorMessage: "" },//最大值
            minValue: { minValue: 0, errorMessage: "" },//最小值
            regular: { regular: null, errorMessage: "" },//正则
            compare: { compare: null, errorMessage: "", errorMessagePlace: null },//二次确认
            remote: { remoteUrl: null, data: null, method: "GET", errorMessage: "" }
        };
        var layertips = null;
        var layertips2 = null;
        var $thisObj = $(this);

        //必填
        if (typeof (rules.required) !== "undefined" && rules.required == true) {
            rule.required.errorMessage = "请输入" + displayName;
        } else if (typeof (rules.required) === "object" && rules.required.required == true) {
            if (typeof (rules.required.errorMessage) === "undefined" || rules.required.errorMessage == null) {
                rule.required.errorMessage = "请输入" + displayName;
            } else {
                rule.required.errorMessage = rules.required.errorMessage;
            }
        } else {
            rule.required = null;
        }
        //纯汉字
        if (typeof (rules.hanzi) !== "undefined") {
            rule.hanzi = rules.hanzi;
        } else {
            rule.hanzi = null;
        }
        //最大长度
        if (typeof (rules.maxLength) !== "undefined" && typeof (rules.maxLength) === "number" && rules.maxLength > 0) {
            rule.maxLength.maxLength = rules.maxLength;
            rule.maxLength.errorMessage = displayName + "不能超过 " + rules.maxLength + " 个字符";
        } else if (typeof (rules.maxLength) === "object" && typeof (rules.maxLength.maxLength) === "number" && rules.maxLength.maxLength > 0) {
            rule.maxLength.maxLength = rules.maxLength.maxLength;
            if (typeof (rules.maxLength.errorMessage) === "undefined" || rules.maxLength.errorMessage == null) {
                rule.maxLength.errorMessage = displayName + "不能超过 " + rules.maxLength.maxLength + " 个字符";
            } else {
                rule.maxLength.errorMessage = rules.maxLength.errorMessage;
            }
        } else {
            rule.maxLength = null;
        }
        //最小长度
        if (typeof (rules.minLength) !== "undefined" && typeof (rules.minLength) === "number" && rules.minLength > 0) {
            rule.minLength.minLength = rules.minLength;
            rule.minLength.errorMessage = displayName + "不能少于 " + rules.minLength + " 个字符";
        } else if (typeof (rules.minLength) === "object" && typeof (rules.minLength.minLength) === "number" && rules.minLength.minLength > 0) {
            rule.minLength.minLength = rules.minLength.minLength;
            if (typeof (rules.minLength.errorMessage) === "undefined" || rules.minLength.errorMessage == null) {
                rule.minLength.errorMessage = displayName + "不能少于 " + rules.minLength.minLength + " 个字符";
            } else {
                rule.minLength.errorMessage = rules.minLength.errorMessage;
            }
        } else {
            rule.minLength = null;
        }

        //最大值
        if (typeof (rules.maxValue) !== "undefined" && typeof (rules.maxValue) === "number") {
            rule.maxValue.maxValue = rules.maxValue;
            rule.maxValue.errorMessage = displayName + "不能大于 " + rules.maxValue;
        } else if (typeof (rules.maxValue) === "object" && typeof (rules.maxValue.maxValue) === "number") {
            rule.maxValue.maxValue = rules.maxValue.maxValue;
            if (typeof (rules.maxValue.errorMessage) === "undefined" || rules.maxValue.errorMessage == null) {
                rule.maxValue.errorMessage = displayName + "不能大于 " + rules.maxValue.maxValue;
            } else {
                rule.maxValue.errorMessage = rules.maxValue.errorMessage;
            }
        } else {
            rule.maxValue = null;
        }
        //最小值
        if (typeof (rules.minValue) !== "undefined" && typeof (rules.minValue) === "number") {
            rule.minValue.minValue = rules.minValue;
            rule.minValue.errorMessage = displayName + "不能小于 " + rules.minValue;
        } else if (typeof (rules.minValue) === "object" && typeof (rules.minValue.minValue) === "number") {
            rule.minValue.minValue = rules.minValue.minValue;
            if (typeof (rules.minValue.errorMessage) === "undefined" || rules.minValue.errorMessage == null) {
                rule.minValue.errorMessage = displayName + "不能小于 " + rules.minValue.minValue;
            } else {
                rule.minValue.errorMessage = rules.minValue.errorMessage;
            }
        } else {
            rule.minValue = null;
        }

        //正则
        if (typeof (rules.regular) !== "undefined" && typeof (rules.regular.regular) === "undefined") {
            rule.regular.regular = rules.regular;
            rule.regular.errorMessage = displayName + "格式输入有误";
        } else if (typeof (rules.regular) !== "undefined" && typeof (rules.regular) === "object") {
            rule.regular.regular = rules.regular.regular;
            if (typeof (rules.regular.errorMessage) === "undefined" || rules.regular.errorMessage == null) {
                rule.regular.errorMessage = displayName + "格式输入有误";
            } else {
                rule.regular.errorMessage = rules.regular.errorMessage;
            }
        } else {

            rule.regular = null;
        }
        if (rule.regular != null && typeof (rule.regular.regular) === "string") {
            rule.regular.regular = regularClass[rule.regular.regular];

        }

        //比较
        if (typeof (rules.compare) !== "undefined" && typeof (rules.compare) === "object" && typeof (rules.compare.compare) === "undefined") {
            rule.compare.compare = rules.compare;
            rule.compare.errorMessage = displayName + "输入不一致";
            rule.compare.errorMessagePlace = rules.compare;
        } else if (typeof (rules.compare) !== "undefined" && typeof (rules.compare) === "object" && typeof (rules.compare.compare) === "object") {
            rule.compare.compare = rules.compare.compare;
            if (typeof (rules.compare.errorMessage) === "undefined" || rules.compare.errorMessage == null) {
                rule.compare.errorMessage = displayName + "输入不一致";
            } else {
                rule.compare.errorMessage = rules.compare.errorMessage;
            }
            if (typeof (rules.compare.errorMessagePlace) === "undefined" || rules.compare.errorMessagePlace == null) {
                rule.compare.errorMessagePlace = rules.compare.compare;
            } else {
                rule.compare.errorMessagePlace = rules.compare.errorMessagePlace
            }

        } else {
            rule.compare = null;
        }

        //远程验证
        if (typeof (rules.remote) !== "undefined" && rules.remote != null) {
            rule.remote.remoteUrl = rules.remote.remoteUrl;
            rule.remote.data = rules.remote.data;
            rule.remote.method = rules.remote.method;
            if (typeof (rules.remote.errorMessage) === "undefined" || rules.remote.errorMessage == null) {
                rule.remote.errorMessage = displayName + "远程验证失败";
            } else {
                rule.remote.errorMessage = rules.remote.errorMessage;
            }
        } else {
            rule.remote = null;
        }

        if (errorMessagePlace == null) {
            errorMessagePlace = $(this);
        }

        $(this).attr("data-displayname", displayName).attr("data-event", event);
        $(this).bind(event, function (e, arg) {

            if (layertips != null) {
                layer.close(layertips);
            }
            if (layertips2 != null) {
                layer.close(layertips2);
            }

            for (var p in rule) {
                if (rule[p] == null) {
                    continue;
                }
                var curRule = rule[p];
                switch (p) {
                    case "required":
                        if ($.trim($(this).val()) == "") {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "hanzi":
                        var str=$(this).val();
                        var length = str.trim().length;
                        var isTrue = true;
                        if(curRule.type == "1" || curRule.type == "3")
                        {
                            for(var i= 0;i<str.length;i++){
                                if(/^[\u4e00-\u9fa5]+$/.test(str[i])){
                                    length++;
                                }
                            }
                        }else if(curRule.type == "2"){
                            for(var i= 0;i<str.length;i++){
                                if(/^[\u4e00-\u9fa5]+$/.test(str[i]) == false){
                                    isTrue = false;
                                }
                            }
                        }
                        if(length>curRule.max || length < curRule.min){
                            if(curRule.type == "3" && str.trim() == ""){
                                isTrue = true;
                            }else{
                                isTrue = false;
                            }
                        }
                        if (isTrue == false) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }else{
                            $(this).attr("data-validated", true);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                        }
                        break;
                    case "maxLength":
                        if ($.trim($(this).val()).length > curRule.maxLength) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "minLength":
                        if ($.trim($(this).val()).length < curRule.minLength) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "maxValue":
                        if (!isNaN($.trim($(this).val())) && Number($.trim($(this).val())) > curRule.maxValue) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "minValue":
                        if (!isNaN($.trim($(this).val())) && Number($.trim($(this).val())) < curRule.minValue) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "regular":
                        var r = curRule.regular.test($(this).val());
                        if (!r) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                            return;
                        }
                        break;
                    case "compare":
                        if (layertips2 != null) {
                            layer.close(layertips2);
                        }
                        var compareErrorMessagePlace = curRule.errorMessagePlace;

                        //if ($(curRule.compare).val() == null || $(curRule.compare).val().trim()=="") {
                        //    $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        //    return;
                        //}
                        if ($.trim($(this).val()) != $.trim($(curRule.compare).val())) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            //if ($(curRule.compare).val().trim() != "") {
                            if ($.trim($(curRule.compare).val()) != ""||arg==true) {
                                layertips2 = common.layer.tips($(compareErrorMessagePlace), curRule.errorMessage, 2, 0, true);
                            }
                            //}
                            return;
                        }
                        break;
                    case "remote":
                        var thisobj= $(this);
                        var isP=true;
                        $.ajax({
                            url: curRule.remoteUrl,
                            data: $.extend({ date: new Date().getTime().toString() }, curRule.data),
                            type: curRule.method == null || curRule.method == "" ? "GET" : curRule.method,
                            async: false,
                            dataType: 'json',
                            success: function (data) {
                                if (data.status != 200) {
                                    var errorMessage;
                                    if (data.errorMessage != null) {
                                        errorMessage = data.errorMessage;
                                    } else {
                                        errorMessage = curRule.errorMessage;
                                    }

                                    $(thisobj).attr("data-validated", false).attr("data-msg", errorMessage);
                                    layertips = common.layer.tips($(errorMessagePlace), errorMessage,2, 0, true);
                                    isP=false;
                                }

                            }, error: function (data, textStatus, error) {
                                $(thisobj).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                                layertips = common.layer.tips($(errorMessagePlace), curRule.errorMessage, 2, 0, true);
                                isP=false;
                            }
                        });
                        if(!isP)
                            return;
                        break;
                    default:
                        break;
                }
            }
            if (layertips != null) {
                layer.close(layertips);
            }
            $(this).attr("data-validated", true).attr("data-msg", "");

            return;
        });

        if (rule.compare != null) {
            $(rule.compare.compare).bind(event, function () {
                if (layertips2 != null) {
                    layer.close(layertips2);
                }
                var place1 = rule.compare.errorMessagePlace;
                if ($.trim($thisObj.val()) != $.trim($(this).val())) {
                    $thisObj.attr("data-validated", false).attr("data-msg", rule.compare.errorMessage);
                    layertips2 = common.layer.tips($(place1), rule.compare.errorMessage, 2, 0, true);
                    return;
                } else {
                    $thisObj.attr("data-validated", true).attr("data-msg", "");
                    return;
                }
            });
        }
        var isPass = true;
        for (var p in rule) {
            if (rule[p] == null) {
                continue;
            }
            var curRule = rule[p];
            switch (p) {
                case "required":
                    if ($.trim($(this).val()) == "") {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "hanzi":
                    var str=$(this).val();
                    var length = str.trim().length;
                    var isTrue = true;
                    if(curRule.type == "1")
                    {
                        for(var i= 0;i<str.length;i++){
                            if(/^[\u4e00-\u9fa5]+$/.test(str[i])){
                                length++;
                            }
                        }
                    }else if(curRule.type == "2"){
                        for(var i= 0;i<str.length;i++){
                            if(!(/^[\u4e00-\u9fa5]+$/.test(str[i]))){
                                isTrue = false;
                            }
                        }
                    }
                    if(length>curRule.max || length < curRule.min){
                        if(curRule.type == "3" && str.trim() == ""){
                            isTrue = true;
                        }else{
                            isTrue = false;
                        }
                    }
                    if (isTrue == false) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "maxLength":
                    if ($.trim($(this).val()).length > curRule.maxLength) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "minLength":
                    if ($.trim($(this).val()).length < curRule.minLength) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "maxValue":
                    if (!isNaN($.trim($(this).val())) && Number($.trim($(this).val())) > curRule.maxValue) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "minValue":
                    if (!isNaN($.trim($(this).val())) && Number($.trim($(this).val())) < curRule.minValue) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "regular":
                    var r = curRule.regular.test($.trim($(this).val()));
                    if (!r) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "compare":
                    if (layertips2 != null) {
                        layer.close(layertips2);
                    }
                    if ($.trim($(this).val()) != $.trim($(curRule.compare).val())) {
                        $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                        var isPass = true;
                    }
                    break;
                case "remote":
                    $.ajax({
                        url: curRule.remoteUrl,
                        data: $.extend({ date: new Date().getTime().toString() }, curRule.data),
                        type: curRule.method == null || curRule.method == "" ? "GET" : curRule.method,
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            if (data.status != 200) {
                                var errorMessage;
                                if (data != null && data.errorMessage != null) {
                                    errorMessage = data.errorMessage;
                                } else {
                                    errorMessage = curRule.errorMessage;
                                }

                                $(this).attr("data-validated", false).attr("data-msg", errorMessage);
                                var isPass = true;
                            }
                        }, error: function (data, textStatus, error) {
                            $(this).attr("data-validated", false).attr("data-msg", curRule.errorMessage);
                            var isPass = true;
                        }
                    });
                    break;
                default:
                    break;
            }
            if (!isPass) {
                break;
            }
        }
        return $(this);
    }
});


var common = {

    dateFormatStr:"yyyy-MM-dd HH:mm:ss",
    dateFormatStr_1:"yyyy-MM-dd HH:mm",
    dateFormatStr_2:"yyyy-MM-dd",
    remoteUpload: "",//文件上传    http://172.16.1.250:94
    userCenterUrl:"http://172.16.1.250:97",
    storeImagePath:"image/subject",//图片上传路径
    storeVideoPath:"video/subject",//视屏上传路径
    storeFilePath:"file/subject",//文件上传路径
    layerOther:{
        //tips框，obj:jquery元素,msg:消息内容，
        tips:function(obj,msg,operations,time,tipsMore){
            var placeObj = obj;
            var msgObj = placeObj.addClass('bdy').parents(".validate-box").find('.error').children('.msg').text(msg);
            placeObj.parents(".validate-box").find('.error').children('.icon1').css('display','inline-block');
        },
        notips:function(obj){
            var placeObj = obj;
            var msgObj = placeObj.parents(".validate-box").find('.error').children('.msg').text('');
            placeObj.removeClass('bdy').parents(".validate-box").find('.error').children('.icon1').css('display','none');
        }
    },
    date: function (dt) {
        return {
            format: function (fmt) {
                return new Date(dt).format(fmt);
            }
        }
    },
    getStaticJson:function(url,succb,errcb){
        var url = 'jsondata/'+url;
        $.ajax({
            async: true,
            url: url,
            dataType: 'json',
            data: { },
            type: 'GET',
            success: function (result, textStatus, xhr) {
                succb&&succb(result);
            },
            error: function (xhr, textStatus, error) {
                errcb&&errcb(xhr);
            }
        });
    },
    global: {
        header: function (type) {
            var urls = "../html/header.html";
            if(type =="student"){
                urls = "/views/common_model/headerStudent.html";
            }
            var headhtml = $.ajax({
                type: "GET",
                url: urls,
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            var html = $(headhtml);
            return $(html);
        },
        footer: function () {
            var foothtml = $.ajax({
                type: "GET",
                url: "../html/footer.html",
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            return $(foothtml);
        },
        navigator: function(which,type){
            var foothtml = $.ajax({
                type: "GET",
                url: "/views/common_model/navigator.html",
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            return $(foothtml);
        },
        studentNav: function(which,type){
            var foothtml = $.ajax({
                type: "GET",
                url: "/views/common_model/studentNav.html",
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            return $(foothtml);
        },
        login: function (callback) {

            window.location.href="/login.html";
            /*return layer.open({
             type: 2,
             closeBtn: 1,
             title: false,
             skin: 'layui-layer-rim',
             shade: [0.5, '#000', true],
             border: [6, 0.3, '#000000', true],
             area: ['330px', '385px'],
             offest: ($(window).height() - 400) / 2 + 'px',
             content: "/loginbox.html?" + (callback != null || callback == "" ? "cb=" + callback + "&" : "") + "date=" + new Date().getTime()
             });*/
        },
        loginBar:function(){
            var lbhtml = $.ajax({
                type: "GET",
                url: "../html/loginBar.html",
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            return $(lbhtml);
        },
        sideMenu:function(urls){
            var smhtml = $.ajax({
                type: "GET",
                url: urls,
                data: { },
                async: false,
                dataType: "html"
            }).responseText;
            return $(smhtml);
        }
    },
    request: {
        url: function () {
            return window.location
        },
        getParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = decodeURI(window.location.search).substr(1).match(reg);
            if (r != null) {
                return unescape( r[2]);
            }
            else{
                return null;
            }

        }
    },
    /*
     *设置图片地址
     *   url：图片原地址
     *   size：尺寸(_100_100、_80_80、_50_50)
     */
    photo: function (url,size) {
        var filePath, fileName, fileExtension;
        if (url != null && url != "") {

            filePath = url.substring(0, url.lastIndexOf("/"));
            fileName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf('.'));
            fileExtension = url.substring(url.lastIndexOf('.') + 1);
        } else {
            filePath = "/img";
            fileName = "";
            fileExtension = "png"
        }
        return filePath + "/" + fileName + size + "." + fileExtension;
    },
    mapImage: function (path,fileName,big) {
        if(big==true){
            return common.remoteUpload+path + fileName + "/1_1.jpg";
        }else{
            return common.remoteUpload+path + fileName + "/1_2.jpg";
        }
    },
    mapVideo: function (path, fileName) {
        return common.remoteUpload+path + fileName + "/1/xml/index.xml";
    },
    layer: {

        //tips框，obj:jquery元素,msg:消息内容，operation:1上，2右(默认)，3下，4左，time:显示时间默认5000毫秒,0为不关闭，tipsMore 是否能显示多个
        tips: function (obj, msg, operation, time, tipsMore) {

            return layer.tips(msg, obj, {
                tips: [operation, '#FF4040'],
                time: time == null ? 5000 : Number(time),
                tipsMore: true
            });
        },
        msg: function (msg, time) {

            if (time == null || isNaN(time) && Number(time) < 0) {
                time = 2000;
            } else {
                time = Number(time);
            }
            return layer.msg(msg, { time: time });
        },
        confirm: function (msg, callback, cancelcallback) {
            return layer.confirm(msg,
                {
                    icon: 3,
                    shadeClose: true,
                    skin: 'layui-layer-rim',
                    shade: [0.5, '#000', true],
                    border: [6, 0.3, '#000000', true],
                    btn: ['确定','取消'],
                    scrollbar: false
                }, function (index) {
                    if (callback != null && typeof (callback) === "function") {
                        callback();
                    }
                    layer.close(index);
                }, function (index) {
                    if (cancelcallback != null && typeof (cancelcallback) === "function") {
                        cancelcallback();
                    }

                });
        },
        alert: function (msg, callback) {
            return layer.alert(msg,
                {
                    icon: 0,
                    skin: 'layui-layer-rim',
                    shade: [0.5, '#000', true],
                    border: [6, 0.3, '#000000', true],
                    scrollbar: false
                }, function (index) {
                    if (callback != null && typeof (callback) === "function") {
                        callback();
                    }
                    layer.close(index);
                });
        },
        success: function (msg, callback,btnText) {
            var btnText = btnText;
            if(btnText == "undefined" || btnText == "" || btnText == undefined){
                btnText = "确定";
            }
            return layer.alert(msg,
                {
                    icon: 1,
                    skin: 'layui-layer-rim',
                    shade: [0.5, '#000', true],
                    border: [6, 0.3, '#000000', true],
                    scrollbar: false,
                    btn: [btnText]
                }, function (index) {
                    if (callback != null && typeof (callback) === "function") {
                        callback();
                    }
                    layer.close(index);
                });
        },
        fail: function (msg, callback) {
            return layer.alert(msg,
                {
                    icon: 2,
                    skin: 'layui-layer-rim',
                    shade: [0.5, '#000', true],
                    border: [6, 0.3, '#000000', true],
                    scrollbar: false
                }, function (index) {
                    if (callback != null && typeof (callback) === "function") {
                        callback();
                    }
                    layer.close(index);
                });
        },
        open: function (url,title,id, width, height,sucsessCb, cancelcallback) {
            if (width == null || width == "" || isNaN(width) || Number(width) <= 0) {
                width = 480;
            }
            if (height == null || height == "" || isNaN(height) || Number(height) <= 0) {
                height = 270;
            }
            if($(window).height()<height){
                height = $(parent.window).height()*4/5;
            }
            return layer.open({
                id: id||'', //唯一：防止打开多个弹出框
                type: (typeof(url)=="object")?1:2,
                fix:true,
                closeBtn: 1,
                title: title == null || title == "" ? false : title,
                skin: 'layui-layer-rim',
                shade: [0.5, '#000', true],
                border: [1, 1, '#929292', true],
                area: [width + "px", height + "px"],
                //offset: (($(window).height() < height ? height + 40 : $(window).height()) - height) / 2 + 'px',
                //maxmin: true,
                content: url,
                success:function(layero,index){
                    if (sucsessCb != null && typeof (sucsessCb) === "function") {
                        sucsessCb(layero,index);
                    }
                },
                cancel: function (index) {
                    if (cancelcallback != null && typeof (cancelcallback) === "function") {
                        cancelcallback();
                    }
                }
            });
        },
        show: function (content, title, width, height, cancelcallback) {
            if (width == null || width == "" || isNaN(width) || Number(width) <= 0) {
                width = 480;
            }
            if (height == null || height == "" || isNaN(height) || Number(height) <= 0) {
                height = 270;
            }
            //页面层
            return layer.open({
                type: 1,
                closeBtn: 1,
                title: title == null || title == "" ? false : title,
                skin: 'layui-layer-rim', //加上边框
                area: [width + "px", height + "px"],//宽高
                border: [6, 0.3, '#000000', true],
                //offset: (($(window).height() < height ? height + 40 : $(window).height()) - height) / 2 + 'px',
                content: content,
                cancel: function (index) {
                    if (cancelcallback != null && typeof (cancelcallback) === "function") {
                        cancelcallback();
                    }
                }
            });
        }
    },
    ckplayer: {
        mp4: function (id, videoUrl, imageUrl, width, height) {
            if (imageUrl == null || imageUrl == "" || typeof (imageUrl) !== "string") {
                //默认图片
                imageUrl = "/";
            }
            if (width == null || width == "" || isNaN(width) || Number(width) <= 0) {
                width = 480;
            }
            if (height == null || height == "" || isNaN(height) || Number(height) <= 0) {
                height = 270;
            }


            var flashvars = {
                f: videoUrl,
                i: imageUrl,
                s: 2,
                c: 0
            };
            var params = { bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent' };
            var video = [videoUrl + '->video/mp4'];
            CKobject.embed('/tools/ckplayer6.7/ckplayer/ckplayer.swf', id, 'ckplayer_' + id, "100%", "100%", false, flashvars, video, params);
        }
    },
    ueditor: function (params) {
        var multiParams = {
            id:'',
            simpleMode:'simplest',
            initialFrameHeight: 150,
            scaleEnabled:false,//固定高度
            pasteplain:false,//复制是否带有格式
            maximumWords:500//最大字数限制
        };
        var allParams = $.extend({},multiParams,params);
        var ue;
        if (allParams.simpleMode != "simplest" && allParams.simpleMode) {
            ue = UE.getEditor(allParams.id, {
                enableAutoSave: false,
                pasteplain: allParams.pasteplain,
                scaleEnabled: allParams.scaleEnabled,
                saveInterval: 5000000,
                elementPathEnabled: false,
                toolbarTopOffset:150,
                maximumWords: allParams.maximumWords,
                initialFrameHeight: 150,
                wordCountMsg: "您还可以输入{#leave} 个字符",
                wordOverFlowMsg: '<span style="color:red;">字符个数已经超出最大允许值</span>',
                zIndex:99,
                toolbars: [[
                    // 'indent', //首行缩进
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    //'fontborder', //字符边框
                    //'strikethrough', //删除线
                    //'subscript', //下标
                    //'superscript', //上标
                    '|',
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    //'justifyjustify', //两端对齐
                    // 'forecolor', //字体颜色
                    //'backcolor', //背景色
                    // '|',
                    //'fontfamily', //字体
                    //'fontsize', //字号
                    //'paragraph', //段落格式
                    '|',
                    //'link', //超链接
                    'emotion', //表情
                    'scrawl',//涂鸦
                    'simpleupload', //单图上传
                    //'insertimage', //多图上传
                    // 'insertvideo', //视频
                    //'attachment', //附件
                    // 'map', //Baidu地图
                    // 'searchreplace', //查询替换
                    // 'horizontal', //分隔线
                    // 'fullscreen', //全屏
                    ""
                ]]
            });
        }else if(allParams.simpleMode == "simplest"){
            ue = UE.getEditor(allParams.id, {
                enableAutoSave: false,
                pasteplain: allParams.pasteplain,
                scaleEnabled: allParams.scaleEnabled,
                initialFrameHeight: 150,
                saveInterval: 5000000,
                elementPathEnabled: false,
                toolbarTopOffset:150,
                maximumWords: allParams.maximumWords,
                wordCountMsg: "您还可以输入{#leave} 个字符",
                wordOverFlowMsg: '<span style="color:red;">字符个数已经超出最大允许值</span>',
                zIndex:99,
                toolbars: [[
                    // 'indent', //首行缩进
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    //'fontborder', //字符边框
                    //'strikethrough', //删除线
                    //'subscript', //下标
                    //'superscript', //上标
                    '|',
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    //'justifyjustify', //两端对齐
                    // 'forecolor', //字体颜色
                    //'backcolor', //背景色
                    // '|',
                    //'fontfamily', //字体
                    //'fontsize', //字号
                    //'paragraph', //段落格式
                    '|',
                    //'link', //超链接
                    //'emotion', //表情
                    // 'scrawl',//涂鸦
                    'simpleupload', //单图上传
                    //'insertimage', //多图上传
                    // 'insertvideo', //视频
                    //'attachment', //附件
                    // 'map', //Baidu地图
                    // 'searchreplace', //查询替换
                    // 'horizontal', //分隔线
                    // 'fullscreen', //全屏
                    ""
                ]]
            });
        } else {
            ue = UE.getEditor(allParams.id, {
                enableAutoSave: false,
                saveInterval: 5000000,
                initialFrameHeight: 150,
                pasteplain: allParams.pasteplain,
                scaleEnabled: allParams.scaleEnabled,
                elementPathEnabled: false,
                toolbars: [[
                    'indent', //首行缩进
                    'bold', //加粗
                    'italic', //斜体
                    'underline', //下划线
                    'fontborder', //字符边框
                    'strikethrough', //删除线
                    'subscript', //下标
                    'superscript', //上标
                    '|',
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    '|',
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    '|',
                    'link', //超链接
                    'inserttable', //插入表格
                    'deletetable', //删除表格
                    'emotion', //表情
                    'scrawl',//涂鸦
                    'simpleupload', //单图上传
                    //'insertimage', //多图上传
                    //'insertvideo', //视频
                    'attachment', //附件
                    //'map', //Baidu地图
                    'searchreplace', //查询替换
                    'horizontal', //分隔线
                    'preview', //预览
                    'fullscreen' //全屏
                ]]
            });
        }

        return ue;
    },
    jcrop: function (obj, aspectRatio, showObj) {
        var jcrop_api,
            boundx,
            boundy,
            preview = false,
            ie7 = false;

        if (typeof (showObj) === "object") {
            //$(showObj).css({ "display": "block", overflow: "hidden" }).html('<img src="' + $(obj).attr("src") + '" alt="Preview" />');

            $(showObj).children("img").attr("src", $(obj).attr("src"));
            preview = true;
        }

        if (navigator.appName == "Microsoft Internet Explorer") {
            if (document.documentMode < 8 || navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
                ie7 = true;
            }
        }


        $(obj).Jcrop({
            onChange: updatePreview,
            onSelect: updatePreview,
            keySupport: !ie7,
            bgColor: "#fff",
            shadeColor: "#000",
            bgOpacity: 0.3,
            aspectRatio: aspectRatio,
            onRelease: function () { }
        }, function () {

            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            jcrop_api = this;
            jcrop_api.animateTo([0, 0, 1000, 1000]);

        });
        function updatePreview(c) {
            if (parseInt(c.w) > 0) {
                if (preview) {
                    $(showObj).each(function (i) {
                        var rx = $(this).width() / c.w;
                        var ry = $(this).height() / c.h;
                        $(this).find("img").css({
                            width: Math.round(rx * boundx) + 'px',
                            height: Math.round(ry * boundy) + 'px',
                            marginLeft: '-' + Math.round(rx * c.x) + 'px',
                            marginTop: '-' + Math.round(ry * c.y) + 'px'
                        });
                    });
                }
            }
        };

        return function () { return jcrop_api; };
    },
    uploadFile:function(id, events, params) {

        var plupload_params = {
            browse_button: id,
            url: common.remoteUpload + '/file/upload',
            multipart_params: {},
            flash_swf_url: "/tools/plupload/js/Moxie.swf",
            runtimes: "html5,flash,silverlight,html4",
            multi_selection: true,
            unique_names: true,
            chunk_size: "10MB",
            filters: {
                mime_types: [
                    {
                        title: "All Files",
                        extensions: "docx,doc,ppt,pptx,xls,xlsx,wps,et,dps,pdf,txt,jpg,jpeg,gif,png,bmp,tif,swf,flv,mp3,mp4,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mov,zip,rar,7z"
                    }],
                max_file_size: "1GB",
                prevent_duplicates: true
            }
        }


        if (typeof (params) !== "undefined" && params != null) {
            if (typeof (params.file_type) !== "undefined" && params.file_type != null) {
                switch (params.file_type) {
                    case "image":
                        plupload_params.filters.mime_types[0].title = "Image Files";
                        plupload_params.filters.mime_types[0].extensions = "jpg,jpeg,gif,png,bmp,tif";
                        plupload_params.filters.max_file_size = "2MB";
                        break;
                    case "video":
                        plupload_params.filters.mime_types[0].title = "Video Files";
                        plupload_params.filters.mime_types[0].extensions = "swf,flv,mp3,mp4,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mov";
                        plupload_params.filters.max_file_size = "1GB";
                        break;
                    case "video2":
                        plupload_params.filters.mime_types[0].title = "Video Files";
                        plupload_params.filters.mime_types[0].extensions = "swf,flv,mp4,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mov";
                        plupload_params.filters.max_file_size = "1GB";
                        break;
                    case "office":
                        plupload_params.filters.mime_types[0].title = "Office Files";
                        plupload_params.filters.mime_types[0].extensions = "docx,doc,ppt,pptx,xls,xlsx,wps,et,dps,pdf,txt,html";
                        plupload_params.filters.max_file_size = "200MB";
                        break;
                    default:
                        break;
                }
            }
            if (typeof (params.url) !== "undefined" && params.url != null && params.url != "") {
                plupload_params.url = params.url;
            }
            if (typeof (params.multipart_params) !== "undefined" && params.multipart_params != null) {
                plupload_params.multipart_params = params.multipart_params;
            }
            if (typeof (params.multi_selection) !== "undefined" && params.multi_selection == false) {
                plupload_params.multi_selection = false;
            }
            if (typeof (params.chunk_size) !== "undefined" && params.chunk_size != null && params.chunk_size!="") {
                plupload_params.chunk_size = params.chunk_size;
            }

            if (typeof (params.extensions) !== "undefined" && params.extensions != null && params.extensions != "") {
                plupload_params.filters.mime_types[0].extensions = params.extensions;
            }
            if (typeof (params.max_file_size) !== "undefined" && params.max_file_size != null && params.max_file_size != "") {
                plupload_params.filters.mime_types[0].max_file_size = params.max_file_size;
            }
        }

        //实例化一个plupload上传对象
        var up = new plupload.Uploader(plupload_params);

        //初始化上传控件
        up.init();

        up.bind("Init",function(uploader){
            if (typeof (events) !== "undefined" && typeof (events.FilesAdded) != "undefined"&&typeof( events.Init)=="function") {
                events.Init(uploader);
            }
        });

        //错误异常
        up.bind('Error', function (uploader, error) {
            var message;
            switch (uploader.settings.filters.mime_types[0].title) {
                case "Image Files":
                    message = "图片";
                    break;
                case "Video Files":
                    message = "视频";
                    break;
                case "Office Files":
                    message = "文档";
                    break;
                default:
                    message = "文件";
                    break;

            }
            switch (error.code) {
                case -600:
                    message = message+"大小限制为" + uploader.settings.filters.max_file_size;
                    break;
                case -601:
                    message = message + "上传格式有误";
                    break;
                case -602:
                    message = error.file.name + "已上传，请勿重复操作";
                    break;
                default:
                    message = message + "上传失败";
                    break;
            }
            up.removeFile(error.file);
            if (typeof (events) !== "undefined" && typeof (events.Error) != "undefined") {
                events.Error(uploader, error.file, message);
            }
        });

        /* up.bind("BeforeUpload", function (uploader, file) {
         var multipart_params = up.settings.multipart_params;
         multipart_params = $.extend(multipart_params, {
         "UniqueCode": file.id,
         "date": new Date().getTime().toString()
         });
         up.setOption("multipart_params", multipart_params);

         if (typeof (events) !== "undefined" && typeof (events.BeforeUpload) != "undefined") {
         events.BeforeUpload(uploader, file);
         }
         });*/

        up.bind("BeforeUpload", function (uploader, file) {
            // alert( $("#userToken").val());

            // console.log($("#userToken").val());

            var multipart_params = up.settings.multipart_params;
            multipart_params = $.extend(multipart_params, {
                "UniqueCode": file.id,
                "date": new Date().getTime().toString()
            });
            multipart_params["userToken"] = $("#userToken").val();
            up.setOption("multipart_params", multipart_params);

            if (typeof (events) !== "undefined" && typeof (events.BeforeUpload) != "undefined") {
                events.BeforeUpload(uploader, file);
            }
        });

        up.bind('FilesAdded', function (uploader, files) {
            if (typeof (events) !== "undefined" && typeof (events.FilesAdded) != "undefined") {
                events.FilesAdded(uploader, files);
            }
        });

        up.bind('FilesRemoved', function (uploader, files) {
            if (typeof (events) !== "undefined" && typeof (events.FilesRemoved) != "undefined") {
                events.FilesRemoved(uploader, files);
            }
        });

        up.bind('FileUploaded', function (uploader, file, responseObject) {
            if (typeof (events) !== "undefined" && typeof (events.FileUploaded) != "undefined") {
                events.FileUploaded(uploader, file, responseObject);
            }
        });
        up.bind('UploadProgress', function (uploader, file) {
            if (typeof (events) !== "undefined" && typeof (events.UploadProgress) != "undefined") {
                if (file.percent != 100) {
                    events.UploadProgress(uploader, file);
                }
            }
        });
        //分片上传事件
        up.bind('ChunkUploaded', function (uploader, file, responseObject) {
            if (typeof (events) !== "undefined" && typeof (events.ChunkUploaded) != "undefined") {
                events.ChunkUploaded(uploader, file, responseObject);
            }
        });
        up.bind('UploadComplete', function (uploader, file) {
            if (typeof (events) !== "undefined" && typeof (events.UploadComplete) != "undefined") {
                events.UploadComplete(uploader, file);
            }
        });
    },
    columnContour:function(){
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $('.g-column').each(function() {
            $el = $(this);
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
// we just came to a new row. Set all the heights on the completed row
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].outerHeight(currentTallest);
                }
// set the variables for the new row
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.outerHeight();
                rowDivs.push($el);
            } else {
// another div on the current row. Add it to the list and check if it's taller
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);
            }
// do the last row
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].outerHeight(currentTallest);
            }
        });
    }
}

