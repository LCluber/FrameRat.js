
FRAMERAT.Clock = {

  revision : '0.1.0',

  minimumTick : 16,

  old : performance.now(),
  new : performance.now(),
  total : 0.0,
  fps : 0.0,

  delta        : FRAMERAT.Time.create(0),
  roundedDelta : FRAMERAT.Time.create(0),

  create : function() {
    var _this = Object.create(this);
    _this.init();
    return _this;
  },

  init : function(){
    this.total = 0.0;
    this.fps = 0;
    this.delta.set(0, this.minimumTick);
  },

  start : function(){
    this.old = performance.now();
  },

  tick : function(){
    this.new = performance.now();
    this.delta.set(this.new - this.old, this.minimumTick);
    this.old = this.new;
    this.total += this.delta.second;
  },

  getTotal : function( decimals ){
    return this.round( this.total, decimals );
  },

  computeRoundedDelta : function( decimals ){
    this.roundedDelta.second = this.delta.second ? this.round( this.delta.second, decimals ) : 0;
    this.roundedDelta.millisecond = this.delta.millisecond ? this.round( this.delta.millisecond, decimals ) : 0;
  },

  getRoundedDelta : function(){
    return this.roundedDelta;
  },

  getDelta : function(){
    return this.delta;
  },

  computeFramePerSecond : function( decimals ){
    this.fps = this.round( 1000/this.delta.millisecond, decimals );
  },

  getFramePerSecond : function(){
    return this.fps;
  },

  //round from Type6.js
  round : function (x, decimals){
    decimals = Math.pow( 10, decimals );
    return Math.round( x * decimals ) / decimals;
  }

};
