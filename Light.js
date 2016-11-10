function Light( rayLength , rayWidth , numRays){

  if( !rayLength ){ rayLength = 2; }
  if( !rayWidth ){ rayWidth = .3; }
  if( !numRays ){ numRays = 30; }

  this.randID = Math.random();
  this.uniforms = {
        
    dT:       { type:"f"  , value : 0             },
    time:     { type:"f"  , value : 0             },
    progress: { type:"f"  , value : 0             },
    iModelMat:{ type:"m4" , value: new THREE.Matrix4() },
    breakingVal: { type:"f" , value: 0 },
    bwVal: { type:"f" , value: 0 },

  }

  this.rayUniforms = {
        
    dT:       { type:"f"  , value : 0             },
    time:     { type:"f"  , value : 0             },
    fillVal:  { type:"f"  , value : 0             },
    iModelMat: this.uniforms.iModelMat,

  }


  this.geo = this.createGeometry();

  this.mat = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shaders.vs.gem,
    fragmentShader: shaders.fs.gem,
   // shading: THREE.FlatShading

   // transparent: true

  }); 

  this.mesh = new THREE.Mesh( this.geo , this.mat );
  this.mesh.scale.multiplyScalar( 1 );
  this.mesh.rotation.x = this.randID * 2 * Math.PI;
  this.mesh.rotation.y = this.randID * 2 * Math.PI;
  this.mesh.rotation.z = this.randID * 2 * Math.PI;

  this.rayGeo = new RayGeo( rayLength , rayWidth , numRays );
  this.rayMat = new THREE.ShaderMaterial({

    uniforms: this.rayUniforms,
    vertexShader: shaders.vs.ray,
    fragmentShader: shaders.fs.ray,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
   // shading: THREE.FlatShading

   // transparent: true

  }); 

  this.rayMat.depthTest = false;

  this.ray = new THREE.Mesh(this.rayGeo, this.rayMat);
  //scene.add( this.ray );
  this.mesh.add( this.ray );

}

Light.prototype.add = function(){
  scene.add( this.mesh );
}

Light.prototype.setPos = function( p ){
  this.mesh.position.copy(p);
}

Light.prototype.createGeometry = function(){


  var geo = CrystalGeo( .3 , 3 , 1 , .2); 
  return geo;




}




Light.prototype.rayGeometry = function(){

}

Light.prototype.setBreakingVals = function( sb , eb ){
  this.startBreak = sb;
  this.endBreak = eb;
}

Light.prototype.setBWVals = function( sb , eb ){
  this.startBW = sb;
  this.endBW = eb;
}

Light.prototype.setBreakingShimmer = function( amount ){
  this.breakingShimmer = amount;
}

Light.prototype.setRayFill = function( srf , erf ){
  this.startRayFill = srf;
  this.endRayFill = erf;
}



// from : https://github.com/gre/smoothstep
// bsd
Light.prototype.smoothstep = function(min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}

Light.prototype.update = function(){

  this.mesh.rotation.x += .001 * (this.randID * .2 + .8);
  this.mesh.rotation.y += .0018* (this.randID * .2 + .8);
  this.mesh.rotation.z += .0021* (this.randID * .2 + .8);

  if(this.startBreak){

    var breaking  = this.smoothstep( this.startBreak , this.endBreak , camera.position.y  );
    this.uniforms.breakingVal.value = breaking;

  }

  if(this.startBW){

    var bw  = this.smoothstep( this.startBW , this.endBW , camera.position.y  );
    this.uniforms.bwVal.value = bw;

  }

  if(this.startRayFill ){

    var filling  = this.smoothstep( this.startRayFill , this.endRayFill , camera.position.y  );
    this.rayUniforms.fillVal.value = filling;

  }

  if( this.breakingShimmer ){
    var breaking = (Math.sin( time.value  * 20000 ) + 1) * this.breakingShimmer * .5;
    this.uniforms.breakingVal.value = breaking;
  }

  this.mesh.updateMatrixWorld();
  this.uniforms.iModelMat.value.getInverse( this.mesh.matrixWorld );


}




