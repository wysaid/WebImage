precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float motion;
uniform float angle;

void main()
{
    vec2 tmp = textureCoordinate;
    tmp.x = tmp.x + 0.05 * sin(motion +  tmp.y * angle);
    gl_FragColor = texture2D(inputImageTexture, tmp);
}