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
    float f = 1.0 - (v.r * 0.3 + v.g * 0.59 + v.b * 0.11);
    gl_FragColor = vec4(f, f, f, 1.0);
}