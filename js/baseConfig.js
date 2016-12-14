require.config({
    map: {
        '*': {
            'css': 'css'
        }
    },
    paths : {
        "jQuery" : ["/js/jquery1.11.3.min"],
        "avalon": ["/js/avalon"],
        "domReady": ["/js/domReady"],
        "wtPublicJsjs":["/js/wtPulblicJsjs"],
        "pagination":["/js/pagination/jquery.pagination"],
        "layui":["/js/layui/layui"],
        "ZeroClipboard":["/js/ueditor/third-party/zeroclipboard/ZeroClipboard.min"],
        "ueditor":["/js/ueditor/ueditor.all.min"],
        "ueditorConfig":["/js/ueditor/ueditor.config"],
        "ueditorUnit":["/js/unitJs/ueditor-unit"],             //富文本编辑器

        "plupload":["/js/plupload/js/plupload.full.min"],
        "uploadFileUnit":["/js/unitJs/uploadFile-unit"],        //文件上传

        "common":["/js/common"],
        "ajaxDataController":["/js/ajaxDataController"]

    },
    shim: {
        jQuery: {
            exports: 'jQuery'
        },
        domReady:{
            exports: 'domReady'
        },
        ZeroClipboard:{
            exports:'ZeroClipboard'
        },
        avalon:{
            avalon: 'avalon'
        },
        layui:{
            deps: ['jQuery','css!../layui/css/layui'],
            exports: "layui"
        },
        ajaxDataController:{
            deps: ['jQuery','common','layui'],
            exports: "ajaxDataController"
        },
        ueditor:{
            deps: ['ueditorConfig','ZeroClipboard'],
            exports:"ueditor"
        },
        plupload:{
            exports:"plupload"
        },
        uploadFileUnit:{
            deps: ['plupload','common'],
            exports:"uploadFile"
        },
        uueditorUnit:{
            deps: ['ueditor','common'],
            exports:'ueditorUnit'
        },
        editorUnit:{
            deps: ['ueditor','common'],
            exports:'ueditorUnit'
        },
        pagination:{
            deps: ['jQuery'],
            exports: "pagination"
        },
        common:{
            deps: ['jQuery','layui','pagination'],
            exports: "common"
        }
    }
})