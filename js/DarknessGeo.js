
function DarknessGeo( numObjects , size , spread ){



  var geometry = new THREE.BufferGeometry();



 
  var aPos  = new THREE.BufferAttribute(new Float32Array( numObjects * 6 * 3 ), 3);
  var aNorm = new THREE.BufferAttribute(new Float32Array( numObjects * 6 * 3 ), 3);
  var aUV   = new THREE.BufferAttribute(new Float32Array( numObjects * 6 * 2 ), 2);
  var aID   = new THREE.BufferAttribute(new Float32Array( numObjects * 6 * 1 ), 1);
 
  geometry.addAttribute( 'position', aPos ); 
  geometry.addAttribute( 'id', aID); 
  geometry.addAttribute( 'normal', aNorm );
  geometry.addAttribute( 'uv', aUV );

  var positions = geometry.getAttribute( 'position' ).array;
  var normals   = geometry.getAttribute( 'normal' ).array;
  var uvs       = geometry.getAttribute( 'uv' ).array;
  var ids       = geometry.getAttribute( 'id' ).array;

  var uvIndex = 0;
  var nIndex = 0;
  var pIndex = 0;
  var idIndex = 0;


  var pTmp1 = new THREE.Vector3();
  var pTmp2 = new THREE.Vector3();


  var zVec = new THREE.Vector3(0,0,1);
  for( var i = 0; i < numObjects; i++ ){

      //console.log( startPos);

      var centerPos = new THREE.Vector3();

      pTmp1.x = Math.random()-.5;
      pTmp1.y = Math.random()-.5;
      pTmp1.z = Math.random()-.5;

      pTmp1.normalize().multiplyScalar( spread * Math.pow( Math.random(), .5));

      centerPos.copy( pTmp1 );

      var yVec = new THREE.Vector3(0,1,0)

      var xVec = new THREE.Vector3(1,0,0);

      xVec.multiplyScalar( size );
      yVec.multiplyScalar( size );


      var p1 = new THREE.Vector3();
      var p2 = new THREE.Vector3();
      var p3 = new THREE.Vector3();
      var p4 = new THREE.Vector3();

      p1.copy( centerPos);
      p2.copy( centerPos);

      p1.add( xVec );
      p2.sub( xVec );

      p1.add( yVec );
      p2.add( yVec );

      p3.copy( centerPos );
      p4.copy( centerPos );

      p3.add( xVec );
      p4.sub( xVec );

      p3.sub( yVec );
      p4.sub( yVec );
      

      var uv1 = new THREE.Vector2(0,0);
      var uv2 = new THREE.Vector2(1,0);
      var uv3 = new THREE.Vector2(0,1);
      var uv4 = new THREE.Vector2(1,1);

      var norm = zVec;

      positions[ pIndex++ ] = p1.x;
      positions[ pIndex++ ] = p1.y;
      positions[ pIndex++ ] = p1.z;

      positions[ pIndex++ ] = p2.x;
      positions[ pIndex++ ] = p2.y;
      positions[ pIndex++ ] = p2.z;

      positions[ pIndex++ ] = p3.x;
      positions[ pIndex++ ] = p3.y;
      positions[ pIndex++ ] = p3.z;

      positions[ pIndex++ ] = p3.x;
      positions[ pIndex++ ] = p3.y;
      positions[ pIndex++ ] = p3.z;


      positions[ pIndex++ ] = p2.x;
      positions[ pIndex++ ] = p2.y;
      positions[ pIndex++ ] = p2.z;

      positions[ pIndex++ ] = p4.x;
      positions[ pIndex++ ] = p4.y;
      positions[ pIndex++ ] = p4.z;



      uvs[ uvIndex++ ] = uv1.x;
      uvs[ uvIndex++ ] = uv1.y;

      uvs[ uvIndex++ ] = uv2.x;
      uvs[ uvIndex++ ] = uv2.y;

      uvs[ uvIndex++ ] = uv3.x;
      uvs[ uvIndex++ ] = uv3.y;

      uvs[ uvIndex++ ] = uv3.x;
      uvs[ uvIndex++ ] = uv3.y;

      uvs[ uvIndex++ ] = uv2.x;
      uvs[ uvIndex++ ] = uv2.y;

      uvs[ uvIndex++ ] = uv4.x;
      uvs[ uvIndex++ ] = uv4.y;



      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      normals[ nIndex++ ] = norm.x;
      normals[ nIndex++ ] = norm.y;
      normals[ nIndex++ ] = norm.z;

      ids[idIndex++] = i;
      ids[idIndex++] = i;
      ids[idIndex++] = i;
      ids[idIndex++] = i;
    

  }



 /* geometry.computeFaceNormals();
  geometry.computeVertexNormals();*/

  //geometry.baseData = baseArray;

  return geometry;

}
