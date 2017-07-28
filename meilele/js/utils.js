
/**
 * 兼容IE6、IE7通过className获取对象
 * @param {Object} className		需要查找的class样式
 */
function getElementsByClassName(className){
	var tmp = [];			//保存根据class样式查找到的标签对象
	var all = document.getElementsByTagName('*');	// 得到文档里的所有标签
	for(var i=0, len=all.length;i<len;i++){
		var tag = all[i];
		var classNames = tag.className.split(' ');	// 有些标签不止一个类名 ，例如：class="classA classB"
		for (var j=0,length=classNames.length;j<length;j++){
			if (classNames[j] == className){
				tmp.push(tag);
				break;								// 如果其中一个已经符合条件，不需要再继续查找
			}
		}
	}
	return tmp;
}


//获取焦点是，提示内容去掉
	function focusEvent(obj){
		obj.onfocus=function(){
			this.placeholder="";
			this.onblur=function(){
				if(this.value==""){
					this.placeholder="请输入作品名称";
				}
			
			}
		}
	}



/*
 * 实现选项卡功能
 * @param {Object} obj01	鼠标滑过的地方
 * @param {Object} obj02    需要发生改变的地方
 * @param {Object} obj03    改变的方式;
 */
	function selectCard(obj01,obj02,methon){
		for(var i=0;i<obj01.length;i++){
			obj01[i].index=i;
			var obj01ClassName=obj01[i].className;
			var obj02ClassName=obj02[i].className;
			var arr1=obj01ClassName.split(" ");
			var arr2=obj02ClassName.split(" ");
			for(var j=0;j<arr1.length;j++){
				if(arr1[j]=="active"){
					arr1.splice(j,1);
				}
			}
			for(var k=0;k<arr2.length;k++){
				if(arr2[k]=="show"){
					arr2.splice(k,1);
				}
			}
			var str1=arr1.join(" ");
			var str2=arr2.join(" ");
			if(methon=="onclick"){
				obj01[i].onclick=changeCard;
			}else{
				obj01[i].onmouseover=changeCard;
			}
			function changeCard(){
				for(var k=0;k<obj01.length;k++){				
					obj01[k].className=str1;
					obj02[k].className=str2+" hide";
				}			
					this.className=str1+" active";
					obj02[this.index].className=str2+" show";
			}
		}
	}


/**
 * 实现简单的动画效果
 * @param {Object} obj				需要动画效果的盒子模式
 * @param {Object} json				需要修改部分的JSON数据格式
 * @param {Object} fn				动画完成后需要执行的其它代码
 */
function animation(obj, json, fn) {
	// 清空定时器
	clearInterval(obj.timeHandler);
	obj.timeHandler = setInterval(function() {
		// 增强的for循环，可用在数据或json数据格式中，把in后的数组的每次提取一条数组赋值给in前面声明的变量
		/*
		 * var arr = [1,2,3,4,5];
		 * for (var i=0;i<arr.length;i++){console.log(arr[i]);}
		 * for (var j in arr)}{console.log(j);}
		 * 两种遍历数组的方式都是一样的
		 */
		var stop = true;		// 默认需要执行完成本次定时任务后关闭定时器
		
		for (var attr in json) {	// attr得到的是json的key(键)
			// 当前位置
			var cur = css(obj,attr);
			var target = json[attr];
			// 判断是否需要结束动画
			if (cur != target) {
				// 计算速度
				var speed = (target - cur) / 10;
				//console.log(cur+','+target+','+speed)
				// 如果speed>0向上取整，其它情况向下同整
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (attr == 'opacity') {
					css(obj,attr,cur+speed);
				} else {
					css(obj,attr,cur+speed+"px");
					
				}
				stop = false;	// 只需要能执行动画就不能结束定时器
			}  
		}
		
		if (stop){
			// 结束动画，清空定时器
			clearInterval(obj.timeHandler);
			// 回调函数 ，调用者本身不执行回调函数的代码，是由调用的函数在某个时刻自动执行
			if (fn) { // 检查用是否有传递一个回调函数 
				fn();
			}
		}
	},30);

}



/**
 * 获取或修改盒子模型
 * @param {Object} obj		需要修改的盒子模型
 * @param {Object} attr		需要修改的属性
 * @param {Object} val		修改的内容
 */
