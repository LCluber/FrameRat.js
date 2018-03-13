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
export declare class Clock {
    private now;
    fps: number;
    minimumTick: number;
    tickCount: number;
    total: number;
    delta: number;
    constructor(refreshRate?: number);
    reset(): void;
    start(): void;
    tick(): boolean;
}


export declare class Player {
    id: number;
    private onAnimate;
    fsm: TAIPAN.FSM;
    clock: Clock;
    frameId: number;
    constructor(onAnimate: FrameRequestCallback, refreshRate: number);
    private createFiniteStateMachine();
    setScope(scope: any): void;
    play(): boolean;
    pause(): boolean;
    toggle(): void;
    stop(): boolean;
    newFrame(): boolean;
    private requestNewFrame();
    cancelAnimation(): void;
}
export declare class Utils {
    static millisecondToSecond(millisecond: number): number;
    static secondToMilliecond(second: number): number;
    static framePerSecond(millisecond: number): number;
}
