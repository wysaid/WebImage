precision mediump float;
varying vec2 textureCoordinate;
uniform sampler2D inputImageTexture;
void main()
{
	gl_FragColor = vec4(1.0 - texture2D(inputImageTexture, textureCoordinate).rgb, 1.0);
}