import { Time } from '@lcluber/type6js';
import { isNumber } from '@dwtechs/checkhard';
import { Clock } from './clock';

export class Player {

  private clock               : Clock;
  public frameId              : number;
  private callback            : Function;
  private frameMinDuration    : number; //cap frame rate.
  private active              : boolean

  constructor(callback: Function) {
    this.frameId          = 0;
    this.frameMinDuration = 0;
    this.clock            = new Clock();
    this.callback         = callback;
    this.active           = false;
  }

  public capFPS(maxFPS: number): void {
    this.frameMinDuration = isNumber(maxFPS) ? Time.fpsToMillisec(maxFPS) : this.frameMinDuration;
  }

  // get duration of the current frame
  public getTick():number {
    return Time.millisecToSec(this.clock.delta);
  }

  // Get Total time elapsed in seconds
  public getTime():number {
    return Time.millisecToSec(this.clock.total);
  }

  // Get Frame per Second 
  public getFPS():number {
    return this.clock.computeAverageFPS();
  }

  // Get total ticks elapsed
  public getTicks():number {
    return this.clock.ticks;
  }

  public setScope(scope: Object): void {
    this.callback = this.callback.bind(scope);
  }

  public start(): boolean {
    if (!this.active) {
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
    if (this.active) {
      this.stopAnimation();
      return true;
    }
    return false;
  }

  public stop(): void {
    this.clock.reset();
    if (this.active) {
      this.stopAnimation();
    }
  }

  private computeNewFrame(now: number): void {
    const delta = this.clock.computeDelta(now);
    if (!this.frameMinDuration || delta >= this.frameMinDuration) {
      this.clock.tick(now);
      if (this.callback() === false) { // a callback that returns false will stop the animation
        return this.stop();
      }
    } 
    this.requestNewFrame();
  }

  private startAnimation() : void {
    this.clock.start();
    this.toggleActive();
    this.requestNewFrame();
  }

  private stopAnimation(): void {
    this.toggleActive();
    window.cancelAnimationFrame(this.frameId);
  }

  private requestNewFrame(): void {
    this.frameId = window.requestAnimationFrame(this.computeNewFrame.bind(this));
  }

  private toggleActive() {
    this.active = !this.active;
  }
}
