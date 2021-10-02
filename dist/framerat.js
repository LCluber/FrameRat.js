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

import { Time, NumArray } from '@lcluber/type6js';

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

class Clock {
    constructor() {
        this.fpsArrayLength = 60;
        this.fpsArray = Array(this.fpsArrayLength);
        this.reset();
    }
    reset() {
        this.now = 0;
        this.total = 0;
        this.delta = 0;
        this.ticks = 0;
        this.fpsArray.fill(60);
    }
    start() {
        this.now = performance.now();
    }
    tick(now) {
        this.now = now;
        this.total += this.delta;
        this.fpsArray[this.ticks % 60] = Time.millisecToFps(this.delta);
        this.ticks++;
    }
    computeDelta(now) {
        return this.delta = now - this.now;
    }
    computeAverageFPS() {
        return NumArray.average(this.fpsArray, this.fpsArrayLength);
    }
}

class Player {
    constructor(callback) {
        this.frameId = 0;
        this.frameMinDuration = 0;
        this.clock = new Clock();
        this.callback = callback;
        this.active = false;
    }
    capFPS(maxFPS) {
        this.frameMinDuration = isNumber(maxFPS) ? Time.fpsToMillisec(maxFPS) : this.frameMinDuration;
    }
    getTick() {
        return Time.millisecToSec(this.clock.delta);
    }
    getTime() {
        return Time.millisecToSec(this.clock.total);
    }
    getFPS() {
        return this.clock.computeAverageFPS();
    }
    getTicks() {
        return this.clock.ticks;
    }
    setScope(scope) {
        this.callback = this.callback.bind(scope);
    }
    start() {
        if (!this.active) {
            this.startAnimation();
            return true;
        }
        return false;
    }
    toggle() {
        if (this.start()) {
            return true;
        }
        this.pause();
        return false;
    }
    pause() {
        if (this.active) {
            this.stopAnimation();
            return true;
        }
        return false;
    }
    stop() {
        this.clock.reset();
        if (this.active) {
            this.stopAnimation();
        }
    }
    computeNewFrame(now) {
        const delta = this.clock.computeDelta(now);
        if (!this.frameMinDuration || delta >= this.frameMinDuration) {
            this.clock.tick(now);
            if (this.callback() === false) {
                return this.stop();
            }
        }
        this.requestNewFrame();
    }
    startAnimation() {
        this.clock.start();
        this.toggleActive();
        this.requestNewFrame();
    }
    stopAnimation() {
        this.toggleActive();
        window.cancelAnimationFrame(this.frameId);
    }
    requestNewFrame() {
        this.frameId = window.requestAnimationFrame(this.computeNewFrame.bind(this));
    }
    toggleActive() {
        this.active = !this.active;
    }
}

export { Player };
