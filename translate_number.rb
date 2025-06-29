def zh2number(str) {
  if str[0] ==
}



function zhNumber (str) {
  // 檢查正負號
  if (str[0] === '負') {
    var sign = -1;
    str = str.substr(1);
  } else {
    var sign = 1;
  }

  // 轉換為統一的字符
  var convertChar = function (c) {
    switch (c) {
      case '一':
      case '壹':
        return '1';
      case '二':
      case '貳':
        return '2';
      case '三':
      case '參':
        return '3';
      case '四':
      case '肆':
        return '4';
      case '五':
      case '伍':
        return '5';
      case '六':
      case '陸':
        return '6';
      case '七':
      case '柒':
        return '7';
      case '八':
      case '捌':
        return '8';
      case '九':
      case '玖':
        return '9';
      case '點':
        return '.';
      case '億':
        return '億';
      case '萬':
        return '萬';
      case '千':
      case '仟':
        return '千';
      case '百':
      case '佰':
        return '百';
      case '十':
      case '拾':
        return '十';
      // 過濾其他字符
      default:
        return '';
    }
  };
  var _str = '';
  str = str.trim();
  for (var i = 0; i < str.length; i++) {
    _str += convertChar(str[i]);
  }
  str = _str;

  // 特殊情況，比如：十五
  if (str[0] === '十') str = '1' + str;

  // 小數部分
  var i = str.indexOf('.');
  if (i === -1) {
    var decimal = 0;
  } else {
    var decimal = Number(str.substr(i));
    str = str.substr(0, i);
  }

  // 開始轉換整數部分
  var ret = 0;
  var getMid = function (c) {
    switch (c) {
      case '億':
        return 100000000;
      case '萬':
        return 10000;
      case '千':
        return 1000;
      case '百':
        return 100;
      case '十':
        return 10;
      default:
        return 1;
    }
  };
  for (var i = 0; i < str.length; i += 2) {
    var n = Number(str[i]);
    var mid = getMid(str[i + 1]);
    // 特殊情況，如： 一千萬
    var mid2 = getMid(str[i + 2]);
    if (mid2 > 1) i++;
    ret += n * mid * mid2;
  }

  return sign * ret + decimal;
}