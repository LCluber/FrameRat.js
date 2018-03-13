
import * as TYPE6 from '../../bower_components/Type6js/dist/type6';
import {Utils} from './utils'

export class Clock {

  private now        : number;
  public fps         : number;
  public minimumTick : number = 16.7;
  public tickCount   : number;
  public total       : number;
  public delta       : number;

  constructor(refreshRate?: number ) {
    this.minimumTick = refreshRate ? TYPE6.Utils.round(1000 / refreshRate, 1) : this.minimumTick;
    this.reset();
  }

  public reset(): void {
    this.total = 0;
    this.delta = this.minimumTick; //Math.max(0, this.minimumTick);
    this.fps = 0;
    this.tickCount = 0;
  }

  public start(): void {
    this.now = performance.now();
  }

  public tick(): boolean {
    let now = performance.now();
    this.delta = now - this.now;
    if (this.delta >= this.minimumTick) {
      this.now = now;
      this.total += this.delta;
      this.tickCount++;
      this.fps = Utils.framePerSecond(this.delta);
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

}
