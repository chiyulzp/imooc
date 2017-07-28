$(function(){
	var len=$("#control_ol").children().length;
	for(var i=0;i<len;i++){
		$("#control_ol li").eq(i).mouseenter(slideCard);
	}
	
	$("#show_img_ul").mouseover(function(){
		clearInterval(handler);
	});
	$("#show_img_ul").mouseout(function(){
		handler=setInterval(foo,5000);
	});
	function slideCard(){
		clearInterval(handler);
		
		for(var j=0;j<len;j++){
			$("#control_ol li").eq(j).removeClass("on");
			$("#show_img_ul li").eq(j).fadeOut().removeClass("active");
			$("#show_img_ul .show_img").eq(j).css("left",-50);
			$("#show_img_ul .img_info").eq(j).css("right",100);
		};
		$(this).addClass("on").show();
		$("#show_img_ul li").eq($(this).index()).stop(true,true).fadeIn().addClass("active");
		$("#show_img_ul .show_img").eq($(this).index()).stop(true,true).animate({"left":"0"},2000);
		$("#show_img_ul .img_info").eq($(this).index()-2).stop(true,true).animate({"right":"150"},2000);
		
		if($(this).index()==0){
			$(".show_big_img").css("background","rgb(35, 53, 60)");
		}else if($(this).index()==1){
			$(".show_big_img").css("background","rgb(232, 243, 249)");
		}else if($(this).index()==2){
			$(".show_big_img").css("background","rgb(214, 223, 225)");
		}else{
			$(".show_big_img").css("background","rgb(241, 234, 230)");	
		}
		
		count=$(this).index();
		handler=setInterval(foo,5000);
	}
	var count=0;
	
	var handler=setInterval(foo,5000);
	function foo(){
		count++;
		if(count>$("#control_ol li").length-1){
			count=0;
		}
		$("#control_ol li").eq(count).trigger("mouseenter");
	}
	
	$.ajax({
		type: "get",
		url: "http://www.meilele.com/solr_api/jmll/advert/get.do?url=http://www.meilele.com/&adCode=ad_group_2,ad_group_10,ad_group_1,ad_group_7,ad_group_3,ad_group_4,center_ad,rb_remind_ad,ad_group_11,ad_group_12,ad_group_13,ad_group_14&cityId=0",
		data: {
		},
		async: true,
		dataType: 'jsonp',
		jsonp: "callback",
		success: function(str) {
			var html="";
			html=str.data.ad_group_3.desc;
			html="☆__盛 夏 热 惠__☆超值好礼·免费抽取"
			$("#TodayNews").html(html);
		}
	});
	setTimeout(function(){
		$(".message").css("display","none");
	},8000)
	
	$(".con_btn").mouseenter(function(){
		$(this).children().mouseenter(function(){
			clearInterval(timer);
			for(var j=0;j<$(this).parent().children().length;j++){
				$(this).parent().children().removeClass("active");
				$(this).parent().parent().children("li").eq(j).fadeOut("slow").removeClass("active");
			}
			$(this).addClass("active");
			$(this).parent().parent().children("li").eq($(this).index()).stop(true,true).fadeIn("slow").addClass("active");
			num=$(this).index();
			timer=setInterval(foo2,5000);
		});
	});

	var num=0;
	var timer=setInterval(foo2,5000);
	function foo2(){
		num++;
		if(num>$(".con_btn").children().length-1){
			num=0;
		}
		$(".con_btn").children().eq(num).trigger("mouseenter");
	}
	
	$(".floor .select_Ul li").mouseover(function(){
		$(this).parent().children().removeClass("active");
		$(this).parent().parent().parent().find(".right_img").removeClass("active");
		
		$(this).addClass("active");
		$(this).parent().parent().parent().find(".right_img").eq($(this).index()).addClass("active");
	})
	
	$("#search_Input").focus(function(){
		if($(this).val()==""){
			$(this).attr("placeholder","");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).attr("placeholder","粽享美乐乐，满6000减500，端午特惠，抽iphone>>>");
		}
	})
	
	$(function(){
		$(".JS_ajax").mouseenter(function(){
			$(".ajax_div").css("display","block");
			$.ajax({
				type:"get",
				url:'d.txt',
				async:true,
				dataType:"json",
				success:function(data){
					var html="";
					var hot=data.city_list_json.host_city_list;
					html+="<p class='hot_city'>全国"
					for(var i=0;i<hot.length;i++){
						html+="<a href='javascript:;'>"+hot[i].n+"</a>";
					}
					html+="</p><p class='letter_word'>";
					var all=data.city_list_json.city_list;
					for(var key in all){
						html+="<a href='javascript:;'>"+key+"</a>";
					}
					html+="</p>";
					html+="<div class='move_box' style='overflow: hidden;width:400px;height:280px;position:relative'> <div class='need_move' style='position:absolute;top:0;'>"
					for(var key in all){
						html+="<p style='margin' class='letter_"+key+"'>"+"<span style='background:#555;color:#fff;border-radius:50%;width:18px;height:18px;padding:0 4px;' class='key_word'>"+key+"</span>";
						for(var i=0;i<all[key].length;i++){
							html+="<a href='javascript:;'>"+all[key][i].n+"</a>";
						}
						html+="</p>";
					}
					html+="</div></div>"
					$(".ajax_div").html(html);
					
					$(".letter_word a").click(function(){
						var distance=$(".need_move p").eq($(this).index()).position().top;
						console.log(distance);
						$(".need_move").stop(true).animate({"margin-top":-distance});
					})
					
				},
			});
		}).mouseleave(function(){
			$(".ajax_div").css("display","none");
			$(".ajax_div").empty();
		})
		
		
		
	})
	
});