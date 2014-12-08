/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float strength;

void main()
{
    vec3 v = texture2D(inputImageTexture, textureCoordinate).rgb;
    float f = step(strength, (v.r + v.g + v.b) / 3.0);   
    gl_FragColor = vec4(f, f, f, 1.0);
}