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

    Utils.sign = function sign(x) {
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

    Utils.lerp = function lerp(normal, min, max) {
      return (max - min) * normal + min;
    };

    Utils.map = function map(x, sourceMin, sourceMax, destMin, destMax) {
      return this.lerp(this.normalize(x, sourceMin, sourceMax), destMin, destMax);
    };

    Utils.isEven = function isEven(x) {
      return !(x & 1);
    };

    Utils.isOdd = function isOdd(x) {
      return x & 1;
    };

    Utils.isOrigin = function isOrigin(x) {
      return x === 0 ? true : false;
    };

    Utils.isPositive = function isPositive(x) {
      return x >= 0 ? true : false;
    };

    Utils.isNegative = function isNegative(x) {
      return x < 0 ? true : false;
    };

    Utils.contains = function contains(x, min, max) {
      return x >= min && x <= max;
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
      if (value < this.sineLoops.length) {
        this.sineDecimals = value;
        return value;
      }

      this.sineDecimals = 2;
      return 2;
    };

    Trigonometry.setCosinePrecision = function setCosinePrecision(value) {
      if (value < Trigonometry.cosineLoops.length) {
        this.cosineDecimals = value;
        return value;
      }

      this.cosineDecimals = 2;
      return 2;
    };

    Trigonometry.setArctanPrecision = function setArctanPrecision(value) {
      if (value < Trigonometry.arctanLoops.length) {
        this.cosineDecimals = value;
        return value;
      }

      this.arctanDecimals = 2;
      return 2;
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

    Trigonometry.arctan2Vector2 = function arctan2Vector2(vector2) {
      return this.arctan2(vector2.x, vector2.y);
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
  Trigonometry.factorialArray = [];
  Trigonometry.init();

  var Time =
  /*#__PURE__*/
  function () {
    function Time() {}

    Time.millisecondToSecond = function millisecondToSecond(millisecond) {
      return millisecond * 0.001;
    };

    Time.secondToMilliecond = function secondToMilliecond(second) {
      return second * 1000;
    };

    Time.millisecondToFramePerSecond = function millisecondToFramePerSecond(millisecond) {
      return 1000 / millisecond;
    };

    Time.framePerSecondToMillisecond = function framePerSecondToMillisecond(refreshRate) {
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

  /** MIT License
   *
   * Copyright (c) 2009 Ludovic CLUBER
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
   * https://github.com/LCluber/Ch.js
   */

  function isInteger(number, typeCheck) {
    if (typeCheck === void 0) {
      typeCheck = true;
    }

    var _int = parseInt(number, 10);

    return typeCheck ? number === _int : number == _int;
  }

  function isFloat(number, typeCheck) {
    if (typeCheck === void 0) {
      typeCheck = true;
    }

    var moduloCheck = number % 1 !== 0;
    return typeCheck ? Number(number) === number && moduloCheck : Number(number) == number && moduloCheck;
  }

  function isNumber(number) {
    return isInteger(number) || isFloat(number);
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
      this.fpsArray[this.ticks % 60] = Time.millisecondToFramePerSecond(this.delta);
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
      this.minDelta = 0;
      this.clock = new Clock();
      this.callback = callback;
      this.running = false;
    }

    var _proto = Player.prototype;

    _proto.setMaxRefreshRate = function setMaxRefreshRate(maxFPS) {
      this.minDelta = isNumber(maxFPS) ? Time.framePerSecondToMillisecond(maxFPS) : this.minDelta;
    };

    _proto.getDelta = function getDelta() {
      return Time.millisecondToSecond(this.clock.delta);
    };

    _proto.getTotal = function getTotal() {
      return Time.millisecondToSecond(this.clock.total);
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
      if (!this.running) {
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
      if (this.running) {
        this.stopAnimation();
        return true;
      }

      return false;
    };

    _proto.stop = function stop() {
      this.clock.reset();

      if (this.running) {
        this.stopAnimation();
      }
    };

    _proto.tick = function tick(now) {
      var nxt = true;
      var delta = this.clock.computeDelta(now);

      if (!this.minDelta || delta >= this.minDelta) {
        this.clock.tick(now);

        if (this.callback() === false) {
          nxt = false;
        }
      }

      nxt ? this.requestNewFrame() : this.stop();
    };

    _proto.startAnimation = function startAnimation() {
      this.clock.start();
      this.running = !this.running;
      this.requestNewFrame();
    };

    _proto.stopAnimation = function stopAnimation() {
      this.running = !this.running;
      window.cancelAnimationFrame(this.frameId);
    };

    _proto.requestNewFrame = function requestNewFrame() {
      this.frameId = window.requestAnimationFrame(this.tick.bind(this));
    };

    return Player;
  }();

  exports.Player = Player;

  return exports;

}({}));
