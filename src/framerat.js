/**
* @namespace
*/
var FRAMERAT = {

  /**
  * @author Ludovic Cluber <http://www.lcluber.com>
  * @file Animation frame library.
  * @version 0.2.0
  * @copyright (c) 2011 Ludovic Cluber

  * @license
  * MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  */
  revision: '0.2.1',

  id: null, //animation frame ID
  onAnimate: function(){}, //call this functiion at each frame

  frameNumber:0,
  fsm: {},
  clock: {},
  frameId: 0,

  /**
  * Create a new animation frame.
  * @since 0.2.0
  * @method
  * @param {function} onAnimate The name of your onAnimate callback function.
  * @returns {animationFrame}  The new animation frame
  */
  create : function(onAnimate) {
    var _this = Object.create(this);
    _this.onAnimate = onAnimate;
    _this.createFSM();
    _this.clock = FRAMERAT.Clock.create();
    return _this;
  },

  createFSM : function(){
    this.fsm = TAIPAN.create([
                //{ name: 'start',    from: 'idle',    to: 'running' },
                { name: 'play',  from: 'paused',  to: 'running' },
                { name: 'pause', from: 'running', to: 'paused' },
                //{ name: 'stop',     from: 'paused',  to: 'idle' },
              ]);
  },

  // start:function(){
  //     if( this.fsm.start() ){
  //       this.reset();
  //       this.play();
  //     }
  //     return this.fsm.getStatus();
  // },


  /**
  * Start the animation.
  * @since 0.2.0
  * @method
  * @param {string} scope the scope to pass to the onAnimate callback .
  * @returns {string}  The status of the finite state machine
  */
  play:function(scope){
    if( this.fsm.play() ){
      this.clock.start();
      this.requestNewFrame(scope);
    }
    return this.fsm.getStatus();
  },

  /**
  * Pause the animation.
  * @since 0.2.0
  * @method
  * @returns {string}  The status of the finite state machine
  */
  pause:function(){
    if ( this.fsm.pause() )
      this.cancelAnimation();

    return this.fsm.getStatus();
  },

  /**
  * Stop and reset the animation.
  * @since 0.2.0
  * @method
  */
  stop:function(){
    this.pause();
    this.clock.init();
    this.frameNumber = 0;
  },

  /**
  * Get the total elapsed time since start in seconds.
  * @since 0.1.0
  * @method
  * @param {integer} decimals The number of decimals.
  * @returns {integer}  the elapsed time in seconds
  */
  getTotalTime:function( decimals ){
    return this.clock.getTotal( decimals );
  },

  /**
  * Get the total number of frames since start.
  * @since 0.1.0
  * @method
  * @returns {integer}  the number of frames
  */
  getFrameNumber:function(){
    return this.frameNumber;
  },

  /**
  * Get the rounded elapsed time between the last two frames in seconds and milliseconds. this method lets you set a refresh rate in frame.
  * @since 0.2.0
  * @method
  * @param {integer} refreshRate the refresh rate in frames
  * @param {integer} decimals The number of decimals.
  * @returns {Time}  a Time object containing the rounded delta in seconds and milliseconds
  */
  getRoundedDelta:function( refreshRate, decimals ){
    this.computeRoundedDelta( refreshRate, decimals );
    return this.clock.getRoundedDelta();
  },

  computeRoundedDelta : function( refreshRate, decimals ){
    if( this.frameNumber%refreshRate === 0 )
      this.clock.computeRoundedDelta( decimals );
  },

  /**
  * Get the elapsed time between the last two frames in second and millisecond.
  * @since 0.2.0
  * @method
  * @returns {Time}  a Time object containing the delta in seconds and milliseconds
  */
  getDelta:function(){
    return this.clock.getDelta();
  },

  /**
  * Get the number of frame per second. this method lets you set a refresh rate in frame.
  * @since 0.1.0
  * @method
  * @param {integer} refreshRate the refresh rate in frames
  * @param {integer} decimals The number of decimals.
  * @returns {array}  the number of frame per second
  */
  getFramePerSecond: function( refreshRate, decimals ){
    if( this.frameNumber%refreshRate === 0 )
      this.clock.computeFramePerSecond( decimals );

    return this.clock.getFramePerSecond();
  },

  /**
  * Use it at the end of your render method to request a new frame and continue the animation.
  * @since 0.1.0
  * @method
  * @param {string} property The name of a type of assets given in the assets file.
  * @returns {array}  the list of assets as an array or false if property not found
  */
  newFrame:function(scope){
    this.requestNewFrame(scope);
    this.clock.tick();
  },

  requestNewFrame:function(scope){
    if (!scope)
      this.frameId = window.requestAnimationFrame(this.onAnimate);
    else
      this.frameId = window.requestAnimationFrame(this.onAnimate.bind(scope));
    this.frameNumber++;
  },

  cancelAnimation:function(){
    window.cancelAnimationFrame(this.frameId);
  }

};
