/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-9-3
*/

function renderFrameS(frameID, thickness)  //Thickness is not used.
{
	webglInit();
	shaderInitWithFragmentShaderID("FrameS_Fragment_ShaderString");
	initShaderProgram();
	initInputImageTexture("inputImage");
	initframeTextureS(frameID);
	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function getLengthV(imageName)
{
	var img = document.getElementById(imageName);
	if(img == null) return 0.0;
	else return parseFloat(img.height);
}

function getLengthH(imageName)
{
	var img = document.getElementById(imageName);
	if(img == null) return 0.0;
	else return parseFloat(img.width);
}

function renderFrameM(frameID, thickness)
{
	webglInit();
	shaderInitWithFragmentShaderID("FrameM_Fragment_ShaderString");
	initShaderProgram();
	initInputImageTexture("inputImage");
	initframeTextureM(frameID);
	var uniformThickness = webgl.getUniformLocation(programObject, "thickness");
    var uniformWidthStep = webgl.getUniformLocation(programObject, "widthStep");
    var uniformHeightStep = webgl.getUniformLocation(programObject, "heightStep");
    var uniformLengthV = webgl.getUniformLocation(programObject, "frameLengthV");
    var uniformLengthH = webgl.getUniformLocation(programObject, "frameLengthH");
//    thickness /= 1.3;
    var widthScale = thickness / getLengthH(frameID + "M_3");
    var heightScale = thickness / getLengthV(frameID + "M_1");
 //   alert(widthScale + " " + heightScale + " " + getLengthH("M_3") + " " + getLengthV("M_1"));
	webgl.uniform1f(uniformThickness, thickness);
    webgl.uniform1f(uniformWidthStep, widthStep);
    webgl.uniform1f(uniformHeightStep, heightStep);
    webgl.uniform1f(uniformLengthV, getLengthV(frameID + "M_3") * heightScale);
    webgl.uniform1f(uniformLengthH, getLengthH(frameID + "M_1") * widthScale);
	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function redrawFrameNewM()
{

}

function renderFrameNewM(frameID, thickness)
{
	webglInit();
	shaderInitWithFragmentShaderID("FrameNewM_Fragment_ShaderString");
	initShaderProgram();
	initInputImageTexture("inputImage");
	initframeTextureNewM(frameID);

	var frameDescription = frameDefEnum[frameID];

	var thicknessX, thicknessY;
	if(widthStep > heightStep)
	{
		thicknessX = thickness;
		thicknessY = thickness * heightStep / widthStep;
	}
	else
	{
		thicknessY = thickness;
		thicknessX = thickness * widthStep / heightStep;
	}
	var strs = frameDescription.split(" ");
	var len = strs.length;
	var uniformNamePrefix = "frameTex_";
	var widthScale = thicknessX;
	var heightScale = thicknessY;

	var texSize = [parseFloat(strs[1]), parseFloat(strs[2])];

	for(var i=0; i < len; ++i)
	{
		if(strs[i] == "@")
		{
			var elemName = strs[++i].substr(-3);
			var elemLeft = parseFloat(strs[++i]);
			var elemTop = parseFloat(strs[++i]);
			var elemWidth = parseFloat(strs[++i]);;
			var elemHeight = parseFloat(strs[++i]);
			var uniformName = uniformNamePrefix + elemName;
			var uniformDef = webgl.getUniformLocation(programObject, uniformName);
			//if(elemWidth <= 2.0) elemWidth = 1.0;
			//if(elemHeight <= 2.0) elemHeight = 1.0;
			webgl.uniform4f(uniformDef, elemLeft/texSize[0], elemTop/texSize[1], elemWidth/texSize[0], elemHeight/texSize[1]);
			if(elemName == "M_3")
			{
				widthScale /= elemWidth;
				heightScale *= elemHeight;
			}
			else if(elemName == "M_1")
			{
				widthScale *= elemWidth;
				heightScale /= elemHeight;
			}
		}
	}
	
	var uniformLengthH = webgl.getUniformLocation(programObject, "frameLengthH");
	var uniformLengthV = webgl.getUniformLocation(programObject, "frameLengthV");
	webgl.uniform1f(uniformLengthH, widthScale);
	webgl.uniform1f(uniformLengthV, heightScale);

	var uniformThickness = webgl.getUniformLocation(programObject, "thickness");
	webgl.uniform2f(uniformThickness, thicknessX, thicknessY);

	webgl.clear(webgl.COLOR_BUFFER_BIT);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
}

function redrawFrameC()
{
	webgl.uniform1f(g_variables.uniformAlign, g_variables.alignValue);
	webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
	g_variables.alignValue += g_variables.alignMotion;
	if(g_variables.alignValue <= g_variables.alignRange[0] || g_variables.alignValue >= g_variables.alignRange[1])
		g_variables.alignMotion = -g_variables.alignMotion;
}

function renderFrameC(cardID)
{
	webglInit();
	shaderInitWithFragmentShaderID("FrameC_Fragment_ShaderSring");
	initShaderProgram();
	initInputImageTexture("inputImage");
	initframeTextureC(cardID);

    var uniformOriginAspectRatio = webgl.getUniformLocation(programObject, "originAspectRatio");

	webgl.uniform1f(uniformOriginAspectRatio, getLengthH("inputImage") / getLengthV("inputImage"));	

	g_variables.uniformAlign = webgl.getUniformLocation(programObject, "align");
	g_variables.alignValue = 1.0;
	g_variables.alignRange = [0.0, 2.0];
	g_variables.alignMotion = 0.01;

	webgl.clearColor(0.0,0.0,0.0,1.0);
	webgl.clear(webgl.COLOR_BUFFER_BIT);
//	redrawFrameC();
	g_timeInterval = setInterval("redrawFrameC()", 20);

}









