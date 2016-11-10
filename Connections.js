function Connections(lightsToConnect){
  
  this.lightsToConnect = lightsToConnect;



  this.uniforms = {
        
    dT:       { type:"f"  , value : 0             },
    time:     { type:"f"  , value : 0             },
    iModelMat:{ type:"m4" , value: new THREE.Matrix4() },
    connectingVal: { type:"f" , value: 0 },

  }


  this.geo = this.createGeometry();


 this.mat = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shaders.vs.connections,
    fragmentShader: shaders.fs.connections,
    //transparent: true,
    //blending: THREE.AdditiveBlending,
    //side: THREE.DoubleSide

  });

  //this.geo = new THREE.IcosahedronGeometry( .3 , 1);

 // this.mat = new THREE.MeshBasicMaterial({color:0xff0000, side: THREE.DoubleSide});
  this.mesh = new THREE.Mesh( this.geo , this.mat);



}

// from : https://github.com/gre/smoothstep
// bsd
Connections.prototype.smoothstep = function(min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}

Connections.prototype.add = function(){
  scene.add( this.mesh );
}
Connections.prototype.createGeometry = function(){
  return ConnectionGeo(this.lightsToConnect , .02 );
}

Connections.prototype.setConnectingVals = function( sb , eb ){
  this.startConnect = sb;
  this.endConnect = eb;
}

Connections.prototype.update = function(){

  if(this.startConnect){

    var connecting  = this.smoothstep( this.startConnect , this.endConnect , camera.position.y  );
    this.uniforms.connectingVal.value = connecting;

  }

  this.mesh.updateMatrixWorld();
  this.uniforms.iModelMat.value.getInverse( this.mesh.matrixWorld );
  this.uniforms.time.value = time.value;

}

