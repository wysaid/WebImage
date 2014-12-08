/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-25
*/

precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float widthStep;
uniform float heightStep;

const float blurRadius = 1.0;
const float blurPixels = (blurRadius * 2.0 + 1.0) * (blurRadius * 2.0 + 1.0);

const float stride = 2.0;

const float PI = 3.14159;

vec3 fullSaturate(vec3 src)
{
    float h;
    float maxc = max(max(src.r, src.g), src.b);
    float minc = min(min(src.r, src.g), src.b);
    if(maxc == minc) h = 0.0;
    else if(maxc == src.r && src.g >= src.b)
        h = PI / 3.0 * (src.g - src.b) / (maxc - minc);
    else if(maxc == src.r && src.g <= src.b)
        h = PI / 3.0 * (src.g - src.b) + 2.0 * PI;
    else if(maxc == src.g)
        h = PI / 3.0 * (src.b - src.r) + PI / 3.0 * 2.0;
    else h = PI / 3.0 * (src.r - src.g) + PI / 3.0 * 4.0; // hsv. v == maxc
    
    float s = maxc == 0.0 ? 0.0 : (maxc - minc) / maxc;
    float h2 = mod((h / PI * 3.0), 1.0/30.0);
    float f = (h / PI * 3.0) - h2;
    float p = maxc * (1.0 - s);
    float q = maxc * (1.0 - f * s);
    float t = maxc * (1.0 - (1.0 - f) * s);
    h2 *= 180.0;
    if(h2 < 1.0) return vec3(maxc, t, p);
    if(h2 <= 2.0) return vec3(q, maxc, p);
    if(h2 <= 3.0) return vec3(p, maxc, t);
    if(h2 <= 4.0) return vec3(p, q, maxc);
    if(h2 <= 5.0) return vec3(t, p, maxc);
    return vec3(maxc, p, q);
}

void main()
{
    vec3 sumColor = vec3(0.0, 0.0, 0.0);
    for(float fy = -blurRadius; fy <= blurRadius; ++fy)
    {
        for(float fx = -blurRadius; fx <= blurRadius; ++fx)
        {
            vec2 coord = vec2((fx + stride) * widthStep, (fy + stride) * heightStep);
            sumColor += texture2D(inputImageTexture, textureCoordinate + coord).rgb;
        }
    }
    sumColor /= blurPixels;
    vec3 tmpColor = abs(texture2D(inputImageTexture, textureCoordinate).rgb - sumColor);

    gl_FragColor = vec4(min(tmpColor* 5.0, 1.0), 1.0);
}