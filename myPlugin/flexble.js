/**
 * 设置伸缩布局方案
 */
!function(window){
	/*设计图文档高度*/
	var docWidth=720;
	var doc=window.document,
		docEl=doc.documentElement,
		resizeEvt='orientationchange' in window ? 'orientationchange' :'resize';
	var recalc=(function refreshRem(){
		var clientWidth=docEl.getBoundingClientRect().width;
		docEl.style.fontsize=Math.max(Math.min(20*(clientWidth/docWidth),11.2),8.55)*5+'px';
		return refreshRem;
	})();
	
	docEl.setAttribute('data-dpr',window.navigator.appVersion.match(/iphone/gi)? window.devicePixelRatio:1);
	if(/iP(hone|od|ad)/.test(window.navigator.userAgent)){
		doc.documentElement.classList.add('ios');
		if(parseInt(window.navigator.appVersion.match(/OS(\d+)_(\d)_?(\d)?/)[1],10)>=8)
			doc.documentElement.classList.add('hairline');
	}
	
	if(!doc.addEventListener) return;
	window.addEventListener(resizeEvt,recalc,false);
	doc.addEventListener('DOMContentLoaded',recalc,false);
}(window);
