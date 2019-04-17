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

/***/ "./src/audioSpectrum.ts":
/*!******************************!*\
  !*** ./src/audioSpectrum.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    // private
    function default_1() {
        this._audioCtx = new AudioContext();
        this._source = this._audioCtx.createBufferSource();
        this._analyser = this._audioCtx.createAnalyser();
        // デフォルトは2048
        this._analyser.fftSize = 2048;
        this._source.connect(this._analyser);
        this._analyser.connect(this._audioCtx.destination);
        // this._analyser.fftSizeの半分の値
        this._bufferLength = this._analyser.frequencyBinCount;
        this._dataArray = new Uint8Array(this._bufferLength);
    }
    default_1.prototype.decodeAudio = function (audioData) {
        var _this = this;
        return this._audioCtx.decodeAudioData(audioData).then(function (buffer) {
            _this._source.buffer = buffer;
        });
    };
    default_1.prototype.start = function () {
        this._source.start(0);
    };
    default_1.prototype.setFrequency = function () {
        this._analyser.getByteFrequencyData(this._dataArray);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _spectrumCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spectrumCanvas */ "./src/spectrumCanvas.ts");
/* harmony import */ var _audioSpectrum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audioSpectrum */ "./src/audioSpectrum.ts");


var default_1 = /** @class */ (function () {
    function default_1(audioData) {
        console.log(audioData);
        this._canvas = new _spectrumCanvas__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.init(audioData);
    }
    default_1.prototype.init = function (audioData) {
        var _this = this;
        this._analyzer = new _audioSpectrum__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._analyzer.decodeAudio(audioData).then(function () {
            console.log('decodeAudio');
            _this._analyzer.start();
            _this._canvas.draw(_this._analyzer);
        });
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);
// import AnalyzerNode from './audioSpectrum'
// function init() {
//   
//   
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
//   
//   function audioLoad(audioData: ArrayBuffer) {
//     
//   }
// }
// window.onload = init


/***/ }),

/***/ "./src/spectrumCanvas.ts":
/*!*******************************!*\
  !*** ./src/spectrumCanvas.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1() {
        this._canvasWidth = 500;
        this._canvasHeight = 500;
        this._canvasElm = document.querySelector('#canvas');
        this._canvasCtx = this._canvasElm.getContext('2d');
        this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
    default_1.prototype.draw = function (spectrum) {
        var _this = this;
        var drawVisual = requestAnimationFrame(function () { return _this.draw(spectrum); });
        spectrum.setFrequency();
        this._canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
        var barWidth = (this._canvasWidth / spectrum._bufferLength) * 2.5;
        var barHeight;
        var x = 0;
        var barHeightArray = [];
        for (var i = 0; i < spectrum._bufferLength; i++) {
            barHeight = spectrum._dataArray[i];
            barHeightArray.push(barHeight);
            this._canvasCtx.fillStyle = 'rgb(0,50,50)';
            console.log({
                x: x,
                y: this._canvasHeight - barHeight / 2,
                z: barWidth,
                a: barHeight / 2
            });
            this._canvasCtx.fillRect(x, this._canvasHeight - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
        console.log(barHeightArray);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map