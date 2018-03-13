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
* http://frameratjs.lcluber.com
*/

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../bower_components/Taipanjs/dist/taipan.js'), require('../../bower_components/Type6js/dist/type6.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '../../bower_components/Taipanjs/dist/taipan.js', '../../bower_components/Type6js/dist/type6.js'], factory) :
    (factory((global.FRAMERAT = {}),global.TAIPAN,global.TYPE6));
}(this, (function (exports,TAIPAN,TYPE6) { 'use strict';

    var Utils$1 = (function () {
        function Utils$$1() {
        }
        Utils$$1.millisecondToSecond = function (millisecond) {
            return millisecond * 0.001;
        };
        Utils$$1.secondToMilliecond = function (second) {
            return second / 1000;
        };
        Utils$$1.framePerSecond = function (millisecond) {
            return Math.round(1000 / millisecond);
        };
        return Utils$$1;
    }());

    var Clock = (function () {
        function Clock(refreshRate) {
            this.minimumTick = 16.7;
            this.minimumTick = refreshRate ? TYPE6.Utils.round(1000 / refreshRate, 1) : this.minimumTick;
            this.reset();
        }
        Clock.prototype.reset = function () {
            this.total = 0;
            this.delta = this.minimumTick;
            this.fps = 0;
            this.tickCount = 0;
        };
        Clock.prototype.start = function () {
            this.now = performance.now();
        };
        Clock.prototype.tick = function () {
            var now = performance.now();
            this.delta = now - this.now;
            if (this.delta >= this.minimumTick) {
                this.now = now;
                this.total += this.delta;
                this.tickCount++;
                this.fps = Utils$1.framePerSecond(this.delta);
                return true;
            }
            return false;
        };
        return Clock;
    }());

    var Player = (function () {
        function Player(onAnimate, refreshRate) {
            this.clock = new Clock(refreshRate);
            this.createFiniteStateMachine();
            this.onAnimate = onAnimate;
        }
        Player.prototype.createFiniteStateMachine = function () {
            this.fsm = new TAIPAN.FSM([
                { name: 'play', from: 'paused', to: 'running' },
                { name: 'pause', from: 'running', to: 'paused' },
            ]);
        };
        Player.prototype.setScope = function (scope) {
            this.onAnimate.bind(scope);
        };
        Player.prototype.play = function () {
            if (this.fsm['play']()) {
                this.requestNewFrame();
                this.clock.start();
                return true;
            }
            return false;
        };
        Player.prototype.pause = function () {
            if (this.fsm['pause']()) {
                this.cancelAnimation();
                return true;
            }
            return false;
        };
        Player.prototype.toggle = function () {
            if (!this.play()) {
                this.pause();
            }
        };
        Player.prototype.stop = function () {
            this.clock.reset();
            if (this.pause()) {
                return true;
            }
            return false;
        };
        Player.prototype.newFrame = function () {
            this.requestNewFrame();
            return this.clock.tick();
        };
        Player.prototype.requestNewFrame = function () {
            this.frameId = window.requestAnimationFrame(this.onAnimate);
        };
        Player.prototype.cancelAnimation = function () {
            window.cancelAnimationFrame(this.frameId);
        };
        return Player;
    }());

    exports.Player = Player;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
