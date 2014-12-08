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

const float blurRadius = 3.0;
const float blurPixels = (blurRadius * 2.0 + 1.0) * (blurRadius * 2.0 + 1.0);

highp float blurMatrix[7][7] = {
0.00000067,0.00002292,0.00019117,0.00038771,0.00019117,0.00002292,0.00000067,
0.00002292,0.00078633,0.00655965,0.01330373,0.00655965,0.00078633,0.00002292,
0.00019117,0.00655965,0.05472157,0.11098164,0.05472157,0.00655965,0.00019117,
0.00038771,0.01330373,0.11098164,0.22508352,0.11098164,0.01330373,0.00038771,
0.00019117,0.00655965,0.05472157,0.11098164,0.05472157,0.00655965,0.00019117,
0.00002292,0.00078633,0.00655965,0.01330373,0.00655965,0.00078633,0.00002292,
0.00000067,0.00002292,0.00019117,0.00038771,0.00019117,0.00002292,0.00000067
};

void main()
{
    vec3 sumColor = vec3(0.0, 0.0, 0.0);
    for(float fy = -blurRadius; fy <= blurRadius; ++fy)
    {
        for(float fx = -blurRadius; fx <= blurRadius; ++fx)
        {
            vec2 coord = vec2(fx * widthStep, fy * heightStep);
            sumColor += texture2D(inputImageTexture, textureCoordinate + coord).rgb * blurMatrix[(int)fx][(int)fy];
        }
    }
    gl_FragColor = vec4(mix(texture2D(inputImageTexture, textureCoordinate).rgb, sumColor / blurPixels, strength), 1.0);
}