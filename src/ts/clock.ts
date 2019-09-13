import { Logger, Group } from '@lcluber/mouettejs';
import { Time, Utils} from '@lcluber/type6js';

export class Clock {

  private now           : number;
  public fps            : number;
  //public averageFps     : number;
  public sixtyLastFps : Array<number>;
  public minimumTick    : number = 4;
  public ticks          : number;
  public total          : number;
  public delta          : number;
  private logger        : Group;
  private callback      : FrameRequestCallback;

  constructor(callback: FrameRequestCallback, , refreshRate?: number|null ) {
    this.minimumTick = refreshRate ? Time.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
    this.reset();
    this.logger = Logger.addGroup('FrameRat');
    this.callback = callback;

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

  public tick(now: number): boolean {
    // llet now = performance.now();
    this.delta = now - this.now;
    if (this.delta >= this.minimumTick) {
      this.now = now;
      this.total += this.delta;
      this.ticks++;
      this.fps = Time.millisecondToFramePerSecond(this.delta);
      this.updateSixtyLastFps();
      this.callback();
      return true;
    }
    return false;
  //   if (!start) start = timestamp;
  // var progress = timestamp - start;
  // element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  // if (progress < 2000) {
  //   window.requestAnimationFrame(step);
  // }

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
