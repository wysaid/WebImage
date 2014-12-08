/*
@ author: wysaid
@ blog: blog.wysaid.org
@ mail: admin@wysaid.org
@ date: 2013-8-24
*/

var startIndex = 1;
var maxIndex = 10;

var webgl = null;
var vertexShaderObject = null;
var fragmentShaderObject = null;
var programObject = null;
var bufferObject = null;
var v4PositionIndex = 0;
var verticesData =
[
-1.0, 1.0,
1.0, 1.0,
-1.0, -1.0,
1.0, -1.0
];

var currentEffect = null;
var effectKind = 0;

//widthStep, heightStep and aspectRatio should be set when GL is first initialized!
var widthStep = 0.0;
var heightStep = 0.0;
var aspectRatio = 0.0;

function ShaderSourceFromScript(scriptID) {
    var shaderScript = document.getElementById(scriptID);
    if (shaderScript == null) return "";

    if (shaderScript.textContent != null && shaderScript.textContent != "") {
        return shaderScript.textContent;
    }
    if (shaderScript.text != null && shaderScript.text != "") {
        return shaderScript.text;
    }
    var sourceCode = "";
    var child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType == child.TEXT_NODE) sourceCode += child.textContent;
        child = child.nextSibling;
    }
    return sourceCode;
}

function requestURLText(url) {
    uiAppendLog("Requesting shader source...");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "Shaders/" + url, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

function requestURLPlainText(url) {
    uiAppendLog("Requesting plain text for definition");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

function loadFragmentShaderSourceFromFile(scriptID) {
    var shaderScript = document.createElement("script");
    shaderScript.type = "x-shader/x-fragment";
    shaderScript.id = scriptID;
    shaderScript.innerHTML = requestURLText(scriptID + ".txt");
    var head = document.getElementsByTagName("body").item(0);
    head.appendChild(shaderScript);
}

function loadVertexShaderSourceFromFile(scriptID) {
    var shaderScript = document.createElement("script");
    shaderScript.type = "x-shader/x-vertex";
    shaderScript.id = scriptID;
    shaderScript.innerText = requestURLText(scriptID + ".vsh");
    var head = document.getElementsByTagName("body").item(0);
    head.appendChild(shaderScript);
}

function webglInit() {
    var myCanvasObject = document.getElementById("fxView");
    webgl = myCanvasObject.getContext("experimental-webgl");
    webgl.viewport(0, 0, myCanvasObject.clientWidth, myCanvasObject.clientHeight);
    widthStep = 1.0 / myCanvasObject.clientWidth;
    heightStep = 1.0 / myCanvasObject.clientHeight;
    aspectRatio = myCanvasObject.clientWidth / myCanvasObject.clientHeight;

    vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER);
    fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER);
}

function shaderInitWithFragmentShaderID(fragID) {
    shaderInitWithVertexAndFragmentShaderID("default-vsh", fragID);
}

function shaderInitWithVertexAndFragmentShaderID(vertID, fragID) {
    var vshaderSource = ShaderSourceFromScript(vertID);
    var fshaderSource = ShaderSourceFromScript(fragID);
    if (vshaderSource == "") {
        loadVertexShaderSourceFromFile(vertID);
        vshaderSource = ShaderSourceFromScript(vertID);
    }
    if (fshaderSource == "") {
        loadFragmentShaderSourceFromFile(fragID);
        fshaderSource = ShaderSourceFromScript(fragID);
    }
    webgl.shaderSource(vertexShaderObject, vshaderSource);
    webgl.shaderSource(fragmentShaderObject, fshaderSource);
    webgl.compileShader(vertexShaderObject);
    webgl.compileShader(fragmentShaderObject);
    if (!webgl.getShaderParameter(vertexShaderObject, webgl.COMPILE_STATUS)) { uiAppendLog(webgl.getShaderInfoLog(vertexShaderObject) + "in vertex shader"); return; }
    if (!webgl.getShaderParameter(fragmentShaderObject, webgl.COMPILE_STATUS)) { uiAppendLog(webgl.getShaderInfoLog(fragmentShaderObject) + "in fragment shader"); return; }
}

function initShaderProgram() {
    if(programObject != null)
    {
        webgl.deleteProgram(programObject);
    }
    programObject = webgl.createProgram();  //the program is used only once in a fx
    webgl.attachShader(programObject, vertexShaderObject);
    webgl.attachShader(programObject, fragmentShaderObject);
    webgl.bindAttribLocation(programObject, v4PositionIndex, "position");
    webgl.linkProgram(programObject);
    if (!webgl.getProgramParameter(programObject, webgl.LINK_STATUS)) {
        uiAppendLog(webgl.getProgramInfoLog(programObject));
        return;
    }
    webgl.useProgram(programObject);

    var buffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(verticesData), webgl.STATIC_DRAW);

    webgl.enableVertexAttribArray(v4PositionIndex);
    webgl.vertexAttribPointer(v4PositionIndex, 2, webgl.FLOAT, false, 0, 0);
}

