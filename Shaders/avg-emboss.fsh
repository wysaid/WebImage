/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float widthStep;
uniform float heightStep;
uniform float strength;

const float stride = 2.0;


void main()
{
    
    vec3 tmpColor = texture2D(inputImageTexture, textureCoordinate + vec2(widthStep * stride, heightStep * stride)).rgb;
    tmpColor = texture2D(inputImageTexture, textureCoordinate).rgb - tmpColor + 0.5;
    float f = (tmpColor.r + tmpColor.g + tmpColor.b) / 3.0;
    gl_FragColor = vec4(f, f, f, 1.0);
}