$(function(){
	$(function(){
		var oImg = document.getElementById("picList");
		var iStartX; //触摸开始时，鼠标的X轴坐标
		var iMoveX; //触摸移动时，鼠标的X轴坐标
		var iEndX; //触摸结束时，鼠标的X轴坐标
		var isScroll; //判断是否滚动
		var count = 0; //记录第几张图片
		var timer = null; //图片轮播定时器
		var flag = false; //判断能否进入下一张
		//图片的数量
		var oLiLength = document.querySelectorAll("#picList img").length;
		//图片的宽度
		var oLiWidth = document.querySelectorAll("#picList img")[0].offsetWidth;
		//给包裹所有图片的父标签添加触摸事件
		oImg.addEventListener("touchstart", iStart);
		
		/*
		 * 一个小BUG： android只会触发一次touchstart，一次touchmove，touchend不触发。（4.0，4.1有，4.2修复没有了，4.4开始又出现了）
		 *	解决方案： 在touchmove中加入：event.preventDefault（），可fixedBug。
		 */
		//		document.addEventListener("touchmove",function(e){
		//			e.preventDefault();
		//		})
		
		//触摸开始时执行的函数
		function iStart(e) {
			clearInterval(timer);
			//记录X轴坐标
			iStartX = e.changedTouches[0].pageX;
			//取消过渡效果，为了在解决触摸移动时出现的延缓过渡效果
			$("#picList").css({
				"transition": ""
			});
			//触摸移动时执行
			oImg.addEventListener("touchmove", iMove);
			//触摸结束时执行
			oImg.addEventListener("touchend", iEnd);
		
		}
		//触摸移动时执行的函数
		function iMove(e) {
			//记录移动时X轴坐标
			iMoveX = e.changedTouches[0].pageX;
			//记录移动了多少距离
			var nowMove = iMoveX - iStartX;
			if(count == 0 && nowMove > 0) {
				nowMove = 0;
			}
			//移动图片
			$("#picList").css({
				"transform": "translateX(" + (-oLiWidth * count + nowMove) + "px)"
			});
		}
		//触摸结束时执行的函数
		function iEnd(e) {
			timer = setInterval(slide, 3000);
			//记录结束时的X轴坐标
			iEndX = e.changedTouches[0].pageX;
			//判断滚动的比率
			isScroll = (iStartX - iEndX) / window.screen.width;
			//比率小于-0.3就左移一张
			if(isScroll < -0.3) {
				count--;
				//比率小于-1.3就再左移一张
				if(isScroll < -1.3) {
					count--;
				}
				//不可小于第一张
				if(count < 0) {
					count = 0;
				}
			} else if(isScroll > 0.3) {
				count++;
				if(isScroll > 1.3) {
					count++;
				}
				if(count > $("#picList a").length - 1) {
					count = $("#picList a").length - 1;
				}
			}
			//添加过渡效果
			$("#picList").css("transition", "0.5s");
			//移动到相应的位置
			$("#picList").css({
				"transform": "translateX(" + (-oLiWidth * count) + "px)"
			});
			//小圆点也改变样式
			toggleActive($("#btns span"));
		}
		
		//每个两秒移动一张图片
		timer = setInterval(slide, 4000);
		
		function slide() {
			//添加过渡效果
			$("#picList").css("transition", "0.5s");
			count++;
			if(count > $("#picList a").length - 1) {
				count = 0;
			}
			$("#picList").css({
				"transform": "translateX(" + (-oLiWidth * count) + "px)"
			});
			toggleActive($("#btns span"));
		}
		
		//改变目标的类名，让它更换active
		function toggleActive(obj) {
			obj.removeClass("active");
			obj.eq(count).addClass("active");
		}
	})
	
	//随机选取
	var randomNum=0;
	//点击改变按钮时改变内容
	$("#change").on("touchstart",function(){
		changItems(1,randomNum,".learn");
	})
	
	var randomNum2=0;	//因为刷新，没有起作用
	changItems(1,randomNum2,".actual");
	
	changItems(2,randomNum2,".guest");
	
	
	function changItems(data,ranNum,obj){
		//调用ajax函数
		$.ajax({
			type: "get",
			//取得数据
			url: "dataBase/data"+data+".txt",
			async: true,
			success: function(str) {
				
				//随机选取
				var num = parseInt(Math.random() * 12);
				//防止与上一次的随机数相同
				for(; num == ranNum;) {
					num = parseInt(Math.random() * 12);
				}
				ranNum = num;
				//转换成json格式
				str = JSON.parse(str);
//				console.log(str);
				//需要改变的内容
				var img = $(obj+" .imoocList img");
				var listName = $(obj+" .imoocList .listName");
				var rank = $(obj+" .imoocList .rank");
				var personsNum = $(obj+" .imoocList .personsNum");
				//循环输出改变内容
				for(var i = 0; i < img.length; i++) {
//					console.log(i);
					img.eq(i).attr("src", str[num].data[i].pic);
					listName.eq(i).html(str[num].data[i].name);
					rank.eq(i).html(str[num].data[i].level);
					personsNum.eq(i).html(str[num].data[i].numbers + "人学习");
				}
			}
		});
	}
	
	
	var randomNum3=0;	
	$(".more").on("touchstart",function(){
		$.ajax({
			type: "get",
			//取得数据
			url: "dataBase/data2.txt",
			async: true,
			success: function(str) {
				//随机选取
				var num = parseInt(Math.random() * 12);
				//防止与上一次的随机数相同
				for(; num == randomNum3;) {
					num = parseInt(Math.random() * 12);
				}
				
				randomNum3 = num;
				//转换成json格式
				str = JSON.parse(str);
//				console.log(str[0].data[0]);
				
				//需要改变的内容
				var oUl=$(".guest .imoocList")[0];
				//循环输出改变内容
				for(var i=0;i<str[0].data.length;i++){
					var oLi=document.createElement("li");
					oLi.className="col-lg-3 col-md-4 col-sm-4 col-xs-6";
					oLi.innerHTML='<a href="javascript:;"><img src="'
					+str[num].data[i].pic+'" alt="" /><div class="info"><p class="listName">'
					+str[num].data[i].name+'</p><p class="detail"><span class="rank">'
					+str[num].data[i].level+'</span><em>·</em><span class="personsNum">'
					+str[num].data[i].numbers+'人学习</span></p></div></a>';
					//添加到ul标签里
					oUl.append(oLi);
				}
					
			
				//循环输出改变内容
//				for(var i = 0; i < img.length; i++) {
////					console.log(i);
//					img.eq(i).attr("src", str[num].data[i].pic);
//					listName.eq(i).html(str[num].data[i].name);
//					rank.eq(i).html(str[num].data[i].level);
//					personsNum.eq(i).html(str[num].data[i].numbers + "人学习");
//				}

			}
		});
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})