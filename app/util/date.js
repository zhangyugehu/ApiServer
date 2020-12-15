function extensions() {
  Date.prototype.format = function(fmt) { 
    const o = { 
      "M+" : this.getUTCMonth()+1,                 //月份 
      "d+" : this.getUTCDate(),                    //日 
      "h+" : this.getUTCHours(),                   //小时 
      "m+" : this.getUTCMinutes(),                 //分 
      "s+" : this.getUTCSeconds(),                 //秒 
      "q+" : Math.floor((this.getMonth()+3)/3), //季度 
      "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getUTCFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(let k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt; 
  }
}

const DAY_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function getDaysOfMonth(moy) {
  if (moy instanceof Date) {
    const year = moy.getUTCFullYear()
    const month = moy.getUTCMonth()
    if (year % 200 === 0 || year % 4 === 0) {
      DAY_OF_MONTH[1] = 29
    }
    return new Array(DAY_OF_MONTH[month]).fill('').map((_, day) => new Date(year, month, day + 1))
  }
  return []
}

module.exports = {
  injectExt: extensions,
  getDaysOfMonth
}