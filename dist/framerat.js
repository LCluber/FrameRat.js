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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../../bower_components/Taipanjs/dist/taipan.js'), require('../../bower_components/Mouettejs/dist/mouette.js'), require('../../bower_components/Type6js/dist/type6.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '../../bower_components/Taipanjs/dist/taipan.js', '../../bower_components/Mouettejs/dist/mouette.js', '../../bower_components/Type6js/dist/type6.js'], factory) :
    (factory((global.FRAMERAT = {}),global.TAIPAN,global.MOUETTE,global.TYPE6));
}(this, (function (exports,TAIPAN,MOUETTE,TYPE6) { 'use strict';

    var Clock = (function () {
        function Clock(refreshRate) {
            this.minimumTick = 16.7;
            this.minimumTick = refreshRate ? TYPE6.Time.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
            this.reset();
        }
        Clock.prototype.reset = function () {
            this.total = 0;
            this.delta = this.minimumTick;
            this.fps = 0;
            this.ticks = 0;
            this.sixteenLastFps = [];
        };
        Clock.prototype.start = function () {
            this.now = performance.now();
        };
        Clock.prototype.log = function () {
            if (this.total) {
                MOUETTE.Logger.debug('Elapsed time : ' + TYPE6.Utils.round(TYPE6.Time.millisecondToSecond(this.total), 2) + 'seconds');
                MOUETTE.Logger.debug('ticks : ' + this.ticks);
                MOUETTE.Logger.debug('Average FPS : ' + this.computeAverageFps());
            }
        };
        Clock.prototype.tick = function () {
            var now = performance.now();
            this.delta = now - this.now;
            if (this.delta >= this.minimumTick) {
                this.now = now;
                this.total += this.delta;
                this.ticks++;
                this.fps = TYPE6.Time.millisecondToFramePerSecond(this.delta);
                this.updateSixteenLastFps();
                return true;
            }
            return false;
        };
        Clock.prototype.computeAverageFps = function () {
            var _this = this;
            var totalFps = function () {
                var total = 0;
                for (var _i = 0, _a = _this.sixteenLastFps; _i < _a.length; _i++) {
                    var fps = _a[_i];
                    total += fps;
                }
                return total;
            };
            return TYPE6.Utils.validate(TYPE6.Utils.round(totalFps() / this.sixteenLastFps.length, 2));
        };
        Clock.prototype.updateSixteenLastFps = function () {
            this.sixteenLastFps[this.ticks % 60] = this.fps;
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
                { name: 'pause', from: 'running', to: 'paused' }
            ]);
        };
        Player.prototype.setScope = function (scope) {
            this.onAnimate.bind(scope);
        };
        Player.prototype.play = function () {
            return this.startAnimation();
        };
        Player.prototype.toggle = function () {
            return this.startAnimation() || this.stopAnimation();
        };
        Player.prototype.stop = function () {
            this.clock.log();
            this.clock.reset();
            return this.stopAnimation();
        };
        Player.prototype.requestNewFrame = function () {
            this.newFrame();
            return this.clock.tick();
        };
        Player.prototype.startAnimation = function () {
            if (this.fsm['play']()) {
                this.clock.start();
                this.newFrame();
                return this.fsm.state;
            }
            return false;
        };
        Player.prototype.stopAnimation = function () {
            if (this.fsm['pause']()) {
                window.cancelAnimationFrame(this.frameId);
            }
            return this.fsm.state;
        };
        Player.prototype.newFrame = function () {
            this.frameId = window.requestAnimationFrame(this.onAnimate);
        };
        return Player;
    }());

    exports.Player = Player;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
