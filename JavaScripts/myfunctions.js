/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/


var g_timeInterval;  //Special usage, for some dynamic effects.
                   //Before interval is called, remember to cancel the last one.(clearInterval)
var g_motion = 0.0;
var g_inc = 0.001;

var g_uniformMotion;
var g_uniformAngle;

function renderDefault(shaderID) {
    webglInit();
    shaderInitWithFragmentShaderID(shaderID);
    initShaderProgram();
    initInputImageTexture("inputImage");

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function redrawWave() {
    webgl.uniform1f(g_uniformMotion, g_motion += 0.1);
    webgl.uniform1f(g_uniformAngle, 15.0);

    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    if (g_motion > 1.0e20) g_motion = 0.0;
}

function renderWave(scriptName) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptName);
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_motion = 0.0;
    g_timeInterval = setInterval("redrawWave()", 16);

    g_uniformMotion = webgl.getUniformLocation(programObject, "motion");
    g_uniformAngle = webgl.getUniformLocation(programObject, "angle");

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
}

function renderAvgBlur(strength) {
    webglInit();
    shaderInitWithFragmentShaderID("avg-blur");
    initShaderProgram();
    initInputImageTexture("inputImage");
    
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    var uniformStrength = webgl.getUniformLocation(programObject, "strength");
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);
    webgl.uniform1f(uniformStrength, strength);
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function renderWithSteps(scriptID) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
    initInputImageTexture("inputImage");

    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function redrawDynamicStrength() {
    webgl.uniform1f(g_uniformMotion, g_motion += g_inc);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
	if (g_motion > 1.0 || g_motion < 0.0) g_inc = -g_inc;
}

function renderWithDynamicStrength(scriptID) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_motion = 0.0;
	g_timeInterval = setInterval("redrawDynamicStrength()", 16);
    g_uniformMotion = webgl.getUniformLocation(programObject, "strength");

}