$(function(){
	$(".fc_bottom li").mouseenter(function(){
		$(this).find("img").stop().animate({"left":"-10"});
		$(this).find(".buy").css("display","block");	
	});
	$(".fc_bottom li").mouseleave(function(){
		$(this).find("img").stop().animate({"left":"0"});
		$(this).find(".buy").css("display","none");	
	});
	
	$(function(){
		var timer;
		timer=setInterval(downTime,1000)
		downTime();
		function downTime(){
			var nowTime=new Date();
			var hours=23-nowTime.getHours();
			var minutes=59-nowTime.getMinutes();
			var seconds=59-nowTime.getSeconds();
			
			hours=add(hours);
			minutes=add(minutes);
			seconds=add(seconds);
		
			$(".ad_items .hours").html(hours);
			$(".ad_items .minutes").html(minutes);
			$(".ad_items .seconds").html(seconds);
		}
		
		function add(num){
			return num<10?(num="0"+num):num;
		}
		
	});
	
	$(function(){
		$(".major_list span").mouseover(function(){
			$(this).parent().children().removeClass("active");
			$(this).addClass("active");
			$(this).parent().parent().parent().find(".floor_content").removeClass("active");
			$(this).parent().parent().parent().find(".floor_content").eq($(this).index()).addClass("active");
		})
	});
	
	$(function(){
		var count=0;
		$(".nav ul .controler .next").click(function(){
			clearInterval(timer02);
			count++;
			$(this).parent().parent().children("li").removeClass("active");
			$(this).parent().prev().children("li").removeClass("active");
			if(count>2){
				count=0;
			}
			$(this).parent().parent().children("li").eq(count).addClass("active");
			$(this).parent().prev().children("li").eq(count).addClass("active");
			timer02=setInterval(auto,5000);
		});
		$(".nav ul .controler .prev").click(function(){
			clearInterval(timer02);
			count--;
			$(this).parent().parent().children("li").removeClass("active");
			$(this).parent().prev().children("li").removeClass("active");
			if(count<0){
				count=2;
			}
			$(this).parent().parent().children("li").eq(count).addClass("active");
			$(this).parent().prev().children("li").eq(count).addClass("active");
			timer02=setInterval(auto,5000);
		});
		for(var i=0;i<$(".nav ol li").length;i++){
			$(".nav ol li").eq(i).click(function(){
				clearInterval(timer02);
				count=$(this).index();
				$(this).siblings("li").removeClass("active");
				$(this).addClass("active");
				$(this).parent().parent().children("li").removeClass("active");
				$(this).parent().parent().children("li").eq($(this).index()).addClass("active");
				timer02=setInterval(auto,5000);
			})
		};
		
		var timer02;
		timer02=setInterval(auto,5000);
		
		function auto(){
			$(".nav ul .controler .next").trigger("click");
		}
		
	});
	
	
});