function css(obj,attr,val) {
	//alert(val);
	if (arguments.length == 3 && val != undefined) { // 修改
		if (obj.currentStyle && attr == 'opacity') { // 如果返回的不是undefined(转换为false)就是IE浏览器
			obj.style.filter = 'alpha(opacity:' + val + ')';
		} else if (attr == 'opacity') {
			obj.style[attr] = val / 100;
		} else {
			//obj.style[attr] = val + 'px';
			obj.style[attr]=val;	
		}
	} else if (arguments.length == 2) { // 获取
		if (obj.currentStyle) {
			if (attr == 'opacity') {
				return parseInt(obj.currentStyle.filter.split(':'));
			} else {
				if(obj.currentStyle[attr]=="auto"){		//没有设置的属性默认auto;
					return 0;
				}else{
					return parseInt(obj.currentStyle[attr]);	//将字符串转换成整数,例如"100px"转变成100
				}
			}
		} else {
			if (attr == 'opacity') {
				return parseInt(Math.round(getComputedStyle(obj,null)[attr] * 100));
			} else {
				var value = getComputedStyle(obj,false)[attr];
				if(value=="auto"){				//没有设置的属性默认auto;
					value=0;
				}else{
					value=parseInt(value); //parseInt("0px") 会是 NaN
				}
				return value;
			}
		}
	}
}


/*
 * 滚动到某位置
 * @param {Object} target  滚动到的位置,数值类型
 * 
 */

function Goto(target){
	var speed=10;
	var handler01;
	clearInterval(handler01);
	handler01=setInterval(function(){
		posi=document.documentElement.scrollTop||document.body.scrollTop;
		if(target>posi){
			posi+=Math.ceil((target-posi)/speed);
			if(target-posi>0){	
				window.scrollTo(0,posi);
			}
			else{
				clearInterval(handler01);
			}
		}else{
			posi-=Math.ceil((posi-target)/speed);
			if(posi-target>0){
				window.scrollTo(0,posi);
			}else{
				clearInterval(handler01);
			}
		}
		/*console.log(posi);*/
	},30);
			
}


/*
 * 轮播图功能函数
 * 
 * obj01图片的父元素
 * obj02圆点的父元素
 * obj03点击左右滑动
 * time滑动图片需要的时间，默认5000毫秒
 * class改变圆点的类名，默认类名为on
 */
		function slideCard(obj01,obj02,obj03,ClassName,time){	
			var count=0;	//记录第几张图片
			obj01.style.width=obj01.children[0].offsetWidth*obj01.children.length+"px";	//设置图片父元素ul或div的宽度,非必要
		
			function Card_change(){		//定时滑动图片
				timer=setInterval(function(){
					count++;	//下一张
					if(count>obj01.children.length-1){	//如果到最后一张
						count=0;	//返回第一张图片
					}
					animation(obj01,{left:-obj01.children[0].offsetWidth*count});
					changeClassName(obj02.children);
				},time>0?time:5000);	//如有有设置时间，以设置的时间为准，没有设置则默认5000毫秒播放一次
			}
			function changeClassName(obj){		//改变圆点的背景，需要事先设置好类名和相应的样式
				for(var i=0;i<obj.length;i++){
					obj[i].className="";
				}
				if(ClassName){
					obj[count].className=ClassName;
				}else{
					obj[count].className="on";
				}
			}
			function onclick_slide(){			//点击滑动到相应的图片
				for(var i=0;i<obj02.children.length;i++){
					obj02.children[i].index=i;	//给每个圆点设置索引号
					obj02.children[i].onclick=function(){	//某个圆点点击时
						clearInterval(timer);	//清除定时器，避免相互影响
						count=this.index;		//记录只是第几张图片
						changeClassName(obj02.children);	//圆点相应改变样式
						animation(obj01,{left:-obj01.children[0].offsetWidth*this.index});
						Card_change();
					}
				}
			}
			
			if(obj03){	//如果有参数obj03
				obj03.children[0].onclick=function(){	//点击左边按钮
					clearInterval(timer);	//清除定时器
					count++;	//下一张
					if(count>obj01.children.length-1){	//如果到最后一张
						count=0;	//返回第一张图片
					}
					animation(obj01,{left:-obj01.children[0].offsetWidth*count});
					changeClassName(obj02.children);
					Card_change();
				}
				
				obj03.children[1].onclick=function(){
					clearInterval(timer);
					count--;
					if(count<0){
						count=obj01.children.length-1;
					}
					animation(obj01,{left:-obj01.children[0].offsetWidth*count});
					changeClassName(obj02.children);
					Card_change();
				}
			}
			
			Card_change();		//执行定时滑动函数
			onclick_slide();	//执行点击滑动函数
		}

	
