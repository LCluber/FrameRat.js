import { Logger, Group } from '@lcluber/mouettejs';
import { Time, Utils} from '@lcluber/type6js';

export class Clock {

  private now           : number;
  public fps            : number;
  public sixtyLastFps   : Array<number>;
  public ticks          : number;
  public total          : number;
  public delta          : number;
  private logger        : Group;

  constructor() {
    this.reset();
    this.logger = Logger.addGroup('FrameRat');
  }

  public reset(): void {
    this.now = 0;
    this.total = 0;
    this.delta = 0;
    this.fps = 0;
    this.ticks = 0;
    this.sixtyLastFps = [];
  }

  public start(): void {
    this.now = performance.now();
  }

  public log(): void {
    if (this.total) {
      this.logger.info('Elapsed time : ' + Utils.round(Time.millisecondToSecond(this.total), 2) + 'seconds');
      this.logger.info('ticks : ' + this.ticks);
      this.logger.info('Average FPS : ' + this.computeAverageFps());
    }
  }

  public tick(now: number): void {
    this.now = now;
    this.total += this.delta;
    this.ticks++;
    this.updateSixtyLastFps();
  }

  private computeFPS(): number {
    return this.fps = Math.round(Time.millisecondToFramePerSecond(this.delta));
  }

  public computeDelta(now: number): number {
    return this.delta = now - this.now;
  }

  public computeAverageFps(): number {
    let totalFps = 0;
    for (let fps of this.sixtyLastFps) {
      totalFps += fps;
    }
    return Utils.validate(Utils.round( totalFps/this.sixtyLastFps.length, 2));
  }

  private updateSixtyLastFps(): void {
    this.sixtyLastFps[this.ticks % 60] = this.computeFPS();
  }

}
