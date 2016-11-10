uniform float time;
uniform sampler2D t_iri;
uniform sampler2D t_text;
uniform sampler2D t_audio;

varying vec3 vPos;
varying vec3 vCam;
varying vec3 vNorm;

varying vec2 vUv;

uniform float breakingVal;
uniform float bwVal;


const float MAX_TRACE_DISTANCE = 2.0;             // max trace distance
const float INTERSECTION_PRECISION = 0.01;        // precision of the intersection
const int NUM_OF_TRACE_STEPS = 100;
const float PI = 3.14159;

mat4 rotateX(float angle){
    
  angle = -angle/180.0*3.1415926536;
    float c = cos(angle);
    float s = sin(angle);
  return mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, -s, 0.0, 0.0, s, c, 0.0, 0.0, 0.0, 0.0, 1.0);
    
}

mat4 rotateY(float angle){
    
  angle = -angle/180.0*3.1415926536;
    float c = cos(angle);
    float s = sin(angle);
  return mat4(c, 0.0, s, 0.0, 0.0, 1.0, 0.0, 0.0, -s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0);
    
}

mat4 rotateZ(float angle){
    
  angle = -angle/180.0*3.1415926536;
    float c = cos(angle);
    float s = sin(angle);
  return mat4(c, -s, 0.0, 0.0, s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    
}
mat4 translate(vec3 t){
    
  return mat4(1.0, 0.0, 0.0, -t.x, 0.0, 1.0, 0.0, -t.y, 0.0, 0.0, 1.0, -t.z, 0.0, 0.0, 0.0, 1.0);
    
}


float dot2( in vec3 v ) { return dot(v,v); }
float udTriangle( vec3 p, vec3 a, vec3 b, vec3 c )
{
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 ac = a - c; vec3 pc = p - c;
    vec3 nor = cross( ba, ac );

    return sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(ac,nor),pc))<2.0)
     ?
     min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(ac*clamp(dot(ac,pc)/dot2(ac),0.0,1.0)-pc) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
}

float sdCappedCylinder( vec3 p, vec2 h )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - h;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}


vec2 smoothU( vec2 d1, vec2 d2, float k)
{
    float a = d1.x;
    float b = d2.x;
    float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
    return vec2( mix(b, a, h) - k*h*(1.0-h), mix(d2.y, d1.y, pow(h, 2.0)));
}


// Taken from https://www.shadertoy.com/view/4ts3z2
float tri(in float x){return abs(fract(x)-.5);}
vec3 tri3(in vec3 p){return vec3( tri(p.z+tri(p.y*1.)), tri(p.z+tri(p.x*1.)), tri(p.y+tri(p.x*1.)));}
                                 

// Taken from https://www.shadertoy.com/view/4ts3z2
float triNoise3D(in vec3 p, in float spd){
     
    float z=1.4;
  float rz = 0.;
    vec3 bp = p;
  for (float i=0.; i<=3.; i++ )
  {
        vec3 dg = tri3(bp*2.);
        p += (dg+time*.1*spd);

        bp *= 1.8;
    z *= 1.5;
    p *= 1.2;
        //p.xz*= m2;
        
        rz+= (tri(p.z+tri(p.x+tri(p.y))))/z;
        bp += 0.14;
  }
  return rz;
}



//--------------------------------
// Modelling 
//--------------------------------
vec2 map( vec3 pos ){  
    
 

   
    vec4 p = vec4( pos , 1. );

    
    //vec2 res = vec2( (abs(sin( pos.x * pos.y * pos.z  * 10.)) * 1.9 ) + length( pos ) - 1., 0.0 );
   // vec3 c = vec3( 2.6 , 2.6 , 2.6 );
    //p.xyz = mod( p.xyz , c ) - 0.5*c;
    vec2 res = vec2( length(p.xyz ) - ( 1. - .4 * triNoise3D( p.xyz * .4 , 1.) ) * .4 , 0.);

    /*for( int i = 0; i < 8; i ++ ){
        bs *= reductionFactor;

        m = rotateY(cos(float(i) * 100.)*360.) * rotateX(cos(float(i) * 100.)*360.);    
        p.x = abs(p.x) - bs / 2.;
        p.z = abs(p.z) - bs / 2.;   
        p = p * m; 

        float val = udTriangle( p.xyz , vec3( bs , 0. , 0. ) , vec3( 0. , 0. , bs ), vec3( 0. , bs , 0. ) );
        res = smoothU( res , vec2( val,1.) , .001);
    }*/
    
    

    return res;
    
}



