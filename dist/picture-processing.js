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

/* harmony default export */ __webpack_exports__["default"] = ({
  image2css: image2css,
  image2base: image2base,
  image2cut: image2cut
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

module.exports = function (imgSrc) {
  function getBase64Image(img, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
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

var W;
var H;
var image; // 全貌展示的图片节点

var cutImage; // 被裁剪的图片节点

var scale = 1; // 图片缩放的比例

var minScale = 0.5;
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
  left = left <= -(W + nowMargin[3] - cutWidth - cutToPrintDisX) / 2 ? -(W + nowMargin[3] - cutWidth - cutToPrintDisX) : left;
  top = top >= cutToPrintDisY - nowMargin[0] ? cutToPrintDisY - nowMargin[0] : top;
  top = top <= -(H + nowMargin[0] - cutHeight - cutToPrintDisY) / 2 ? -(H + nowMargin[0] - cutHeight - cutToPrintDisY) : top;
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
  cutWidth = paramsType === 'string' ? W / 2 : params.width || W / 2;
  cutWidth = Math.min(W, parseInt(cutWidth));
  cutHeight = paramsType === 'string' ? cutWidth : params.height || cutWidth;
  cutHeight = Math.min(window.innerHeight, parseInt(cutHeight));
  cutPart.style.cssText = "width: ".concat(cutWidth, "px;height: ").concat(cutHeight, "px;"); // 创建弹窗

  createBox();
  return new Promise(function (resolve, reject) {
    image2base(imgSrc).then(function (res) {
      imgSrc = res.base64;
      image = new Image();
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
        error: '图片加载失败，请确认图片路径是否正确'
      });
    });
    addListener(box, 'touchmove');
  });
};

/***/ })
/******/ ])["default"];
});