import * as MOUETTE from '../../bower_components/Mouettejs/dist/mouette';
import * as TYPE6 from '../../bower_components/Type6js/dist/type6';

export class Clock {

  private now           : number;
  public fps            : number;
  //public averageFps     : number;
  public sixteenLastFps : Array<number>;
  public minimumTick    : number = 16.7; //better if multiple of 16.7
  public ticks          : number;
  public total          : number;
  public delta          : number;

  constructor(refreshRate?: number ) {
    this.minimumTick = refreshRate ? TYPE6.Time.framePerSecondToMillisecond(refreshRate) : this.minimumTick;
    this.reset();
  }

  public reset(): void {
    this.total = 0;
    this.delta = this.minimumTick; //Math.max(0, this.minimumTick);
    this.fps = 0;
    this.ticks = 0;
    this.sixteenLastFps = [];
  }

  public start(): void {
    this.now = performance.now();
  }

  public log(): void {
    if (this.total){
      MOUETTE.Logger.debug('Elapsed time : ' + TYPE6.Utils.round(TYPE6.Time.millisecondToSecond(this.total), 2) + 'seconds');
      MOUETTE.Logger.debug('ticks : ' + this.ticks);
      MOUETTE.Logger.debug('Average FPS : ' + this.computeAverageFps());
    }
  }

  public tick(): boolean {
    let now = performance.now();
    this.delta = now - this.now;
    if (this.delta >= this.minimumTick) {
      this.now = now;
      this.total += this.delta;
      this.ticks++;
      this.fps = TYPE6.Time.millisecondToFramePerSecond(this.delta);
      this.updateSixteenLastFps();
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
    let totalFps = ():number => {
      let total = 0;
      for (let fps of this.sixteenLastFps) {
        total += fps; //use + because fps is typed as a string otherwise
      }
      return total;
    };
    return TYPE6.Utils.validate(TYPE6.Utils.round( totalFps()/this.sixteenLastFps.length, 2));
  }
  
  private updateSixteenLastFps(): void {
    this.sixteenLastFps[this.ticks % 60] = this.fps;
  }

}
