/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/


var g_timeInterval;  //Special usage, for some dynamic effects.
//Before interval is called, remember to cancel the last one.(clearInterval)


var g_variables = {};  //Contains All vars that redrawing needs.

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
    webgl.uniform1f(g_variables.uniformMotion, g_variables.motion += 0.05);
    webgl.uniform1f(g_variables.uniformAngle, 15.0);

    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    if (g_variables.motion > 1.0e20) g_variables.motion = 0.0;
}

function renderWave(scriptName) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptName);
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_variables.motion = 0.0;
    g_timeInterval = setInterval("redrawWave()", 10);

    g_variables.uniformMotion = webgl.getUniformLocation(programObject, "motion");
    g_variables.uniformAngle = webgl.getUniformLocation(programObject, "angle");

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

function redrawMotionWithUniform1f() {
    webgl.uniform1f(g_variables.uniformMotion, g_variables.motion += g_variables.inc);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    if (g_variables.motion > 1.0 || g_variables.motion < 0.0) g_variables.inc = -g_variables.inc;
}

function renderWithDynamicStrength(scriptID) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
    initInputImageTexture("inputImage");
    g_variables.motion = 0.0;
    g_variables.inc = 0.001;
    g_variables.uniformMotion = webgl.getUniformLocation(programObject, "strength");
    g_timeInterval = setInterval("redrawMotionWithUniform1f()", 10);
}

function redrawMotionWithUniform2f() {
//    webgl.clearColor(0.0, 0.0, 0.0, 0.5);
    webgl.uniform2f(g_variables.uniformPos, g_variables.pos[0] += g_variables.posMotion[0], g_variables.pos[1] += g_variables.posMotion[1]);
    webgl.uniform1f(g_variables.uniformRadius, g_variables.radius);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    if(g_variables.pos[0] < 0.1 || g_variables.pos[0] > 0.9)
        g_variables.posMotion[0] = -g_variables.posMotion[0];
    if(g_variables.pos[1] < 0.1 || g_variables.pos[1] > 0.9)
        g_variables.posMotion[1] = -g_variables.posMotion[1];
}

function renderWithDynamicMotion(scriptID) {
    g_variables = {};
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
//    initInputImageTexture("inputImage");
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);
    g_variables.motion = 0.0;
    g_variables.inc = 0.001;
    g_variables.uniformPos = webgl.getUniformLocation(programObject, "pos");
    g_variables.uniformRadius = webgl.getUniformLocation(programObject, "radius");
    g_variables.pos = [0.1, 0.2];
    g_variables.posMotion = [widthStep, heightStep];
    g_variables.radius = 0.2;
    g_timeInterval = setInterval("redrawMotionWithUniform2f()", 10);
}

function renderWithStepsAndSpecialUniform1f(scriptID, uniformName, uniformValue){
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
    initInputImageTexture("inputImage");
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    var uniformvar = webgl.getUniformLocation(programObject, uniformName);
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);
    webgl.uniform1f(uniformvar, uniformValue);
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function getOrthogonalityVector(vec2)
{
    var len = Math.sqrt(vec2[0] * vec2[0] + vec2[1]*vec2[1]);
    var angle = Math.asin(vec2[1] / len);
    if(vec2[0] < 0.0)
        angle = Math.PI - angle;
    else if(vec2[1] < 0.0)
        angle = (Math.PI * 2) + angle;
    angle -= Math.PI / 2;
    vec2[0] = len * Math.cos(angle);
    vec2[1] = len * Math.sin(angle);
}

function normalize(vec2)
{
    var len = Math.sqrt(vec2[0] * vec2[0] + vec2[1]*vec2[1]);
    vec2[0] /= len;
    vec2[1] /= len;
}

function rotateVec(len, angle, vec2)
{
    vec2[0] = len * Math.cos(angle);
    vec2[1] = len * Math.sin(angle);
}

