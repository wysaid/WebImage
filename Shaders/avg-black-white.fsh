precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
void main()
{
    vec3 v = texture2D(inputImageTexture, textureCoordinate).rgb;
    float f = (v.r + v.g + v.b) / 3.0;
    gl_FragColor = vec4(f, f, f, 1.0);
}