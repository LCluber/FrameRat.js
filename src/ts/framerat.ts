
//import {FSM} from '../../bower_components/Taipanjs/dist/taipan';
import * as TAIPAN from '../../bower_components/Taipanjs/dist/taipan';
import {Utils} from './utils';
import {Clock} from './clock';

export class Player {

  public id        : number; //animation frame ID
  private onAnimate: FrameRequestCallback;
  public fsm       : TAIPAN.FSM;
  public clock     : Clock;
  public frameId   : number;
  //public refreshRate: number;
  // options   : {
  //   refreshRate : 30
  // },
  // console : {},
  // formated : {
  //   delta : 0
  // },

  constructor(onAnimate: FrameRequestCallback, refreshRate: number) {
    this.clock = new Clock(refreshRate);
    this.createFiniteStateMachine();
    this.onAnimate = onAnimate;
  }
  
  private createFiniteStateMachine(): void {
    this.fsm = new TAIPAN.FSM([
                //{ name: 'start',    from: 'idle',    to: 'running' },
                { name: 'play',  from: 'paused',  to: 'running' },
                { name: 'pause', from: 'running', to: 'paused' },
                //{ name: 'stop',     from: 'paused',  to: 'idle' },
              ]);
  }
  
  //If using Framerat in a library
  public setScope(scope: any): void {
    this.onAnimate.bind(scope);
  }

  // start:function(){
  //     if( this.fsm.start() ){
  //       this.reset();
  //       this.play();
  //     }
  //     return this.fsm.getStatus();
  // },

  public play(): boolean {
    if(this.fsm['play']()) {
      this.requestNewFrame();
      this.clock.start();
      return true;
    }
    return false;
  }

  public pause(): boolean {
    if(this.fsm['pause']()) {
      this.cancelAnimation();
      return true;
    }
    return false;
  }
  
  public toggle(): void {
    if(!this.play()) {
      this.pause();
    }
    //return this.fsm.getStatus();
  }

  public stop(): boolean {
    this.clock.reset();
    if(this.pause()) {
      return true;
    }
    return false;
    //return this.fsm.getStatus();
  }

  //call this function to animate
  public newFrame(): boolean {
    this.requestNewFrame();
    return this.clock.tick();
  }

  private requestNewFrame(): void {
    this.frameId = window.requestAnimationFrame(this.onAnimate);
  }

  public cancelAnimation(): void {
    window.cancelAnimationFrame(this.frameId);
  }

}
