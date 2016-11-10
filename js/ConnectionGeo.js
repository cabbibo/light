
function ConnectionGeo( objectsToConnect , width ){



  var geometry = new THREE.BufferGeometry();

  var totalConnections = objectsToConnect.length * objectsToConnect.length;

  console.log( "TCON");
  console.log( totalConnections);
 
  var aPos  = new THREE.BufferAttribute(new Float32Array( totalConnections * 6 * 3 ), 3);
  var aNorm = new THREE.BufferAttribute(new Float32Array( totalConnections * 6 * 3 ), 3);
  var aUV   = new THREE.BufferAttribute(new Float32Array( totalConnections * 6 * 2 ), 2);
 
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


  var zVec = new THREE.Vector3(0,0,1);
  for( var i = 0; i < objectsToConnect.length; i++ ){

    for( var j = 0; j < objectsToConnect.length; j++ ){

      var startPos = objectsToConnect[i].mesh.position;
      var endPos = objectsToConnect[j].mesh.position;

      //console.log( startPos);

      var dirVec = new THREE.Vector3().copy( startPos );
      dirVec.sub( endPos );
      dirVec.normalize();

      var xVec = new THREE.Vector3().crossVectors( dirVec , zVec );
      xVec.normalize();
      xVec.multiplyScalar( width );


      var p1 = new THREE.Vector3();
      var p2 = new THREE.Vector3();
      var p3 = new THREE.Vector3();
      var p4 = new THREE.Vector3();

      p1.copy( startPos );
      p2.copy( startPos );

      p1.add( xVec );
      p2.sub( xVec );

      p3.copy( endPos );
      p4.copy( endPos );

      p3.add( xVec );
      p4.sub( xVec );
      

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


      positions[ pIndex++ ] = p1.x;
      positions[ pIndex++ ] = p1.y;
      positions[ pIndex++ ] = p1.z;

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

      uvs[ uvIndex++ ] = uv1.x;
      uvs[ uvIndex++ ] = uv1.y;

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
    }

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