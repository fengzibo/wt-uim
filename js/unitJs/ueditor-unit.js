common.ueditor = function (params) {
    var multiParams = {
        id:'',
        simpleMode:'simplest',
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
}