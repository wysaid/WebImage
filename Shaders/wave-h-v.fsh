/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-25
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float motion;
uniform float angle;

void main()
{
    vec2 tmp = textureCoordinate;
    tmp.x = tmp.x + 0.01 * sin(motion +  tmp.x * angle);
    tmp.y = tmp.y + 0.01 * sin(motion +  tmp.y * angle);
    gl_FragColor = texture2D(inputImageTexture, tmp);
}