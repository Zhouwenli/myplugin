/**
 * 解决页面滚动的问题
 */
!function(window){
	"use strict";
	
	var doc=window.document;
	var zwlplugin={};
	/**
	 * 直接绑定FastClick
	 */
	$(window).on('load',function(){
		typeof FastClick == 'function' && FastClick.attach(doc.body);
	});
	
	var util=window.util={
		/**
		 * 页面滚动
		 */
		pageScroll:function(e){
			var fn=function(e){
				e.preventDefault();
                e.stopPropagation();
			};
			
			var islock=false;
			
			return{
				lock:function(){
					if(islock)return;
					islock=true;
					doc.addEventListener('touchmove',fn);
				},
				unlock:function () {
                    islock = false;
                    doc.removeEventListener('touchmove',fn);
                }
			};
		}()
	}
	
}(window);

/**
 * 这是自执行函数
 */
!function(window){
	/*
	 * 使用严格模式，可以排查一些小问题。比如在公司的时候，vivo手机ajax不请求，就是因为在放置数值的时候少了个键
	 */
	"use strict";
	 
	var dialog= window.dialog=window.dialog ||{};
	var	$body=$(window.document.body);
	
	/**
	 * 弹框
	 * @param {Object} mes
	 * @param {Object} callback
	 */
	
	dialog.alert=function(mes,callback){
		var ALERT_TEXT_JUST="";
		if(mes.length>=2 && mes.length<13){
			ALERT_TEXT_JUST="ALERT_TEXT_JUST01";
		}else if(mes.length>=13 && mes.length<34){
			ALERT_TEXT_JUST="ALERT_TEXT_JUST02";
		}
		var $dom=$(''+
			'<div id="J_plu">'+
				'<div id="ZWL_ALERT">'+
					'<div class="ALERT_TITLE" style="color: #fff;">友情提示</div>'+
					'<div class="ALERT_CONTENT">'+
						'<div class="ALERT_TEXT '+ALERT_TEXT_JUST+' ">'+mes+''+
						'</div>'+
					'</div>'+
					'<div class="ALERT_COMFIRM">'+
						'<div class="ALERT_COMFIRM_BUTTON">我知道了'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>');
		$body.append($dom);
		window.util.pageScroll.lock();
		$dom.find(".ALERT_COMFIRM_BUTTON").on("click",function(){
			$dom.remove();
			window.util.pageScroll.unlock();
			typeof callback === 'function' && callback();
		});
	};
	
	/**
	 * toast弹窗
	 * @param {Object} mes
	 */
	dialog.toast=function(mes){
		var $dom=$(''+
			'<div id="J_pluToast">'+
				'<div id="ZWL_TOAST">'+mes+'</div>'+
			'</div>');
		
		$body.append($dom);
		
		setTimeout(function(){
			$dom.remove();
		},2000);
	};
	
	/**
	 * 确认弹框
	 * @param {Object} title
	 * @param {Object} mes
	 * @param {Object} btnL
	 * @param {Object} btnR
	 * @param {Object} callback
	 */
	
	dialog.confirm=function(title,mes,btnL,btnR,callback){
		var $dom=$(''+
			'<div id="J_plu">'+
			'<div id="ZWL_CONFIRM">'+
				'<div class="CONFIRM_TOP">'+(title|| "重要提示")+'</div>'+
				'<div class="CONFIRM_TEXT">'+mes+'</div>'+
				'<div class="COMFIRM_BOTTON">'+
					'<input type="button" name="" id="no" value="'+(btnL||"取消")+'" />'+
					'<input type="button" name="" id="yes" value="'+btnR+'" />'+
				'</div>'+
			'</div>'+
		'</div>');
		$body.append($dom);
		window.util.pageScroll.lock();
		$dom.find("#yes").on("click",function(){
			$dom.remove();
			window.util.pageScroll.unlock();
			typeof callback === 'function' && callback();
		})
		$dom.find("#no").on("click",function(){
			$dom.remove();
			window.util.pageScroll.unlock();
			
		})
	};
	/**
	 * 选择框
	 * @param {Object} title
	 * @param {Object} mes
	 * @param {Object} callback
	 */
	dialog.choose=function(title,mes,callback){
		var listr="";
		for(var i=0;i<mes.length;i++){
			listr+='<li class="zwl_li"><span class="CHOOSELI">'+mes[i]+'</span><span class="CHOOSEICON "></span></li>';
		}
		var $dom=$(''+
		'<div id="J_plu">'+
			'<div id="ZWL_CHOOSE">'+
			    '<p class="CHOOSENAME">'+title+'</p>'+
				'<ul class="ZWL_UL">'+listr+'</ul>'+
				'<div class="CHOOSECLOSE">关闭</div>'+
			'</div>'+
		'</div>');
		$body.append($dom);
		window.util.pageScroll.lock();
		$dom.find(".zwl_li").on("click",function(){
			if($(this).find(".CHOOSEICON").hasClass("ACTIVE")){
				$(this).find(".CHOOSEICON").removeClass("ACTIVE");
			}else{
				$(this).find(".CHOOSEICON").addClass("ACTIVE");
			}
			$(this).siblings().find(".CHOOSEICON").removeClass("ACTIVE");
		})
		$dom.find(".CHOOSECLOSE").on("click",function(){
			$dom.remove();
			window.util.pageScroll.unlock();
			var name=$dom.find(".ACTIVE").siblings().html();
			typeof callback === 'function' && callback(name);
			
		})
	};
	/**
	 * 短信验证码弹框
	 */
	//
	dialog.msmF=function(title,mes,callback1,callback){
		var $dom=$(''+
			'<div id="J_plu">'+
			'<div id="ZWL_CONFIRM">'+
				'<div class="CONFIRM_TOP">'+(title|| "重要提示")+'</div>'+
				'<div class="CONFIRM_TEXT">'+mes+'</div>'+
				'<div class="CONFIRM_INPUT"><input type="text" id="smscode" placeholder="请输入短信验证码"/><span id="sendsms" class="zwlcol32">获取验证码</span></div>'+
				'<p class="tips" >验证码已发送,请注意查收</p>'+
				'<div class="CONFIRM_SUBMIT zwlcol32" id="submitS">提交验证</div>'+
			'</div>'+
		'</div>');
		$body.append($dom);
		window.util.pageScroll.lock();
		$dom.find("#sendsms").on("click",function(){
			var e=$dom.find("#sendsms");
			typeof callback1 === 'function' && callback1(e);
		})
		$dom.find("#submitS").on("click",function(){
			typeof callback === 'function' && callback();
			$dom.remove();
			window.util.pageScroll.unlock();
		})
	};
	/**
	 * 简易月份选择器(近六月份的选择器)
	 */
	dialog.selectMonth=function(callback){
		var arrList=data();
		var listr="";
		for(var i=0;i<arrList.length;i++){
			var flg=i%4==3?'':'mar20'
			listr+='<li data-id="'+arrList[i]+'" class="'+flg+' unchoose"><p class="MONTH">'+arrList[i].split("-")[1]+'月</p><p class="YEAR">'+arrList[i].split("-")[0]+'年</p></li>'
		}
		var $dom=$(''+
			'<div id="J_pluT">'+
			'<div id="ZWL_SELECTM" class="active">'+
				'<ul>'+listr+'</ul>'+
			'</div>'+
		'</div>');
		console.log($("#J_pluT").length)
		$body.append($dom);
		console.log($body.find("#J_pluT").length)
		window.util.pageScroll.lock();
		$dom.find("ul li").on("click",function(){
			var e=$(this).attr("data-id");
			$dom.remove();
			window.util.pageScroll.unlock();
			typeof callback === 'function' && callback(e);
		});
		console.log($dom.find("#J_pluT"))
		$("#J_pluT").on("click",function(){
			$("#searchDay").attr("data-id",1);
			$dom.remove();
			window.util.pageScroll.unlock();
		});
		console.log($("#test1"))
		$("#test1").on("click",function(){
			$dom.remove();
			window.util.pageScroll.unlock();
		});
	};
	 var data=function(){  
        //创建现在的时间  
        var data=new Date();  
        //获取年  
        var year=data.getFullYear();  
        //获取月  
        var mon=data.getMonth()+1;  
        var arry=new Array();  
        for(var i=0;i<6;i++){  
            mon=mon-1;  
            if(mon<=0){  
                year=year-1;  
                mon=mon+12;  
            }  
            if(mon<10){  
                mon="0"+mon;  
            }  
              
            arry[i]=year+"-"+mon;  
        }  
          
        return arry;  
    }  
	
}(window);


