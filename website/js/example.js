  var playButton = findById('play');
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
    majTime();
    majFPS();
    animation.requestNewFrame();
  }

  //create animation frame
  var animation = new FRAMERAT.Player(render);

  function playAnimation(){
    var state = animation.toggle();
    if(state === 'running') {
      playButton.innerHTML = "<span class='glyphicon glyphicon-pause'></span>";
    }else if (state === 'paused') {
      playButton.innerHTML = "<span class='glyphicon glyphicon-play'></span>";
    }
  }

  function stopAnimation () {
    animation.stop();
    clearFrame();
    playButton.innerHTML = "<span class='glyphicon glyphicon-play'></span>";
    //animation.drawConsole( context ); //draw the console one time to show the reset
  }

  function majTime() {
    findById('time').innerHTML = formatTime(TYPE6.Utils.round(animation.getTotal(), 2));
  }

  function majFPS() {
    findById('fps').innerHTML = formatFPS(Math.round(animation.getFPS()));
    //findById('fps').innerHTML = animation.getFramePerSecond() + ' fps - ' + animation.getFormatedDelta() + ' ms';
  }

  function formatTime(value){
    var zeros = '';
    for (var i = 100 ; i > 1 ; i /= 10) {
      if (value < i) {
        zeros += '0';
      }
    }
    return zeros + value.toFixed(2);
  }

  function formatFPS(value){
    if (value < 10) {
      return '0' + value + ' fps';
    }
    return value + ' fps';
  }

  function findById( id ) {
    return document.getElementById(id);
  }
