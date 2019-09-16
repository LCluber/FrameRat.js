import { Time } from '@lcluber/type6js';
import { FSM } from '@lcluber/taipanjs';
import { isNumber } from '@lcluber/chjs';
import { Clock } from './clock';

export class Player {

  public fsm          : FSM;
  private clock       : Clock;
  public frameId      : number;
  private callback    : Function;
  private minDelta    : number;

  constructor(callback: Function) {
    this.frameId = 0;
    this.minDelta = 0;
    this.clock = new Clock();
    this.callback = callback;

    this.fsm = new FSM([
                { name: 'play',  from: false,  to: true },
                { name: 'stop', from: true, to: false }
              ]);

  }

  public setMaxRefreshRate(maxFPS: number): void {
    this.minDelta = isNumber(maxFPS) ? Time.framePerSecondToMillisecond(maxFPS) : this.minDelta;
  }

  public getDelta():number {
    return Time.millisecondToSecond(this.clock.delta);
  }

  public getTotal():number {
    return Time.millisecondToSecond(this.clock.total);
  }

  public getFPS():number {
    return this.clock.computeAverageFPS();
  }

  public getTicks():number {
    return this.clock.ticks;
  }

  public getState(): string|number|boolean {
    return this.fsm.state;
  }

  // public setScope(scope: any): void {
  //   this.callback = this.callback.bind(scope);
  // }

  public play(): boolean {
    let play = this.fsm['play']();
    if(play) {
      this.startAnimation();
    }
    return play;
  }

  public toggle(): boolean {
    return this.play() || this.pause();
  }

  public pause(): false {
    if(this.fsm['stop']()) {
      this.stopAnimation();
    }
    return false;
  }

  public stop(): void {
    this.fsm['stop']()
    this.clock.reset();
    this.stopAnimation();
  }

  private tick(now: number): void {
    let nxt = true;
    let delta = this.clock.computeDelta(now);
    if (!this.minDelta || delta >= this.minDelta) {
      this.clock.tick(now);
      if (this.callback() === false)
        nxt = false ;
    } 
    nxt ? this.requestNewFrame() : this.stop();
  }

  private startAnimation() : void {
    this.clock.start();
    this.requestNewFrame();
  }

  private stopAnimation(): void {
    window.cancelAnimationFrame(this.frameId);
  }

  private requestNewFrame(): void {
    this.frameId = window.requestAnimationFrame(this.tick.bind(this));
  }

}
