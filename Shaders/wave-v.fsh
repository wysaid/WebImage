precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
uniform float motion;
uniform float angle;

void main()
{
    vec2 tmp = textureCoordinate;
    tmp.y = tmp.y + 0.05 * sin(motion +  tmp.x * angle);
    gl_FragColor = texture2D(inputImageTexture, tmp);
}