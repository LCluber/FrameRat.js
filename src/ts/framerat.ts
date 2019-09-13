import { Time } from '@lcluber/type6js';
import { FSM } from '@lcluber/taipanjs';

import { Clock } from './clock';

export class Player {

  //public id        : number; //animation frame ID
  
  public fsm       : FSM;
  public clock     : Clock;
  public frameId   : number;
  //public refreshRate: number;
  // options   : {
  //   refreshRate : 30
  // }

  constructor(onAnimate: FrameRequestCallback, refreshRate?: number|null) {
    this.frameId = 0;
    this.clock = new Clock(refreshRate);
    this.onAnimate = onAnimate;

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
    this.onAnimate = this.onAnimate.bind(scope);
  }

  public play(): string|false {
    return this.startAnimation();
  }

  public toggle(): string {
    return this.startAnimation() || this.stopAnimation();
  }

  public pause(): string {
    return this.stopAnimation();
  }

  public stop(): string {
    this.clock.log();
    this.clock.reset();
    return this.stopAnimation();
  }

  //call this function to animate
  public requestNewFrame(): boolean {
    if (this.clock.tick()) {
      this.newFrame();
      return true;
    }
    return false;
  }

  private startAnimation() : string|false {
    if((this.fsm['play'])()) {
      this.clock.start();
      this.newFrame();
      return this.fsm.state;
    }
    return false;
  }

  private stopAnimation(): string {
    if((this.fsm['pause'])()) {
      window.cancelAnimationFrame(this.frameId);
    }
    return this.fsm.state;
  }

  private newFrame(): void {
    this.frameId = window.requestAnimationFrame(this.onAnimate);
  }

}
