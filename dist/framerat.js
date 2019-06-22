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

import { Time, Utils } from '@lcluber/type6js';
import { FSM } from '@lcluber/taipanjs';
import { Logger } from '@lcluber/mouettejs';

class Clock {
    constructor(refreshRate) {
        this.minimumTick = 16.7;
        this.minimumTick = refreshRate ? Time.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
        this.reset();
    }
    reset() {
        this.now = 0;
        this.total = 0;
        this.delta = this.minimumTick;
        this.fps = 0;
        this.ticks = 0;
        this.sixteenLastFps = [];
    }
    start() {
        this.now = performance.now();
    }
    log() {
        if (this.total) {
            Logger.info('Elapsed time : ' + Utils.round(Time.millisecondToSecond(this.total), 2) + 'seconds');
            Logger.info('ticks : ' + this.ticks);
            Logger.info('Average FPS : ' + this.computeAverageFps());
        }
    }
    tick() {
        let now = performance.now();
        this.delta = now - this.now;
        if (this.delta >= this.minimumTick) {
            this.now = now;
            this.total += this.delta;
            this.ticks++;
            this.fps = Time.millisecondToFramePerSecond(this.delta);
            this.updateSixteenLastFps();
            return true;
        }
        return false;
    }
    computeAverageFps() {
        let totalFps = () => {
            let total = 0;
            for (let fps of this.sixteenLastFps) {
                total += fps;
            }
            return total;
        };
        return Utils.validate(Utils.round(totalFps() / this.sixteenLastFps.length, 2));
    }
    updateSixteenLastFps() {
        this.sixteenLastFps[this.ticks % 60] = this.fps;
    }
}

class Player {
    constructor(onAnimate, refreshRate) {
        this.frameId = 0;
        this.clock = new Clock(refreshRate);
        this.onAnimate = onAnimate;
        this.fsm = new FSM([
            { name: 'play', from: 'paused', to: 'running' },
            { name: 'pause', from: 'running', to: 'paused' }
        ]);
    }
    getDelta() {
        return Time.millisecondToSecond(this.clock.delta);
    }
    getTotal() {
        return Time.millisecondToSecond(this.clock.total);
    }
    getFPS() {
        return this.clock.computeAverageFps();
    }
    setScope(scope) {
        this.onAnimate = this.onAnimate.bind(scope);
    }
    play() {
        return this.startAnimation();
    }
    toggle() {
        return this.startAnimation() || this.stopAnimation();
    }
    stop() {
        this.clock.log();
        this.clock.reset();
        return this.stopAnimation();
    }
    requestNewFrame() {
        this.newFrame();
        return this.clock.tick();
    }
    startAnimation() {
        if ((this.fsm['play'])()) {
            this.clock.start();
            this.newFrame();
            return this.fsm.state;
        }
        return false;
    }
    stopAnimation() {
        if ((this.fsm['pause'])()) {
            window.cancelAnimationFrame(this.frameId);
        }
        return this.fsm.state;
    }
    newFrame() {
        this.frameId = window.requestAnimationFrame(this.onAnimate);
    }
}

export { Player };
