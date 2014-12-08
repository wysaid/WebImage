/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-9-4
*/

var logTextArea = null;
var webglTextureArray = new Array();

function initLogTextArea()
{
	logTextArea = document.getElementById("logText");
}

function uiAppendLog(logString)
{
	if(logTextArea == null)
	{
		initLogTextArea();
	}
	logTextArea.value += logString + "\n";
	logTextArea.scrollTop = logTextArea.scrollHeight;
}

function uiClearLog()
{
	if(logTextArea == null)
	{
		initLogTextArea();
	}
	logTextArea.value = "";
}

function uiGreaterLog()
{
	logTextArea.style.height = logTextArea.scrollHeight + 20 + "px";
}

function uiResizeLog()
{
	logTextArea.style.height = "100%";
}

function uiShowPicture()
{
	var inputImage = document.getElementById("inputImage");
	var openWindow = window.open("", "_blank", "status=no, scrollbars=yes, resizable=yes");
	openWindow.document.write("<img src='" + inputImage.src + "'>");
}

function uiGreaterCanvas()
{
	var cvsDiv = document.getElementById("canvasView");
	var cvs = document.getElementById("fxView");
	var inputImage = document.getElementById("inputImage");
	cvsDiv.setAttribute("class", "canvasFull");
	cvs.setAttribute("width", inputImage.width);
	cvs.setAttribute("height", inputImage.height);
	renderGLWithScriptName("default-fsh");
	window.scrollTo(0, 300);
}

function uiFitCardView()
{
	var cvsDiv = document.getElementById("canvasView");
	var cvs = document.getElementById("fxView");
	var cardSize = [1936, 2592];
	cvsDiv.setAttribute("class", "canvasFit");
	if(cardSize[0] > cvsDiv.clientWidth)
	{
		cardSize[1] *= cvsDiv.clientWidth / cardSize[0];
		cardSize[0] = cvsDiv.clientWidth;
	}
	if(cardSize[1] > cvsDiv.clientHeight)
	{
		cardSize[0] *= cvsDiv.clientHeight / cardSize[1];
		cardSize[1] = cvsDiv.clientHeight;
	}
	cvs.setAttribute("width", cardSize[0]);
	cvs.setAttribute("height", cardSize[1]);
}

function uiResizeCanvas()
{
	var cvsDiv = document.getElementById("canvasView");
	var cvs = document.getElementById("fxView");
	cvsDiv.setAttribute("class", "canvasFit");
	cvs.setAttribute("width", cvsDiv.clientWidth);
	cvs.setAttribute("height", cvsDiv.clientHeight);
}

function uiPrintMaxTextureSize()
{
	var cvs = document.getElementById("fxView");
	if(!cvs) uiAppendLog("Cannot find canvas!");
	var gl = cvs.getContext("experimental-webgl");
	if (!gl)
	{
		alert("wy: Your browser doesnot support WebGL! Try again with chrome or firefox!!");
		uiAppendLog("wy: Your browser doesnot support WebGL! Try again with chrome or firefox!!");
		return;
	}
	uiAppendLog("The max renderbuffer size your browser support: " + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
	uiAppendLog("The max texture image units your browser support: " + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
	uiAppendLog("The max texture size your browser support: " + gl.getParameter(gl.MAX_TEXTURE_SIZE));
	uiAppendLog("The max cube map texture size your browser support: " + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
	uiAppendLog("The max viewport dims your browser support: " + gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0] + " x " + gl.getParameter(gl.MAX_VIEWPORT_DIMS)[1]);
	webglTextureArray[0] = gl.TEXTURE0;
    webglTextureArray[1] = gl.TEXTURE1;
    webglTextureArray[2] = gl.TEXTURE2;
    webglTextureArray[3] = gl.TEXTURE3;
    webglTextureArray[4] = gl.TEXTURE4;
    webglTextureArray[5] = gl.TEXTURE5;
    webglTextureArray[6] = gl.TEXTURE6;
    webglTextureArray[7] = gl.TEXTURE7;
    webglTextureArray[8] = gl.TEXTURE8;
    webglTextureArray[9] = gl.TEXTURE9;
    webglTextureArray[10] = gl.TEXTURE10;
}

function resizeCurveCanvas(father, obj)
{
	obj.width = fatherDiv.clientWidth;
	obj.height = fatherDiv.clientHeight;
}

function uiCurveViewResize(){
	var refObj = document.getElementById("myEffectsView");
	var commonfather = document.getElementById("curveAdjustView");
	var cvsRGB = document.getElementById("curveRGBView");
	var cvsR = document.getElementById("curveRView");
	var cvsG = document.getElementById("curveGView");
	var cvsB = document.getElementById("curveBView");
	var divRGB = document.getElementById("curveRGB");
	var divR = document.getElementById("curveR");
	var divG = document.getElementById("curveG");
	var divB = document.getElementById("curveB");

	commonfather.style.height = refObj.clientHeight + "px";
	var len = refObj.clientWidth / 4;
	if(len > refObj.clientHeight) len = refObj.clientHeight;
	divRGB.style.width = divRGB.style.height = len + "px";
	divR.style.width = divR.style.height = len + "px";
	divG.style.width = divG.style.height = len + "px";
	divB.style.width = divB.style.height = len + "px";
	cvsRGB.width = cvsRGB.height = len;
	cvsR.width = cvsR.height = len;
	cvsG.width = cvsG.height = len;
	cvsB.width = cvsB.height = len;
	drawCurve(cvsRGB, 0);
	drawCurve(cvsR, 1);
	drawCurve(cvsG, 2);
	drawCurve(cvsB, 3);
}
