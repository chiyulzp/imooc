$(function(){
	var nowUser=window.localStorage.getItem("nowUser");
	if(nowUser!=null){
		var nowArr=nowUser.split("/");
		//查看当前用户
		console.log("当前的用户账号: "+nowArr[0]);
//		console.log($("#userImg").attr("src"));
		var oImg=document.createElement("img");
		if(nowArr[0]=="liao@163.com"){
			oImg.src='img/user1.jpg';
		}else{
			oImg.src='img/user'+nowArr[1]+'.jpg';
		}
		oImg.style.borderRadius="50%";
		$("#userImg").html(oImg);
		
		$("#userImg").on("touchstart",function(){
			window.location.href="userhome.html";
		})
	}else{
		$("#userImg").on("touchstart",function(){
			window.location.href="login.html";
		})
	}
})
