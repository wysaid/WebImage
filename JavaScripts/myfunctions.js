/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ data: 2013-8-24
*/


var g_timeInterval;  //Special usage, for some dynamic effects.
                   //Before interval is called, remember to cancel the last one.(clearInterval)
var g_motion = 0.0;

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
    var uniformMotion = webgl.getUniformLocation(programObject, "motion");
    var uniformAngle = webgl.getUniformLocation(programObject, "angle");
    webgl.uniform1f(uniformMotion, g_motion += 0.1);
    webgl.uniform1f(uniformAngle, 15.0);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    if (g_motion > 1.0e20) g_motion = 0.0;
}

function renderWaveH() {
    webglInit();
    shaderInitWithFragmentShaderID("wave-h");
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_motion = 0.0;
    g_timeInterval = setInterval("redrawWave()", 16);

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function renderWaveV() {
    webglInit();
    shaderInitWithFragmentShaderID("wave-v");
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_motion = 0.0;
    g_timeInterval = setInterval("redrawWave()", 16);
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
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