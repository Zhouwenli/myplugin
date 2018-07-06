function check(type,num,msg) {
	switch(type){
		case 'idcard':
			num = num.toUpperCase();
			console.log(num)
			if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
			    return false;
			} 
			var len, re; len = num.length; if (len == 15) {
			    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			    var arrSplit = num.match(re);  
			    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
			    var bGoodDay; bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
			    if (!bGoodDay) {
			        return false;
			    } else {         
			        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);         
			        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');      
			        var nTemp = 0, i;            
			        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);           
			        for(i = 0; i < 17; i ++) {                 
			            nTemp += num.substr(i, 1) * arrInt[i];        
			        }
			        num += arrCh[nTemp % 11]; 
			        return true;
			    }
			}
			if (len == 18) {
			    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
			    var arrSplit = num.match(re);  
			    var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
			    var bGoodDay; bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
			    if (!bGoodDay) { 
			        return false; 
			    }
			    else {
			        var valnum; 
			        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
			        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
			            var nTemp = 0, i; 
			            for(i = 0; i < 17; i ++) { 
			                nTemp += num.substr(i, 1) * arrInt[i];
			            } 
			            valnum = arrCh[nTemp % 11]; 
			            if (valnum != num.substr(17, 1)) { 
			                return false; 
			            } 
			            return true; 
			        } 
			    } return false;
		   break;
		case 'phone':
			if(!(/^1[3|4|5|6|7|8][0-9]{9}$/.test(num))){ 
	              return false; 
	          }else{
	             return true;
	          }

		break;
		case 'ysphone':
			if(!(/^(165|170)\d{8}$/.test(num))){ 
	              return false; 
	          }else{
	             return true;
	          }
		break;
	}
	
}