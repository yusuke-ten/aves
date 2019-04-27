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

/***/ "./src/aves/Aves.ts":
/*!**************************!*\
  !*** ./src/aves/Aves.ts ***!
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
            _this.audioBuffer = buffer;
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

/***/ "./src/aves/AvesAnalyser.ts":
/*!**********************************!*\
  !*** ./src/aves/AvesAnalyser.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    // private
    function default_1(aves) {
        this.maxHz = 16000;
        this.minHz = 20;
        this._analyserNode = aves.audioCtx.createAnalyser();
        aves.source.connect(this._analyserNode);
        // default 2048
        this._analyserNode.fftSize = 2048;
        this.sampleRate = aves.sampleRate;
        // Array[0] is the strength of frequencies from 0 to 23.4Hz.
        // Array[1] is the strength of frequencies from 23.4Hz to 46.8Hz.
        // Array[2] is the strength of frequencies from 46.8Hz to 70.2Hz.
        // Array[3] is the strength of frequencies from 70.2Hz to 93.6Hz. ...
        this._freqPerIndex = aves.sampleRate / this._analyserNode.fftSize;
        // ─────────────────────────────────────────────────────────────────
        // 表示する最低、最高デジベルを設定
        // ─────────────────────────────────────────────────────────────────
        this.maxDecibels = 0;
        this.minDecibels = -100;
        // fftSize / 2
        this._bufferLength = this._analyserNode.frequencyBinCount;
        // ─────────────────────────────────────────────────────────────────
        // fftsizeが2048のときは、長さが1024の配列を作成
        // ─────────────────────────────────────────────────────────────────
        this.byteFrequencyArray = new Uint8Array(this._bufferLength);
        this.byteTimeDomainArray = new Uint8Array(this._analyserNode.fftSize);
        this.floatFrequencyArray = new Float32Array(this._bufferLength);
    }
    /**
     * 入力されたhzが音声データ配列の何番目の要素なのかを返す
     * @param {number} hz
     * @returns {number}
     */
    default_1.prototype.indexAtSpecificHz = function (hz) {
        return Math.floor(hz / this._freqPerIndex);
    };
    /**
     * 入力された配列番号がが音声データの何Hzあたるのかを返す
     * @param {number} index
     * @returns {number}
     */
    default_1.prototype.hzAtSpecificIndex = function (index) {
        return index * this._freqPerIndex;
    };
    /**
     *
     * @returns
     */
    default_1.prototype.range = function () {
        return this._analyserNode.maxDecibels - this._analyserNode.minDecibels;
    };
    /**
     * サンプルとサンプルの間の秒
     * @returns
     */
    default_1.prototype.samplingInterval = function () {
        return 1 / this.sampleRate;
    };
    Object.defineProperty(default_1.prototype, "maxHzIndex", {
        /**
         * 表示するHzの最大と最低に当たるインデックス番号を返す
         */
        get: function () {
            return Math.floor(this.maxHz / this._freqPerIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1.prototype, "minHzIndex", {
        get: function () {
            return Math.floor(this.minHz / this._freqPerIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1.prototype, "maxDecibels", {
        get: function () {
            return this._analyserNode.maxDecibels;
        },
        /**
         * マックス、ミニマムデジベルのセッター、ゲッター
         * マックスデジベルとミニマムデジベルは
         * getFloatFrequencyData()でしか使えない
         */
        set: function (num) {
            this._analyserNode.maxDecibels = num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1.prototype, "minDecibels", {
        get: function () {
            return this._analyserNode.minDecibels;
        },
        set: function (num) {
            this._analyserNode.minDecibels = num;
        },
        enumerable: true,
        configurable: true
    });
    default_1.prototype.getByteFrequencyData = function () {
        this._analyserNode.getByteFrequencyData(this.byteFrequencyArray);
    };
    default_1.prototype.getFloatFrequencyData = function () {
        this._analyserNode.getFloatFrequencyData(this.floatFrequencyArray);
    };
    default_1.prototype.getByteTimeDomainData = function () {
        this._analyserNode.getByteTimeDomainData(this.byteTimeDomainArray);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/aves/AvesChannels.ts":
/*!**********************************!*\
  !*** ./src/aves/AvesChannels.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    // private
    function default_1(aves) {
        console.log(aves.audioBuffer);
        this.channelLs = new Float32Array(aves.audioBuffer.length);
        this.channelRs = new Float32Array(aves.audioBuffer.length);
        if (aves.audioBuffer.numberOfChannels > 1) {
            this.channelLs.set(aves.audioBuffer.getChannelData(0));
            this.channelRs.set(aves.audioBuffer.getChannelData(1));
        }
        else if (aves.audioBuffer.numberOfChannels > 0) {
            this.channelLs.set(aves.audioBuffer.getChannelData(0));
        }
        else {
            window.alert('The number of channels is invalid.');
            return;
        }
    }
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/drawer/DrawChannelWaves.ts":
/*!****************************************!*\
  !*** ./src/drawer/DrawChannelWaves.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(elm, canvasWidth, canvasHeihgt) {
        this.gridStyle = this.createColor(230, 230, 230, 0.5);
        this.scaleStyle = this.createColor(250, 250, 250, 1);
        this._canvasElm = elm;
        this._canvasElm.width = this._canvasWidth = canvasWidth;
        this._canvasElm.height = this._canvasHeight = canvasHeihgt;
        this._ctx = this._canvasElm.getContext('2d');
        this._bgColor = this.createColor(46, 40, 48);
        this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
    /**
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     * @returns {string} CSS rgba()
     */
    default_1.prototype.createColor = function (r, g, b, a) {
        if (a === void 0) { a = 1; }
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    /**
     *
     * フォント情報ストリングを作成する、後々ヘルパーとかに切り分けたほうがいい
     * @param {string} fontSize
     * @param {string} [type='']
     * @param {string} [font='sans-serif']
     * @returns {string}
     */
    default_1.prototype.createFont = function (fontSize, type, font) {
        if (type === void 0) { type = ''; }
        if (font === void 0) { font = 'sans-serif'; }
        return type + " " + fontSize + " " + font;
    };
    default_1.prototype.draw = function (avesChannels) {
        console.log(avesChannels.channelLs);
        this._ctx.beginPath();
        for (var i = 0, len = avesChannels.channelLs.length; i < len; i++) {
            var x = (i / len) * this._canvasWidth;
            var y = ((1 - avesChannels.channelLs[i]) / 2) * this._canvasHeight;
            if (i === 0) {
                this._ctx.moveTo(x, y);
            }
            else {
                this._ctx.lineTo(x, y);
            }
        }
        this._ctx.stroke();
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/drawer/DrawSpectrumAnalyser.ts":
/*!********************************************!*\
  !*** ./src/drawer/DrawSpectrumAnalyser.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(elm, canvasWidth, canvasHeihgt) {
        this._dispHz = [
            30,
            50,
            100,
            200,
            500,
            1000,
            2000,
            5000,
            10000,
            15000
        ];
        this._dispDecibel = [
            0,
            -10,
            -20,
            -30,
            -40,
            -50,
            -60,
            -70,
            -80,
            -90
        ];
        this._canvasElm = elm;
        this._canvasElm.width = this._canvasWidth = canvasWidth;
        this._canvasElm.height = this._canvasHeight = canvasHeihgt;
        this._ctx = this._canvasElm.getContext('2d');
        this._bgColor = this.createColor(46, 40, 48);
        this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
    /**
     * @param {number} num
     * @returns 入力された数値の桁数を返す
     */
    default_1.prototype.seekDigit = function (num) {
        return Math.LOG10E * Math.log(num);
    };
    /**
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     * @returns {string} CSS rgba()
     */
    default_1.prototype.createColor = function (r, g, b, a) {
        if (a === void 0) { a = 1; }
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    /**
     *
     * フォント情報ストリングを作成する、後々ヘルパーとかに切り分けたほうがいい
     * @param {string} fontSize
     * @param {string} [type='']
     * @param {string} [font='sans-serif']
     * @returns {string}
     */
    default_1.prototype.createFont = function (fontSize, type, font) {
        if (type === void 0) { type = ''; }
        if (font === void 0) { font = 'sans-serif'; }
        return type + " " + fontSize + " " + font;
    };
    /**
     * 特定のHzをX軸のどの部分に対数表示をすればいいかを
     * 計算する。
     * @param {number} hz
     * @param {number} minHz
     * @param {number} maxHz
     * @returns {number} 横軸の画面位置
     */
    default_1.prototype.pointX = function (hz, minHz, maxHz) {
        return (((this.seekDigit(hz) - this.seekDigit(minHz)) /
            (this.seekDigit(maxHz) - this.seekDigit(minHz))) *
            this._canvasWidth);
    };
    /**
     * 描画メソッド
     * @param {AvesAnalyser} avesAnalyser
     */
    default_1.prototype.draw = function (avesAnalyser) {
        // draw initialize
        this._ctx.beginPath();
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
        // ─────────────────────────────────────────────────────────────────
        // 描画範囲は avesAnalyser.minHz < hz <= avesAnalyser.maxHz の間となる
        // ─────────────────────────────────────────────────────────────────
        // 後からグリッドを表示するための一時的な配列
        var DispHzAndX = [];
        for (var i = 0; i <= avesAnalyser.maxHzIndex; i++) {
            var pointX = this.pointX(avesAnalyser.hzAtSpecificIndex(i), avesAnalyser.minHz, avesAnalyser.maxHz);
            // ─────────────────────────────────────────────────────────────────F
            // プロットする点を得る処理
            // ─────────────────────────────────────────────────────────────────
            var pointY = -1 *
                ((avesAnalyser.floatFrequencyArray[i] - avesAnalyser.maxDecibels) /
                    avesAnalyser.range()) *
                this._canvasHeight;
            if (i === avesAnalyser.minHzIndex) {
                this._ctx.moveTo(0, pointY);
            }
            else {
                this._ctx.lineTo(pointX, pointY);
            }
            // ─────────────────────────────────────────────────────────────────
            // 後からX軸に目盛りを描画するので今はデータを保存だけ
            // ─────────────────────────────────────────────────────────────────
            for (var _i = 0, _a = this._dispHz; _i < _a.length; _i++) {
                var hz = _a[_i];
                if (avesAnalyser.indexAtSpecificHz(hz) === i) {
                    DispHzAndX.push({
                        text: hz < 1000 ? String(hz) + 'Hz' : String(hz / 1000) + 'kHz',
                        pointX: pointX
                    });
                }
            }
        }
        // ─────────────────────────────────────────────────────────────────
        // 点から線を作る
        // ─────────────────────────────────────────────────────────────────
        this._ctx.strokeStyle = this.createColor(250, 250, 250, 1);
        this._ctx.lineWidth = 2;
        this._ctx.stroke();
        this._ctx.fillStyle = this.createColor(50, 50, 50, 0.8);
        this._ctx.lineTo(this._canvasWidth, this._canvasHeight);
        this._ctx.lineTo(0, this._canvasHeight);
        this._ctx.closePath();
        this._ctx.fill();
        // グリッドとテキストを表示するために色とか諸々変更
        var fontSize = 11;
        this._ctx.font = this.createFont(String(fontSize) + 'px');
        var gridSize = 0.6;
        var gridStyle = this.createColor(230, 230, 230, 0.5);
        var scaleStyle = this.createColor(250, 250, 250, 1);
        // ─────────────────────────────────────────────────────────────────
        // X軸に目盛りを描画
        // ─────────────────────────────────────────────────────────────────
        for (var _b = 0, DispHzAndX_1 = DispHzAndX; _b < DispHzAndX_1.length; _b++) {
            var value = DispHzAndX_1[_b];
            this._ctx.fillStyle = gridStyle;
            this._ctx.fillRect(value.pointX, 0, gridSize, this._canvasHeight);
            this._ctx.fillStyle = scaleStyle;
            this._ctx.fillText(value.text, value.pointX - 12, this._canvasHeight - fontSize);
        }
        // ─────────────────────────────────────────────────────────────────
        // Y軸に目盛りを描画
        // ─────────────────────────────────────────────────────────────────
        for (var _c = 0, _d = this._dispDecibel; _c < _d.length; _c++) {
            var decibel = _d[_c];
            if (decibel === 0)
                continue;
            var range = avesAnalyser.range();
            var text = String(decibel);
            var pointY = this._canvasHeight * -(decibel / range);
            this._ctx.fillStyle = gridStyle;
            this._ctx.fillRect(0, pointY, this._canvasWidth, gridSize);
            this._ctx.fillStyle = scaleStyle;
            this._ctx.fillText(text, 5, pointY + 12);
        }
    };
    /**
     *
     *
     * @param {AvesAnalyser} avesAnalyser
     * requestAnimationFrameで自分自身を呼ぶ
     */
    default_1.prototype.animationStart = function (avesAnalyser) {
        var _this = this;
        avesAnalyser.getFloatFrequencyData();
        this.draw(avesAnalyser);
        this._animationFrameId = requestAnimationFrame(function () {
            return _this.animationStart(avesAnalyser);
        });
    };
    default_1.prototype.animationStop = function () {
        cancelAnimationFrame(this._animationFrameId);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ }),

/***/ "./src/drawer/DrawTimeDomainAnalyser.ts":
/*!**********************************************!*\
  !*** ./src/drawer/DrawTimeDomainAnalyser.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var default_1 = /** @class */ (function () {
    function default_1(elm, canvasWidth, canvasHeihgt) {
        this.gridStyle = this.createColor(230, 230, 230, 0.5);
        this.scaleStyle = this.createColor(250, 250, 250, 1);
        this._dispHz = [
            30,
            50,
            100,
            200,
            500,
            1000,
            2000,
            5000,
            10000,
            15000
        ];
        this._dispDecibel = [
            0,
            -10,
            -20,
            -30,
            -40,
            -50,
            -60,
            -70,
            -80,
            -90
        ];
        this._canvasElm = elm;
        this._canvasElm.width = this._canvasWidth = canvasWidth;
        this._canvasElm.height = this._canvasHeight = canvasHeihgt;
        this._ctx = this._canvasElm.getContext('2d');
        this._bgColor = this.createColor(46, 40, 48);
        this._ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
    }
    /**
     * @param {number} num
     * @returns 入力された数値の桁数を返す
     */
    default_1.prototype.seekDigit = function (num) {
        return Math.LOG10E * Math.log(num);
    };
    /**
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     * @returns {string} CSS rgba()
     */
    default_1.prototype.createColor = function (r, g, b, a) {
        if (a === void 0) { a = 1; }
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    /**
     *
     * フォント情報ストリングを作成する、後々ヘルパーとかに切り分けたほうがいい
     * @param {string} fontSize
     * @param {string} [type='']
     * @param {string} [font='sans-serif']
     * @returns {string}
     */
    default_1.prototype.createFont = function (fontSize, type, font) {
        if (type === void 0) { type = ''; }
        if (font === void 0) { font = 'sans-serif'; }
        return type + " " + fontSize + " " + font;
    };
    /**
     * 特定のHzをX軸のどの部分に対数表示をすればいいかを
     * 計算する。
     * @param {number} hz
     * @param {number} minHz
     * @param {number} maxHz
     * @returns {number} 横軸の画面位置
     */
    default_1.prototype.pointX = function (hz, minHz, maxHz) {
        return (((this.seekDigit(hz) - this.seekDigit(minHz)) /
            (this.seekDigit(maxHz) - this.seekDigit(minHz))) *
            this._canvasWidth);
    };
    /**
     * 描画メソッド
     * @param {AvesAnalyser} avesAnalyser
     */
    default_1.prototype.draw = function (avesAnalyser) {
        // ─────────────────────────────────────────────────────────────────
        // 初期化処理
        // ─────────────────────────────────────────────────────────────────
        var arrayLength = avesAnalyser.byteTimeDomainArray.length;
        this._ctx.beginPath();
        var fontSize = 11;
        this._ctx.font = this.createFont(String(fontSize) + 'px');
        this._ctx.fillStyle = this._bgColor;
        this._ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
        // ─────────────────────────────────────────────────────────────────
        // デフォルトでは2048までループ
        // ─────────────────────────────────────────────────────────────────
        for (var i_1 = 0; i_1 <= arrayLength; i_1++) {
            // ─────────────────────────────────────────────────────────────────
            // プロットする点を得る処理
            // ─────────────────────────────────────────────────────────────────
            var pointX = (i_1 / arrayLength) * this._canvasWidth;
            // ─────────────────────────────────────────────────────────────────
            // avesAnalyser.byteTimeDomainArrayの中身の数値は0~255
            // ─────────────────────────────────────────────────────────────────
            var pointY = (1 - avesAnalyser.byteTimeDomainArray[i_1] / 255) * this._canvasHeight;
            if (i_1 === 0) {
                this._ctx.moveTo(0, pointY);
            }
            else {
                this._ctx.lineTo(pointX, pointY);
            }
            // ─────────────────────────────────────────────────────────────────
            // X軸に目盛りを描画
            // ─────────────────────────────────────────────────────────────────
            var sec = i_1 * avesAnalyser.samplingInterval();
            var msec = sec * Math.pow(10, 3);
            if (msec % 5 === 0) {
                var text = Math.round(msec) + ' msec';
                this._ctx.fillStyle = this.gridStyle;
                this._ctx.fillRect(pointX, 0, 1, this._canvasHeight);
                this._ctx.fillStyle = this.scaleStyle;
                this._ctx.fillText(text, pointX + 4, this._canvasHeight - fontSize);
            }
        }
        // ─────────────────────────────────────────────────────────────────
        // グラフを描画
        // ─────────────────────────────────────────────────────────────────
        this._ctx.strokeStyle = this.createColor(250, 250, 250, 1);
        this._ctx.lineWidth = 1;
        this._ctx.stroke();
        // ─────────────────────────────────────────────────────────────────
        // Y軸に目盛りを描画
        // ─────────────────────────────────────────────────────────────────
        var textYs = ['1.00', '0.00', '-1.00'];
        for (var i = 0, len = textYs.length; i < len; i++) {
            var text = textYs[i];
            var gy = ((1 - parseFloat(text)) / 2) * this._canvasHeight;
            this._ctx.fillStyle = this.gridStyle;
            this._ctx.fillRect(0, gy, this._canvasWidth, 1);
            this._ctx.fillStyle = this.scaleStyle;
            this._ctx.fillText(text, 5, gy + 12);
        }
    };
    /**
     *
     *
     * @param {AvesAnalyser} avesAnalyser
     * requestAnimationFrameで自分自身を呼ぶ
     */
    default_1.prototype.animationStart = function (avesAnalyser) {
        var _this = this;
        avesAnalyser.getByteTimeDomainData();
        this.draw(avesAnalyser);
        this._animationFrameId = requestAnimationFrame(function () {
            return _this.animationStart(avesAnalyser);
        });
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
/* harmony import */ var _aves_Aves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aves/Aves */ "./src/aves/Aves.ts");
/* harmony import */ var _aves_AvesAnalyser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aves/AvesAnalyser */ "./src/aves/AvesAnalyser.ts");
/* harmony import */ var _aves_AvesChannels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aves/AvesChannels */ "./src/aves/AvesChannels.ts");
/* harmony import */ var _drawer_DrawSpectrumAnalyser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawer/DrawSpectrumAnalyser */ "./src/drawer/DrawSpectrumAnalyser.ts");
/* harmony import */ var _drawer_DrawTimeDomainAnalyser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawer/DrawTimeDomainAnalyser */ "./src/drawer/DrawTimeDomainAnalyser.ts");
/* harmony import */ var _drawer_DrawChannelWaves__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./drawer/DrawChannelWaves */ "./src/drawer/DrawChannelWaves.ts");
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
        this.aves = new _aves_Aves__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /**
     *
     *
     * @param {ArrayBuffer} audioData
     * @returns {Promise<AudioBufferSourceNode>}
     */
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
        if (this.drawSpectrumAnalyser instanceof _drawer_DrawSpectrumAnalyser__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.drawSpectrumAnalyser.animationStart(this.avesAnalyser);
        }
        if (this.drawTimeDomainAnalyser instanceof _drawer_DrawTimeDomainAnalyser__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            this.drawTimeDomainAnalyser.animationStart(this.avesAnalyser);
        }
    };
    default_1.prototype.stop = function () {
        this.aves.stop();
        if (this.drawSpectrumAnalyser instanceof _drawer_DrawSpectrumAnalyser__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            this.drawSpectrumAnalyser.animationStop();
        }
        if (this.drawTimeDomainAnalyser instanceof _drawer_DrawTimeDomainAnalyser__WEBPACK_IMPORTED_MODULE_4__["default"]) {
            this.drawTimeDomainAnalyser.animationStop();
        }
    };
    /**
     *
     *
     * @param {HTMLCanvasElement} elm
     * @param {number} canvasWidth
     * @param {number} canvasHeihgt
     */
    default_1.prototype.createSpectrumAnalyser = function (elm, canvasWidth, canvasHeihgt) {
        this.avesAnalyser = new _aves_AvesAnalyser__WEBPACK_IMPORTED_MODULE_1__["default"](this.aves);
        this.drawSpectrumAnalyser = new _drawer_DrawSpectrumAnalyser__WEBPACK_IMPORTED_MODULE_3__["default"](elm, canvasWidth, canvasHeihgt);
    };
    /**
     *
     *
     * @param {HTMLCanvasElement} elm
     * @param {number} canvasWidth
     * @param {number} canvasHeihgt
     */
    default_1.prototype.createTimeDomainAnalyser = function (elm, canvasWidth, canvasHeihgt) {
        this.avesAnalyser = new _aves_AvesAnalyser__WEBPACK_IMPORTED_MODULE_1__["default"](this.aves);
        this.drawTimeDomainAnalyser = new _drawer_DrawTimeDomainAnalyser__WEBPACK_IMPORTED_MODULE_4__["default"](elm, canvasWidth, canvasHeihgt);
    };
    /**
     *
     *
     * @param {HTMLCanvasElement} elm
     * @param {number} canvasWidth
     * @param {number} canvasHeihgt
     */
    default_1.prototype.createAudioWave = function (elm, canvasWidth, canvasHeihgt) {
        this.avesChannels = new _aves_AvesChannels__WEBPACK_IMPORTED_MODULE_2__["default"](this.aves);
        this.drawChannelWaves = new _drawer_DrawChannelWaves__WEBPACK_IMPORTED_MODULE_5__["default"](elm, canvasWidth, canvasHeihgt);
        this.drawChannelWaves.draw(this.avesChannels);
    };
    return default_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (default_1);


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map