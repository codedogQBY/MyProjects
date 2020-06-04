$(function(){
    load();
    //输入框提示
    $("#things").on({
        keydown : function(event){
            if(event.keyCode == 13){
               if($(this).val() == ""){
                   alert("请输入便签内容");
               }else{
                var local = getData();
                //把用户输入的数据追加到local数组中
                local.push({title : $("#things").val() ,done : false});
                //把local数组存储到本地存储
                saveDate(local);
                load();
                $(this).val("");
                $(this).blur();//按下回车键后失去焦点，防止二次提交
               }
            }
        }
    });

    //读取本地存储的数据
    function getData(){
        var data = localStorage.getItem("noteList");
        if(data != null){
            //注意：本地存储的数据是字符串格式，需要转换为对象
            return  JSON.parse(data);
        }else{
            //为空返回空数组
            return [];
        }
    }

    //保存本地存储数据
    function saveDate(data) {
        //此处要将数组中的内容转换为字符串
        localStorage.setItem("noteList",JSON.stringify(data));
    }

    //渲染页面的函数
    function load(){
        //读取本地存储的数据
        var data = getData();
        //清空ol和ul
        $("ol").empty();
        $("ul").empty();

        //统计完成和未完成的个数
        var todoCount = 0;
        var doneCount = 0;
        //遍历数据
        $.each(data,function(index , ele){
            //判断该事件是否完成，完成渲染到ul里,否则渲染到ol里
            if(ele.done){
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;' index = "+index+"><img src=''></a></li>");
                $("ul a img").prop("src","img/delete_.png");
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' index = "+index+"><img src=''></a></li>");
                $("ol a img").prop("src","img/delete.png");
                todoCount++;
            }
        });
        $(".doing .thing-num").html(todoCount);
        $(".did .thing-num").html(doneCount);
    }

    //删除提示
    $("ol , ul").on("click" , "a" ,function(){
        //获取本地存储
        var data = getData();
        //修改数据
        var index = $(this).attr("index");
        data.splice(index , 1);
        //重新保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });

    //完成和未完成之间的切换
    $("ol ,ul").on("click" , "input" ,function(){
        //获取本地存储数据
        var data = getData();
        //修改数据
        var index = $(this).siblings("a").attr("index");
        data[index].done = $(this).prop("checked");
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });

    $("#submit").on("click" , function(){
        if($("#things").val() == ""){
            alert("请输入便签内容");
        }else{
            var local = getData();
            //把用户输入的数据追加到local数组中
            local.push({title : $("#things").val() ,done : false});
            //把local数组存储到本地存储
            saveDate(local);
            $("#things").val("");
            load();
        }
    });
})