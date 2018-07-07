const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getRandom = max =>{
  return Math.floor(Math.random()*max);
}

const shuffle = lst =>{
  var len = lst.length;
  for (var i = 0; i < len - 1; i++) {
    var index = parseInt(Math.random() * (len - i));
    var temp = lst[index];
    lst[index] = lst[len - i - 1];
    lst[len - i - 1] = temp;
  }
}

module.exports = {
  formatTime: formatTime,
  getRandom: getRandom,
  shuffle: shuffle
}
