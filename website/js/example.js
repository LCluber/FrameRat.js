
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var mainCircle   = new TYPE6.Circle( width * 0.5, height * 0.5, 200 );
  var smallCircles = [];
  var angle        = 0;
  var numObjects   = 24;
  var step         = 0;
  var minAlpha     = 0.2;
  var slice        = TYPE6.Trigonometry.twopi / numObjects;
  var radius       = 20;

  for(var i = 0; i < numObjects; i += 1) {
    angle = i * slice;
    smallCircles[i] = new TYPE6.Circle(
      TYPE6.Trigonometry.cosineEquation( mainCircle.radius, angle, 0, mainCircle.position.x ),
      TYPE6.Trigonometry.sineEquation( mainCircle.radius, angle, 0, mainCircle.position.y ),
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
    for(var i = 0 ; i < numObjects ; i += 1) {
      var circle = smallCircles[i];
      if (i === Math.floor(step))
        circle.alpha = 1;
      else
        circle.majAlpha();
      drawCircle(smallCircles[i]);
    }

    step += 0.25;
    if(step === numObjects)
      step = 0;

  }

  function drawCircle(circle){
    context.fillStyle = "rgba(153, 0, 0, " + circle.alpha + ")";
    context.beginPath();
    context.arc( circle.position.x, circle.position.y, circle.radius, 0, TYPE6.Trigonometry.twopi, false);
    context.fill();
  }

  function clearFrame(){
    context.clearRect(0, 0, width, height);
  }

  function render(){
    clearFrame();
    draw();
    //animation.drawConsole( context );
    animation.newFrame();
  }

  //create animation frame
  var animation = new FRAMERAT.Player(render);

  function playAnimation(){
    animation.play();
  }

  function pauseAnimation () {
    animation.toggle();
  }

  function stopAnimation () {
    animation.stop();
    clearFrame();
    //animation.drawConsole( context ); //draw the console one time to show the reset
  }
