/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float widthStep;
uniform float heightStep;
uniform float strength;
const float blurRadius = 2.0;
const float blurPixels = (blurRadius * 2.0 + 1.0) * (blurRadius * 2.0 + 1.0);


void main()
{
    vec3 sumColor = vec3(0.0, 0.0, 0.0);
    for(float fy = -blurRadius; fy <= blurRadius; ++fy)
    {
        for(float fx = -blurRadius; fx <= blurRadius; ++fx)
        {
            vec2 coord = vec2(fx * widthStep, fy * heightStep);
            sumColor += texture2D(inputImageTexture, textureCoordinate + coord).rgb;
        }
    }
    gl_FragColor = vec4(mix(texture2D(inputImageTexture, textureCoordinate).rgb, sumColor / blurPixels, strength), 1.0);
}