var canvas = document.getElementById("c");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var phi = 0;
var frames = 0;

var colorArray = [
  'rgba(255, 0, 0, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(0, 0, 255, 1)'
];

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});


function Wave(frequency, amplitude) {
  this.frequency = frequency;
  this.amplitude = amplitude;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.globalCompositeOperation = 'multiply';
    c.beginPath();
    c.strokeStyle = "white";
    c.moveTo(0, innerHeight);
    for (var x = 0; x < innerWidth; x++) {
      y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2;
      c.lineTo(x, y + 200); // 40 = offset
    }
    c.lineTo(innerWidth, innerHeight);
    c.lineTo(0, innerHeight);
    c.fillStyle = this.color;
    c.fill();
    console.log(c.fillStyle);
  }

  this.update = function() {
    frames++;
    phi = frames / 360;
    console.log(frames);
    this.draw();
  }
}

var waveArray = [];

function init() {
  waveArray = [];

  for (var i = 1; i < 4; i++){
    var frequency = 0.0005 * i;
    var amplitude = 150 * i;

    waveArray.push(new Wave(frequency, amplitude));
    console.log(amplitude);
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i = 0; i < waveArray.length; i++){
    waveArray[i].update();
  }
}

init();
animate();
