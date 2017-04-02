
FRAMERAT.Clock = {

  old         : performance.now(),
  new         : performance.now(),
  fps         : 0,
  minimumTick : 16,
  elapsed       : {},
  delta       : {},

  create : function() {
    var _this = Object.create(this);
    _this.elapsed = FRAMERAT.Time.create( 0.0 );
    _this.delta = FRAMERAT.Time.create( Math.max( 0, _this.minimumTick ) );
    return _this;
  },

  init : function(){
    this.fps = 0;
    this.elapsed.set( 0.0 );
    this.delta.set( Math.max( 0, this.minimumTick ) );
  },

  start : function(){
    this.old = performance.now();
  },

  tick : function(){
    this.new = performance.now();
    this.delta.set( Math.max( this.new - this.old, this.minimumTick ));
    this.old = this.new;
    this.elapsed.add( this.delta.getMillisecond() );
  },

  getElapsed : function(){
    return this.elapsed;
  },

  getDelta : function(){
    return this.delta;
  },

  computeFramePerSecond : function(){
    this.fps = Math.round( 1000 / this.delta.getMillisecond() );
  },

  getFramePerSecond : function(){
    return this.fps;
  }

};
