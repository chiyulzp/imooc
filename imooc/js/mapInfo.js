$(function(){
	var headerHeight=$("header").outerHeight();
	var height=$(window).height();
	$("#container").css("height",height-headerHeight);
	
	//获取地理位置
	function getLocation()
	{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(showPosition);
		}
		else
		{
			console.log("该浏览器不支持获取地理位置。");
		}
	}
	
	function showPosition(position)
	{
		var longitude=position.coords.longitude;
		var latitude=position.coords.latitude;
		console.log("经度: "+longitude+"纬度: "+latitude);	
		
		var point = new BMap.Point(longitude,latitude);
		map.centerAndZoom(point, 15); 
	}
	
	
	var map = new BMap.Map("container");
	var point = new BMap.Point(113.273,23.157);
	map.centerAndZoom(point, 15); 
	
	getLocation();
	
	
	var nowAdress=map.getCenter();
	//获取坐标地址
	map.addEventListener("dragend", function(){    
	 var center = map.getCenter();    
//	 console.log("地图中心点变更为：" + center.lng + ", " + center.lat); 
	 var myGeo = new BMap.Geocoder();      
		// 根据坐标得到地址描述    
		myGeo.getLocation(new BMap.Point(center.lng,center.lat), function(result){      
		    if (result){      
//		        console.log(result.address);
		        nowAdress=result.address;
		        console.log(nowAdress);
		    }      
		});
	});
	

	map.addControl(new BMap.NavigationControl());    
	map.addControl(new BMap.ScaleControl());    
	map.addControl(new BMap.OverviewMapControl());    
	map.addControl(new BMap.MapTypeControl());    
	map.setCurrentCity("广州"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
	
	var local = new BMap.LocalSearch(map, {      
	      renderOptions:{map: map}      
	});  
	$("#button").on("touchstart",function(){
		var oSearch=$("#needSearch").val();
		var oValue=$(".search select").val();
		if(oValue==1){
			local.search(oSearch);
		}else{
			if(oSearch){
				local.searchNearby(oSearch,nowAdress);
			}else if(oValue==2){
				local.searchNearby("美食",nowAdress);
			}else if(oValue==3){
			local.searchNearby("银行",nowAdress);
			}else{
				local.searchNearby("公交",nowAdress);
			}
		}
		
	})
	
	//3D全景
	var opts = {anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(10, 10)}
	
	var stCtrl = new BMap.PanoramaControl(opts);
//	stCtrl.setOffset(new BMap.Size(20, 20));  
	stCtrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
	map.addControl(stCtrl);


})
