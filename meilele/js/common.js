$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop()>=700){
			$("#scroll_head").stop().animate({"top":"0"});
		}else{
			$("#scroll_head").stop().animate({"top":"-50"});
		}
		
	});
	$(".menu_map>li").mouseenter(function(){
		$(this).stop().animate({"padding-left":"5"},200);
		$(this).find(".sub").animate({"display":"block","padding-left":"15"},200);
	}).mouseleave(function(){
		$(this).stop().animate({"padding-left":0},200);
		$(this).find(".sub").animate({"display":"none","padding-left":"10"},200);
	})
});
