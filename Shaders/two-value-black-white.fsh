/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
void main()
{
    vec3 v = texture2D(inputImageTexture, textureCoordinate).rgb;
    float f = (v.r + v.g + v.b) / 3.0;
    if(f > 0.5) f = 1.0;
    else f = 0.0;
    gl_FragColor = vec4(f, f, f, 1.0);
}