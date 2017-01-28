FRAMERAT.Console = {
  
  fontFamilly : 'Georgia',
  fontSize    : 20,
  fontColor   : 'rgba(60, 60, 60, 1)',
  font        : '',
  position    : null,
  padding     : null,
  color       : null,
  lineHeight  : 30,
  lines       : [],
  nbLines     : 0,
  show        : false,
  
  Line : {
    position : null,
    callback : null,
    text     : '',
    
    create : function( position, text, callback, scope ){
      var _this = Object.create(this);
      _this.position = position;
      _this.callback = callback.bind(scope);
      _this.text     = text;
      return _this;
    }
  },
  
  create : function( position, padding ){
    var _this = Object.create(this);
    _this.position = position;
    _this.padding  = padding;
    _this.setFont( _this.fontSize, _this.fontFamily );
    return _this;
  },
  
  setFont : function( fontSize, fontFamily ){
    this.font = fontSize + 'px ' + fontFamily;
  },
  
  setFontColor : function( r,g,b,a ){
    this.fontColor = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  },
  
  addLine : function( text, callback, scope ){
    var positionY = this.lineHeight;
    var positionX = this.padding.getX();
    
    if(this.nbLines)
      positionY += this.lines[this.nbLines-1].position.getY();
    else
      positionY += this.padding.getY();
    
    this.nbLines ++;
    var line = this.Line.create( TYPE6.Vector2D.create( positionX, positionY ), text, callback, scope );
    this.lines.push(line);
    //line = null;
  },
  
  draw : function( context ){
    if( this.show ){
      context.font      = this.font;
      context.fillStyle = this.fontColor;
      for ( var i = 0 ; i < this.nbLines ; i++ ){
        var line = this.lines[i];
        this.write( line.text.replace('{0}', line.callback ), line.position, context );
      }
    }
  },

  write : function( text, position, context ){
    context.fillText( text, position.getX(), position.getY() );
  },
  
  toggle : function(){
    this.show = this.show ? false : true ;
  }
  
};