function redrawTiltShiftVector() {
    rotateVec(10.0, g_variables.angle, g_variables.vectorNormal);
    normalize(g_variables.vectorNormal);

    webgl.bindFramebuffer(webgl.FRAMEBUFFER, bufferObject.frameBuffer);

    webgl.uniform1i(g_variables.uniformInputImage, 0);
    webgl.uniform1f(g_variables.uniformBlurRadius, g_variables.blurRadius);
    webgl.uniform1f(g_variables.uniformGradientRadius, g_variables.gradientRadius);
    webgl.uniform2f(g_variables.uniformPassPos, g_variables.passPos[0], g_variables.passPos[1]);

    webgl.uniform2f(g_variables.uniformVectorNormal, g_variables.vectorNormal[0], g_variables.vectorNormal[1]);

    webgl.uniform2f(g_variables.uniformDelta, g_variables.vectorNormal[0], g_variables.vectorNormal[1]);
    webgl.uniform1i(g_variables.uniformFlip, true);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

    webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);

    webgl.uniform1i(g_variables.uniformInputImage, 1);
    getOrthogonalityVector(g_variables.vectorNormal);

    webgl.uniform2f(g_variables.uniformDelta, g_variables.vectorNormal[0], g_variables.vectorNormal[1]);
    webgl.uniform1i(g_variables.uniformFlip, false);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

//    g_variables.blurRadius += g_variables.blurRadiusMotion;
//    if(g_variables.blurRadius < 0.5 || g_variables.blurRadius > 100.0)
//        g_variables.blurRadiusMotion = -g_variables.blurRadiusMotion;
    g_variables.gradientRadius += g_variables.gradientRadiusMotion;
    if(g_variables.gradientRadius < 1.0 || g_variables.gradientRadius > 300.0)
        g_variables.gradientRadiusMotion = - g_variables.gradientRadiusMotion;
    g_variables.angle += 0.1;
    if(g_variables.angle > 1e20) g_variables.angle = 0.0;

}

function renderTiltShiftVector(scriptID) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initFrameBufferAndTexture();
    initShaderProgram();    
    g_variables.inputImageTexture = initInputImageTexture("inputImage");
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);

    g_variables.uniformInputImage = webgl.getUniformLocation(programObject, "inputImageTexture");

    //Specify the blur radius scale.
    g_variables.uniformBlurRadius = webgl.getUniformLocation(programObject, "blurRadius");
    //Specify how much can the dir go off the vector.
    g_variables.uniformGradientRadius = webgl.getUniformLocation(programObject, "gradientRadius");
//    g_variables.uniformGradientRange = webgl.getUniformLocation(programObject, "gradientRange");
    //The vectorNormal's length must be exactly 1.0.
    g_variables.uniformVectorNormal = webgl.getUniformLocation(programObject, "vectorNormal");
    //The Real Position, not the relative position between 0.0 and 1.0!
    g_variables.uniformPassPos = webgl.getUniformLocation(programObject, "passPos");
    //Specify the blur direction. The texture should be blurred twice with two orthogonality vectors.
    //The length of delta should be 1.0.
    g_variables.uniformDelta = webgl.getUniformLocation(programObject, "delta");
    g_variables.uniformFlip = webgl.getUniformLocation(programObject, "isFlip");

    g_variables.passPos = [1.0/widthStep / 2.0, 1.0 / heightStep / 2.0];
    g_variables.vectorNormal = [1.0, 0.0];
    g_variables.angle = 0.0;
    g_variables.len = 1.0;
    g_variables.blurRadius = 35.0;
    g_variables.blurRadiusMotion = 3.0;
    g_variables.gradientRadius = 20.0;
//    g_variables.gradientRange = 0.1;
    g_variables.gradientRadiusMotion = 5.0;

//    webgl.uniform1f(g_variables.uniformGradientRange, g_variables.gradientRange);
    webgl.activeTexture(webgl.TEXTURE1);
    webgl.bindTexture(webgl.TEXTURE_2D, bufferObject.texture);
    g_timeInterval = setInterval("redrawTiltShiftVector()", 150);//redrawTiltShiftVector();
//    redrawTiltShiftVector();
}

function redrawTiltShiftCircle() {

    webgl.bindFramebuffer(webgl.FRAMEBUFFER, bufferObject.frameBuffer);

    webgl.uniform1i(g_variables.uniformInputImage, 0);
    webgl.uniform1f(g_variables.uniformBlurRadius, g_variables.blurRadius);
    webgl.uniform2f(g_variables.uniformBlurRadiusStart, g_variables.blurRadiusStart[0], g_variables.blurRadiusStart[1]);
    webgl.uniform1f(g_variables.uniformGradientRadius, g_variables.gradientRadius);
    webgl.uniform2f(g_variables.uniformCentralPos, g_variables.centralPos[0], g_variables.centralPos[1]);
    webgl.uniform2f(g_variables.uniformVectorNormal, 0.0, 1.0);

    webgl.uniform1i(g_variables.uniformFlip, true);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

    webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);

    webgl.uniform1i(g_variables.uniformInputImage, 1);

    webgl.uniform2f(g_variables.uniformVectorNormal, 1.0, 0.0);
    webgl.uniform1i(g_variables.uniformFlip, false);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);

    g_variables.blurRadius += g_variables.blurRadiusMotion;
    if(g_variables.blurRadius < 0.5 || g_variables.blurRadius > 40.0)
        g_variables.blurRadiusMotion = -g_variables.blurRadiusMotion;

    g_variables.gradientRadius += g_variables.gradientRadiusMotion;
    if(g_variables.gradientRadius < 1.5 || g_variables.gradientRadius > 5.0)
        g_variables.gradientRadiusMotion = - g_variables.gradientRadiusMotion;
