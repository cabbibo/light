
function ScrollControls( camera , params ){

  this.camera     = camera;
  var params      = params || {};

  this.dampening  = params.dampening  || .9;
  this.minPos     = params.minPos     || -5;
  this.maxPos     = params.maxPos     ||  0; 
  this.multiplier = params.multiplier || .01;

  this.speed = 0;
  

  var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"

  window.addEventListener( mousewheelevt, this.onMouseWheel.bind( this ), false );


}

ScrollControls.prototype.update = function(){

  this.camera.position.y += this.speed;

 

  if( this.camera.position.y < this.minPos ){

    var dif = this.minPos - this.camera.position.y;

    this.camera.position.y += dif * .1;
    this.speed = 0;
   
    // this.speed += this.

    //console.lo

  }else if( this.camera.position.y > this.maxPos ){

    var dif = this.maxPos - this.camera.position.y;

    this.camera.position.y += dif * .1;
    this.speed = 0;
   
    // this.speed += this.

  }

  this.speed *= this.dampening;

}


ScrollControls.prototype.onMouseWheel = function( e ){


  var speed;
  if( (/Firefox/i.test(navigator.userAgent)) ){
    speed = e.detail * -20
  }else{
    speed = e.wheelDeltaY;

  }
  this.speed += speed * this.multiplier; 

}
