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
						'<img src="img/chenggong1.png"/>'+	
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
	

	
	dialog.confirm=function(mes){
		var $dom=$(''+
			'<div id="J_plu">'+
			'<div id="ZWL_CONFIRM">'+
				'<div class="CONFIRM_TEXT">'+mes+'</div>'+
				'<div class="COMFIRM_BOTTON">'+
					'<input type="button" name="" id="no" value="取消" />'+
					'<input type="button" name="" id="yes" value="确定" />'+
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
	
}(window);


