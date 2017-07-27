$(function(){
	
	//第几页
	var pageMore=0;
	
	$.ajax({
		type:"get",
		url: "dataBase/courseData.txt",
		async: true,
		success: function(str){
			$(".imoocList").empty();
			pageMore=0;
			createItems(str,pageMore);
		}
	});
	
	$(".course_class li").on("touchstart",function(){
		$(".course_class li").removeClass("active");
		$(this).addClass("active");
		$(".more span").html("点击加载更多");

		$.ajax({
			type: "get",
			//取得数据
			url: "dataBase/courseData.txt",
			async: true,
			success: function(str){
				//清空ul
				$(".imoocList").empty();
				pageMore=0;
				createItems(str,pageMore);
			}
		})
	})
	
	
	$(".more span").on("touchstart",function(){
		$.ajax({
			type: "get",
			//取得数据
			url: "dataBase/courseData.txt",
			async: true,
			success: function(str){
				pageMore++;
				createItems(str,pageMore);
			}
		})
	})
	
	
})


function createItems(str,page) {
	console.log(page);
	//转换成json格式
	str = JSON.parse(str);
	//类型
	var type = $(".course_class li.active").index();
//	console.log(type);
//	console.log(str[type][page].data.courselist[0]);
	if(str[type][page]){
		//创建元素
		var oUl = $(".imoocList")[0];
		for(var i = 0; i < str[type][page].data.courselist.length; i++) {
			var oLi = document.createElement("li");
			oLi.className = "col-lg-3 col-md-4 col-sm-4 col-xs-6";
			oLi.innerHTML = '<a href="javascript:;"><img src="' +
				str[type][page].data.courselist[i].pic + '" alt="" /><div class="info"><p class="listName">' +
				str[type][page].data.courselist[i].name + '</p><p class="detail"><span class="rank">' +
				str[type][page].data.courselist[i].level + '</span><em>·</em><span class="personsNum">' +
				str[type][page].data.courselist[i].numbers + '人学习</span></p></div></a>';
			//添加到ul标签里
			oUl.append(oLi);
		}
	}else{
		$(".more span").html("没有更多的啦~\(≧▽≦)/~");
	}
}