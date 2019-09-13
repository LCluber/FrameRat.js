import { Time } from '@lcluber/type6js';
import { FSM } from '@lcluber/taipanjs';

import { Clock } from './clock';

export class Player {

  public fsm          : FSM;
  public clock        : Clock;
  public frameId      : number;
  private callback    : FrameRequestCallback;
  private minDelta    : number = 4;
  //public minFPS: number;
  // options   : {
  //   minFPS : 30
  // }

  constructor(callback: FrameRequestCallback, minFPS?: number|null) {
    this.frameId = 0;
    this.minDelta = minFPS ? Time.framePerSecondToMillisecond(minFPS) : this.minDelta;
    this.clock = new Clock(minFPS);
    this.callback = callback;

    this.fsm = new FSM([
                //{ name: 'start',    from: 'idle',    to: 'running' },
                { name: 'play',  from: 'paused',  to: 'running' },
                { name: 'pause', from: 'running', to: 'paused' }
                //{ name: 'stop',     from: 'paused',  to: 'idle' },
              ]);

  }

  public getDelta():number {
    return Time.millisecondToSecond(this.clock.delta);
  }

  public getTotal():number {
    return Time.millisecondToSecond(this.clock.total);
  }

  public getFPS():number {
    return this.clock.computeAverageFps();
  }

  public getTicks():number {
    return this.clock.ticks;
  }

  public setScope(scope: any): void {
    this.callback = this.callback.bind(scope);
  }

  public play(): boolean {
    return this.startAnimation();
  }

  public toggle(): boolean {
    return this.startAnimation() || this.stopAnimation();
  }

  public pause(): boolean {
    return this.stopAnimation();
  }

  public stop(): boolean {
    this.clock.log();
    this.clock.reset();
    return this.stopAnimation();
  }

  private tick(now: number): void{
    let delta = this.clock.computeDelta(now);
    if (delta >= this.minDelta) {
      this.clock.tick(now);
      this.callback(now);
    } 
    this.requestNewFrame();
  }

  private startAnimation() : boolean {
    let play = this.fsm['play']();
    if(play) {
      this.clock.start();
      this.requestNewFrame();
    }
    return play;
  }

  private stopAnimation(): boolean {
    let pause = this.fsm['pause']();
    if(pause) {
      window.cancelAnimationFrame(this.frameId);
    }
    return pause;
  }

  private requestNewFrame(): void {
    this.frameId = window.requestAnimationFrame(this.tick);
  }

}
