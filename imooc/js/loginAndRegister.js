$(function(){
	//注册条件判断，用户名是否可行
	var userOK=false;
	//密码
	var pwdOk=false;
	//验证码
	var yzmOk=false;
	//用户名和密码
	var userName=null;
	var passWord=null;
	//用户信息存储
	var userlist={};
	
	//取出所用的用户信息
	var userAll=window.localStorage.getItem("user");
	if(userAll==null){
//		console.log(userAll);
		userlist={};
	}else{
		//将取得的数据赋给userlist;
		userlist=JSON.parse(userAll);
//		console.log(userlist);
	}
		
	userlist["liao@163.com"]="123456";
	window.localStorage.setItem("user",JSON.stringify(userlist));
//	var kk=window.localStorage.getItem("user");
//	console.log(kk);
	
	
	//注册页执行
	if(document.getElementsByClassName("register").length!=0){
		$(".register .user input").blur(function(){
			var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
			var result=$(this).val().match(reg);
			var regUser=$(".register .user input").val();
			if(regUser){
				if(result){
					userName=$(".user input").val();
					if(userlist[userName]){
						$(".checked").css({"opacity":"0","top":"0px"});
						//如果有这个用户就不添加
						setTip("用户已存在");
						//退出事件
					}else{
						userOK=true;
						$(".checked").css("opacity","1");
						userName=$(".user input").val();
					}
				}else{
					$(".checked").css("opacity","0");
					userOk=false;
					setTip("请输入正确的邮箱");
				}
			}else{
				$(".checked").css("opacity","0");
			}
		})
		
		
		
		$(".register .pwd input").blur(function(){
			var reg=/^[A-Za-z\d]{6,16}$/;
			var result=$(this).val().match(reg);
			var regPwd=$(".register .pwd input").val();
			if(result){
				$(".tips span").html("");
				pwdOk=true;
				passWord=$(".pwd input").val();
			}else if(regPwd){
				pwdOk=false;
				setTip("请按要求设置密码");
			}
		})
		
		//验证码
		$("#getyzm").css({"width":"4rem","height":"1.5rem"});
		if(document.getElementById("getyzm")){
			var verifyCode = new GVerify("getyzm");
		}
		
		$("#code_input").blur(function(){
			var res = verifyCode.validate($("#code_input").val());
			if($("#code_input").val()){
				if(res){
					yzmOk=true;
				}else{
					yzmOk=false;
					setTip("请输入正确的验证码");
				}
			}
		})
		
		$(".denglu").click(function(){
			if(userOK&&pwdOk&&yzmOk){
				userAll = window.localStorage.getItem("user");
				
				if(userlist[userName]){
					//如果有这个用户就不添加
					setTip("用户已存在");
					//退出事件
					return 0;
				}
				
				//如果没有这个用户就添加
				userlist[userName] = passWord;
				setTip("注册成功,正在转跳");
				
				//将用户列表转换成字符串存入localStorage
				userString = JSON.stringify(userlist);
				//存入localStorage
				window.localStorage.setItem("user", userString);
				//需要用时,还需重新转换回Json格式
				var userJson = JSON.parse(window.localStorage.getItem("user"));
				console.log(userJson);
				//随机给个头像
				var randomImg=parseInt(Math.random()*5+2);
				//记录登录的用户
				window.localStorage.setItem("nowUser",userName+"/"+randomImg);
				//转跳到首页
				setTimeout(function(){
					window.location.href="index.html";
				},2000);
			}
		})
	}else{
		//查看是否可以登陆
		var passCheck=false;
		//登录信息,用户名输入框
		$(".lgRe .user input").blur(function(){
			var loginName=window.localStorage.getItem("user");
			loginName=JSON.parse(loginName);
			var userValue=$(".lgRe .user input").val();
			var pwdValue=$(".lgRe .pwd input").val();
			//如果输入框有值
			if(userValue){
				//如果用户列表里有这个用户
				if(loginName[userValue]){
					$(".checked").css("opacity","1");
					if(pwdValue==loginName[userValue]){
						passCheck=true;
					}
				}else{		//如果没有这个用户
					passCheck=false;
					$(".checked").css("opacity","0");
					setTip("用户不存在");
				}
			}
		})
		
		//登录信息，登录密码框
		$(".lgRe .pwd input").blur(function(){
			var userValue=$(".lgRe .user input").val();
			var pwdValue=$(".lgRe .pwd input").val();
			
			if(pwdValue!="" && userValue==""){
				setTip("请输入用户名");
			}else if(pwdValue && userValue){
				var loginName=window.localStorage.getItem("user");
				loginName=JSON.parse(loginName);
				//如果用户列表里有这个用户
				if(loginName[userValue]){
					if(pwdValue==loginName[userValue]){
						passCheck=true;
					}else{	//密码不正确
						setTip("请输入正确的密码");
						passCheck=false;
					}
				}else{		//如果没有这个用户
					setTip("用户不存在");
					passCheck=false;
				}
			}
		})
		
		$(".denglu input").on("touchstart",function(){
			if(passCheck){
				var userName=$(".lgRe .user input").val();
				//随机头像
				var randomImg=parseInt(Math.random()*5+2);
				//记录登录的用户
				window.localStorage.setItem("nowUser",userName+"/"+randomImg);
				//转跳
				window.location.href="index.html";
			}
		})
	}
	
	
	
	
	
	$(".pwd i").on("touchstart",function(){
		var oInput=$(this).prev()
		if(oInput.attr("type")=="password"){
			oInput.attr("type","text");
			this.className="icon-睁眼";
		}else{
			oInput.attr("type","password");
			this.className="icon-闭眼";
		}
				
	})
	
	function setTip(str){
		$(".tips span").html(str);
		$(".tips").css("opacity","1");
		$(".tips").css("top","-2rem");
		setTimeout(function(){
			$(".tips").css("top","-1rem");
			$(".tips").css("opacity","0");
		},3000);
	}
	
	
	
	
	
	
	
	
	
	
	
	
})




