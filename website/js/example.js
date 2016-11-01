
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var mainCircle   = TYPE6JS.Geometry.Circle.create( width * 0.5, height * 0.5, 200 );
  var smallCircles = [];
  var angle        = 0;
  var numObjects   = 24;
  var step         = 0;
  var minAlpha     = 0.2;
  var slice        = TYPE6JS.Trigonometry.TWOPI / numObjects;
  var radius       = 20;

  //var circlePosition  = TYPE6JS.Vector2.create();

  for(var i = 0; i < numObjects; i += 1) {
    angle = i * slice;
    smallCircles[i] = TYPE6JS.Geometry.Circle.create(
      TYPE6JS.Trigonometry.cosineEquation( mainCircle.getRadius(), angle, 0, mainCircle.getPositionX() ),
      TYPE6JS.Trigonometry.sineEquation( mainCircle.getRadius(), angle, 0, mainCircle.getPositionY() ),
      20
    );
    var circle = smallCircles[i];
    circle.alpha = minAlpha;
    circle.majAlpha = function(){
      if( this.alpha > minAlpha )
        this.alpha = Math.max(this.alpha - 0.01, minAlpha);
    };
  }

  function draw(){
    for( var i = 0 ; i < numObjects ; i += 1 ) {
      var circle = smallCircles[i];
      if (i == Math.floor(step))
        circle.alpha = 1;
      else
        circle.majAlpha();
      drawCircle(smallCircles[i]);
    }

    step += 0.25;
    if(step == numObjects)
      step = 0;

  }

  function drawCircle(circle){
    context.fillStyle = "rgba(153, 0, 0, " + circle.alpha + ")";
    context.beginPath();
    context.arc( circle.getPositionX(), circle.getPositionY(), circle.getRadius(), 0, TYPE6JS.Trigonometry.TWOPI, false);
    context.fill();
  }

  function write(text, posX, posY){
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillText( text, posX, posY );
  }

  function writeConsole(){
    context.font="20px Georgia";
    write('Elapsed time : '     + animation.getTotalTime(0) + ' seconds', 20, 40);
    write('Frame number : '     + animation.getFrameNumber(), 20, 70);
    write('Frame Per Second : ' + animation.getFramePerSecond(30, 0), 20, 100);
    write('Frame duration : '   + animation.getDelta().getSecond(), 20, 130);
    write('Rounded Frame duration : ' + animation.getRoundedDelta(30, 0).getMillisecond() + ' ms', 20, 160);
  }

  function clearFrame(){
    context.clearRect(0, 0, width, height);
  }

  function render(){
    clearFrame();
    draw();
    writeConsole();
    animation.newFrame();
  }

  //create animation frame
  var animation = FRAMERAT.create(render);

  function playAnimation(){
    animation.play();
  }

  function pauseAnimation () {
    animation.pause();
  }

  function stopAnimation () {
    animation.stop();
    clearFrame();
    writeConsole(); //draw the console one time to show the reset
  }
