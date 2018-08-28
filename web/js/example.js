  var playButton = findById('play');
  var canvas  = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width   = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var mainCircle   = new Type6.Circle( width * 0.5, height * 0.5, 200 );
  var smallCircles = [];
  var angle        = 0;
  var numObjects   = 24;
  var step         = 0;
  var slice        = Type6.Trigonometry.twopi / numObjects;
  var radius       = 20;

  function smallCircle(posX,posY) {
    this.circle = new Type6.Circle(posX, posY, 20);
    this.alpha = 0.2;
    this.minAlpha = 0.2;
    this.setAlpha = function() {
      if( this.alpha > this.minAlpha ) {
        this.alpha = Math.max(this.alpha - 0.01, this.minAlpha);
      }
    };
  }

  for(var i = 0; i < numObjects; i += 1) {
    angle = i * slice;
    smallCircles[i] = new smallCircle(
      Type6.Trigonometry.cosineEquation( mainCircle.radius, angle, 0, mainCircle.position.x ),
      Type6.Trigonometry.sineEquation( mainCircle.radius, angle, 0, mainCircle.position.y )
    );
  }


  function draw(){
    for(var i = 0 ; i < numObjects ; i += 1) {
      var circle = smallCircles[i];
      if (i === Math.floor(step)){
        circle.alpha = 1;
      }else{
        circle.setAlpha();
      }
      drawCircle(smallCircles[i]);
    }

    step += 0.25;
    if(step === numObjects)
      step = 0;

  }

  function drawCircle(circle){
    context.fillStyle = "rgba(153, 0, 0, " + circle.alpha + ")";
    context.beginPath();
    context.arc( circle.circle.position.x, circle.circle.position.y, circle.circle.radius, 0, Type6.Trigonometry.twopi, false);
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
  var animation = new Framerat.Player(render);

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
    findById('time').innerHTML = formatTime(Type6.Utils.round(animation.getTotal(), 2));
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
