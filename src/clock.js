
FRAMERAT.Clock = {

  old         : performance.now(),
  new         : performance.now(),
  fps         : 0,
  minimumTick : 16,
  total       : 0.0,
  delta       : 0,

  create : function() {
    var _this = Object.create(this);
    _this.init();
    return _this;
  },

  init : function(){
    this.fps   = 0;
    this.total = 0;
    this.delta = Math.max( 0, this.minimumTick );
  },

  start : function(){
    this.old = performance.now();
  },

  tick : function(){
    this.new    = performance.now();
    this.delta  = ( Math.max( this.new - this.old, this.minimumTick ));
    this.old    = this.new;
    this.total += this.delta;
  },

  getTotal : function(){
    return this.total;
  },

  getDelta : function(){
    return this.delta;
  },

  computeFramePerSecond : function(){
    this.fps = Math.round( 1000 / this.delta );
  },

  getFramePerSecond : function(){
    return this.fps;
  }

};
