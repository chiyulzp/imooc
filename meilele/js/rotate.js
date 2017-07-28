$(function(){
	$(".rotatePan .close").click(function(){
		$(".rotatePan .box").animate({"scale":"0.2"},function(){
			$(".rotatePan").css("display","none");
			$(".smallrotate").css({"display":"block","bottom":"32%","right":"48%"});
			
			$(".smallrotate").stop(true).animate({"bottom":"30","right":"40"},1000);
		});
	});
	$(".smallrotate").mouseover(function(){
		$(".rotatePan .box").animate({"scale":1});
		$(".rotatePan").css("display","block");
		$(".smallrotate").css("display","none");
	})
})
