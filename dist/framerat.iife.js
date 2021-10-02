/** MIT License
* 
* Copyright (c) 2011 Ludovic CLUBER
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice (including the next
* paragraph) shall be included in all copies or substantial portions of the
* Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* 
* https://github.com/LCluber/FrameRat.js
*/

var FrameRat = (function (exports) {
  'use strict';

  /** MIT License
  * 
  * Copyright (c) 2011 Ludovic CLUBER 
  * 
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  * http://type6js.lcluber.com
  */
  var Utils =
  /*#__PURE__*/
  function () {
    function Utils() {}

    Utils.round = function round(x, decimals) {
      decimals = Math.pow(10, decimals);
      return Math.round(x * decimals) / decimals;
    };

    Utils.floor = function floor(x, decimals) {
      decimals = Math.pow(10, decimals);
      return Math.floor(x * decimals) / decimals;
    };

    Utils.ceil = function ceil(x, decimals) {
      decimals = Math.pow(10, decimals);
      return Math.ceil(x * decimals) / decimals;
    };

    Utils.trunc = function trunc(x, decimals) {
      decimals = Math.pow(10, decimals);
      var v = +x * decimals;

      if (!isFinite(v)) {
        return v;
      }

      return (v - v % 1) / decimals || (v < 0 ? -0 : v === 0 ? v : 0);
    };

    Utils.roundToNearest = function roundToNearest(x, nearest) {
      return Math.round(x / nearest) * nearest;
    };

    Utils.mix = function mix(x, y, ratio) {
      return (1 - ratio) * x + ratio * y;
    };

    Utils.getSign = function getSign(x) {
      return x ? x < 0 ? -1 : 1 : 0;
    };

    Utils.opposite = function opposite(x) {
      return -x;
    };

    Utils.clamp = function clamp(x, min, max) {
      return Math.min(Math.max(x, min), max);
    };

    Utils.normalize = function normalize(x, min, max) {
      return (x - min) / (max - min);
    };

    Utils.lerp = function lerp(min, max, amount) {
      return (max - min) * amount + min;
    };

    Utils.map = function map(x, sourceMin, sourceMax, destMin, destMax) {
      return this.lerp(destMin, destMax, this.normalize(x, sourceMin, sourceMax));
    };

    Utils.isIn = function isIn(x, min, max) {
      return x >= min && x <= max;
    };

    Utils.isOut = function isOut(x, min, max) {
      return x < min || x > max;
    };

    return Utils;
  }();

  var Trigonometry =
  /*#__PURE__*/
  function () {
    function Trigonometry() {}

    Trigonometry.init = function init() {
      Trigonometry.createRoundedPis();
      Trigonometry.createFactorialArray();
    };

    Trigonometry.createRoundedPis = function createRoundedPis() {
      var decimals = 2;
      this.pi = Utils.round(Math.PI, decimals);
      this.twopi = Utils.round(Math.PI * 2, decimals);
      this.halfpi = Utils.round(Math.PI * 0.5, decimals);
    };

    Trigonometry.createFactorialArray = function createFactorialArray() {
      var maxSin = this.sineLoops[this.sineLoops.length - 1] * 3;
      var maxCos = this.cosineLoops[this.cosineLoops.length - 1] * 2;

      for (var i = 1, f = 1; i <= Math.max(maxSin, maxCos); i++) {
        f *= this.factorial(i);
        this.factorialArray.push(f);
      }
    };

    Trigonometry.factorial = function factorial(i) {
      return i > 1 ? i - 1 : 1;
    };

    Trigonometry.setSinePrecision = function setSinePrecision(value) {
      if (value >= 0 && value <= this.maxDecimals) {
        this.sineDecimals = value;
        return value;
      }

      return this.sineDecimals = this.maxDecimals;
    };

    Trigonometry.setCosinePrecision = function setCosinePrecision(value) {
      if (value >= 0 && value <= this.maxDecimals) {
        this.cosineDecimals = value;
        return value;
      }

      return this.cosineDecimals = this.maxDecimals;
    };

    Trigonometry.setArctanPrecision = function setArctanPrecision(value) {
      if (value >= 0 && value <= this.maxDecimals) {
        this.arctanDecimals = value;
        return value;
      }

      return this.arctanDecimals = this.maxDecimals;
    };

    Trigonometry.degreeToRadian = function degreeToRadian(degree) {
      return degree * this.pi / 180;
    };

    Trigonometry.radianToDegree = function radianToDegree(radian) {
      return radian * 180 / this.pi;
    };

    Trigonometry.normalizeRadian = function normalizeRadian(angle) {
      if (angle > this.pi || angle < -this.pi) {
        return angle - this.twopi * Math.floor((angle + this.pi) / this.twopi);
      }

      return angle;
    };

    Trigonometry.sine = function sine(angle) {
      angle = this.normalizeRadian(angle);

      if (Trigonometry.sineDecimals <= 2 && angle < 0.28 && angle > -0.28) {
        return angle;
      } else {
        return this.taylorSerie(3, Trigonometry.sineLoops[this.sineDecimals], angle, angle, true);
      }
    };

    Trigonometry.cosine = function cosine(angle) {
      angle = this.normalizeRadian(angle);
      var squaredAngle = angle * angle;

      if (this.cosineDecimals <= 2 && angle <= 0.5 && angle >= -0.5) {
        return 1 - squaredAngle * 0.5;
      } else {
        return this.taylorSerie(2, Trigonometry.cosineLoops[this.cosineDecimals], 1, angle, true);
      }
    };

    Trigonometry.arctan2 = function arctan2(x, y) {
      var angle = y / x;

      if (x > 0) {
        return this.arctan(angle);
      } else if (x < 0) {
        if (y < 0) {
          return this.arctan(angle) - this.pi;
        } else {
          return this.arctan(angle) + this.pi;
        }
      } else {
        if (y < 0) {
          return -this.halfpi;
        } else if (y > 0) {
          return this.halfpi;
        } else {
          return false;
        }
      }
    };

    Trigonometry.arctan = function arctan(angle) {
      var loops = Trigonometry.arctanLoops[this.arctanDecimals];

      if (angle < 1 && angle > -1) {
        return this.taylorSerie(3, loops, angle, angle, false);
      } else {
        if (angle >= 1) {
          angle = 1 / angle;
          return -(this.taylorSerie(3, loops, angle, angle, false) - this.halfpi);
        } else {
          angle = -1 / angle;
          return this.taylorSerie(3, loops, angle, angle, false) - this.halfpi;
        }
      }
    };

    Trigonometry.sineEquation = function sineEquation(amplitude, period, shiftX, shiftY) {
      return amplitude * this.sine(period + shiftX) + shiftY;
    };

    Trigonometry.cosineEquation = function cosineEquation(amplitude, period, shiftX, shiftY) {
      return amplitude * this.cosine(period + shiftX) + shiftY;
    };

    Trigonometry.arctanEquation = function arctanEquation(amplitude, period, shiftX, shiftY) {
      return amplitude * this.arctan(period + shiftX) + shiftY;
    };

    Trigonometry.taylorSerie = function taylorSerie(start, max, x, angle, needFactorial) {
      var squaredAngle = angle * angle;
      var result = x;
      var denominator = 0;
      var sign = -1;

      for (var i = 0; start <= max; start += 2, i++) {
        x *= squaredAngle;
        denominator = needFactorial ? this.factorialArray[start] : start;
        result += x / denominator * sign;
        sign = Utils.opposite(sign);
      }

      return result;
    };

    return Trigonometry;
  }();

  Trigonometry.sineLoops = [9, 11, 13, 15, 17, 18, 19, 21, 23];
  Trigonometry.cosineLoops = [6, 8, 10, 12, 14, 16, 18, 20, 22];
  Trigonometry.arctanLoops = [17, 19, 21, 23, 25, 27, 29, 31, 33];
  Trigonometry.sineDecimals = 2;
  Trigonometry.cosineDecimals = 2;
  Trigonometry.arctanDecimals = 2;
  Trigonometry.maxDecimals = 8;
  Trigonometry.factorialArray = [];
  Trigonometry.init();

  var Time =
  /*#__PURE__*/
  function () {
    function Time() {}

    Time.millisecToSec = function millisecToSec(millisecond) {
      return millisecond * 0.001;
    };

    Time.secToMillisec = function secToMillisec(second) {
      return second * 1000;
    };

    Time.millisecToFps = function millisecToFps(millisecond) {
      return 1000 / millisecond;
    };

    Time.fpsToMillisec = function fpsToMillisec(refreshRate) {
      return 1000 / refreshRate;
    };

    return Time;
  }();

  var NumArray =
  /*#__PURE__*/
  function () {
    function NumArray() {}

    NumArray.min = function min(array) {
      return Math.min.apply(Math, array);
    };

    NumArray.max = function max(array) {
      return Math.max.apply(Math, array);
    };

    NumArray.sum = function sum(array) {
      return array.reduce(function (a, b) {
        return a + b;
      }, 0);
    };

    NumArray.multiply = function multiply(array) {
      return array.reduce(function (a, b) {
        return a * b;
      }, 0);
    };

    NumArray.average = function average(array, length) {
      return NumArray.sum(array) / length;
    };

    return NumArray;
  }();

  /*
  MIT License

  Copyright (c) 2009 DWTechs

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  https://github.com/DWTechs/CheckHard.js
  */
  function isNumeric(number) {
    return !isNaN(number - parseFloat(number));
  }

  function getTag(tag) {
    if (tag == null) {
      return tag === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(tag);
  }

  function isNumber(number, typeCheck) {
    if (typeCheck === void 0) {
      typeCheck = true;
    }

    if (isSymbol(number)) {
      return false;
    }

    return typeCheck ? Number(number) === number : isNumeric(number);
  }

  function isSymbol(sym) {
    var type = typeof sym;
    return type == 'symbol' || type === 'object' && sym != null && getTag(sym) == '[object Symbol]';
  }

  var Clock =
  /*#__PURE__*/
  function () {
    function Clock() {
      this.fpsArrayLength = 60;
      this.fpsArray = Array(this.fpsArrayLength);
      this.reset();
    }

    var _proto = Clock.prototype;

    _proto.reset = function reset() {
      this.now = 0;
      this.total = 0;
      this.delta = 0;
      this.ticks = 0;
      this.fpsArray.fill(60);
    };

    _proto.start = function start() {
      this.now = performance.now();
    };

    _proto.tick = function tick(now) {
      this.now = now;
      this.total += this.delta;
      this.fpsArray[this.ticks % 60] = Time.millisecToFps(this.delta);
      this.ticks++;
    };

    _proto.computeDelta = function computeDelta(now) {
      return this.delta = now - this.now;
    };

    _proto.computeAverageFPS = function computeAverageFPS() {
      return NumArray.average(this.fpsArray, this.fpsArrayLength);
    };

    return Clock;
  }();

  var Player =
  /*#__PURE__*/
  function () {
    function Player(callback) {
      this.frameId = 0;
      this.frameMinDuration = 0;
      this.clock = new Clock();
      this.callback = callback;
      this.active = false;
    }

    var _proto = Player.prototype;

    _proto.capFPS = function capFPS(maxFPS) {
      this.frameMinDuration = isNumber(maxFPS) ? Time.fpsToMillisec(maxFPS) : this.frameMinDuration;
    };

    _proto.getTick = function getTick() {
      return Time.millisecToSec(this.clock.delta);
    };

    _proto.getTime = function getTime() {
      return Time.millisecToSec(this.clock.total);
    };

    _proto.getFPS = function getFPS() {
      return this.clock.computeAverageFPS();
    };

    _proto.getTicks = function getTicks() {
      return this.clock.ticks;
    };

    _proto.setScope = function setScope(scope) {
      this.callback = this.callback.bind(scope);
    };

    _proto.start = function start() {
      if (!this.active) {
        this.startAnimation();
        return true;
      }

      return false;
    };

    _proto.toggle = function toggle() {
      if (this.start()) {
        return true;
      }

      this.pause();
      return false;
    };

    _proto.pause = function pause() {
      if (this.active) {
        this.stopAnimation();
        return true;
      }

      return false;
    };

    _proto.stop = function stop() {
      this.clock.reset();

      if (this.active) {
        this.stopAnimation();
      }
    };

    _proto.computeNewFrame = function computeNewFrame(now) {
      var delta = this.clock.computeDelta(now);

      if (!this.frameMinDuration || delta >= this.frameMinDuration) {
        this.clock.tick(now);

        if (this.callback() === false) {
          return this.stop();
        }
      }

      this.requestNewFrame();
    };

    _proto.startAnimation = function startAnimation() {
      this.clock.start();
      this.toggleActive();
      this.requestNewFrame();
    };

    _proto.stopAnimation = function stopAnimation() {
      this.toggleActive();
      window.cancelAnimationFrame(this.frameId);
    };

    _proto.requestNewFrame = function requestNewFrame() {
      this.frameId = window.requestAnimationFrame(this.computeNewFrame.bind(this));
    };

    _proto.toggleActive = function toggleActive() {
      this.active = !this.active;
    };

    return Player;
  }();

  exports.Player = Player;

  return exports;

}({}));
