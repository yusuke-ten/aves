(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Aves"] = factory();
	else
		root["Aves"] = factory();
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

/***/ "./src/aves/analyser.ts":
/*!******************************!*\
  !*** ./src/aves/analyser.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    // private
    function default_1(aves) {
        this.analyserNode = aves.audioCtx.createAnalyser();
        aves.source.connect(this.analyserNode);
        // default 2048
        this.analyserNode.fftSize = 2048;
        // Array[0] is the strength of frequencies from 0 to 23.4Hz.
        // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
        // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
        // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz.
        // ...
        this.freqDivBufferLength = aves.sampleRate / this.analyserNode.fftSize;
        console.log(aves.sampleRate);
        this._n500Hz = Math.floor(500 / this.freqDivBufferLength);
        this._maxHz = 16000;
        this._maxHzIndex = Math.floor(this._maxHz / this.freqDivBufferLength);
        console.log(this._maxHzIndex);
        // fftSize / 2
        this._bufferLength = this.analyserNode.frequencyBinCount;
        this._unit8Array = new Uint8Array(this._bufferLength);
        this._float32Array = new Float32Array(this._bufferLength);
    }
    default_1.prototype.freqDivIndex = function (index) {
        return index * this.freqDivBufferLength;
    };
    default_1.prototype.getByteFrequencyData = function () {
        this.analyserNode.getByteFrequencyData(this._unit8Array);
    };
    default_1.prototype.getFloatFrequencyData = function () {
        this.analyserNode.getFloatFrequencyData(this._float32Array);
    };
    default_1.prototype.getByteTimeDomainData = function () {
        this.analyserNode.getByteTimeDomainData(this._timeDomainArray);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/aves/core.ts":
/*!**************************!*\
  !*** ./src/aves/core.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    // private
    function default_1() {
        this.audioCtx = new AudioContext();
        this.sampleRate = this.audioCtx.sampleRate;
        this.source = this.audioCtx.createBufferSource();
        this.source.connect(this.audioCtx.destination);
    }
    default_1.prototype.decodeAudio = function (audioData) {
        var _this = this;
        return this.audioCtx
            .decodeAudioData(audioData)
            .then(function (buffer) {
            _this.source.buffer = buffer;
            return _this.source;
        });
    };
    default_1.prototype.start = function () {
        this.source.start(0);
    };
    default_1.prototype.stop = function () {
        this.source.stop();
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/drawer/analyser.ts":
/*!********************************!*\
  !*** ./src/drawer/analyser.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(elm, canvasWidth, canvasHeihgt) {
        this._bgColor = 'rgb(70, 70, 70)';
        try {
            console.log('construct');
            console.log(elm);
            this._canvasElm = elm;
            this._canvasElm.width = canvasWidth;
            this._canvasElm.height = canvasHeihgt;
            this._canvasCtx = this._canvasElm.getContext('2d');
            this._canvasCtx.fillStyle = this._bgColor;
            this._canvasCtx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
            this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
            this._canvasCtx.strokeStyle = 'white';
            this._canvasCtx.strokeText('青色でstrokText', 10, 25);
            console.log('construct end');
            console.log(this._canvasCtx);
        }
        catch (error) {
            console.log(error);
        }
    }
    default_1.prototype.drawAnalyser = function (avesAnalyser) {
        var barWidth = this._canvasWidth / avesAnalyser._maxHzIndex;
        // const hz = avesAnalyser._sampleRate / avesAnalyser._analyserNode.fftSize
        var x = 0;
        var barHeightArray = [];
        for (var i = 0; i < avesAnalyser._bufferLength; i++) {
            if (i > avesAnalyser._maxHzIndex)
                break;
            // let barHeight: number = avesAnalyser._avesAnalyser[i]
            var barHeight = (avesAnalyser._unit8Array[i] / 255) * this._canvasHeight;
            barHeightArray.push(barHeight);
            this._canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            this._canvasCtx.fillRect(x, this._canvasHeight - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    };
    default_1.prototype.animationStart = function (avesAnalyser) {
        var _this = this;
        this._animationFrameId = requestAnimationFrame(function () {
            return _this.animationStart(avesAnalyser);
        });
        this._canvasCtx.fillStyle = this._bgColor;
        this._canvasCtx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
        avesAnalyser.getByteFrequencyData();
        var barWidth = this._canvasWidth / avesAnalyser._bufferLength;
        var x = 0;
        for (var i_1 = 0; i_1 < avesAnalyser._bufferLength; i_1++) {
            var f = Math.floor(i_1 * avesAnalyser.freqDivBufferLength); // index -> frequency
            // 500 Hz ?
            if (i_1 % avesAnalyser._n500Hz === 0) {
                if (i_1 > avesAnalyser._maxHzIndex)
                    break;
                var f = Math.floor(500 * (i_1 / avesAnalyser._n500Hz)); // index -> frequency
                var text = f < 1000 ? f + ' Hz' : f / 1000 + ' kHz';
                // Draw grid (X)
                this._canvasCtx.fillStyle = "rgb(50,255,50)";
                this._canvasCtx.fillRect(x, 0, 1, this._canvasHeight);
                // Draw text (X)
                this._canvasCtx.fillText(text, x, this._canvasHeight);
            }
            x += this._canvasWidth / avesAnalyser._maxHzIndex;
        }
        var textYs = ['1.00', '0.50', '0.00'];
        for (var i = 0, len = textYs.length; i < len; i++) {
            var text = textYs[i];
            var gy = (1 - parseFloat(text)) * this._canvasHeight;
            // Draw grid (Y)
            this._canvasCtx.fillRect(0, gy, this._canvasWidth, 1);
            // Draw text (Y)
            this._canvasCtx.fillText(text, 0, gy);
        }
        this.drawAnalyser(avesAnalyser);
    };
    default_1.prototype.animationStop = function () {
        cancelAnimationFrame(this._animationFrameId);
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
/* harmony import */ var _aves_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aves/core */ "./src/aves/core.ts");
/* harmony import */ var _aves_analyser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aves/analyser */ "./src/aves/analyser.ts");
/* harmony import */ var _drawer_analyser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawer/analyser */ "./src/drawer/analyser.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var default_1 = /** @class */ (function () {
    function default_1() {
        this.aves = new _aves_core__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    default_1.prototype.loadAudio = function (audioData) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.aves.decodeAudio(audioData)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.start = function () {
        this.aves.start();
        this.drawAnalyser.animationStart(this.avesAnalyser);
    };
    default_1.prototype.stop = function () {
        this.aves.stop();
        // this.avesDrawer.animationStop()
    };
    default_1.prototype.createAnalyser = function (elm, canvasWidth, canvasHeihgt) {
        this.avesAnalyser = new _aves_analyser__WEBPACK_IMPORTED_MODULE_1__["default"](this.aves);
        this.drawAnalyser = new _drawer_analyser__WEBPACK_IMPORTED_MODULE_2__["default"](elm, canvasWidth, canvasHeihgt);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map