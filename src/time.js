
FRAMERAT.Time = {

  millisecond : 0,
  second : 0.0,

  create : function( millisecond ) {
    var _this = Object.create(this);
    _this.set(millisecond);
    return _this;
  },

  set : function( value ){
    this.millisecond = value ;
    this.second      = this.millisecondToSecond( this.millisecond );
  },
  
  add : function( value ){
    this.set( this.millisecond + value );
  },

  getSecond : function(){
    return this.second;
  },

  getMillisecond : function(){
    return this.millisecond;
  }

};
