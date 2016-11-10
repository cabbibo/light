function Darkness(){


  this.uniforms = {
        
    dT:       { type:"f"  , value : 0             },
    time:     { type:"f"  , value : 0             },
    darkeningVal: { type:"f"  , value : 0             },
    darkeningShimmer: { type:"f"  , value : 0             },

    t_sprite: { type:"t", value:THREE.ImageUtils.loadTexture('img/particle2.png') },

  }
  
  this.geo = new DarknessGeo( 1000 , .02 , .5 );

  this.mat = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shaders.vs.darkness,
    fragmentShader: shaders.fs.darkness,
    transparent: true,
    blending: THREE.SubtractiveBlending,
    //side: THREE.DoubleSide

  });

  this.mat.depthTest = false;
  this.mesh = new THREE.Mesh( this.geo , this.mat );


}


// from : https://github.com/gre/smoothstep
// bsd
Darkness.prototype.smoothstep = function(min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}

Darkness.prototype.add = function(){
  scene.add( this.mesh );
}


Darkness.prototype.setDarkeningVals = function( sb , eb ){
  this.startDark = sb;
  this.endDark = eb;
}


Darkness.prototype.setDarkeningShimmer = function( amount ){
  this.darkeningShimmer = amount;
}
Darkness.prototype.update = function(){

  if(this.startDark){

    var darkening  = this.smoothstep( this.startDark , this.endDark , camera.position.y  );
    this.uniforms.darkeningVal.value = darkening;

  }

  if( this.darkeningShimmer ){
    var darkening = (Math.sin( time.value  * 5 ) + Math.sin( time.value  * 1.1 )+ Math.sin( time.value  * .39 ) + 1 + 1) * this.darkeningShimmer * .25;
    this.uniforms.darkeningVal.value = darkening;
  }

  this.mesh.updateMatrixWorld();
//  this.uniforms.iModelMat.value.getInverse( this.mesh.matrixWorld );
  this.uniforms.time.value = time.value;

}
