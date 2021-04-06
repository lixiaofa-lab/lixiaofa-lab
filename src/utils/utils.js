

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

export function replaceFun (value) {
  let re = /^[\u4e00-\u9fa5a-z0-9]+$/gi
  return re.test(value)
}

export function debounce (fn, dateNum = 1000) {
  let timer = null
  return function (value) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(this,value)
    },dateNum)
  }
}