function initFrameBufferAndTexture()
{
    bufferObject = {};
    bufferObject.frameBuffer = webgl.createFramebuffer();
    bufferObject.depthRenderbuffer = webgl.createRenderbuffer();
    bufferObject.texture = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, bufferObject.texture);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, 1.0/widthStep, 1.0/heightStep, 0, webgl.RGBA, webgl.UNSIGNED_BYTE, null);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);
    webgl.bindRenderbuffer(webgl.RENDERBUFFER, bufferObject.depthRenderbuffer);
    webgl.renderbufferStorage(webgl.RENDERBUFFER, webgl.DEPTH_COMPONENT16, 1.0/widthStep, 1.0/heightStep);
    //attach buffer and texture
    webgl.bindFramebuffer(webgl.FRAMEBUFFER, bufferObject.frameBuffer);
    webgl.framebufferRenderbuffer(webgl.FRAMEBUFFER, webgl.DEPTH_ATTACHMENT, webgl.RENDERBUFFER, bufferObject.depthRenderbuffer);
    webgl.framebufferTexture2D(webgl.FRAMEBUFFER, webgl.COLOR_ATTACHMENT0, webgl.TEXTURE_2D, bufferObject.texture, 0);

    bufferObject.release = function() {
        webgl.deleteRenderbuffer(this.depthRenderbuffer);
        webgl.deleteFramebuffer(this.frameBuffer);
        webgl.deleteTexture(this.texture);
    }

    if(webgl.checkFramebufferStatus(webgl.FRAMEBUFFER) != webgl.FRAMEBUFFER_COMPLETE)
    {
        bufferObject.release();
        uiAppendLog("Frame buffer is not completed. Abort now!");
        bufferObject = null;
    }
}

function requestURLImage(url) {
    uiAppendLog("Requesting " + url + " from the server...");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url + ".jpg", false);
    xmlHttp.send();
    if(xmlHttp.status == 200)
        return ".jpg";

    xmlHttp.open("GET", url + ".png", false);
    xmlHttp.send();
    if(xmlHttp.status == 200)
        return ".png";
    uiAppendLog("Request " + url + " failed!");
    return "";
}

function loadImageSourceFromFile(imageName) {
    var imageObj = document.createElement("img");
    imageObj.id = imageName;
    var suffix = requestURLImage("Resource/Effect/" + imageName);
    imageObj.onload = function(){
        uiAppendLog("FX Texture " + this.id + " is loaded, start to redraw...");
        switch(effectKind)
        {
            case 1:
            renderGLWithFXNumber(currentEffect);
            break;
            default:
            ;
        }
    }
    imageObj.src = "Resource/Effect/" + imageName + suffix;
    imageObj.setAttribute("style", "display:none");
    var body = document.getElementsByTagName("body").item(0);
    body.appendChild(imageObj);
    return imageObj;
}

function loadFrameSourceFromFile(frameName) {
    var frameObj = document.createElement("img");
    frameObj.id = frameName;
    frameObj.onload = function(){
        uiAppendLog("Frame Texture " + this.id + " is loaded, start to redraw...");
        switch(effectKind)
        {
            case 2:
            renderGLWithFrameNumber(currentEffect);
            break;
            default:
            ;
        }
    }
    frameObj.src = "Resource/Frame/" + frameName + ".png";  //frames are always png files.
    frameObj.setAttribute("style", "display:none");
    var body = document.getElementsByTagName("body").item(0);
    body.appendChild(frameObj);
    return frameObj;
}

function loadNewFrameSourceFromFile(frameName) {
    var frameObj = document.createElement("img");
    frameObj.id = frameName;
    frameObj.onload = function(){
        uiAppendLog("Frame Texture " + this.id + " is loaded, start to redraw...");
        switch(effectKind)
        {
            case 2:
            renderGLWithFrameNumber(currentEffect);
            break;
            default:
            ;
        }
    }
    frameObj.src = "Resource/Frame/" + frameName + ".png";  //frames are always png files.
    frameObj.setAttribute("style", "display:none");
    var body = document.getElementsByTagName("body").item(0);
    body.appendChild(frameObj);
    return frameObj;
}

function loadFrameCSourceFromFile(cardName) {
    var obj = document.createElement("img");
    obj.id = cardName;
    obj.onload = function(){
        uiAppendLog("Card Texture " + this.id + " is loaded, start to redraw...");
        switch(effectKind)
        {
        case 3:
            renderGLWithCardNumber(currentEffect);
            break;
        default:;
        }
    }
    obj.src = "Resource/Frame/Card/" + cardName + ".jpg"; //cards are always jpg files.
    obj.setAttribute("style", "display:none");
    var body = document.getElementsByTagName("body").item(0);
    body.appendChild(obj);
    return obj;
}

