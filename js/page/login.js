require(['../baseConfig'],function () {
    require(['ajaxDataController','common','uploadFile'],function (ajaxDataController,common) {
        $(".g-container").prepend(common.global.loginBar());
        $("body").append(common.global.footer());
        $("#j_acquire").on('click', function () {
            var acq = $(this);
            var count = 60;
            acq.addClass('disabled');
            acq.attr("disabled", "disabled");
            countdown();
            var acqtime = setInterval(countdown, 1000);

            function countdown() {
                acq.text(count + "秒后重新获取");
                if (count == 0) {
                    acq.removeClass('disabled');
                    acq.removeAttr("disabled");
                    acq.text('获取');
                    clearInterval(acqtime);
                }
                ;
                count--;
            }
        });
   /*     var params = {
            id:'editor',
            simpleMode:'simplest',
            initialFrameHeight: 150,
            scaleEnabled:false,//固定高度
            pasteplain:false,//复制是否带有格式
            maximumWords:500//最大字数限制
        };
        var  editor_demo = common.ueditor(params);
*/
     /*   function upload(id, callback) {
            var events = {
                FilesAdded: function (uploader, files) {
                    var file = files[0];
                    uploader.start();
                },
                FileUploaded: function (uploader, file, responseObject) {
                    if (responseObject.status == 200) {
                        var res = JSON.parse(responseObject.response);
                        if (res.status == 200) {
                            if (callback != null && typeof (callback) === "function") {
                                callback(file, res.data);
                            }
                            uploader.removeFile(file);
                            return;
                        }
                    }
                    uploader.removeFile(file);
                    common.layer.fail("上传失败");
                },
                Error: function (uploader, file, message) {
                    common.layer.alert(message);
                }
            }
            var params = {
                file_type: "image", //上传的文件类型(可选 image、video、office, 默认全部文件)
                url: null,//上传地址(默认)
                multipart_params: { refRelationCategory: "OTHER_IMAGE_LOCATIONT" },//附加参数
                multi_selection: false,//文件选择框是否可多选(默认 可多选)
                chunk_size: "0",//切片大小(默认10MB，设置为0时不切片)
                extensions: "",// 可上传的文件后缀名(默认全部文件)
                max_file_size: "2MB"//单个文件限制大小 (默认1GB，file_type为image时默认2MB，file_type为video时默认1GB，file_type为office时默认200MB)
            };
            common.uploadFile(id, events, params);
        }


        upload("uploadId", function (file, data) {
            $("#upload-front").attr("src","/upload/"+data.filePath);
        });*/
    })
})