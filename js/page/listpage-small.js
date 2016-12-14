require(['../baseConfig'],function () {
    require(['ajaxDataController','domReady','avalon'],function (ajaxDataController,domReady,avalon) {
        $(".g-container").prepend(common.global.header());
        $("body").append(common.global.footer());
        $("#Pagination").pagination('10', {
            items_per_page: 3,//每页显示行数
            num_edge_entries: 3,//省略号前后显示页数
            num_display_entries: 5,//省略号前默认显示页数
            current_page: 0,
            link_to: "javascript:void(0)",//页数链接
            prev_text: "上一页",
            next_text: "下一页"
        });

        var vm = avalon.define({
            $id:'smallMg',
            arr:[]
        });
        var vm2 = avalon.define({
            $id:'smallmoreMg',
            arr:[]
        })
        var vm3 = avalon.define({
            $id:'filt',
            arr:[],
            showsnd:function($event){
                $($event.currentTarget).find('.m-flitSecond').removeClass('hidden');
            },
            hidesnd:function($event){
                $($event.currentTarget).find('.m-flitSecond').addClass('hidden');
            }
        })
        common.getStaticJson('indexList.json',function(data){
            vm.arr = data.resultObject;
            vm2.arr = data.resultObject;
            vm3.arr = data.resultObject;
        })
        avalon.scan(document.body);
    })
})