function loadImageTexture(textureName) {
    var img = document.getElementById(textureName);
    if(img == null) {
        img = loadImageSourceFromFile(textureName);
    }
    var textureObject = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, textureObject);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, img);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

    return textureObject;
}

function loadFrameTexture(frameName) {
    var img = document.getElementById(frameName);
    if(img == null) {
        img = loadFrameSourceFromFile(frameName);
    }
    var textureObject = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, textureObject);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, img);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

    return textureObject;
}

function loadFrameTextureNew(frameName) {
    var img = document.getElementById(frameName);
    if(img == null) {
        img = loadNewFrameSourceFromFile(frameName);
    }
    var textureObject = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, textureObject);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, img);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

    return textureObject;
}

function loadCardTexture(cardName) {
    var img = document.getElementById(cardName);
    if(img == null) {
        img = loadFrameCSourceFromFile(cardName);
    }
    var textureObject = webgl.createTexture();
    webgl.bindTexture(webgl.TEXTURE_2D, textureObject);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, img);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

    return textureObject;
}

function initInputImageTexture(inputImgName) {
    var obj = loadImageTexture(inputImgName);   //'obj' is already binded
    webgl.activeTexture(webgl.TEXTURE0);        //GL_TEXTURE0 is used for the inputImage.
    var uniform = webgl.getUniformLocation(programObject, "inputImageTexture");
    webgl.uniform1i(uniform, 0);
    return obj;
}

function initframeTextureS(frameID) {
    webgl.activeTexture(webglTextureArray[startIndex]);
    var obj = loadFrameTexture(frameID + "S");    
    webgl.bindTexture(webgl.TEXTURE_2D, obj);
    var uniform = webgl.getUniformLocation(programObject, "SamplerFrameTexS");
    webgl.uniform1i(uniform, startIndex);
}

function initframeTextureM(frameID) {
    var index = startIndex;
    for(var i = 0; i != 8; ++i)
    {
        webgl.activeTexture(webglTextureArray[index]);
        var tmp = loadFrameTexture(frameID + "M_" + i);
        webgl.bindTexture(webgl.TEXTURE_2D, tmp);
        var uniform = webgl.getUniformLocation(programObject, "SamplerFrameTexM" + i);
        webgl.uniform1i(uniform, index++);
    }
}

function initframeTextureNewM(frameID)
{
    webgl.activeTexture(webglTextureArray[startIndex]);
    var obj = loadFrameTextureNew(frameID + "M");
    webgl.bindTexture(webgl.TEXTURE_2D, obj);
    var uniform = webgl.getUniformLocation(programObject, "SamplerFrameTexM");
    webgl.uniform1i(uniform, startIndex);
}

function initframeTextureC(cardID)
{
    webgl.activeTexture(webglTextureArray[startIndex]);
    var obj = loadCardTexture(cardID);
    webgl.bindTexture(webgl.TEXTURE_2D, obj);
    var uniform = webgl.getUniformLocation(programObject, "SamplerFrameTexC");
    webgl.uniform1i(uniform, startIndex);
}

function initSourceImageTextures(sourceString) {
    var arrTable = new Array();
    var arrTexture = new Array();
    var obj, strs = sourceString.split(" ");
    var indexCode = 0;
    var tabIndex = 0, texIndex = 0;
    for(obj in strs) {
        if(indexCode == 1)
            arrTable[tabIndex++] = strs[obj];
        else if(indexCode == 2)
            arrTexture[texIndex++] = strs[obj];

        if(strs[obj] == "table")
            indexCode = 1;
        else if(strs[obj] == "texture")
            indexCode = 2;
        else indexCode = 0;
    }
    var index = startIndex;

    tabIndex = 1, texIndex = 1;
    for(obj in arrTable)
    {
        webgl.activeTexture(webglTextureArray[index]);
        var tmp = loadImageTexture(arrTable[obj]);        
        webgl.bindTexture(webgl.TEXTURE_2D, tmp);
        var uniform = webgl.getUniformLocation(programObject, "SamplerTableTex" + tabIndex++);
        webgl.uniform1i(uniform, index++);
    }

    for(obj in arrTexture)
    {
        webgl.activeTexture(webglTextureArray[index]);
        var tmp = loadImageTexture(arrTexture[obj]);
        webgl.bindTexture(webgl.TEXTURE_2D, tmp);
        var uniform = webgl.getUniformLocation(programObject, "SamplerBackTex" + texIndex++);
        webgl.uniform1i(uniform, index++);
    }
}
















