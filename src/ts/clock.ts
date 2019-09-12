import { Logger, Group } from '@lcluber/mouettejs';
import { Time, Utils} from '@lcluber/type6js';

export class Clock {

  private now           : number;
  public fps            : number;
  //public averageFps     : number;
  public sixtyLastFps : Array<number>;
  public minimumTick    : number = 16.7; //better if multiple of 16.7
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
    this.delta = this.minimumTick; //Math.max(0, this.minimumTick);
    this.fps = 0;
    this.ticks = 0;
    this.sixtyLastFps = [];
  }

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

  public tick(): boolean {
    let now = performance.now();
    this.delta = now - this.now;
    if (this.delta >= this.minimumTick) {
      this.now = now;
      this.total += this.delta;
      this.ticks++;
      this.fps = Time.millisecondToFramePerSecond(this.delta);
      this.updateSixtyLastFps();
      return true;
    }
    return false;
    // if enough time has elapsed, draw the next frame

    //if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        //then = now - (elapsed % fpsInterval);

        // Put your drawing code here

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