//----
// Camera Stuffs
//----
mat3 calcLookAtMatrix( in vec3 ro, in vec3 ta, in float roll )
{
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(sin(roll),cos(roll),0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
    return mat3( uu, vv, ww );
}

void doCamera( out vec3 camPos, out vec3 camTar, in float time, in vec2 mouse )
{
    float an = 0.3 + 3.0*mouse.x;
    float an2 = 0.3 + 3.0*mouse.y;

  camPos = vec3(3.5*sin(an),3. * cos( an2),3.5*cos(an));
    camTar = vec3(0. ,0.0,0.0);
}




// Calculates the normal by taking a very small distance,
// remapping the function, and getting normal for that
vec3 calcNormal( in vec3 pos ){
    
  vec3 eps = vec3( 0.01, 0.0, 0.0 );
  vec3 nor = vec3(
      map(pos+eps.xyy).x - map(pos-eps.xyy).x,
      map(pos+eps.yxy).x - map(pos-eps.yxy).x,
      map(pos+eps.yyx).x - map(pos-eps.yyx).x );
  return normalize(nor);
}




vec2 calcIntersection( in vec3 ro, in vec3 rd ){

    
    float h =  INTERSECTION_PRECISION*2.0;
    float t = 0.0;
  float res = -1.0;
    float id = -1.;
    
    for( int i=0; i< NUM_OF_TRACE_STEPS ; i++ ){
        
        if( h < INTERSECTION_PRECISION || t > MAX_TRACE_DISTANCE ) break;
      vec2 m = map( ro+rd*t );
        h = m.x;
        t += h;
        id = m.y;
        
    }

    if( t < MAX_TRACE_DISTANCE ) res = t;
    if( t > MAX_TRACE_DISTANCE ) id =-1.0;
    
    return vec2( res , id );
     
}


vec3 hsv(float h, float s, float v)
{
    
  return mix( vec3( 1.0 ), clamp( ( abs( fract(
    h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
}


float noiseFunction( vec3 pos ){

  return triNoise3D( pos * 1.1 , 1. );

}



void main(){

  vec3 ro = vPos;
  vec3 rd = normalize( vPos - vCam );
  //rd = refract( rd , vNorm  , 1./ 1.);


  vec3 col = vec3( 0. );

  vec3 lightPos = vCam + vec3( 1. , 1. ,0. );
  vec3 lightDir = normalize(lightPos - ro);
  vec3 refl = reflect( lightDir , vNorm );

  float match = dot( refl , rd );

  for( int i  = 0; i < 5; i++ ){
    vec3 pos =  ro +  .04 * rd * float(i);
    
    float den = noiseFunction( pos );
    //float dif = clamp( (noiseFunction(pos+eps*light)-den)/eps, 0.0, 1.0 );

    vec3 rainbow =hsv( den * 3. , .7 , 1. );
    vec3 dark = vec3( den * den * den * 10.);
    col += mix( rainbow , dark , bwVal);// hsv( sin( dif * 20.) , 1. , 1. ) * dif * dif;// / float( 10. );

  }

  col /= 4.;
  col += vec3( 1., .6 , .2 ) * pow( match, 20.);
  //col *= (1.-match)* (1.-match) * (1.-match);

  

  gl_FragColor = vec4( col , 1);

}
  
