/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-26
*/

function renderFXCommon(shaderID, fxString)  //Not available for single usage.
{
	webglInit();
	shaderInitWithFragmentShaderID(shaderID);
	initShaderProgram();
	initInputImageTexture("inputImage");
	initSourceImageTextures(fxString);
}

function renderFXDefault(shaderID, fxString, strength) {
	renderFXCommon(shaderID, fxString);
	var strengthUniform = webgl.getUniformLocation(programObject, "strength");
	webgl.uniform1f(strengthUniform, strength);
	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function renderFXWithSaturateBoundlVignette(shaderID, fxString, saturate, boundl, vignetteStart, vignetteRange) {
	renderFXCommon(shaderID, fxString);
	var saturateUniform = webgl.getUniformLocation(programObject, "saturate");
	var boundlUniform = webgl.getUniformLocation(programObject, "bound_l");
	var vignetteStartUniform = webgl.getUniformLocation(programObject, "vignetteStart");
	var vignetteRangeUniform = webgl.getUniformLocation(programObject, "vignetteRange");
	var ratioUniform = webgl.getUniformLocation(programObject, "aspectRatio");
	var strengthUniform = webgl.getUniformLocation(programObject, "strength");
	var widthStepUniform = webgl.getUniformLocation(programObject, "widthStep");
	var heightStepUniform = webgl.getUniformLocation(programObject, "heightStep");

	webgl.uniform1f(saturateUniform, 1.0);  //The saturate and boundl is not used now.
	webgl.uniform1f(boundlUniform, 0.0);
	webgl.uniform1f(vignetteStartUniform, vignetteStart);
	webgl.uniform1f(vignetteRangeUniform, vignetteRange);
	webgl.uniform1f(ratioUniform, aspectRatio);
	webgl.uniform1f(strengthUniform, 1.0); // The strength is used to keep formal shader code working normally.
	webgl.uniform1f(widthStepUniform, widthStep);
	webgl.uniform1f(heightStepUniform, heightStep);

	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function renderFXWithStepsAndRatio(shaderID, fxString) {
	renderFXCommon(shaderID, fxString);
	var widthStepUniform = webgl.getUniformLocation(programObject, "widthStep");
	var heightStepUniform = webgl.getUniformLocation(programObject, "heightStep");
	var ratioUniform = webgl.getUniformLocation(programObject, "aspectRatio");
	var strengthUniform = webgl.getUniformLocation(programObject, "strength");

	webgl.uniform1f(widthStepUniform, widthStep);  //The saturate and boundl is not used now.
	webgl.uniform1f(heightStepUniform, heightStep);
	webgl.uniform1f(ratioUniform, aspectRatio);
	webgl.uniform1f(strengthUniform, 1.0); // The strength is used to keep formal shader code working normally.

	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}