/*
    g_variables.blurRadiusStart += g_variables.blurRadiusStartMotion;
    if(g_variables.blurRadiusStart < 0.0 || g_variables.blurRadiusStart > 0.5)
        g_variables.blurRadiusStartMotion = - g_variables.blurRadiusStartMotion;
*/
    g_variables.blurRadiusStartAngle += 0.1;
    if(g_variables.blurRadiusStartAngle > 1e20) g_variables.blurRadiusStartAngle = 0.0;
    g_variables.blurRadiusStart[0] = g_variables.blurRadiusStartLen[0] + g_variables.blurRadiusLen * Math.cos(g_variables.blurRadiusStartAngle);
    g_variables.blurRadiusStart[1] = g_variables.blurRadiusStartLen[1] + g_variables.blurRadiusLen * Math.sin(g_variables.blurRadiusStartAngle);

    g_variables.centralPos[0] += g_variables.centralPosMotion[0];
    g_variables.centralPos[1] += g_variables.centralPosMotion[1];
    if(g_variables.centralPos[0] < 0.1 || g_variables.centralPos[0] > 0.9)
        g_variables.centralPosMotion[0] = -g_variables.centralPosMotion[0];
    if(g_variables.centralPos[1] < 0.1 || g_variables.centralPos[1] > 0.9)
        g_variables.centralPosMotion[1] = -g_variables.centralPosMotion[1];
}

function renderTiltShiftCircle(scriptID) {
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initFrameBufferAndTexture();
    initShaderProgram();
    g_variables = {};
    g_variables.inputImageTexture = initInputImageTexture("inputImage");
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);

    g_variables.uniformInputImage = webgl.getUniformLocation(programObject, "inputImageTexture");

    //Specify the blur radius scale.
    g_variables.uniformBlurRadius = webgl.getUniformLocation(programObject, "blurRadius");
    //Specify where should blur start.
    g_variables.uniformBlurRadiusStart = webgl.getUniformLocation(programObject, "blurRadiusStart");

    //Specify the gradual change between blurring and not blurring.
    g_variables.uniformGradientRadius = webgl.getUniformLocation(programObject, "gradientRadius");
    //The vectorNormal's length must be exactly 1.0.
    //Specify the blur direction.
    g_variables.uniformVectorNormal = webgl.getUniformLocation(programObject, "vectorNormal");
    //The Real Position, not the relative position between 0.0 and 1.0!
    g_variables.uniformCentralPos = webgl.getUniformLocation(programObject, "centralPos");
    //Specify the blur direction. The texture should be blurred twice with two orthogonality vectors.
    //The length of delta should be 1.0.
    g_variables.uniformFlip = webgl.getUniformLocation(programObject, "isFlip");

    g_variables.centralPos = [0.25, 0.35];
    g_variables.centralPosMotion = [0.02, 0.01];

    g_variables.vectorNormal = [0.0, 1.0];
    g_variables.blurRadius = 10.0;
    g_variables.blurRadiusMotion = 0.2;
    //g_variables.blurRadiusStart = 0.1;
    //g_variables.blurRadiusStartMotion = 0.05;
    g_variables.blurRadiusStart = [0.0, 0.0];
    g_variables.blurRadiusStartLen = [0.15, 0.15];
    g_variables.blurRadiusLen = 0.13;
    g_variables.blurRadiusStartAngle = 0.0;

    g_variables.gradientRadius =1.5;
    g_variables.gradientRadiusMotion = 0.05;

    webgl.activeTexture(webgl.TEXTURE1);
    webgl.bindTexture(webgl.TEXTURE_2D, bufferObject.texture);
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    g_timeInterval = setInterval("redrawTiltShiftCircle()", 100);
  
//    redrawTiltShiftCircle();
}

function renderTests(scriptID)
{
    webglInit();
    shaderInitWithFragmentShaderID(scriptID);
    initShaderProgram();
    initInputImageTexture("inputImage");

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}



