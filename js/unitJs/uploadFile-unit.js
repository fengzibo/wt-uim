common.uploadFile = function(id, events, params) {
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
}