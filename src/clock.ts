import { Time, NumArray } from '@lcluber/type6js';

export class Clock {

  public ticks        : number;
  public total        : number;
  public delta        : number;
  private now         : number;
  private fpsArrayLength : number = 60;
  private fpsArray : Array<number> = Array(this.fpsArrayLength);

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.now   = 0;
    this.total = 0;
    this.delta = 0;
    this.ticks = 0;
    this.fpsArray.fill(60);
  }

  public start(): void {
    this.now = performance.now();
  }

  public tick(now: number): void {
    this.now = now;
    this.total += this.delta;
    this.fpsArray[this.ticks % 60] = Time.millisecToFps(this.delta);
    this.ticks++;
  }

  public computeDelta(now: number): number {
    return this.delta = now - this.now;
  }

  public computeAverageFPS(): number {
    return NumArray.average(this.fpsArray, this.fpsArrayLength);
  }

}
