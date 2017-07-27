$(function(){
//	$.ajax({
//		type:"get",
//		url:"http://m.imooc.com/wap/api/index/changeGuess",
//		async:false,
//		data:{'flag':'change'},
//		dataType:'jsonp',
//		jsonp:"callback",
//		success:function(str){
//			console.log(str);
//		},
//		error: function (XMLHttpRequest, textStatus, errorThrown) {   
//          alert(errorThrown);   
//      }   
//	});
	$(window).resize(function(){
		window.location.reload(); 
	})
})