//轮播,基于绝对定位和透明度
function Carousel_opa(obj01,obj02,Time){
	var count=0;
	var timer;
	var handler;
	var speed=1.2;
	for(var i=0;i<obj01.length;i++){
		obj01[i].index=i;
		obj01[i].onclick=function(){
			clearInterval(timer);
			count=this.index;
			for(var j=0;j<obj01.length;j++){
				obj01[j].className="";
				obj02[j].className="";
			}
			this.className="active";
			obj02[this.index].className="show";
			lunbo();
		}
	}
	
	function lunbo(){
		var opaci01=1;
		var opaci02=0.1;
		timer=setInterval(function(){
			obj01[count].className="";
			obj02[count].className="";		
				handler=setInterval(function(){
					if(count!=0){
						obj02[count-1].style.opacity=opaci01/speed;
						opaci01=obj02[count-1].style.opacity;
						if(opaci01<0.2){
							opaci01=1;
							obj02[count-1].style.opacity=null;
						}					
					}else{
						obj02[obj02.length-1].style.opacity=opaci01/speed;
						opaci01=obj02[obj02.length-1].style.opacity;
						if(opaci01<0.2){
							opaci01=1;
							obj02[obj02.length-1].style.opacity=null;
						}
					}
					
					obj02[count].style.opacity=opaci02*speed;
					opaci02=obj02[count].style.opacity;
					if(opaci02>0.95){
						opaci02=0.1;
						obj02[count].style.opacity=null;
						if(count!=0){
							obj02[count-1].style.opacity=null;
						}else{
							obj02[obj02.length-1].style.opacity=null;
						}
						clearInterval(handler);
					}
				},30)

			count++;
			if(count>=obj02.length){
				count=0;
			}
			obj01[count].className="active";
			obj02[count].className="show";
			
		},Time>0?Time:6000);

	}

	for(var i=0;i<obj02.length;i++){
		obj02[i].onmouseover=function(){
			clearInterval(timer);
		}
		obj02[i].onmouseout=function(){
			lunbo();
		}
	}
	
	lunbo();
	
}
	









/*
 *	 放大镜效果
 *	obj01 大盒子
 * 	obj02 高亮区
 * 	obj03 大图父元素
 */
function magnifier(obj01,obj02,obj03,par){
	obj01.onmouseover=function(){
		obj02.style.display="block";	//鼠标移入小图片时，高亮区出现
		obj03.style.display="block";	//大图出现
	}
	obj01.onmouseout=function(){
		obj02.style.display="none";		//鼠标离开小图时，高亮区隐藏
		obj03.style.display="none";		//大图隐藏
	}
	obj01.onmousemove=function(e){		//鼠标在小图上移动时
		e=e||window.event;
		var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
		if(window.attachEvent){
			var x=e.clientX;				//鼠标的x坐标
			var y=e.clientY+scrolltop;				//鼠标的y坐标
		}else{
			var x=e.pageX;
			var y=e.pageY;
		}
		if(par){
			var _left=x-obj01.parentNode.offsetLeft-obj02.offsetWidth/2;
			var _top=y-obj01.parentNode.offsetTop-obj02.offsetHeight/2;	
		}else{
			//高亮区到小图左部的距离
			var _left=x-obj01.offsetLeft-obj02.offsetWidth/2;
			//高亮区到小图顶部的距离
			var _top=y-obj01.offsetTop-obj02.offsetHeight/2;
		}
		if(_top<=0){	//高亮区到顶部的距离小于0时
			_top=0;		//高亮区从顶部不能离开小图
		}else if(_top>=obj01.offsetHeight-obj02.offsetHeight){
			_top=obj01.offsetHeight-obj02.offsetHeight;		//高亮区不能从底部离开小图
		}
		if(_left<=0){
			_left=0;	//高亮区不能从左边离开小图
		}else if(_left>=obj01.offsetWidth-obj02.offsetWidth){
			_left=obj01.offsetWidth-obj02.offsetWidth;		//高亮区不能从右边离开小图
		}
		obj02.style.left=_left+'px';		//高亮区随着鼠标移动，x轴
		obj02.style.top=_top+"px";			//高亮区随鼠标移动，y轴
		//小图移动的比率,x轴
		var rito_l=_left/(obj01.offsetWidth-obj02.offsetWidth); 
		//小图移动的比率,y轴
		var rito_t=_top/(obj01.offsetHeight-obj02.offsetHeight);
		//大图需要移动的距离,x轴
		var bigImg_l=(obj03.children[0].offsetWidth-obj03.offsetWidth)*rito_l;
		//大图需要移动的距离,y轴
		var bigImg_t=(obj03.children[0].offsetHeight-obj03.offsetHeight)*rito_t;
		obj03.children[0].style.left=-bigImg_l+"px";	//大图随鼠标移动
		obj03.children[0].style.top=-bigImg_t+"px";		//同上
	}
}








