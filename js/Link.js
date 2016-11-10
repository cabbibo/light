function Link( font , title , href ){

  this.v = new THREE.Vector3();

this.href = href;

  this.selected = { type: "f" , value: 0 }




  var l = title.length;
  this.title = new TextParticles(
    title , 
    font , 
    shaders.vs.title , 
    shaders.fs.title , 
    {
      letterWidth: .03,
      lineLength: l,
    }    
  );




  this.bg = new THREE.Mesh(
    new THREE.PlaneGeometry( 1 , 1 ),  
    new THREE.MeshPhongMaterial({
      color:0x444444,
      emissive:0x222222,
      specular: 0xffffff,
      shininess:4

    })
  );

  this.bg.hoverOver = function(){
    //if( this.selected == false ){ 
      this.material.color.setHex( 0x888888 )
      this.material.emissive.setHex( 0x888888 )
    //}
  }
  this.bg.hoverOut  = function(){
      this.material.color.setHex( 0x444444 ) 
      this.material.emissive.setHex( 0x444444 ) 
   
  }

  this.bg.select = function(){

    this.select();

  }.bind( this );

  objectControls.add( this.bg );

  this.bg.scale.x = this.title.totalWidth + .03;
  this.bg.scale.y = this.title.totalHeight + .03;
  this.bg.position.z = -.002


  this.body = new THREE.Object3D();
  this.ogBodyPos = new THREE.Vector3();


}


Link.prototype.update = function(){

 


}

Link.prototype.add = function( position ){

  this.body.add( this.title );
  this.body.add( this.bg );

  this.title.position.x =  -this.title.totalWidth /2;
  this.title.position.y =   this.title.totalHeight/ 1.3;

  this.body.position.copy( position );

  scene.add( this.body );


}


Link.prototype.select = function(){

  window.open( this.href , "_blank" );
 

}

Link.prototype.deselect = function(){



}
