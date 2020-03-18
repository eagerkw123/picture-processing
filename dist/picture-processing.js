(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pictureProcessing"] = factory();
	else
		root["pictureProcessing"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var image2css = __webpack_require__(1);

var image2base = __webpack_require__(2);

var image2cut = __webpack_require__(3);

var image2upload = __webpack_require__(5);

/* harmony default export */ __webpack_exports__["default"] = ({
  image2css: image2css,
  image2base: image2base,
  image2cut: image2cut,
  image2upload: image2upload
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
	* 雪碧图position定位说明
**/
var image2base = __webpack_require__(2);

var width = 400;
var number = 2;
var dis = 50;
var W = width * number,
    H = 0,
    cssText = '';
var images = [];

var splitImage = function splitImage() {
  var length = Math.ceil(images.length / number);
  var array = [];

  for (var i = 0; i < length; i++) {
    array.push(images.splice(0, number));
  }

  array.forEach(function (arr, index) {
    var height = parseInt(width / arr[0].width * arr[0].height);
    var max = arr.length > 1 ? Math.max(height, parseInt(width / arr[1].width * arr[1].height)) : height;
    drawImage(arr, max);

    if (index === array.length - 1) {
      var style = document.createElement('style');
      style.innerHTML = cssText;
      document.head.appendChild(style);
    }
  });
};

var drawImage = function drawImage(arr, height) {
  var canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  var cssName = '';
  var cssBgSize = '';
  arr.forEach(function (item, index) {
    var name = item.name;
    var canImgHeight = width / item.width * item.height;
    ctx.drawImage(item.image, index * width, 0, width, canImgHeight);
    cssName += ".".concat(name, ",");
    cssBgSize += ".".concat(name, " {background-size: 200% auto; background-position: ").concat(index * 100, "% 0}");
  });
  cssText += "".concat(cssName.slice(0, cssName.length - 1), " {background:url('").concat(canvas.toDataURL(), "') no-repeat} ").concat(cssBgSize);
};

module.exports = function (arr) {
  var length = arr.length;
  var errorLength = 0,
      loadedLength = 0;
  arr.forEach(function (item) {
    image2base(item).then(function (res) {
      var filename = item.slice(item.lastIndexOf('/') + 1).split('.')[0];
      loadedLength++;
      var image = new Image();
      image.src = res.base64;
      images.push({
        image: image,
        name: filename,
        width: res.width,
        height: res.height
      });

      image.onload = function () {
        if (loadedLength + errorLength === length) {
          splitImage();
        }
      };
    })["catch"](function () {
      errorLength++;
    });
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (imgSrc, type) {
  var isSupport = ['jpeg', 'png', 'webp'].find(function (item) {
    return item === type;
  });

  function getBase64Image(img, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("image/".concat(isSupport || 'jpeg'));
    return dataURL;
  }

  var image = new Image();
  image.crossOrigin = '';
  image.src = imgSrc;
  return new Promise(function (resolve, reject) {
    image.onload = function () {
      resolve({
        base64: getBase64Image(image),
        width: image.width,
        height: image.height
      });
    };

    image.onerror = function () {
      var error = {
        e: 'Picture does not exist: ' + imgSrc
      };
      consolo.error(error.e);
      reject(error);
    };
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
	拖动和缩放逻辑说明
	拖动是改变图片的translate3d属性 拖动的位置是鼠标移动的距离
	所以每次拖动 再鼠标按下时需要把上一次设置的translate3d清空 否则按下的时候图片会发生偏差 会出现跳动的效果
	缩放时 需要保留上一次translate的位置再进行缩放 否则 缩放时定位图片会出现跳动的效果
**/
var image2base = __webpack_require__(2);

var EXIF = __webpack_require__(4);

var W;
var H;
var image = new Image(); // 全貌展示的图片节点

var cutImage = new Image(); // 被裁剪的图片节点

var scale = 1; // 图片缩放的比例

var minScale = 0.5;
var orientation = 1;
var limit = 500;
var maxScale = 2;
var imgSrc; // 裁剪图片url

var cutWidth; // 裁剪框宽度

var cutHeight; // 裁剪框高度

var imgWidth; // 图片实际展示的宽度

var imgHeight; // 图片实际展示的高度

var imgScale; // 图片的宽高比

var moveLeft = 0; // 窗口移动的左边距

var moveTop = 0; // 窗口移动的上边距

var disX = 0; // 鼠标移动的x轴距离

var disY = 0; // 鼠标移动的y轴距离

var scaleDisX = 0; // 缩放按钮鼠标移动的x轴距离

var sizeCss = ''; // 窗口大小固定css

var picCss = ''; // 图片定位及大小固定css

var picCutCss = ''; // 裁剪图片定位及大小固定css

var picCssAll = '';
var picCutCssAll = '';
var halfDisX; // 图片宽度与屏幕宽度的差值的1/2

var halfDisY; // 图片高度与屏幕高度的差值的1/2

var cutToPrintDisX = 0; // 裁剪框尺寸与屏幕尺寸差值的1/2

var cutToPrintDisY = 0; // 裁剪框尺寸与屏幕尺寸差值的1/2

var style = document.createElement('style');
var box = document.createElement('section');
var cutBox = document.createElement('div');
var cutPart = document.createElement('p');
var loading = document.createElement('ul');
var scaleBox = document.createElement('ul');
var cutDoBox = document.createElement('ul');
var scaleBtnWidth = 30; // 缩放按钮宽度

var scaleParentWidth; // 缩放按钮父节点宽度

var scaleBtn;

var createBox = function createBox() {
  var zIndex = 10000;
  var clName = 'image-2-cut-box';
  var fixed = 'position:fixed;left:0;top:0;width:100%;height:100%;';
  style.innerHTML = ".image-2-cut-fixed {".concat(fixed, "}\n\t.").concat(clName, " {z-index: ").concat(zIndex, ";background: #fff;font-size: 20px}.").concat(clName, " img {display: block}.").concat(clName, " ul {list-style-type:  none}\n\t.").concat(clName, "::after {content: '';display: block;z-index:").concat(zIndex + 2, ";").concat(fixed, "background: rgba(0, 0, 0, 0.6)}\n\t.").concat(clName, " div {z-index:").concat(zIndex + 3, ";").concat(fixed, "}\n\t.").concat(clName, " div p {position: absolute;left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);overflow: hidden;background: #000}\n\t.").concat(clName, " .cut-2-loading {position: absolute;z-index:").concat(zIndex + 5, "; left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);height: 30px}\n\t.").concat(clName, " .cut-2-loading li {display: inline-block; width: 10px;height: 10px;margin-right: 6px;border-radius: 50%;background: #fff;animation: cut_2_li 1s 0s infinite}\n\t.").concat(clName, " .cut-2-loading li:nth-child(2) {animation: cut_2_li 1s 0.2s infinite}\n\t.").concat(clName, " .cut-2-loading li:nth-child(3) {animation: cut_2_li 1s 0.4s infinite}\n\t.").concat(clName, " .cut-2-loading li:nth-child(4) {animation: cut_2_li 1s 0.6s infinite}\n\t.").concat(clName, " .cut-2-do {position: absolute;left: 0;width: 100%;bottom: 3%;text-align:center;height: 36px; line-height: 36px;font-size: 14px}\n\t.").concat(clName, " .cut-2-do li:last-child{background: #999; color: #666}\n\t.").concat(clName, " .cut-2-do li {background: #fff;width: 120px;display: inline-block;margin: 0 8px;border-radius: 10px;color: #333}\n\t.").concat(clName, " .cut-2-scale {position: absolute;left: 0;top: 30px;height: 36px;width: 100%;text-align: center;z-index:").concat(zIndex + 4, "}.").concat(clName, " .cut-2-scale li{display: inline-block;}\n\t.").concat(clName, " .cut-2-scale li:first-child, .").concat(clName, " .cut-2-scale li:last-child {box-sizing:border-box;width: 32px;height: 32px;color: #fff;line-height: 30px}\n\t.").concat(clName, " .cut-2-scale li:nth-child(2) {width: 60%;margin: 0 5%;height: 10px;background: #ccc;border-radius: 20px;transform: translate3d(0, -4px, 0)}\n\t.").concat(clName, " .cut-2-scale li:nth-child(2) p {position: absolute;width: 100%;left: 0;top: 0;width: 0;background: #fff;height: 100%;border-radius: 20px}\n\t.").concat(clName, " .cut-2-scale li:nth-child(2) b {position: absolute;width: ").concat(scaleBtnWidth, "px;height: ").concat(scaleBtnWidth, "px;border-radius: 50%;left: 0;top: -10px;display: block;background: #999}\n\t@-webkit-keyframes cut_2_li {0%, 100% {transform: translate3d(0, -100%, 0);opacity: 0} 30% {transform: translate3d(0, 0, 0);opacity: 1} 60% {transform: translate3d(0, 100%, 0);opacity: 0}}\n\t");
  box.className = 'image-2-cut-fixed ' + clName;
  document.body.appendChild(box);
  box.appendChild(cutBox);
  box.appendChild(scaleBox);
  cutBox.appendChild(cutPart);
  cutBox.appendChild(cutDoBox);
  scaleBox.className = 'cut-2-scale';
  scaleBox.innerHTML = '<li>-</li><li><p></p><b></b></li><li>+</li>';
  cutDoBox.className = 'cut-2-do';
  cutDoBox.innerHTML = '<li>确定</li><li>取消</li>';
  loading.className = 'cut-2-loading';
  loading.innerHTML = '<li></li><li></li><li></li><li></li>';
  cutPart.style.opacity = 0;
  box.appendChild(loading);
  document.head.appendChild(style);
};

var isChangeScale = false; // 设置图片放大缩小比例

var setScale = function setScale(b) {
  W = parseInt(window.innerWidth * scale); // 图片的显示宽度

  H = parseInt(W / imgWidth * imgHeight); // 图片的显示高度

  if (H < cutHeight) {
    H = cutHeight;
    W = parseInt(H / imgHeight * imgWidth);
  }

  if (W < cutWidth) {
    W = cutWidth;
    H = parseInt(W / imgWidth * imgHeight);
  }

  halfDisX = parseInt((window.innerWidth - W) / 2);
  halfDisY = parseInt((window.innerHeight - H) / 2);

  if (!nowMargin) {
    nowMargin = [halfDisY + moveTop, 0, 0, halfDisX + moveLeft];
  }

  picCss = "margin:".concat(halfDisY + moveTop, "px 0 0 ").concat(halfDisX + moveLeft, "px;width:").concat(W, "px");
  picCutCss = "margin:".concat(moveTop + halfDisY - cutToPrintDisY, "px 0 0 ").concat(moveLeft + halfDisX - cutToPrintDisX, "px;width:").concat(W, "px"); // 比例缩放时  裁剪框内的图片css跟着变化

  picCssAll = picCssAll.replace(/marign:.*px/, '');
  picCutCssAll = picCutCssAll.replace(/marign:.*px/, '');
  image.style.cssText = picCssAll + picCss;
  cutImage.style.cssText = picCutCssAll + picCutCss; // 因为比例缩放需要重新赋值图片新的高度

  imgWidth = W;
  imgHeight = parseInt(W / imgScale);

  if (b) {
    isChangeScale = true;
  }
};

var nowMargin;

var getAndSetMargin = function getAndSetMargin() {
  if (!picCssAll) return; // translate 转化为margin  且move的距离需要归0

  var trlNumber = picCssAll.slice(picCssAll.indexOf('translate3d(') + 12, picCssAll.indexOf('0)')).split(',');
  var marNumber = picCssAll.slice(picCssAll.indexOf('margin:') + 7, picCssAll.lastIndexOf(';')).split(' ');

  if (trlNumber.length === 3 && marNumber.length === 4) {
    nowMargin = [parseInt(marNumber[0]) + parseInt(trlNumber[1]), 0, 0, parseInt(marNumber[3]) + parseInt(trlNumber[0])];
    picCss = "margin:".concat(nowMargin[0], "px 0 0 ").concat(nowMargin[3], "px;width:").concat(W, "px");
    image.style.cssText = picCss;
  }

  var trlNumberCut = picCutCssAll.slice(picCutCssAll.indexOf('translate3d(') + 12, picCutCssAll.indexOf('0)')).split(',');
  var marNumberCut = picCutCssAll.slice(picCutCssAll.indexOf('margin:') + 7, picCutCssAll.lastIndexOf(';')).split(' ');

  if (trlNumberCut.length === 3 && marNumberCut.length === 4) {
    picCutCss = "margin:".concat(parseInt(marNumberCut[0]) + parseInt(trlNumberCut[1]), "px 0 0 ").concat(parseInt(marNumberCut[3]) + parseInt(trlNumberCut[0]), "px;width:").concat(W, "px");
    cutImage.style.cssText = picCutCss;
  }

  moveLeft = 0;
  moveTop = 0;
};

var touchStart = function touchStart(ev) {
  var touch = ev.touches[0];
  disX = touch.pageX - moveLeft;
  disY = touch.pageY - moveTop;
};

var touchMove = function touchMove(ev) {
  var touch = ev.touches[0];
  var target = ev.target;
  var arr = picCssAll.replace();
  var left = parseInt(touch.pageX - disX);
  var top = parseInt(touch.pageY - disY); // 裁剪框的边框能超出图片的边框 确保图片边框与裁剪框边框能够重合
  // 注意裁剪框的宽高 和裁剪框距离屏幕的边距 和 图片距离屏幕的边距

  left = left >= cutToPrintDisX - nowMargin[3] ? cutToPrintDisX - nowMargin[3] : left;
  left = left <= -(W + nowMargin[3] - cutWidth - cutToPrintDisX) / 2 ? -(W + nowMargin[3] - cutWidth - cutToPrintDisX) / 2 : left;
  top = top >= cutToPrintDisY - nowMargin[0] ? cutToPrintDisY - nowMargin[0] : top;
  top = top <= -(H + nowMargin[0] - cutHeight - cutToPrintDisY) / 2 ? -(H + nowMargin[0] - cutHeight - cutToPrintDisY) / 2 : top;
  document.title = left;
  moveLeft = left;
  moveTop = top;
  picCssAll = "-webkit-transform:translate3d(".concat(left, "px,").concat(top, "px,0);").concat(picCss);
  picCutCssAll = "-webkit-transform:translate3d(".concat(left, "px,").concat(top, "px,0);").concat(picCutCss);
  image.style.cssText = picCssAll; // 因为裁剪框内图需要跟背景图重合 而裁剪框内的图是相对于裁剪框的 背景图的定位是相对于屏幕的
  // 所以 裁剪框内的图定位要减去 裁剪框相对于的屏幕的差值
  // target.style.cssText = `margin:${top + halfDisY - cutToPrintDisY}px 0 0 ${left + halfDisX - cutToPrintDisX}px;width:${W}px`

  target.style.cssText = picCutCssAll;
};

var touchEnd = function touchEnd() {
  getAndSetMargin();
  isChangeScale = false;
};

var scaleTouchStart = function scaleTouchStart(ev) {
  var touch = ev.touches[0];
  scaleDisX = touch.pageX - scaleBtn.offsetLeft;
};

var scaleTouchMove = function scaleTouchMove(ev) {
  var touch = ev.touches[0];
  var max = scaleParentWidth - scaleBtnWidth / 2;
  var left = parseInt(touch.pageX - scaleDisX);
  left = left <= 0 ? 0 : left;
  left = left >= max ? max : left;
  scaleBtn.style.left = left + 'px';
  scaleBtn.parentNode.children[0].style.width = left + 'px';
  scale = (left / max * (maxScale - minScale) + minScale).toFixed(2);
  setScale(1);
};

var scaleTouchEnd = function scaleTouchEnd() {
  // 如果图片没移动过 需要重新获取图片缩放后的margin
  if (!picCssAll) {
    var marNumber = picCss.slice(picCss.indexOf('margin:') + 7, picCssAll.lastIndexOf(';')).split(' ');

    if (marNumber.length === 4) {
      nowMargin = [parseInt(marNumber[0]), 0, 0, parseInt(marNumber[3])];
    }
  }

  getAndSetMargin();
};

var close = function close() {
  document.head.removeChild(style);
  document.body.removeChild(box);
}; // 转向


var rotateImg = function rotateImg(img, direction, canvas) {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0;
  var max_step = 3;
  if (!img) return; // img的高度和宽度不能在img元素隐藏后获取，否则会出错

  var height = img.height;
  var width = img.width;
  var step = 2;

  if (step == null) {
    step = min_step;
  }

  if (direction === 'right') {
    step++; // 旋转到原位置，即超过最大值

    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  } // 旋转角度以弧度值为参数


  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext('2d');

  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;

    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;

    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;

    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
}; // 根据上传图片方向来裁剪转向图片


var compress = function compress(img, Orientation) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = img.width;
  var height = img.height;
  var scale = width / height;
  width = width > 1000 ? 1000 : width;
  height = width / scale;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height); // 修复ios上传图片的时候 被旋转的问题

  if (Orientation !== '' && Orientation !== 1) {
    switch (Orientation) {
      case 6:
        // 需要顺时针（向左）90度旋转
        rotateImg(img, 'left', canvas);
        break;

      case 8:
        // 需要逆时针（向右）90度旋转
        rotateImg(img, 'right', canvas);
        break;

      case 3:
        // 需要180度旋转
        rotateImg(img, 'right', canvas); // 转两次

        rotateImg(img, 'right', canvas);
        break;
    }
  } // 进行最小压缩


  var ndata = canvas.toDataURL('image/jpeg');
  return ndata;
};

var showSize = function showSize(base64url) {
  var str = base64url.replace('data:image/png;base64,', '');
  var equalIndex = str.indexOf('=');

  if (str.indexOf(' = ') > 0) {
    str = str.substring(0, equalIndex);
  }

  var strLength = str.length;
  var fileLength = parseInt(strLength - strLength / 8 * 2);
  var size = (fileLength / 1024).toFixed(2);
  var sizeStr = size + '';
  var index = sizeStr.indexOf('.');
  var dou = sizeStr.substr(index + 1, 2);

  if (dou === '00') {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }

  return size;
};

var cut = function cut(fn) {
  var copy = document.createElement('canvas');
  copy.width = W;
  copy.height = H;
  var ctxCopy = copy.getContext('2d');
  ctxCopy.drawImage(image, 0, 0, W, H);
  var src = copy.toDataURL();
  var copyImage = new Image();
  copyImage.src = src;

  copyImage.onload = function () {
    var canvas = document.createElement('canvas');
    var left = Math.abs(nowMargin[3] - cutToPrintDisX);
    var top = Math.abs(nowMargin[0] - cutToPrintDisY);
    canvas.width = cutWidth;
    canvas.height = cutHeight;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(copyImage, left, top, cutWidth, cutHeight, 0, 0, cutWidth, cutHeight);
    var src = canvas.toDataURL('image/jpeg', 0.8);
    var size = showSize(src);
    var xs = 0;

    while (size > limit) {
      xs += 5;
      src = canvas.toDataURL('image/jpeg', (80 - xs) / 100);
      size = showSize(src);
    }

    close();
    fn && fn(src);
  };
};

var addListener = function addListener(node, type, fn) {
  node.addEventListener(type, function (ev) {
    fn && fn(ev);
    ev.preventDefault();
    ev.stopPropagation();
  }, false);
};

var init = function init(fn) {
  imgWidth = image.width;
  imgHeight = image.height;
  imgScale = imgWidth / imgHeight;
  cutToPrintDisX = parseInt((W - cutWidth) / 2);
  cutToPrintDisY = parseInt((H - cutHeight) / 2);
  box.appendChild(image);
  cutPart.appendChild(cutImage); // 设置默认比例

  setScale(); // 图片添加拖动事件

  addListener(cutImage, 'touchstart', touchStart);
  addListener(cutImage, 'touchmove', touchMove);
  addListener(cutImage, 'touchend', touchEnd); // 缩放按钮添加拖动事件
  // 拖动的最大距离为拖动按钮父节点宽度 - 拖动按钮的1/2
  // 默认比例为1 最大比例为maxScale 最小缩放比例为minScale
  // 所有默认的按钮位置应该为 默认比例1 - 最小缩放比例 / 比例差

  scaleBtn = scaleBox.children[1].children[1];
  scaleParentWidth = scaleBtn.parentNode.offsetWidth;
  var defaultWidth = (scale - minScale) / (maxScale - minScale) * scaleParentWidth;
  defaultWidth = Math.min(defaultWidth, scaleParentWidth - scaleBtnWidth / 2);
  addListener(scaleBtn, 'touchstart', scaleTouchStart);
  addListener(scaleBtn, 'touchmove', scaleTouchMove);
  addListener(scaleBtn, 'touchend', scaleTouchEnd);
  scaleBtn.style.left = defaultWidth + 'px';
  scaleBtn.parentNode.children[0].style.width = defaultWidth + 'px';
  box.removeChild(loading);
  cutPart.style.opacity = 1; //裁剪和取消

  addListener(cutDoBox.children[0], 'touchstart', function () {
    cut(fn);
  });
  addListener(cutDoBox.children[1], 'touchstart', function () {
    fn && fn();
    close();
  });
};

module.exports = function (params) {
  var paramsType = _typeof(params);

  W = window.innerWidth;
  H = window.innerHeight;
  imgSrc = paramsType === 'string' ? params : params.url;
  limit = paramsType === 'string' ? limit : params.limit || limit;
  cutWidth = paramsType === 'string' ? W / 2 : params.width || W / 2;
  cutWidth = Math.min(W, parseInt(cutWidth));
  cutHeight = paramsType === 'string' ? cutWidth : params.height || cutWidth;
  cutHeight = Math.min(window.innerHeight, parseInt(cutHeight));
  cutPart.style.cssText = "width: ".concat(cutWidth, "px;height: ").concat(cutHeight, "px;");
  image.src = imgSrc; // 创建弹窗

  createBox();
  addListener(box, 'touchmove');
  return new Promise(function (resolve, reject) {
    var error = '图片加载失败，请确认图片路径是否正确';

    image.onload = function () {
      EXIF.getData(image, function () {
        orientation = EXIF.getTag(this, 'Orientation') || 1;
      });

      if (orientation !== 1) {
        imgUrl = compress(image, orientation);
      }

      image2base(imgSrc).then(function (res) {
        imgSrc = res.base64;
        image.src = imgSrc;
        cutImage = new Image();
        cutImage.src = imgSrc;

        image.onload = function () {
          init(function (src) {
            if (src) {
              resolve(src);
            } else {
              reject({
                error: '用户取消了操作'
              });
            }
          });
        };
      })["catch"](function (e) {
        reject({
          error: error
        });
      });
    };

    image.onerror = function () {
      reject({
        error: error
      });
    };
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function () {
  var debug = false;
  var root = this;

  var EXIF = function (obj) {
    if (obj instanceof EXIF) return obj;
    if (!(this instanceof EXIF)) return new EXIF(obj);
    this.EXIFwrapped = obj;
  };

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = EXIF;
    }

    exports.EXIF = EXIF;
  } else {}

  var ExifTags = EXIF.Tags = {
    // version tags
    0x9000: "ExifVersion",
    // EXIF version
    0xA000: "FlashpixVersion",
    // Flashpix format version
    // colorspace tags
    0xA001: "ColorSpace",
    // Color space information tag
    // image configuration
    0xA002: "PixelXDimension",
    // Valid width of meaningful image
    0xA003: "PixelYDimension",
    // Valid height of meaningful image
    0x9101: "ComponentsConfiguration",
    // Information about channels
    0x9102: "CompressedBitsPerPixel",
    // Compressed bits per pixel
    // user information
    0x927C: "MakerNote",
    // Any desired information written by the manufacturer
    0x9286: "UserComment",
    // Comments by user
    // related file
    0xA004: "RelatedSoundFile",
    // Name of related sound file
    // date and time
    0x9003: "DateTimeOriginal",
    // Date and time when the original image was generated
    0x9004: "DateTimeDigitized",
    // Date and time when the image was stored digitally
    0x9290: "SubsecTime",
    // Fractions of seconds for DateTime
    0x9291: "SubsecTimeOriginal",
    // Fractions of seconds for DateTimeOriginal
    0x9292: "SubsecTimeDigitized",
    // Fractions of seconds for DateTimeDigitized
    // picture-taking conditions
    0x829A: "ExposureTime",
    // Exposure time (in seconds)
    0x829D: "FNumber",
    // F number
    0x8822: "ExposureProgram",
    // Exposure program
    0x8824: "SpectralSensitivity",
    // Spectral sensitivity
    0x8827: "ISOSpeedRatings",
    // ISO speed rating
    0x8828: "OECF",
    // Optoelectric conversion factor
    0x9201: "ShutterSpeedValue",
    // Shutter speed
    0x9202: "ApertureValue",
    // Lens aperture
    0x9203: "BrightnessValue",
    // Value of brightness
    0x9204: "ExposureBias",
    // Exposure bias
    0x9205: "MaxApertureValue",
    // Smallest F number of lens
    0x9206: "SubjectDistance",
    // Distance to subject in meters
    0x9207: "MeteringMode",
    // Metering mode
    0x9208: "LightSource",
    // Kind of light source
    0x9209: "Flash",
    // Flash status
    0x9214: "SubjectArea",
    // Location and area of main subject
    0x920A: "FocalLength",
    // Focal length of the lens in mm
    0xA20B: "FlashEnergy",
    // Strobe energy in BCPS
    0xA20C: "SpatialFrequencyResponse",
    //
    0xA20E: "FocalPlaneXResolution",
    // Number of pixels in width direction per FocalPlaneResolutionUnit
    0xA20F: "FocalPlaneYResolution",
    // Number of pixels in height direction per FocalPlaneResolutionUnit
    0xA210: "FocalPlaneResolutionUnit",
    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
    0xA214: "SubjectLocation",
    // Location of subject in image
    0xA215: "ExposureIndex",
    // Exposure index selected on camera
    0xA217: "SensingMethod",
    // Image sensor type
    0xA300: "FileSource",
    // Image source (3 == DSC)
    0xA301: "SceneType",
    // Scene type (1 == directly photographed)
    0xA302: "CFAPattern",
    // Color filter array geometric pattern
    0xA401: "CustomRendered",
    // Special processing
    0xA402: "ExposureMode",
    // Exposure mode
    0xA403: "WhiteBalance",
    // 1 = auto white balance, 2 = manual
    0xA404: "DigitalZoomRation",
    // Digital zoom ratio
    0xA405: "FocalLengthIn35mmFilm",
    // Equivalent foacl length assuming 35mm film camera (in mm)
    0xA406: "SceneCaptureType",
    // Type of scene
    0xA407: "GainControl",
    // Degree of overall image gain adjustment
    0xA408: "Contrast",
    // Direction of contrast processing applied by camera
    0xA409: "Saturation",
    // Direction of saturation processing applied by camera
    0xA40A: "Sharpness",
    // Direction of sharpness processing applied by camera
    0xA40B: "DeviceSettingDescription",
    //
    0xA40C: "SubjectDistanceRange",
    // Distance to subject
    // other tags
    0xA005: "InteroperabilityIFDPointer",
    0xA420: "ImageUniqueID" // Identifier assigned uniquely to each image

  };
  var TiffTags = EXIF.TiffTags = {
    0x0100: "ImageWidth",
    0x0101: "ImageHeight",
    0x8769: "ExifIFDPointer",
    0x8825: "GPSInfoIFDPointer",
    0xA005: "InteroperabilityIFDPointer",
    0x0102: "BitsPerSample",
    0x0103: "Compression",
    0x0106: "PhotometricInterpretation",
    0x0112: "Orientation",
    0x0115: "SamplesPerPixel",
    0x011C: "PlanarConfiguration",
    0x0212: "YCbCrSubSampling",
    0x0213: "YCbCrPositioning",
    0x011A: "XResolution",
    0x011B: "YResolution",
    0x0128: "ResolutionUnit",
    0x0111: "StripOffsets",
    0x0116: "RowsPerStrip",
    0x0117: "StripByteCounts",
    0x0201: "JPEGInterchangeFormat",
    0x0202: "JPEGInterchangeFormatLength",
    0x012D: "TransferFunction",
    0x013E: "WhitePoint",
    0x013F: "PrimaryChromaticities",
    0x0211: "YCbCrCoefficients",
    0x0214: "ReferenceBlackWhite",
    0x0132: "DateTime",
    0x010E: "ImageDescription",
    0x010F: "Make",
    0x0110: "Model",
    0x0131: "Software",
    0x013B: "Artist",
    0x8298: "Copyright"
  };
  var GPSTags = EXIF.GPSTags = {
    0x0000: "GPSVersionID",
    0x0001: "GPSLatitudeRef",
    0x0002: "GPSLatitude",
    0x0003: "GPSLongitudeRef",
    0x0004: "GPSLongitude",
    0x0005: "GPSAltitudeRef",
    0x0006: "GPSAltitude",
    0x0007: "GPSTimeStamp",
    0x0008: "GPSSatellites",
    0x0009: "GPSStatus",
    0x000A: "GPSMeasureMode",
    0x000B: "GPSDOP",
    0x000C: "GPSSpeedRef",
    0x000D: "GPSSpeed",
    0x000E: "GPSTrackRef",
    0x000F: "GPSTrack",
    0x0010: "GPSImgDirectionRef",
    0x0011: "GPSImgDirection",
    0x0012: "GPSMapDatum",
    0x0013: "GPSDestLatitudeRef",
    0x0014: "GPSDestLatitude",
    0x0015: "GPSDestLongitudeRef",
    0x0016: "GPSDestLongitude",
    0x0017: "GPSDestBearingRef",
    0x0018: "GPSDestBearing",
    0x0019: "GPSDestDistanceRef",
    0x001A: "GPSDestDistance",
    0x001B: "GPSProcessingMethod",
    0x001C: "GPSAreaInformation",
    0x001D: "GPSDateStamp",
    0x001E: "GPSDifferential"
  }; // EXIF 2.3 Spec

  var IFD1Tags = EXIF.IFD1Tags = {
    0x0100: "ImageWidth",
    0x0101: "ImageHeight",
    0x0102: "BitsPerSample",
    0x0103: "Compression",
    0x0106: "PhotometricInterpretation",
    0x0111: "StripOffsets",
    0x0112: "Orientation",
    0x0115: "SamplesPerPixel",
    0x0116: "RowsPerStrip",
    0x0117: "StripByteCounts",
    0x011A: "XResolution",
    0x011B: "YResolution",
    0x011C: "PlanarConfiguration",
    0x0128: "ResolutionUnit",
    0x0201: "JpegIFOffset",
    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
    0x0202: "JpegIFByteCount",
    // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
    0x0211: "YCbCrCoefficients",
    0x0212: "YCbCrSubSampling",
    0x0213: "YCbCrPositioning",
    0x0214: "ReferenceBlackWhite"
  };
  var StringValues = EXIF.StringValues = {
    ExposureProgram: {
      0: "Not defined",
      1: "Manual",
      2: "Normal program",
      3: "Aperture priority",
      4: "Shutter priority",
      5: "Creative program",
      6: "Action program",
      7: "Portrait mode",
      8: "Landscape mode"
    },
    MeteringMode: {
      0: "Unknown",
      1: "Average",
      2: "CenterWeightedAverage",
      3: "Spot",
      4: "MultiSpot",
      5: "Pattern",
      6: "Partial",
      255: "Other"
    },
    LightSource: {
      0: "Unknown",
      1: "Daylight",
      2: "Fluorescent",
      3: "Tungsten (incandescent light)",
      4: "Flash",
      9: "Fine weather",
      10: "Cloudy weather",
      11: "Shade",
      12: "Daylight fluorescent (D 5700 - 7100K)",
      13: "Day white fluorescent (N 4600 - 5400K)",
      14: "Cool white fluorescent (W 3900 - 4500K)",
      15: "White fluorescent (WW 3200 - 3700K)",
      17: "Standard light A",
      18: "Standard light B",
      19: "Standard light C",
      20: "D55",
      21: "D65",
      22: "D75",
      23: "D50",
      24: "ISO studio tungsten",
      255: "Other"
    },
    Flash: {
      0x0000: "Flash did not fire",
      0x0001: "Flash fired",
      0x0005: "Strobe return light not detected",
      0x0007: "Strobe return light detected",
      0x0009: "Flash fired, compulsory flash mode",
      0x000D: "Flash fired, compulsory flash mode, return light not detected",
      0x000F: "Flash fired, compulsory flash mode, return light detected",
      0x0010: "Flash did not fire, compulsory flash mode",
      0x0018: "Flash did not fire, auto mode",
      0x0019: "Flash fired, auto mode",
      0x001D: "Flash fired, auto mode, return light not detected",
      0x001F: "Flash fired, auto mode, return light detected",
      0x0020: "No flash function",
      0x0041: "Flash fired, red-eye reduction mode",
      0x0045: "Flash fired, red-eye reduction mode, return light not detected",
      0x0047: "Flash fired, red-eye reduction mode, return light detected",
      0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
      0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
      0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
      0x0059: "Flash fired, auto mode, red-eye reduction mode",
      0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
      0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
    },
    SensingMethod: {
      1: "Not defined",
      2: "One-chip color area sensor",
      3: "Two-chip color area sensor",
      4: "Three-chip color area sensor",
      5: "Color sequential area sensor",
      7: "Trilinear sensor",
      8: "Color sequential linear sensor"
    },
    SceneCaptureType: {
      0: "Standard",
      1: "Landscape",
      2: "Portrait",
      3: "Night scene"
    },
    SceneType: {
      1: "Directly photographed"
    },
    CustomRendered: {
      0: "Normal process",
      1: "Custom process"
    },
    WhiteBalance: {
      0: "Auto white balance",
      1: "Manual white balance"
    },
    GainControl: {
      0: "None",
      1: "Low gain up",
      2: "High gain up",
      3: "Low gain down",
      4: "High gain down"
    },
    Contrast: {
      0: "Normal",
      1: "Soft",
      2: "Hard"
    },
    Saturation: {
      0: "Normal",
      1: "Low saturation",
      2: "High saturation"
    },
    Sharpness: {
      0: "Normal",
      1: "Soft",
      2: "Hard"
    },
    SubjectDistanceRange: {
      0: "Unknown",
      1: "Macro",
      2: "Close view",
      3: "Distant view"
    },
    FileSource: {
      3: "DSC"
    },
    Components: {
      0: "",
      1: "Y",
      2: "Cb",
      3: "Cr",
      4: "R",
      5: "G",
      6: "B"
    }
  };

  function addEvent(element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + event, handler);
    }
  }

  function imageHasData(img) {
    return !!img.exifdata;
  }

  function base64ToArrayBuffer(base64, contentType) {
    contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'

    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binary = atob(base64);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);

    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }

    return buffer;
  }

  function objectURLToBlob(url, callback) {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.responseType = "blob";

    http.onload = function (e) {
      if (this.status == 200 || this.status === 0) {
        callback(this.response);
      }
    };

    http.send();
  }

  function getImageData(img, callback) {
    function handleBinaryFile(binFile) {
      var data = findEXIFinJPEG(binFile);
      img.exifdata = data || {};
      var iptcdata = findIPTCinJPEG(binFile);
      img.iptcdata = iptcdata || {};

      if (EXIF.isXmpEnabled) {
        var xmpdata = findXMPinJPEG(binFile);
        img.xmpdata = xmpdata || {};
      }

      if (callback) {
        callback.call(img);
      }
    }

    if (img.src) {
      if (/^data\:/i.test(img.src)) {
        // Data URI
        var arrayBuffer = base64ToArrayBuffer(img.src);
        handleBinaryFile(arrayBuffer);
      } else if (/^blob\:/i.test(img.src)) {
        // Object URL
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
          handleBinaryFile(e.target.result);
        };

        objectURLToBlob(img.src, function (blob) {
          fileReader.readAsArrayBuffer(blob);
        });
      } else {
        var http = new XMLHttpRequest();

        http.onload = function () {
          if (this.status == 200 || this.status === 0) {
            handleBinaryFile(http.response);
          } else {
            throw "Could not load image";
          }

          http = null;
        };

        http.open("GET", img.src, true);
        http.responseType = "arraybuffer";
        http.send(null);
      }
    } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        if (debug) console.log("Got file of length " + e.target.result.byteLength);
        handleBinaryFile(e.target.result);
      };

      fileReader.readAsArrayBuffer(img);
    }
  }

  function findEXIFinJPEG(file) {
    var dataView = new DataView(file);
    if (debug) console.log("Got file of length " + file.byteLength);

    if (dataView.getUint8(0) != 0xFF || dataView.getUint8(1) != 0xD8) {
      if (debug) console.log("Not a valid JPEG");
      return false; // not a valid jpeg
    }

    var offset = 2,
        length = file.byteLength,
        marker;

    while (offset < length) {
      if (dataView.getUint8(offset) != 0xFF) {
        if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
        return false; // not a valid marker, something is wrong
      }

      marker = dataView.getUint8(offset + 1);
      if (debug) console.log(marker); // we could implement handling for other markers here,
      // but we're only looking for 0xFFE1 for EXIF data

      if (marker == 225) {
        if (debug) console.log("Found 0xFFE1 marker");
        return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2); // offset += 2 + file.getShortAt(offset+2, true);
      } else {
        offset += 2 + dataView.getUint16(offset + 2);
      }
    }
  }

  function findIPTCinJPEG(file) {
    var dataView = new DataView(file);
    if (debug) console.log("Got file of length " + file.byteLength);

    if (dataView.getUint8(0) != 0xFF || dataView.getUint8(1) != 0xD8) {
      if (debug) console.log("Not a valid JPEG");
      return false; // not a valid jpeg
    }

    var offset = 2,
        length = file.byteLength;

    var isFieldSegmentStart = function (dataView, offset) {
      return dataView.getUint8(offset) === 0x38 && dataView.getUint8(offset + 1) === 0x42 && dataView.getUint8(offset + 2) === 0x49 && dataView.getUint8(offset + 3) === 0x4D && dataView.getUint8(offset + 4) === 0x04 && dataView.getUint8(offset + 5) === 0x04;
    };

    while (offset < length) {
      if (isFieldSegmentStart(dataView, offset)) {
        // Get the length of the name header (which is padded to an even number of bytes)
        var nameHeaderLength = dataView.getUint8(offset + 7);
        if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1; // Check for pre photoshop 6 format

        if (nameHeaderLength === 0) {
          // Always 4
          nameHeaderLength = 4;
        }

        var startOffset = offset + 8 + nameHeaderLength;
        var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
        return readIPTCData(file, startOffset, sectionLength);
        break;
      } // Not the marker, continue searching


      offset++;
    }
  }

  var IptcFieldMap = {
    0x78: 'caption',
    0x6E: 'credit',
    0x19: 'keywords',
    0x37: 'dateCreated',
    0x50: 'byline',
    0x55: 'bylineTitle',
    0x7A: 'captionWriter',
    0x69: 'headline',
    0x74: 'copyright',
    0x0F: 'category'
  };

  function readIPTCData(file, startOffset, sectionLength) {
    var dataView = new DataView(file);
    var data = {};
    var fieldValue, fieldName, dataSize, segmentType, segmentSize;
    var segmentStartPos = startOffset;

    while (segmentStartPos < startOffset + sectionLength) {
      if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
        segmentType = dataView.getUint8(segmentStartPos + 2);

        if (segmentType in IptcFieldMap) {
          dataSize = dataView.getInt16(segmentStartPos + 3);
          segmentSize = dataSize + 5;
          fieldName = IptcFieldMap[segmentType];
          fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize); // Check if we already stored a value with this name

          if (data.hasOwnProperty(fieldName)) {
            // Value already stored with this name, create multivalue field
            if (data[fieldName] instanceof Array) {
              data[fieldName].push(fieldValue);
            } else {
              data[fieldName] = [data[fieldName], fieldValue];
            }
          } else {
            data[fieldName] = fieldValue;
          }
        }
      }

      segmentStartPos++;
    }

    return data;
  }

  function readTags(file, tiffStart, dirStart, strings, bigEnd) {
    var entries = file.getUint16(dirStart, !bigEnd),
        tags = {},
        entryOffset,
        tag,
        i;

    for (i = 0; i < entries; i++) {
      entryOffset = dirStart + i * 12 + 2;
      tag = strings[file.getUint16(entryOffset, !bigEnd)];
      if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
      tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
    }

    return tags;
  }

  function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
    var type = file.getUint16(entryOffset + 2, !bigEnd),
        numValues = file.getUint32(entryOffset + 4, !bigEnd),
        valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
        offset,
        vals,
        val,
        n,
        numerator,
        denominator;

    switch (type) {
      case 1: // byte, 8-bit unsigned int

      case 7:
        // undefined, 8-bit byte, value depending on field
        if (numValues == 1) {
          return file.getUint8(entryOffset + 8, !bigEnd);
        } else {
          offset = numValues > 4 ? valueOffset : entryOffset + 8;
          vals = [];

          for (n = 0; n < numValues; n++) {
            vals[n] = file.getUint8(offset + n);
          }

          return vals;
        }

      case 2:
        // ascii, 8-bit byte
        offset = numValues > 4 ? valueOffset : entryOffset + 8;
        return getStringFromDB(file, offset, numValues - 1);

      case 3:
        // short, 16 bit int
        if (numValues == 1) {
          return file.getUint16(entryOffset + 8, !bigEnd);
        } else {
          offset = numValues > 2 ? valueOffset : entryOffset + 8;
          vals = [];

          for (n = 0; n < numValues; n++) {
            vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
          }

          return vals;
        }

      case 4:
        // long, 32 bit int
        if (numValues == 1) {
          return file.getUint32(entryOffset + 8, !bigEnd);
        } else {
          vals = [];

          for (n = 0; n < numValues; n++) {
            vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
          }

          return vals;
        }

      case 5:
        // rational = two long values, first is numerator, second is denominator
        if (numValues == 1) {
          numerator = file.getUint32(valueOffset, !bigEnd);
          denominator = file.getUint32(valueOffset + 4, !bigEnd);
          val = new Number(numerator / denominator);
          val.numerator = numerator;
          val.denominator = denominator;
          return val;
        } else {
          vals = [];

          for (n = 0; n < numValues; n++) {
            numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
            denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
            vals[n] = new Number(numerator / denominator);
            vals[n].numerator = numerator;
            vals[n].denominator = denominator;
          }

          return vals;
        }

      case 9:
        // slong, 32 bit signed int
        if (numValues == 1) {
          return file.getInt32(entryOffset + 8, !bigEnd);
        } else {
          vals = [];

          for (n = 0; n < numValues; n++) {
            vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
          }

          return vals;
        }

      case 10:
        // signed rational, two slongs, first is numerator, second is denominator
        if (numValues == 1) {
          return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
        } else {
          vals = [];

          for (n = 0; n < numValues; n++) {
            vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
          }

          return vals;
        }

    }
  }
  /**
  * Given an IFD (Image File Directory) start offset
  * returns an offset to next IFD or 0 if it's the last IFD.
  */


  function getNextIFDOffset(dataView, dirStart, bigEnd) {
    //the first 2bytes means the number of directory entries contains in this IFD
    var entries = dataView.getUint16(dirStart, !bigEnd); // After last directory entry, there is a 4bytes of data,
    // it means an offset to next IFD.
    // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

    return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
  }

  function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd) {
    // get the IFD1 offset
    var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart + firstIFDOffset, bigEnd);

    if (!IFD1OffsetPointer) {
      // console.log('******** IFD1Offset is empty, image thumb not found ********');
      return {};
    } else if (IFD1OffsetPointer > dataView.byteLength) {
      // this should not happen
      // console.log('******** IFD1Offset is outside the bounds of the DataView ********');
      return {};
    } // console.log('*******  thumbnail IFD offset (IFD1) is: %s', IFD1OffsetPointer);


    var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd); // EXIF 2.3 specification for JPEG format thumbnail
    // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
    // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
    // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
    // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
    // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

    if (thumbTags['Compression']) {
      // console.log('Thumbnail image found!');
      switch (thumbTags['Compression']) {
        case 6:
          // console.log('Thumbnail image format is JPEG');
          if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
            // extract the thumbnail
            var tOffset = tiffStart + thumbTags.JpegIFOffset;
            var tLength = thumbTags.JpegIFByteCount;
            thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
              type: 'image/jpeg'
            });
          }

          break;

        case 1:
          console.log("Thumbnail image format is TIFF, which is not implemented.");
          break;

        default:
          console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
      }
    } else if (thumbTags['PhotometricInterpretation'] == 2) {
      console.log("Thumbnail image format is RGB, which is not implemented.");
    }

    return thumbTags;
  }

  function getStringFromDB(buffer, start, length) {
    var outstr = "";

    for (n = start; n < start + length; n++) {
      outstr += String.fromCharCode(buffer.getUint8(n));
    }

    return outstr;
  }

  function readEXIFData(file, start) {
    if (getStringFromDB(file, start, 4) != "Exif") {
      if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
      return false;
    }

    var bigEnd,
        tags,
        tag,
        exifData,
        gpsData,
        tiffOffset = start + 6; // test for TIFF validity and endianness

    if (file.getUint16(tiffOffset) == 0x4949) {
      bigEnd = false;
    } else if (file.getUint16(tiffOffset) == 0x4D4D) {
      bigEnd = true;
    } else {
      if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
      return false;
    }

    if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
      if (debug) console.log("Not valid TIFF data! (no 0x002A)");
      return false;
    }

    var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);

    if (firstIFDOffset < 0x00000008) {
      if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
      return false;
    }

    tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

    if (tags.ExifIFDPointer) {
      exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);

      for (tag in exifData) {
        switch (tag) {
          case "LightSource":
          case "Flash":
          case "MeteringMode":
          case "ExposureProgram":
          case "SensingMethod":
          case "SceneCaptureType":
          case "SceneType":
          case "CustomRendered":
          case "WhiteBalance":
          case "GainControl":
          case "Contrast":
          case "Saturation":
          case "Sharpness":
          case "SubjectDistanceRange":
          case "FileSource":
            exifData[tag] = StringValues[tag][exifData[tag]];
            break;

          case "ExifVersion":
          case "FlashpixVersion":
            exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
            break;

          case "ComponentsConfiguration":
            exifData[tag] = StringValues.Components[exifData[tag][0]] + StringValues.Components[exifData[tag][1]] + StringValues.Components[exifData[tag][2]] + StringValues.Components[exifData[tag][3]];
            break;
        }

        tags[tag] = exifData[tag];
      }
    }

    if (tags.GPSInfoIFDPointer) {
      gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);

      for (tag in gpsData) {
        switch (tag) {
          case "GPSVersionID":
            gpsData[tag] = gpsData[tag][0] + "." + gpsData[tag][1] + "." + gpsData[tag][2] + "." + gpsData[tag][3];
            break;
        }

        tags[tag] = gpsData[tag];
      }
    } // extract thumbnail


    tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);
    return tags;
  }

  function findXMPinJPEG(file) {
    if (!('DOMParser' in self)) {
      // console.warn('XML parsing not supported without DOMParser');
      return;
    }

    var dataView = new DataView(file);
    if (debug) console.log("Got file of length " + file.byteLength);

    if (dataView.getUint8(0) != 0xFF || dataView.getUint8(1) != 0xD8) {
      if (debug) console.log("Not a valid JPEG");
      return false; // not a valid jpeg
    }

    var offset = 2,
        length = file.byteLength,
        dom = new DOMParser();

    while (offset < length - 4) {
      if (getStringFromDB(dataView, offset, 4) == "http") {
        var startOffset = offset - 1;
        var sectionLength = dataView.getUint16(offset - 2) - 1;
        var xmpString = getStringFromDB(dataView, startOffset, sectionLength);
        var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
        xmpString = xmpString.substring(xmpString.indexOf('<x:xmpmeta'), xmpEndIndex);
        var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10; //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
        //Without these namespaces, XML is thought to be invalid by parsers

        xmpString = xmpString.slice(0, indexOfXmp) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" ' + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" ' + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" ' + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" ' + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" ' + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" ' + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" ' + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" ' + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" ' + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + xmpString.slice(indexOfXmp);
        var domDocument = dom.parseFromString(xmpString, 'text/xml');
        return xml2Object(domDocument);
      } else {
        offset++;
      }
    }
  }

  function xml2json(xml) {
    var json = {};

    if (xml.nodeType == 1) {
      // element node
      if (xml.attributes.length > 0) {
        json['@attributes'] = {};

        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          json['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text node
      return xml.nodeValue;
    } // deal with children


    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var child = xml.childNodes.item(i);
        var nodeName = child.nodeName;

        if (json[nodeName] == null) {
          json[nodeName] = xml2json(child);
        } else {
          if (json[nodeName].push == null) {
            var old = json[nodeName];
            json[nodeName] = [];
            json[nodeName].push(old);
          }

          json[nodeName].push(xml2json(child));
        }
      }
    }

    return json;
  }

  function xml2Object(xml) {
    try {
      var obj = {};

      if (xml.children.length > 0) {
        for (var i = 0; i < xml.children.length; i++) {
          var item = xml.children.item(i);
          var attributes = item.attributes;

          for (var idx in attributes) {
            var itemAtt = attributes[idx];
            var dataKey = itemAtt.nodeName;
            var dataValue = itemAtt.nodeValue;

            if (dataKey !== undefined) {
              obj[dataKey] = dataValue;
            }
          }

          var nodeName = item.nodeName;

          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = xml2json(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }

            obj[nodeName].push(xml2json(item));
          }
        }
      } else {
        obj = xml.textContent;
      }

      return obj;
    } catch (e) {
      console.log(e.message);
    }
  }

  EXIF.enableXmp = function () {
    EXIF.isXmpEnabled = true;
  };

  EXIF.disableXmp = function () {
    EXIF.isXmpEnabled = false;
  };

  EXIF.getData = function (img, callback) {
    if ((self.Image && img instanceof self.Image || self.HTMLImageElement && img instanceof self.HTMLImageElement) && !img.complete) return false;

    if (!imageHasData(img)) {
      getImageData(img, callback);
    } else {
      if (callback) {
        callback.call(img);
      }
    }

    return true;
  };

  EXIF.getTag = function (img, tag) {
    if (!imageHasData(img)) return;
    return img.exifdata[tag];
  };

  EXIF.getIptcTag = function (img, tag) {
    if (!imageHasData(img)) return;
    return img.iptcdata[tag];
  };

  EXIF.getAllTags = function (img) {
    if (!imageHasData(img)) return {};
    var a,
        data = img.exifdata,
        tags = {};

    for (a in data) {
      if (data.hasOwnProperty(a)) {
        tags[a] = data[a];
      }
    }

    return tags;
  };

  EXIF.getAllIptcTags = function (img) {
    if (!imageHasData(img)) return {};
    var a,
        data = img.iptcdata,
        tags = {};

    for (a in data) {
      if (data.hasOwnProperty(a)) {
        tags[a] = data[a];
      }
    }

    return tags;
  };

  EXIF.pretty = function (img) {
    if (!imageHasData(img)) return "";
    var a,
        data = img.exifdata,
        strPretty = "";

    for (a in data) {
      if (data.hasOwnProperty(a)) {
        if (typeof data[a] == "object") {
          if (data[a] instanceof Number) {
            strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
          } else {
            strPretty += a + " : [" + data[a].length + " values]\r\n";
          }
        } else {
          strPretty += a + " : " + data[a] + "\r\n";
        }
      }
    }

    return strPretty;
  };

  EXIF.readFromBinaryFile = function (file) {
    return findEXIFinJPEG(file);
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return EXIF;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var http = __webpack_require__(6);

var fileType = 'jpeg';

var _success = function success() {};

var faile = function faile() {};

var src = '';
var fileDir = 'common';
var fileUploadAuth = 'https://third-api.wyins.net/oss/getAuthInfo';
var aliyuncs = 'https://winbrokers.oss-cn-hangzhou.aliyuncs.com';
var uploadParams = ''; // base64转blob

var base64ToBlob = function base64ToBlob(str) {
  var arr = str.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};

var chunk = function chunk() {
  return 'abcdefghjiklmnopqrstuvwxyz'.charAt(parseInt(Math.random() * 26)) + Date.now().toString() + 'abcdefghjiklmnopqrstuvwxyz'.charAt(parseInt(Math.random() * 26));
};

var upload = function upload(params) {
  if (!params || !params.url) {
    console.error('请选择您要上传的base64图片源码');

    if (params && typeof params.fail === 'function') {
      params.fail(0);
    }

    return;
  }

  src = params.url;
  fileDir = params.dir || fileDir;
  fileType = params.fileType || fileType;
  _success = typeof params.success === 'function' ? params.success : _success;
  fail = typeof params.fail === 'function' ? params.fail : fail;

  if (_typeof(uploadParams) !== 'object') {
    return;
  } else if (!uploadParams) {
    fail(1);
    return;
  }

  var blob = base64ToBlob(src);
  var fileName = uploadParams.expire + '_' + chunk();

  var _formData = new FormData();

  _formData.append('success_action_status', 200);

  _formData.append('signature', uploadParams.signature);

  _formData.append('policy', uploadParams.policy);

  _formData.append('OSSAccessKeyId', uploadParams.accessid);

  _formData.append('key', uploadParams.dir + fileName + '.' + fileType);

  _formData.append('file', blob);

  http.ajax({
    url: aliyuncs,
    type: 'POST',
    data: _formData,
    success: function success() {
      var src = 'https:' + uploadParams.cdnMediaHost + uploadParams.dir + fileName + '.' + fileType;
      var img = document.createElement('img');
      img.src = src + '?x-oss-process=image/crop,x_0,y_0,w_10,h_10,g_se';
      img.style.cssText = 'position:absolute;left:100%;width:1px;top:100%';
      document.body.appendChild(img);

      img.onload = function () {
        // document.body.removeChild(img)
        _success(src);
      };
    },
    error: function error() {
      fail(2);
    }
  });
};

module.exports = {
  init: function init() {
    http.ajax({
      url: fileUploadAuth,
      data: {
        fileDir: fileDir
      },
      success: function success(res) {
        uploadParams = null;

        if (res && res.data) {
          uploadParams = res.data;
        }
      },
      error: function error() {
        fail(1);
      }
    });
  },
  upload: upload
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var http = {
  /**
  * js封装ajax请求
  * >>使用new XMLHttpRequest 创建请求对象,所以不考虑低端IE浏览器(IE6及以下不支持XMLHttpRequest)
  * >>使用es6语法,如果需要在正式环境使用,则可以用babel转换为es5语法 https://babeljs.cn/docs/setup/#installation
  *  @param settings 请求参数模仿jQuery ajax
  *  调用该方法,data参数需要和请求头Content-Type对应
  *  Content-Type                        data                                     描述
  *  application/x-www-form-urlencoded   'name=哈哈&age=12'或{name:'哈哈',age:12}  查询字符串,用&分割
  *  application/json                     name=哈哈&age=12'                        json字符串
  *  multipart/form-data                  new FormData()                           FormData对象,当为FormData类型,不要手动设置Content-Type
  *  注意:请求参数如果包含日期类型.是否能请求成功需要后台接口配合
  */
  ajax: function ajax() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 初始化请求参数
    var _s = Object.assign({
      url: '',
      // string
      type: 'GET',
      // string 'GET' 'POST' 'DELETE'
      dataType: 'json',
      // string 期望的返回数据类型:'json' 'text' 'document' ...
      async: true,
      //  boolean true:异步请求 false:同步请求 required
      data: null,
      // any 请求参数,data需要和请求头Content-Type对应
      headers: {},
      // object 请求头
      timeout: 3000,
      // string 超时时间:0表示不设置超时
      beforeSend: function beforeSend(xhr) {},
      success: function success(result, status, xhr) {},
      error: function error(xhr, status, _error) {},
      complete: function complete(xhr, status) {}
    }, settings); // 参数验证


    if (!_s.url || !_s.type || !_s.dataType || !_s.async) {
      console.error('参数有误');
      return;
    } // 创建XMLHttpRequest请求对象


    var xhr = new XMLHttpRequest(); // 请求开始回调函数

    xhr.addEventListener('loadstart', function (e) {
      _s.beforeSend(xhr);
    }); // 请求成功回调函数

    xhr.addEventListener('load', function (e) {
      var status = xhr.status;

      if (status >= 200 && status < 300 || status === 304) {
        var result;

        if (xhr.responseType === 'text') {
          result = xhr.responseText;
        } else if (xhr.responseType === 'document') {
          result = xhr.responseXML;
        } else {
          result = xhr.response;
        } // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功


        _s.success(result, status, xhr);
      } else {
        _s.error(xhr, status, e);
      }
    }); // 请求结束

    xhr.addEventListener('loadend', function (e) {
      _s.complete(xhr, xhr.status);
    }); // 请求出错

    xhr.addEventListener('error', function (e) {
      _s.error(xhr, xhr.status, e);
    }); // 请求超时

    xhr.addEventListener('timeout', function (e) {
      _s.error(xhr, 408, e);
    });
    var useUrlParam = false;

    var sType = _s.type.toUpperCase(); // 如果是"简单"请求,则把data参数组装在url上


    if (sType === 'GET' || sType === 'DELETE') {
      useUrlParam = true;
      _s.url += http.getUrlParam(_s.url, _s.data);
    } // 初始化请求


    xhr.open(_s.type, _s.url, _s.async); // 设置期望的返回数据类型

    xhr.responseType = _s.dataType; // 设置请求头

    for (var _i = 0, _Object$keys = Object.keys(_s.headers); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      xhr.setRequestHeader(key, _s.headers[key]);
    } // 设置超时时间


    if (_s.async && _s.timeout) {
      xhr.timeout = _s.timeout;
    } // 发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应


    xhr.send(useUrlParam ? null : http.getQueryData(_s.data));
  },
  // 把参数data转为url查询参数
  getUrlParam: function getUrlParam(url, data) {
    if (!data) {
      return '';
    }

    var paramsStr = data instanceof Object ? http.getQueryString(data) : data;
    return url.indexOf('?') !== -1 ? paramsStr : '?' + paramsStr;
  },
  // 获取ajax请求参数
  getQueryData: function getQueryData(data) {
    if (!data) {
      return null;
    }

    if (typeof data === 'string') {
      return data;
    }

    console.log(data instanceof FormData);

    if (data instanceof FormData) {
      return data;
    }

    return http.getQueryString(data);
  },
  // 把对象转为查询字符串
  getQueryString: function getQueryString(data) {
    var paramsArr = [];

    if (data instanceof Object) {
      Object.keys(data).forEach(function (key) {
        var val = data[key]; // todo 参数Date类型需要根据后台api酌情处理

        if (val instanceof Date) {// val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
        }

        paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      });
    }

    return paramsArr.join('&');
  }
};
module.exports = http;

/***/ })
/******/ ])["default"];
});