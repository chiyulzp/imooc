$(function(){
	$(window).scroll(function(){
//		console.log($(window).scrollTop());
		var wTop=$(window).scrollTop();
		if(wTop>$(".o2o_back").offset().top-60){
			$("#JS_fixed").css("position","fixed");
			$("#JS_fixed").css("top",0);
		}else{
			$("#JS_fixed").css("position","absolute");
			$("#JS_fixed").css("top",444);
		}
		
		$("#JS_fixed .photo").css("background-position",null);
		if(wTop<$("#purchase").offset().top-200){
			$(".one .photo").css("background-position","0 -61px");
		}else if(wTop>$("#purchase").offset().top-200 && wTop<=$("#bso").offset().top-200){
			$(".two .photo").css("background-position","-60px -61px");
		}else if(wTop>$("#bso").offset().top-200 && wTop<=$("#quality").offset().top-200){
			$(".three .photo").css("background-position","-120px -61px");
		}else if(wTop>$("#quality").offset().top-200 && wTop<=$("#returns").offset().top-200){
			$(".four .photo").css("background-position","-180px -61px");
		}else if(wTop>$("#returns").offset().top-200 && wTop<=$("#postage").offset().top-200){
			$(".five .photo").css("background-position","-300px -61px");
		}else if(wTop>$("#postage").offset().top-200 && wTop<=$("#mouth").offset().top-200){
			$(".six .photo").css("background-position","-360px -61px");
		}else{
			$(".seven .photo").css("background-position","-420px -61px");
		}
		
	});
	
	for(var i=0;i<$("#JS_fixed ul li").length;i++){
		$("#JS_fixed ul li").eq(i).click(function(){
			$("html,body").stop(true);
			$("html,body").animate({scrollTop: $(".guarantee_center>div").eq($(this).index()).offset().top-180}, 1000);
		});
	}
		
	$("#Fchat1 .shouqi").click(function(){
		$(this).parent().css("display","none");
		$("#Fchat2").css("display","block");
	});
	$("#Fchat2").click(function(){
		$(this).css("display","none");
		$("#Fchat1").css("display","block");
	})
})
