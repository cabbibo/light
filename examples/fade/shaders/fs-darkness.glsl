uniform float time;
uniform sampler2D t_sprite;

varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec2 vUv;
varying float vID;


uniform float darkeningVal;
uniform float darkeningShimmer;
uniform float bwVal;


void main(){

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );
  //rd = refract( rd , vNorm  , 1./ 1.);


  vec3 col = vec3( 0. );

  vec4 t = texture2D(t_sprite, vUv);
  col = t.xzy * t.w;

  float alpha = darkeningVal+darkeningShimmer;
  col = col * darkeningVal + darkeningShimmer;

 // col = vec3( cos( vID));
 // alpha = cos( vID);
  gl_FragColor = vec4( col , alpha );

}
  