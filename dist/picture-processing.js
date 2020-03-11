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

/* harmony default export */ __webpack_exports__["default"] = ({
  image2css: image2css,
  image2base: image2base
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

/***/ })
/******/ ])["default"];
});