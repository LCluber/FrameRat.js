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

import { Time } from '@lcluber/type6js';
import { FSM } from '@lcluber/taipanjs';
import { isNumber } from '@lcluber/chjs';
import { Clock } from './clock';
export class Player {
    constructor(callback) {
        this.frameId = 0;
        this.minDelta = 0;
        this.clock = new Clock();
        this.callback = callback;
        this.fsm = new FSM([
            { name: 'start', from: false, to: true },
            { name: 'stop', from: true, to: false }
        ]);
    }
    setMaxRefreshRate(maxFPS) {
        this.minDelta = isNumber(maxFPS) ? Time.framePerSecondToMillisecond(maxFPS) : this.minDelta;
    }
    getDelta() {
        return Time.millisecondToSecond(this.clock.delta);
    }
    getTotal() {
        return Time.millisecondToSecond(this.clock.total);
    }
    getFPS() {
        return this.clock.computeAverageFPS();
    }
    getTicks() {
        return this.clock.ticks;
    }
    getState() {
        return this.fsm.state;
    }
    start() {
        let start = this.fsm['start']();
        if (start) {
            this.startAnimation();
        }
        return start;
    }
    toggle() {
        return this.start() || this.pause();
    }
    pause() {
        if (this.fsm['stop']()) {
            this.stopAnimation();
        }
        return false;
    }
    stop() {
        this.fsm['stop']();
        this.clock.reset();
        this.stopAnimation();
    }
    tick(now) {
        let nxt = true;
        let delta = this.clock.computeDelta(now);
        if (!this.minDelta || delta >= this.minDelta) {
            this.clock.tick(now);
            if (this.callback() === false)
                nxt = false;
        }
        nxt ? this.requestNewFrame() : this.stop();
    }
    startAnimation() {
        this.clock.start();
        this.requestNewFrame();
    }
    stopAnimation() {
        window.cancelAnimationFrame(this.frameId);
    }
    requestNewFrame() {
        this.frameId = window.requestAnimationFrame(this.tick.bind(this));
    }
}
