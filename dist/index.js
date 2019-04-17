(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SpectrumAnalyzer"] = factory();
	else
		root["SpectrumAnalyzer"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1() {
        console.log('construct');
    }
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);
// import AnalyzerNode from './audioSpectrum'
// function init() {
//   const canvas: HTMLCanvasElement = document.querySelector('#canvas')
//   canvas.width = 500
//   canvas.height = 500
//   const canvasCtx = canvas.getContext('2d')
//   canvasCtx.clearRect(0, 0, 500, 500)
//   const elm = document.querySelector('#start')
//   elm.addEventListener('click', function() {
//     var request = new XMLHttpRequest()
//     const url = 'sample.mp3'
//     request.open('GET', url, true)
//     request.responseType = 'arraybuffer'
//     // Decode asynchronously
//     request.onload = function() {
//       const audioData: ArrayBuffer = request.response
//       audioLoad(audioData)
//     }
//     request.send()
//   })
//   function draw(analyzer) {
//     let WIDTH = 500
//     let HEIGHT = 500
//     let drawVisual = requestAnimationFrame(() => draw(analyzer))
//     analyzer._analyser.getByteFrequencyData(analyzer._dataArray)
//     canvasCtx.fillStyle = 'rgb(0, 0, 0)'
//     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
//     var barWidth = (WIDTH / analyzer._bufferLength) * 2.5
//     var barHeight
//     var x = 0
//     for (var i = 0; i < analyzer._bufferLength; i++) {
//       barHeight = analyzer._dataArray[i]
//       canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
//       canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
//       x += barWidth + 1
//     }
//   }
//   function audioLoad(audioData: ArrayBuffer) {
//     const analyzer = new AnalyzerNode()
//     analyzer.decodeAudio(audioData).then(function() {
//       console.log('temp')
//       analyzer.start()
//       draw(analyzer)
//     })
//   }
// }
// window.onload = init


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map