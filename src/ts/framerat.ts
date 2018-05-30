import * as TYPE6 from '../../bower_components/Type6js/dist/type6';
import * as TAIPAN from '../../bower_components/Taipanjs/dist/taipan';

import {Clock} from './clock';

export class Player {

  public id        : number; //animation frame ID
  private onAnimate: FrameRequestCallback;
  public fsm       : TAIPAN.FSM;
  public clock     : Clock;
  public frameId   : number;
  //public refreshRate: number;
  // options   : {
  //   refreshRate : 30
  // }

  constructor(onAnimate: FrameRequestCallback, refreshRate: number) {
    this.clock = new Clock(refreshRate);
    this.createFiniteStateMachine();
    this.onAnimate = onAnimate;
  }

  private createFiniteStateMachine(): void {
    this.fsm = new TAIPAN.FSM([
                //{ name: 'start',    from: 'idle',    to: 'running' },
                { name: 'play',  from: 'paused',  to: 'running' },
                { name: 'pause', from: 'running', to: 'paused' }
                //{ name: 'stop',     from: 'paused',  to: 'idle' },
              ]);
  }

  public getDelta():number {
    return TYPE6.Time.millisecondToSecond(this.clock.delta);
  }

  public getTotal():number {
    return TYPE6.Time.millisecondToSecond(this.clock.total);
  }

  public getFPS():number {
    return this.clock.computeAverageFps();
  }

  //If using Framerat in a library
  public setScope(scope: any): void {
    this.onAnimate.bind(scope);
  }

  public play(): string|false {
    return this.startAnimation();
  }

  public toggle(): string {
    return this.startAnimation() || this.stopAnimation();
  }

  public stop(): string {
    this.clock.log();
    this.clock.reset();
    return this.stopAnimation();
  }

  //call this function to animate
  public requestNewFrame(): boolean {
    this.newFrame();
    return this.clock.tick();
  }

  private startAnimation() : string|false {
    if(this.fsm['play']()) {
      this.clock.start();
      this.newFrame();
      return this.fsm.state;
    }
    return false;
  }

  private stopAnimation(): string {
    if(this.fsm['pause']()) {
      window.cancelAnimationFrame(this.frameId);
    }
    return this.fsm.state;
  }

  private newFrame(): void {
    this.frameId = window.requestAnimationFrame(this.onAnimate);
  }

}
