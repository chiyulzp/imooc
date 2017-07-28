$(function(){
	$(".menu_panel").mouseenter(function(){
		$(".menu_map").fadeIn();
	}).mouseleave(function(){
		$(".menu_map").fadeOut();
	});
	
	var count=0;
	$(".toggle_ul").mouseenter(function(){
		$(this).find(".hide_map").animate({"height":"0"});
		$(this).find(".toggle").mouseenter(function(){
			$(this).find(".hide_map").stop().animate({"height":"69"});
		}).mouseleave(function(){
			$(this).find(".hide_map").stop().animate({"height":"0"});
			count=$(this).index();
		});
	}).mouseleave(function(){
		$(this).children().eq(count).find(".hide_map").stop().css("height",69);
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
		
			$(".newProduct .time .hours").html(hours);
			$(".newProduct .time .minutes").html(minutes);
			$(".newProduct .time .seconds").html(seconds);
		}
		
		function add(num){
			return num<10?(num="0"+num):num;
		}
		
	});
	
	/*倒计时*/
	$(function(){
		var dis=$(".stage_img li").eq(0).width();
		var len=$(".stage_img li").length;		
		$(".stage_img").css("width",dis*len);
		var count=0;
		var timer=null;
		timer=setInterval(foo,2000);
		function foo(){
			count++;
			if(count>len-1){
				count=0;
			}
			$(".stage_nav a").removeClass("active");
				$(".stage_nav a").eq(count).addClass("active");
			$(".stage_img").stop(true).animate({"left":-dis*count});
		};
		
		
		$(".stage_nav a").mouseover(function(){
			clearInterval(timer);
			count=$(this).index()-1;
			foo();
			timer=setInterval(foo,5000);
		});
	});
	
	
	$(function(){
		$(".menu_list>li:odd .border_left").css("background-color","#f7f1f1");
		$(".menu_list>li").mouseenter(function(){
			$(this).find(".hideMenu").stop(true,true).fadeIn();
		}).mouseleave(function(){
			$(this).find(".hideMenu").stop(true,true).fadeOut();
		});
	})
	
	$(function(){
		var scrolltop=$(".left_scroll_banner").offset().top;
		
		$(window).scroll(function(){
			var height=$(".left_scroll_banner").height();
			var footerHeight=$(".footer").offset().top-32-height;
			if($(window).scrollTop()>scrolltop && $(window).scrollTop()<footerHeight){
				$(".left_scroll_banner").css({"position":"fixed","top":0});
			}else if($(window).scrollTop()>=footerHeight){
				$(".left_scroll_banner").css({"position":"absolute","top":footerHeight});
			}else{
				$(".left_scroll_banner").css({"position":"absolute","top":scrolltop});
			}
		})
	});
	
	$(function(){
		var distance=$("#JS_comment_list_stage .list").outerHeight();
		var longAll=$("#JS_comment_list_stage").height();
		var timer03=null;
		var margin_top=0;
		var flag=true;
		timer03=setInterval(function(){
			if(margin_top>=longAll-$(".outBox").height()){
				flag=false;
			}else if(margin_top<distance){
				flag=true;
			}
			if(flag){
				margin_top+=distance;
			}else{
				margin_top-=distance;
			}
			
			$("#JS_comment_list_stage").animate({"margin-top":-margin_top});
		},3000);
	});
	
	$(function(){
		var distance=$("#INDEX_LeiHao_XXXXX .list").outerHeight();
		var longAll=$("#INDEX_LeiHao_XXXXX").height();
		var timer03=null;
		var margin_top=0;
		var flag=true;
		timer03=setInterval(function(){
			if(margin_top>=longAll-$(".outBox").height()){
				flag=false;
			}else if(margin_top<distance){
				flag=true;
			}
			if(flag){
				margin_top+=distance;
			}else{
				margin_top-=distance;
			}
			
			$("#INDEX_LeiHao_XXXXX").animate({"margin-top":-margin_top});
		},3000);
	});
});
