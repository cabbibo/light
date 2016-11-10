uniform float time;
uniform float fillVal;

varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec2 vUv;


void main(){

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );
  //rd = refract( rd , vNorm  , 1./ 1.);


  float lVal = clamp( ( fillVal - vUv.x ) , 0. , 1.);
  vec3 col = mix( vec3( 0. ) , vec3( 1. ) , 1.-vUv.x );

  

  gl_FragColor = vec4( col , 1 );

}