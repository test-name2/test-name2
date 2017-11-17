var pjs = new PointJS(640, 480, {
	backgroundColor : '#4b4843' // optional
});
pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Objects manager
var math   = pjs.math;           // More Math-methods

var key   = pjs.keyControl.initKeyControl();

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

game.newLoopFromConstructor('myGame', function () {
  var stepTime = 500; // ms
  var time = game.getTime();
  
  var head = game.newRectObject({
    x : 50, y : 50,
    w : 20, h : 20,
    fillColor : '#ffffff',
    userData : {
      dx : 1, 
      dy : 0,
      oldPos : point()
    }
  });

  var tail = [];
  
  var updateTail = function () {
    var old;
    OOP.forArr(tail, function (t) {
      if (!old) {
        t.oldPos = t.getPosition();
        t.setPosition(head.oldPos);
      } else {
        t.oldPos = t.getPosition();
        t.setPosition(old.oldPos);
      }
      old = t;
    });
  };
  
  var addTail = function () {
    ceil.x = math.random(0, width - ceil.w);
    ceil.y = math.random(0, height - ceil.h);
    
    tail.push(game.newRectObject({
      x : head.x, y : head.y,
      w : head.w, h : head.h,
      fillColor : '#ececec'
    }));
    
  };
  
  var ceil = game.newCircleObject({
    radius : 4,
    fillColor : 'red'
  });

	this.update = function () {
	  
	  ceil.draw();
	  head.draw();
	  OOP.drawArr(tail);
	  if (key.isPress('LEFT')) {
	    head.dx = -1;
	    head.dy = 0;
	  } else  if (key.isPress('RIGHT')) {
	    head.dx = 1;
	    head.dy = 0;
	  } else  if (key.isPress('UP')) {
	    head.dy = -1;
	    head.dx = 0;
	  } else  if (key.isPress('DOWN')) {
	    head.dy = 1;
	    head.dx = 0;
	  }

	  if (head.isIntersect(ceil)) {
	    addTail();
	  }
	  
    if (game.getTime() - time > stepTime) {
      
      head.oldPos = head.getPosition();
      head.move(point(head.w * head.dx, head.h * head.dy));
      updateTail();
      
      time = game.getTime();
    }
    
	};
	
	this.entry = function () {
	  OOP.forInt(3, function () {
	    addTail();
	  });
	};

});

game.startLoop('myGame');

