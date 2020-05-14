import { Time } from '@lcluber/type6js';
import { isNumber } from '@lcluber/chjs';
import { Clock } from './clock';

export class Player {

  private clock       : Clock;
  public frameId      : number;
  private callback    : Function;
  private minDelta    : number;
  private running     : boolean

  constructor(callback: Function) {
    this.frameId = 0;
    this.minDelta = 0;
    this.clock = new Clock();
    this.callback = callback;
    this.running = false;
  }

  public setMaxRefreshRate(maxFPS: number): void {
    this.minDelta = isNumber(maxFPS) ? Time.fpsToMillisec(maxFPS) : this.minDelta;
  }

  public getDelta():number {
    return Time.millisecToSec(this.clock.delta);
  }

  public getTotal():number {
    return Time.millisecToSec(this.clock.total);
  }

  public getFPS():number {
    return this.clock.computeAverageFPS();
  }

  public getTicks():number {
    return this.clock.ticks;
  }

  public setScope(scope: Object): void {
    this.callback = this.callback.bind(scope);
  }

  public start(): boolean {
    if(!this.running) {
      this.startAnimation();
      return true;
    }
    return false;
  }

  public toggle(): boolean {
    if (this.start()) {
      return true;
    }
    this.pause();
    return false;
  }

  public pause(): boolean {
    if(this.running) {
      this.stopAnimation();
      return true;
    }
    return false;
  }

  public stop(): void {
    this.clock.reset();
    if(this.running) {
      this.stopAnimation();
    }
  }

  private tick(now: number): void {
    let nxt = true;
    const delta = this.clock.computeDelta(now);
    if (!this.minDelta || delta >= this.minDelta) {
      this.clock.tick(now);
      if (this.callback() === false) {
        nxt = false ;
      }
    } 
    nxt ? this.requestNewFrame() : this.stop();
  }

  private startAnimation() : void {
    this.clock.start();
    this.running = !this.running;
    this.requestNewFrame();
  }

  private stopAnimation(): void {
    this.running = !this.running;
    window.cancelAnimationFrame(this.frameId);
  }

  private requestNewFrame(): void {
    this.frameId = window.requestAnimationFrame(this.tick.bind(this));
  }

}
