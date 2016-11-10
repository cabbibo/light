
function RayGeo( length , width , numOf  ){



  var geometry = new THREE.BufferGeometry();

  var totalNum =  numOf * 3 ;
 
  var aPos  = new THREE.BufferAttribute(new Float32Array( totalNum * 3 ), 3);
  var aNorm = new THREE.BufferAttribute(new Float32Array( totalNum * 3 ), 3);
  var aUV   = new THREE.BufferAttribute(new Float32Array( totalNum * 2 ), 2);
 
  geometry.addAttribute( 'position', aPos ); 
  geometry.addAttribute( 'normal', aNorm );
  geometry.addAttribute( 'uv', aUV );

  var positions = geometry.getAttribute( 'position' ).array;
  var normals   = geometry.getAttribute( 'normal' ).array;
  var uvs       = geometry.getAttribute( 'uv' ).array;

  var uvIndex = 0;
  var nIndex = 0;
  var pIndex = 0;


  var pTmp1 = new THREE.Vector3();
  var pTmp2 = new THREE.Vector3();
  for( var i = 0; i < numOf; i++ ){

    var p1 = new THREE.Vector3(0,0,0);
    var p2 = new THREE.Vector3();
    var p3 = new THREE.Vector3();

    pTmp1 = new THREE.Vector3( Math.random()-.5 , Math.random()-.5 , Math.random() - .5 );
    pTmp1.normalize();
    pTmp1.multiplyScalar( length );

    pTmp2.copy( pTmp1 );
    pTmp2.add( new THREE.Vector3( (Math.random() -.5)* width , (Math.random() -.5)* width ,(Math.random() -.5)* width));

    p2.copy( pTmp2 );

    //pTmp2.copy( pTmp1 );
    pTmp2.add( new THREE.Vector3( (Math.random() -.5)* width , (Math.random() -.5)* width ,(Math.random() -.5)* width));
    p3.copy( pTmp2 );
    

    var uv1 = new THREE.Vector2(0,.5);
    var uv2 = new THREE.Vector2(1,0);
    var uv3 = new THREE.Vector2(1,1);

    var norm = new THREE.Vector3();

    pTmp1.copy( p2 );
    pTmp2.copy( p2 );
    pTmp1.sub( p1 );
    pTmp2.sub( p3 );
    pTmp1.normalize();
    pTmp2.normalize();

    norm.crossVectors( pTmp1 , pTmp2);
    norm.normalize();

    positions[ pIndex++ ] = p1.x;
    positions[ pIndex++ ] = p1.y;
    positions[ pIndex++ ] = p1.z;

    positions[ pIndex++ ] = p2.x;
    positions[ pIndex++ ] = p2.y;
    positions[ pIndex++ ] = p2.z;

    positions[ pIndex++ ] = p3.x;
    positions[ pIndex++ ] = p3.y;
    positions[ pIndex++ ] = p3.z;

    uvs[ uvIndex++ ] = uv1.x;
    uvs[ uvIndex++ ] = uv1.y;

    uvs[ uvIndex++ ] = uv2.x;
    uvs[ uvIndex++ ] = uv2.y;

    uvs[ uvIndex++ ] = uv3.x;
    uvs[ uvIndex++ ] = uv3.y;


    normals[ nIndex++ ] = norm.x;
    normals[ nIndex++ ] = norm.y;
    normals[ nIndex++ ] = norm.z;

    normals[ nIndex++ ] = norm.x;
    normals[ nIndex++ ] = norm.y;
    normals[ nIndex++ ] = norm.z;

    normals[ nIndex++ ] = norm.x;
    normals[ nIndex++ ] = norm.y;
    normals[ nIndex++ ] = norm.z;

  }



 /* geometry.computeFaceNormals();
  geometry.computeVertexNormals();*/

  //geometry.baseData = baseArray;

  return geometry;

}


Math.toCart = function( r , t ){

  var x = r * Math.cos( t );
  var y = r * Math.sin( t );

  return [ x , y ];

}