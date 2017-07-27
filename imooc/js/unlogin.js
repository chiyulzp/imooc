$(function(){
	var nowUser=window.localStorage.getItem("nowUser");
	if(nowUser!=null){
		var nowArr=nowUser.split("/");
		//查看当前用户
		console.log("当前的用户账号: "+nowArr[0]);
//		console.log($("#userImg").attr("src"));
		if(nowArr[0]=="liao@163.com"){
			$("#nowUserImg").attr("src",'img/user1.jpg');
		}else{
			$("#nowUserImg").attr("src",'img/user'+nowArr[1]+'.jpg');
			$(".userDetail .userName").html("User"+nowArr[1]);
		}
		
	}
	
	$("#mapInfo").on("touchstart",function(){
		window.location.href="mapInfo.html";
	})
	
	//退出登录
	$("#unlogin").on("touchstart",function(){
		window.localStorage.removeItem("nowUser");
		window.location.href="index.html";
	})
})
