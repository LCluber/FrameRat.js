import { Logger, Group } from '@lcluber/mouettejs';
import { Time, Utils} from '@lcluber/type6js';

export class Clock {

  private now           : number;
  public fps            : number;
  //public averageFps     : number;
  public sixtyLastFps : Array<number>;
  
  public ticks          : number;
  public total          : number;
  public delta          : number;
  private logger        : Group;

  constructor(refreshRate?: number|null ) {
    this.minimumTick = refreshRate ? Time.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
    this.reset();
    this.logger = Logger.addGroup('FrameRat');
  }

  public reset(): void {
    this.now = 0;
    this.total = 0;
    this.delta = this.minimumTick;
    this.fps = 0;
    this.ticks = 0;
    this.sixtyLastFps = [];
  }l

  public start(): void {
    this.now = performance.now();
  }

  public log(): void {
    if (this.total){
      this.logger.info('Elapsed time : ' + Utils.round(Time.millisecondToSecond(this.total), 2) + 'seconds');
      this.logger.info('ticks : ' + this.ticks);
      this.logger.info('Average FPS : ' + this.computeAverageFps());
    }
  }

  public tick(now: number): void {
    this.now = now;
    this.total += this.delta;
    this.ticks++;
    this.fps = Time.millisecondToFramePerSecond(this.delta);
    this.updateSixtyLastFps();
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
    this.sixtyLastFps[this.ticks % 60] = this.fps;
  }

}
