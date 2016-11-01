
FRAMERAT.Time = {

  millisecond : 0,
  second : 0.0,

  create : function( millisecond ) {
    var _this = Object.create(this);
    _this.set(millisecond, 0);
    return _this;
  },

  set : function( x, min ){
    this.millisecond = Math.max( x, min );
    this.second = this.millisecondToSecond(this.millisecond);
  },

  getSecond : function(){
    return this.second;
  },

  getMillisecond : function(){
    return this.millisecond;
  },

  //utils
  millisecondToSecond : function( millisecond ){
    return millisecond * 0.001;
  }

};
