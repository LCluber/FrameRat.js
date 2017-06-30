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

var FRAMERAT = {
    revision: "0.2.8",
    id: null,
    onAnimate: function() {},
    tickCount: 0,
    fsm: {},
    clock: {},
    frameId: 0,
    options: {
        refreshRate: 30
    },
    console: {},
    formated: {
        delta: 0
    },
    create: function(onAnimate, scope) {
        var _this = Object.create(this);
        _this.createOnAnimateCallback(onAnimate, scope);
        _this.createFiniteStateMachine();
        _this.createConsole();
        _this.clock = FRAMERAT.Clock.create();
        return _this;
    },
    createOnAnimateCallback: function(onAnimate, scope) {
        if (!scope) this.onAnimate = onAnimate; else this.onAnimate = onAnimate.bind(scope);
    },
    createConsole: function() {
        this.console = FRAMERAT.Console.create(TYPE6.Vector2D.create(), TYPE6.Vector2D.create(20, 20));
        this.console.addLine("Elapsed time : {0}", this.getFormatedElapsedTime, this);
        this.console.addLine("Frame count : {0}", this.getFrameNumber, this);
        this.console.addLine("Frame Per Second : {0}", this.getFramePerSecond, this);
        this.console.addLine("Frame duration : {0}", this.getFormatedDelta, this);
        this.toggleConsole();
    },
    createFiniteStateMachine: function() {
        this.fsm = TAIPAN.create([ {
            name: "play",
            from: "paused",
            to: "running"
        }, {
            name: "pause",
            from: "running",
            to: "paused"
        } ]);
    },
    play: function() {
        if (this.fsm.play()) {
            this.clock.start();
            this.requestNewFrame();
            return true;
        }
        return false;
    },
    pause: function() {
        if (this.fsm.pause()) {
            this.cancelAnimation();
            return true;
        }
        return false;
    },
    toggle: function() {
        if (!this.play()) this.pause();
        return this.fsm.getStatus();
    },
    stop: function() {
        this.clock.init();
        this.tickCount = 0;
        if (this.pause()) {
            return true;
        }
        return false;
    },
    getElapsedTime: function() {
        return this.clock.getElapsed();
    },
    getFormatedElapsedTime: function() {
        return TYPE6.MathUtils.round(this.getElapsedTime().getSecond(), 2);
    },
    getDelta: function() {
        return this.clock.getDelta();
    },
    getFormatedDelta: function() {
        if (this.tickCount % this.options.refreshRate === 0) this.formated.delta = TYPE6.MathUtils.round(this.getDelta().getMillisecond(), 2);
        return this.formated.delta;
    },
    getFrameNumber: function() {
        return this.tickCount;
    },
    getFramePerSecond: function() {
        if (this.tickCount % this.options.refreshRate === 0) this.clock.computeFramePerSecond();
        return this.clock.getFramePerSecond();
    },
    newFrame: function() {
        this.requestNewFrame();
        this.clock.tick();
    },
    requestNewFrame: function() {
        this.frameId = window.requestAnimationFrame(this.onAnimate);
        this.tickCount++;
    },
    cancelAnimation: function() {
        window.cancelAnimationFrame(this.frameId);
    },
    drawConsole: function(context) {
        this.console.draw(context);
    },
    toggleConsole: function() {
        this.console.toggle();
    }
};

FRAMERAT.Time = {
    millisecond: 0,
    second: 0,
    create: function(millisecond) {
        var _this = Object.create(this);
        _this.set(millisecond || 0);
        return _this;
    },
    set: function(value) {
        this.millisecond = value;
        this.second = this.millisecondToSecond(this.millisecond);
    },
    add: function(value) {
        this.set(this.millisecond + value);
    },
    getSecond: function() {
        return this.second;
    },
    getMillisecond: function() {
        return this.millisecond;
    },
    millisecondToSecond: function(millisecond) {
        return millisecond * .001;
    }
};

FRAMERAT.Console = {
    fontFamily: "Georgia",
    fontSize: 20,
    fontColor: "rgba(60, 60, 60, 1)",
    font: "",
    position: null,
    padding: null,
    color: null,
    lineHeight: 30,
    lines: [],
    nbLines: 0,
    show: false,
    create: function(position, padding) {
        var _this = Object.create(this);
        _this.position = position;
        _this.padding = padding;
        _this.lines = [];
        _this.setFont(_this.fontSize, _this.fontFamily);
        return _this;
    },
    setFont: function(fontSize, fontFamily) {
        this.font = fontSize + "px " + fontFamily;
    },
    setFontColor: function(r, g, b, a) {
        this.fontColor = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    },
    addLine: function(text, callback, scope) {
        var positionY = this.lineHeight;
        var positionX = this.padding.getX();
        if (this.nbLines) positionY += this.lines[this.nbLines - 1].position.getY(); else positionY += this.padding.getY();
        this.nbLines++;
        var line = this.Line.create(TYPE6.Vector2D.create(positionX, positionY), text, callback, scope);
        this.lines.push(line);
    },
    draw: function(context) {
        if (this.show) {
            context.font = this.font;
            context.fillStyle = this.fontColor;
            for (var i = 0; i < this.nbLines; i++) {
                var line = this.lines[i];
                this.write(line.text.replace("{0}", line.callback), line.position, context);
            }
        }
    },
    write: function(text, position, context) {
        context.fillText(text, position.getX(), position.getY());
    },
    toggle: function() {
        this.show = this.show ? false : true;
    }
};

FRAMERAT.Console.Line = {
    position: null,
    callback: null,
    text: "",
    create: function(position, text, callback, scope) {
        var _this = Object.create(this);
        _this.position = position;
        _this.callback = callback.bind(scope);
        _this.text = text;
        return _this;
    }
};

FRAMERAT.Clock = {
    old: performance.now(),
    new: performance.now(),
    fps: 0,
    minimumTick: 16,
    elapsed: {},
    delta: {},
    create: function() {
        var _this = Object.create(this);
        _this.elapsed = FRAMERAT.Time.create(0);
        _this.delta = FRAMERAT.Time.create(Math.max(0, _this.minimumTick));
        return _this;
    },
    init: function() {
        this.fps = 0;
        this.elapsed.set(0);
        this.delta.set(Math.max(0, this.minimumTick));
    },
    start: function() {
        this.old = performance.now();
    },
    tick: function() {
        this.new = performance.now();
        this.delta.set(Math.max(this.new - this.old, this.minimumTick));
        this.old = this.new;
        this.elapsed.add(this.delta.getMillisecond());
    },
    getElapsed: function() {
        return this.elapsed;
    },
    getDelta: function() {
        return this.delta;
    },
    computeFramePerSecond: function() {
        this.fps = Math.round(1e3 / this.delta.getMillisecond());
    },
    getFramePerSecond: function() {
        return this.fps;
    }
};

(function() {
    if ("performance" in window === false) {
        window.performance = {};
    }
    Date.now = Date.now || function() {
        return new Date().getTime();
    };
    if ("now" in window.performance === false) {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            nowOffset = performance.timing.navigationStart;
        }
        window.performance.now = function now() {
            return Date.now() - nowOffset;
        };
    }
})();

(function() {
    var lastTime = 0;
    var vendors = [ "ms", "moz", "webkit", "o" ];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
})();